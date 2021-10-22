import './App.css';
import CheckoutPage from './components/CheckoutPage';
import NavBar from './components/NavBar';
import Products from './components/Products';
import {Switch,BrowserRouter as Router, Route} from "react-router-dom"
import SignIn from './components/SigIn';
import SignUp from './components/SignUp';

function App() {
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
                <Route path="/">
                    <Products/>
                </Route>
            </Switch>
        </Router>      
        </div>
    );
}

export default App;