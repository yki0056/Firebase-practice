import React, { useState, createContext, useReducer, useEffect } from 'react'
import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom';
import AppShell from './AppShell';
import Home from './Home.js';
import Text from './Text.js';
import Words from './Words.js';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import UserInfo from './UserInfo.js'
import PrivateRoute from './privateRoute.js';
import ForgotPassword from './ForgotPassword.js';
import UserInfo2 from './UserInfo2.js';
import UpdateProfile from './UpdateProfile.js';
import Products from './Products.js'
import ItemDetails from './itemDetails.js'
import Cartcomp from './cartt.js'
import PageNotFound from './pnf.js'
import { AuthProvider } from './contexts/AuthContext.js' // export default가 아니라서 {} 해줘야함
import { cartReducer } from './contexts/reducer.js'

export const ContextSource = createContext()
const cartLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]') // 로컬저장공간에 저장된 카트정보 불러오기 

function App() {
    const [cart, dispatchCart] = useReducer(cartReducer, cartLocalStorage)
    // console.log(cart)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart)); // 로컬저장공간에 저장 
    }, [cart])

    return (
        <ContextSource.Provider value={{ cart, dispatchCart }} >
            <AuthProvider> {/* AuthContext.Provider 현유저정보,인증,로그인,로그아웃,상품정보*/}
                <HashRouter>

                    <AppShell></AppShell>

                    <div id="content" style={{ margin: 'auto', marginTop: '20px' }}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/text" component={Text} />
                            <Route path="/words" component={Words} />
                            <Route exact path="/products" component={Products} test={'tt'} />
                            {/*product에서 아이템 클릭시*/}
                            <Route path="/products/:details" component={ItemDetails} />

                            <PrivateRoute path="/userinfo" component={UserInfo} /> {/*내가직접 라우트를 만듬*/}
                            <PrivateRoute path="/update-profile" component={UpdateProfile} />
                            <Route path="/userinfo2" component={UserInfo2} />

                            <Route path="/signup" component={SignUp} />
                            <Route path="/signin" component={SignIn} />
                            <Route path="/forgot-password" component={ForgotPassword} />

                            <Route path="/lookcart" component={Cartcomp} />

                            <Route component={PageNotFound} />
                        </Switch>
                    </div>

                </HashRouter>
            </AuthProvider>
        </ContextSource.Provider>


    )
}

export default App
