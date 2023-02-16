import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { navdata } from "./navdata";
import './navstyle.css';

class Navbar extends Component {
    state = { clicked: false };
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }
    render() {
        return (
            <nav className="NavbarItem">
                <h2 className="logo">
                    Curriculum Management
                </h2>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                    {navdata.map((item, index) => {
                        return (
                            <li key={index}>
                                <NavLink to={item.url} onClick={this.handleClick} className={item.cName}>{item.title}</NavLink>
                            </li>);
                    })}
                </ul>

            </nav>
        )
    }
}

export default Navbar;