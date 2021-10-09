import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useContextAuth } from './contexts/AuthContext.js'
/* 
이곳 컴포넌트의 용도는 커스텀<Route> 라고 생각하면 됨 (<PrivateRoute>)
원래 라우터의 목적은  링크 클릭시 특정 컴포로 이동시켜주는 역할을함. 이곳 커스텀 컴포는 로그인 상태에따라 2개의 컴포중 하나로 이동시켜줌.
 AppShell컴포 링크(유저정보)클릭 > app컴포  <PrivateRoute path="/userinfo" component={UserInfo} /> 이곳에서 currentUser, 
현재 로그인 상태라면 {UserInfo} 컴포로 이동, 로그인 상태가 아니라면 로그인 컴포로 이동 시키게함. 

보통의 라우터는 <Route component: {컴포넌트이름} 을 받음,  
대신에  <Route render: {함수}>를 사용하면  장점이있는데
1. 프롭스를 넘겨줄수있다. (match, location and history) as the component render prop.
2. *함수를 이용해 조건문을 달아서 <Route>가 렌더링할 컴포를 바꿀수있다.
*/

// app컴포에서 보낸정보들  <PrivateRoute path="/userinfo" component={UserInfo} /> // 원래 가고싶던 컴포의(userInfo),  path정보
function PrivateRoute({ component: Component, ...rest }) {
    // console.log(Component)    
    // 유저인포링크 클릭시  f UserInfo(){...}          // userInfo 컴포넌트 그 자체 
    // 프로필업데이트 클릭시 ƒ UpdateProfile() {...}   // updateProfile 컴포넌트 그 자체 
    // console.log({ ...rest })  // { path:'/userinfo', location:{...} } // 없어도 기능하는데 이건 뭔 기능을하는거지...
    const { currentUser } = useContextAuth();

    return (
        <>
            dd
            <Route {...rest} render={(routeProps) => { // render={}
                //console.log(routeProps)  // {history: {…}, location: {…}, match: {…}, staticContext: undefined}
                return currentUser ? <Component /*{...routeProps}*/ /> : <Redirect to="/signin" />
                // currentUser 정보가 있다면  userinfo 컴포로 이동 
                // currentUser 정보가 없다면  signin 컴포로 이동 
            }}
            >
            </Route>
        </>
    )
}

export default PrivateRoute
