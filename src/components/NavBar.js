import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from "./../images/logo.png";
import { makeStyles } from '@mui/styles';
import { ShoppingCart } from '@mui/icons-material';
import { Badge} from '@mui/material';
import { BrowserRouter, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: "7rem",
    },
    grow: {
        flexGrow: 1,
    },
    button: {
        marginLeft: 10,//theme.spacing(2),
    },
    image: {
        marginRight: "10px",
        height: "2rem",
    },
    app: {
        backgroundColor: "green",
    },
}));

export default function NavBar() {
    const classes = useStyles();

    return (
    <div className={classes.root}>
      <AppBar sx={{backgroundColor: "whitesmoke", boxShadow: "none"}} position="fixed">
        <Toolbar>
        <Link to="/">
            <IconButton
                edge="start"
                className={classes.menuButtom}
            >
                <img 
                    src={logo}
                    className={classes.image}
                    alt="Commerce.js"
                    height="25px"
                    />
                </IconButton>
            </Link>
            <div className={classes.grow}/>
            <Typography variant="h6" color="textPrimary" component="div">
                Hello Guest
            </Typography>
            <div className={classes.button}>
                <Button variant="outlined">
                    <strong>Sign In</strong>
                </Button>
                <Link to="checkout-page">
                    <IconButton>
                        <Badge badgeContent={2} color="error">
                            <ShoppingCart fontSize="large" color="primary"/>
                        </Badge>
                    </IconButton>
                </Link>      
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
