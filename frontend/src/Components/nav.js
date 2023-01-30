import React from "react";
import { Component } from "react";
import { navdata } from "./navdata";
import './navstyle.css'

class Navresponce extends Component {
    state = { clicked: false };
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }
    render() {
        return (
            <nav className="NavbarItem">
                <h2 className="logo">
                    Curricullam Management
                </h2>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                    {navdata.map((item, index) => {
                        return (
                            <li key={index}>
                                <a href={item.url} className={item.cName}><i className={item.icon}></i>{item.title}</a>
                            </li>);
                    })}
                </ul>

            </nav>
        )
    }
}

export default Navresponce;