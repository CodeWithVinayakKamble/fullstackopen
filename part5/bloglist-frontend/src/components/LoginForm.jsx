const LoginForm = ({ loginHandle, username, setUsername, password, setPassword }) => {
    return (
        <>
            <h2>Log in to application</h2>
            <form onSubmit={loginHandle}>

                <div>
                    <label>
                        username :
                        <input type="text"
                            value={username}
                            onChange={({ target }) => setUsername(target.value)} />
                    </label>
                </div>

                <div>
                    <label>
                        password :
                        <input type="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)} />
                    </label>
                </div>

                <button type='submit'>Log in</button>
            </form>
        </>
    )
}

export default LoginForm