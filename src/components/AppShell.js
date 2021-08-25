import React, { useState } from 'react';
// 메테리얼 ui를 사용하면서 우리가 별도의 css를 넣고싶을때 사용
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 'auto'
    }
})

export default function AppShell() {
    const classes = useStyles();
    const [state, setState] = useState({ toggle: false })

    const handleDrawerToggle = () => {
        setState({ toggle: !state.toggle })
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <IconButton className={classes.menuButton} color="inherit" onClick={handleDrawerToggle}>
                    <MenuIcon />
                </IconButton>
            </AppBar>
            <Drawer open={state.toggle}>
                <MenuItem onClick={handleDrawerToggle}>Home</MenuItem>
                <MenuItem onClick={handleDrawerToggle}>22</MenuItem>
            </Drawer>
        </div>
    )
}


