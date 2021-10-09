import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContextAuth } from './contexts/AuthContext.js'

function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword, currentUser } = useContextAuth()
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        try {
            setMessage('')
            await resetPassword(emailRef.current.value);
            setMessage('Check your email for further instruction')
        } catch {
            setMessage('')
            setMessage('Wrong email')
        }
        setLoading(false)
    }
    return (
        <>
            <h3>패스워드 리셋</h3>
            {message && <h2>{message}</h2>}
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="emails">이메일</label>
                <input type="email" name="emails" id="emils" ref={emailRef} />
                <br />
                <br />
                <button disabled={loading}>리셋 패스워드</button>
            </form>
            <h4>Want to sign in? <Link to="/signin">Log In</Link></h4>
            <h4>Need an account? <Link to='/signup'>Sign Up</Link> </h4>
        </>
    )
}

export default ForgotPassword
