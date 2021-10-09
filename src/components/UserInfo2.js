import React from 'react'
import { useContextAuth } from './contexts/AuthContext.js'
// 이 컴포넌트가 보여지고 있는 상태에서  로그아웃을 하게되면  currentUser값을 이곳에서 못받게되면서 error가 뜨게 되는거임.
// 라우터돔 useHistoty 이용해서 signout함수가 발동되고 바로 다른 링크로 보내버려 봣지만 안됬음. 

function UserInfo2() {
    const { currentUser } = useContextAuth()
    return (
        <div>
            <h4> 현재 이 컴포넌트를 보이게해 놓고 로그아웃을 하면 에러가 걸림</h4>
            이메일: {currentUser.email}
            <br />
            확인절차: {currentUser.metadata.creationTime}
            <br />
            u아이디: {currentUser.uid}
        </div>


    )
}

export default UserInfo2
