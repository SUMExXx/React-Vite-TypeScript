'use client'

import { useState } from 'react'
import { API_BASE_URL } from '@/config'
import { useNavigate } from 'react-router-dom'
// import { loadUserRequest } from '@/store/actions/authActions'

export default function LoginPage() {
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(loadUserRequest())

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault()

        const trimmedUsername = username.trim()
        const trimmedPassword = password.trim()

        if (!trimmedUsername || !trimmedPassword) {
            alert('Please enter both username and password.')
            return
        }

        try {
            console.log(API_BASE_URL)
            console.log('Login attempt with:', { username: trimmedUsername, password: trimmedPassword })
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: trimmedUsername, password: trimmedPassword }),
            })

            const data = await response.json()

            if (response.ok) {
                alert('Login successful!')
                document.cookie = `access_token=${data.access_token}; path=/; secure; samesite=strict`
                sessionStorage.setItem('user', JSON.stringify(data.user))

                // 🔁 Navigate instead of window.location.href
                if (data.user.is_admin) {
                    navigate('/admin-options')
                } else {
                    navigate('/user')
                }
            } else {
                alert(data.message || 'Login failed. Please try again.')
            }
        } catch (error) {
            console.error('Login error:', error)
            alert('Something went wrong. Please try again later.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-200">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 tracking-wide">Login</h2>

                <form onSubmit={handleLogin}>
                    <label className="block text-gray-600 font-semibold mb-2 text-sm">Username</label>
                    <input
                        title="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full mb-5 p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-orange-500 focus:bg-white text-sm"
                    />

                    <label className="block text-gray-600 font-semibold mb-2 text-sm">Password</label>
                    <input
                        title="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-6 p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:border-orange-500 focus:bg-white text-sm"
                    />

                    <input
                        type="submit"
                        value="Login"
                        className="w-full py-3 bg-orange-500 text-white font-semibold rounded-md cursor-pointer text-lg hover:bg-orange-600 transition-colors duration-200"
                    />
                </form>

                <p className="text-center text-gray-500 text-sm mt-3">Hint: Use your credentials</p>

                <div className="text-center text-sm mt-5">
                    <span>Don't have an account? </span>
                    <a href="/register" className="text-orange-500 font-semibold hover:underline">Register</a>
                </div>
            </div>
        </div>
    )
}
