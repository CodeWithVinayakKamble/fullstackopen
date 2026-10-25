const { describe, test, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {

    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                username: 'root',
                name: 'superuser',
                password: 'root@#123'
            }
        })
        await request.post('/api/users', {
            data: {
                username: 'superroot',
                name: 'papa vinde',
                password: 'root@#123'
            }
        })
        await page.goto('/')
    })

    test('login form is shown', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'log in to application' })).toBeVisible()
        await expect(page.getByRole('textbox', { name: 'username', exact: true })).toBeVisible()
        await expect(page.getByRole('textbox', { name: 'password', exact: true })).toBeVisible()
        await expect(page.getByRole('button', { name: 'log in' })).toBeVisible()
    })

    describe('Log in', () => {

        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'root', 'root@#123')
            await expect(page.getByText('superUser logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'root', 'root@123')
            await expect(page.getByText('Invalid username or password')).toBeVisible()
            await expect(page.getByText('superUser logged in')).not.toBeVisible()
        })

    })

    describe('when logged in', () => {

        beforeEach(async ({ page }) => {
            await loginWith(page, 'root', 'root@#123')
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'test blog playwright', 'superUser', 'https://example.com')
            await expect(page.getByText('test blog playwright superUser')).toBeVisible()
        })

        test('a blog can be get liked', async ({ page }) => {
            await createBlog(page, 'test blog for get liked', 'superStarDev', 'https://example.com')
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText('Likes 1 like')).toBeVisible()
        })

        test('a blog can be get deleted', async ({ page }) => {
            await createBlog(page, 'test blog for getting deleted by playwright', 'superuser', 'https://example.com')
            await page.getByRole('button', { name: 'view' }).click()
            page.on('dialog', dialog => dialog.accept())
            await page.getByRole('button', { name: 'remove' }).click()
            await expect(page.getByText('test blog for getting deleted by playwright', { exact: 'true' })).not.toBeVisible()
            await page.reload()
        })

        test("user who added the blog sees the blog's delete button", async ({ page }) => {
            await createBlog(page, 'second user cant see first users remove button', 'superuser', 'https://example.com')
            await page.getByRole('button', { name: 'log out' }).click()
            await loginWith(page, 'superroot', 'root@#123')
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })

        test("the blog with the most likes first", async ({ page }) => {

            await createBlog(page, 'Blog A', 'papa tunde', 'vampirediaries.com')
            await createBlog(page, 'Blog B', 'vincent griffit', 'vampirediaries.com')
            await createBlog(page, 'Blog C', 'tribrid', 'vampirediaries.com')

            const blogA = page.locator('.blog').filter({ hasText: 'Blog A' })
            const blogB = page.locator('.blog').filter({ hasText: 'Blog B' })

            await blogA.getByRole('button', { name: 'view' }).click()
            await blogA.getByRole('button', { name: 'like' }).click()
            await blogA.getByRole('button', { name: 'like' }).click()
            await blogA.getByRole('button', { name: 'like' }).click()

            await blogB.getByRole('button', { name: 'view' }).click()
            await blogB.getByRole('button', { name: 'like' }).click()
            await blogB.getByRole('button', { name: 'like' }).click()

            const allBlogs = page.locator('.blog')
            await expect(allBlogs.first()).toContainText('Blog A')
            await expect(allBlogs.nth(1)).toContainText('Blog B')
            await expect(allBlogs.last()).toContainText('Blog C')

        })

    })
})