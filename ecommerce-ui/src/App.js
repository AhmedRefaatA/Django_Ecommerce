import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import ProductDetails from './Components/ProductDetails';
import Aboute from './Components/Aboute';
function App() {
  return (
    <React.Fragment>
      <Navbar />
          <Switch>
            <Route path="/home" component={Home} /> 
            <Route path="/product/:id" component={ProductDetails} />
            <Route path="/Aboute" component={Aboute} />
            <Redirect from='/' to='/home' />
          </Switch>

    </React.Fragment>
    );
}

export default App;
