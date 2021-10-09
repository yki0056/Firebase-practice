import React, { useState } from 'react'
import { useContextAuth } from './contexts/AuthContext.js'

function UserInfo() {
    const [error, setError] = useState("");
    const { currentUser, logoutFunc } = useContextAuth();

    const handleLogout = async () => {
        setError('')
        try {
            await logoutFunc()
        } catch {
            setError('fail to log out')
        }
    }
    console.log(currentUser)

    // 로그아웃 사용시 주의점. 리액트의 이상한점인데. logout함수가 발동해서 
    // 해당 유저의 정보가 없어졌는데 (이컴포넌트에는 이제 없음). 
    // 리액트가 이곳컴포를렌더링을 하면서  currentUser.email의 정보가 없다고. 에러를줌.
    // 해결방법 라우터를 이용해 privateRoute 사용해서  가로채는 방법.
    return (
        <>
            {error && <h3>{error}</h3> /*에러가있다면 에러를 보여줌*/}

            프라이버트 정보zz
            <h3>안녕하십니까 {currentUser.name} 님</h3>
            <h3>회원정보</h3>
            <strong>이메일:</strong> {currentUser.email}

            <br />
            <br />

            <div>
                <button onClick={handleLogout}>로그아웃</button>
            </div>
        </>
    )
}

export default UserInfo
