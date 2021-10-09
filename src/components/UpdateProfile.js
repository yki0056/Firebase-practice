import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useContextAuth } from './contexts/AuthContext.js'

function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser } = useContextAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        await signupFunc(emailRef.current.value, passwordRef.current.value)
        history.push('/')
        setLoading(false)
    }
    return (
        <>
            <h3> 프로필 업데이트 하는 방법 </h3>
            {error && <h2>{error}</h2>}
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="emails">이메일</label>
                <input type="email" name="emails" id="emils" ref={emailRef} defaultValue={currentUser.email} />
                <br />
                <label htmlFor="pw">패스워드</label>
                <input type="password" name="pw" id="pw" autoComplete="on" ref={passwordRef} placeholder="Leave blank to keep same" />
                <br />
                <button disabled={loading}>프로필 수정</button>
            </form>
            <Link to='/'>Cancel</Link>
        </>
    )
}

export default UpdateProfile


