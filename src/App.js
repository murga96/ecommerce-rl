import './App.css';
import CheckoutPage from './components/CheckoutPage';
import NavBar from './components/NavBar';
import Products from './components/Products';
import {Switch,BrowserRouter as Router, Route} from "react-router-dom"
import SignIn from './components/SigIn';
import SignUp from './components/SignUp';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { actionTypes } from './reducer';
import { useEffect } from 'react';
import Checkout from './components/CheckoutForm/Checkout';

function App() {
    const [{user}, dispatch] = useStateValue()
    useEffect(() => {
        auth.onAuthStateChanged((authUser) =>{
            console.log(authUser)
            dispatch({
                type: actionTypes.SET_USER,
                user: authUser,
            })
        })
    }, [])
    return ( 
        <div className = "App" >
        <Router>
            <NavBar/>
            <Switch>
                <Route path="/signin">
                    <SignIn/>
                </Route>
                <Route path="/signup">
                    <SignUp/>
                </Route>
                <Route path="/checkout-page">
                    <CheckoutPage/>
                </Route>
                <Route path="/checkout">
                    <Checkout/>
                </Route>
                <Route path="/">
                    <Products/>
                </Route>
            </Switch>
        </Router>      
        </div>
    );
}

export default App;