import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Link as UiLink } from '@material-ui/core'; // 이름이 같아서 UiLink로 바꿈 
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles'; // 별도의 css를 넣고싶을때 사용 // styled-component랑 똑같은 일을함 
// import { withStyles } from '@material-ui/styles';
import { useContextAuth } from './contexts/AuthContext.js'
import { ContextSource } from './App.js'

const useStyles = makeStyles({
    navBar: {
        flexDirection: 'row'
    },
    menuButton: {
        marginRight: 'auto'
    },
})

export function AppShell() {
    const custom = useStyles();
    const [state, setState] = useState({ toggle: false })
    const { currentUser, logoutFunc } = useContextAuth()
    const { cart } = useContext(ContextSource)

    let totalQuantity = cart.reduce((acc, cur) => {
        let curtQuant = Number(cur.quantity)
        return acc + curtQuant;
    }, null)


    const handleDrawerToggle = () => {
        {/* true면 매뉴창이 나와서 보이고  false면 매뉴창이 안보임 */ }
        setState({ toggle: !state.toggle })
    }

    async function handleLogout() {
        await logoutFunc()
    }

    return (
        <div>

            <AppBar position="static" className={custom.navBar}>  {/* nav창*/}
                <IconButton className={custom.menuButton} color="inherit" onClick={handleDrawerToggle}> {/* 햄버거버튼 */}
                    <MenuIcon />
                </IconButton>

                {currentUser ?
                    <Link to="/userinfo2" style={{ color: '#fff', margin: '20px' }}>{currentUser.email}</Link>
                    :
                    <Link to="/signin" style={{ color: '#fff', margin: '20px' }}>로그인</Link>
                }

                {currentUser ?
                    <button onClick={handleLogout}>로그아웃</button>
                    :
                    <Link to="/signup" style={{ color: '#fff', margin: '20px' }}>회원가입</Link>
                }

                {currentUser && <Link to="/update-profile" style={{ color: '#fff', margin: '20px' }}>프로필 업데이트</Link>}

                <Link to="/lookcart" style={{ color: '#fff', margin: '20px' }}>Cart #{totalQuantity}</Link>
            </AppBar>

            <Drawer open={state.toggle}> {/* 링크 클릭시 toggleState변환*/}
                <MenuItem onClick={handleDrawerToggle}>
                    {/*원래 라우터 Link사용시, <Link to="/">이런식이지만 매태리얼ui의 링크가 같은이름이라 <Link>를 compoenet={Link}이렇게 사용 */}
                    <UiLink component={Link} to="/">Home</UiLink>
                </MenuItem>
                <MenuItem onClick={handleDrawerToggle}>
                    <UiLink component={Link} to="/text">Text</UiLink>
                </MenuItem>
                <MenuItem onClick={handleDrawerToggle}>
                    <UiLink component={Link} to="/words">Words</UiLink>
                </MenuItem>
                <MenuItem onClick={handleDrawerToggle}>
                    <UiLink component={Link} to="/userinfo">유저정보</UiLink>
                </MenuItem>
                <MenuItem onClick={handleDrawerToggle}>
                    <UiLink component={Link} to="/products">상품정보</UiLink>
                </MenuItem>
            </Drawer>

        </div>
    )
}

export default AppShell;

