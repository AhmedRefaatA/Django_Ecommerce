import React, { Component } from 'react'
import  { Input, Menu } from 'semantic-ui-react';
import { Link, BrowserRouter as Router} from 'react-router-dom';



export class Navbar extends Component {

   

    render() {
        return (
            <Menu secondary>
                <Router>
                    <Menu.Item>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/product/">ProductDetails</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/Aboute/">Aboute</Link>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input icon='search' placeholder='Search...' />
                        </Menu.Item>
                        <Link to="/logout/">logout</Link>
                    </Menu.Menu>
                </Router>
            </Menu>
        )
    
        }
}

export default Navbar
