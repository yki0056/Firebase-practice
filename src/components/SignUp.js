import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useContextAuth } from './contexts/AuthContext.js'

function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signupFunc, currentUser } = useContextAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            console.log('패스워드가 같지않습니다')
            setError('패스워드가 같지 않습니다.')
        } else {
            setLoading(true)
            await signupFunc(emailRef.current.value, passwordRef.current.value)
            history.push('/')
            setLoading(false)
        }
    }
    return (
        <>
            <h3>파이어베이스 웹앱을 사용한 회원가입 방법 </h3>
            {error && <h2>{error}</h2>}
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="emails">이메일</label>
                <input type="email" name="emails" id="emils" ref={emailRef} />
                <br />
                <label htmlFor="pw">패스워드</label>
                <input type="password" name="pw" id="pw" autoComplete="on" ref={passwordRef} />
                <br />
                <label htmlFor="pwc">패스워드 컨펌</label>
                <input type="password" name="pwc" id="pwc" autoComplete="off" ref={passwordConfirmRef} />
                <br />
                <button disabled={loading}>submit</button>
            </form>
            <h3>Already have an account? <Link to='/signin'>Sign In</Link> </h3>
        </>
    )
}

export default SignUp


