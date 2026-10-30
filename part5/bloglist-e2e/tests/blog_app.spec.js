const { describe, test, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {

    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                username: 'root',
                name: 'vinayak kamble',
                password: 'root@#123'
            }
        })
        await request.post('/api/users', {
            data: {
                username: 'superroot',
                name: 'vincent griffit',
                password: 'root@#123'
            }
        })
        await page.goto('/login')
    })

    test('login form is shown', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'log in to application' })).toBeVisible()
        await expect(page.getByRole('textbox', { name: 'username', exact: true })).toBeVisible()
        await expect(page.getByRole('textbox', { name: 'password', exact: true })).toBeVisible()
        await expect(page.getByRole('button', { name: 'log in' })).toBeVisible()
    })

    describe('Log in', () => {

        // Login succeeds with the correct username/password combination
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'root', 'root@#123')
            await expect(page).toHaveURL('http://localhost:5173/')
            await expect(page.getByText('vinayak kamble logged in')).toBeVisible()
        })

        // Login fails if the username/password is incorrect
        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'root', 'root@123')
            await expect(page).toHaveURL('http://localhost:5173/login')
            await expect(page.getByText('Invalid username or password')).toBeVisible()
        })

    })

    describe('when user logged in', () => {

        beforeEach(async ({ page }) => {
            await loginWith(page, 'root', 'root@#123')
        })

        // A logged-in user can create a blog
        test('user can able to create a new blog', async ({ page }) => {
            await page.getByRole('link', { name: 'new blog' }).click()
            await expect(page).toHaveURL('http://localhost:5173/create')
            await createBlog(page, 'a blog can get liked by active user ', 'papa vinde', 'fso.com')
            await expect(page).toHaveURL('http://localhost:5173')
            await expect(page.getByRole('link', { name: 'a blog can get liked by active user  by papa vinde' })).toBeVisible()
        })

        // A logged-in user can like blogs
        test('user can able to like the blog', async ({ page }) => {
            await page.getByRole('link', { name: 'new blog' }).click()
            await expect(page).toHaveURL('http://localhost:5173/create')
            await createBlog(page, 'a blog can get liked by active user ', 'papa vinde', 'fso.com')
            await expect(page).toHaveURL('http://localhost:5173')
            await page.getByRole('link', { name: 'a blog can get liked by active user by papa vinde', exact: false }).click()
            await expect(page).toHaveURL(/.*\/blogs\/.+/)
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText('Likes 1')).toBeVisible()
        })

        // A logged-in user can delete a blog
        test('user can able to delete the blog', async ({ page }) => {
            await page.getByRole('link', { name: 'new blog' }).click()
            await expect(page).toHaveURL('http://localhost:5173/create')
            await createBlog(page, 'a blog can get deleted by active user ', 'papa vinde', 'fso.com')
            await expect(page).toHaveURL('http://localhost:5173')
            await page.getByRole('link', { name: 'a blog can get deleted by active user by papa vinde', exact: false }).click()
            await expect(page).toHaveURL(/.*\/blogs\/.+/)
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText('Likes 1')).toBeVisible()
            page.on('dialog', dialog => dialog.accept())
            await page.getByRole('button', { name: 'remove' }).click()
            await expect(page).toHaveURL('http://localhost:5173')
            await expect(page.getByRole('link', { name: 'a blog can get deleted by active user by papa vinde', exact: false })).not.toBeVisible()
        })
    })
})