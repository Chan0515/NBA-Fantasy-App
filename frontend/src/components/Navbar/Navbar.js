import React, { Component } from 'react';
import { MenuItems } from "./MenuItems";
import './Navbar.css';
class Navbar extends Component {

    state = { clicked: false }

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render() {
        return(
            <nav className="NavbarItems">
                <a href = {window.location.origin}><h1 className="navbar-logo">Alex Chan</h1></a>
                <div className = {this.state.clicked ? "menu-icon-times": "menu-icon-bars" } onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return(
                            <li key={index} >
                                <a className={item.cName} href={item.url}
                                onClick = {() => item.newurl ? window.open(item.newurl):""}
                                >
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}

export default Navbar