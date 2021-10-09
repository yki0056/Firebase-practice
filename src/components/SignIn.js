import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useContextAuth } from './contexts/AuthContext.js'

function SignIn() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signinFunc } = useContextAuth()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        await signinFunc(emailRef.current.value, passwordRef.current.value);
        history.push('/') //  로그인 버튼 누를시 라우터를 이용해  홈으로 날려버리기 
        setLoading(false)
    }
    /*
        useEffect(() => {
            API.subscribe()
            return function cleanup() {
                API.unsubscribe()
            }
        })
    */
    return (
        <>
            <h3>파이어베이스 웹앱을 사용한 로그인 방법</h3>

            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="emails">이메일</label>
                <input type="email" name="emails" id="emils" ref={emailRef} />
                <br />
                <label htmlFor="pw">패스워드</label>
                <input type="password" name="pw" id="pw" autoComplete="on" ref={passwordRef} />
                <br />
                <button disabled={loading}>로그인</button>
            </form>
            <Link to="/forgot-password">Forgot Password?</Link>
            <h4>Need an account? <Link to='/signup'>Sign Up</Link> </h4>
        </>
    )
}

export default SignIn


