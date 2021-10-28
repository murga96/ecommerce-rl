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
import { Link, useLocation } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';
import { actionTypes } from '../reducer';
import { commerce } from './lib/eCommerce.js/commerce';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: "7rem",
    },
    grow: {
        flexGrow: 1,
    },
    button: {
        marginLeft: "1rem",//theme.spacing(2),
        display: "flex",
        alignContent:"space-between",
        alignItems: "center",
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
    const [{basket, user}, dispatch] = useStateValue()

    const handleSignOut = async() => {
        if(user){
            auth.signOut().then(() => {
                console.log("Sign-out successful.")
              }).catch((error) => {
                alert(error)
              });
            dispatch({
                type: actionTypes.SET_BASKET,
                basket: await commerce.cart.empty(),
            })
        }
    }

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
            <div className={classes.button}>
            <Typography sx={{marginRight:"1rem", color: '#3b5059'}} variant="h6" color="textPrimary" component="div">
                Hello {user ? user.email : "Guest"}
            </Typography>
                <Button component={Link} to={user ? "/" : "signin"} variant="outlined" 
                    onClick={handleSignOut} >
                        <strong>{user ? "Sign Out" : "Sign In"}</strong>
                </Button>
                { useLocation().pathname === "/" && (
                    <Link to="checkout-page">
                        <IconButton>
                            <Badge badgeContent={basket?.line_items?.length} color="error">
                                <ShoppingCart fontSize="large" color="primary"/>
                            </Badge>
                        </IconButton>
                    </Link>
                )} 
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
