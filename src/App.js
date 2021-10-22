import './App.css';
import CheckoutPage from './components/CheckoutPage';
import NavBar from './components/NavBar';
import Products from './components/Products';
import {Switch,BrowserRouter as Router, Route} from "react-router-dom"

function App() {
    return ( 
        <div className = "App" >
        <Router>
            <NavBar/>
            <Switch>
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