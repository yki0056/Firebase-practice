import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as matLink } from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles'; // 별도의 css를 넣고싶을때 사용
// styled-component랑 똑같은 일을함 
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

export default function AppShell(prop) {
    const classes = useStyles();
    const [state, setState] = useState({ toggle: false })

    const handleDrawerToggle = () => {
        setState({ toggle: !state.toggle })
    }
    console.log(prop)
    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <IconButton className={classes.menuButton} color="inherit" onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                </AppBar>

                <Drawer open={state.toggle}>
                    <MenuItem onClick={handleDrawerToggle}>
                        <Link to="/home">Home</Link>
                    </MenuItem>
                    <MenuItem onClick={handleDrawerToggle}>
                        <Link to="/text">Text</Link>
                    </MenuItem>
                    <MenuItem onClick={handleDrawerToggle}>
                        <Link to="/words">Words</Link>
                    </MenuItem>
                </Drawer>
            </div>

            <div id="content" style={{ margin: 'auto', marginTop: '20px' }}>

            </div>

        </div>

    )
}


