import React, { Component } from "react";
import Navbar from "./Navbar";

class Header extends Component {
  state = {
    activeIndex: null,
  };
  handleClick = (index) => this.setState({ activeIndex: index });
  render() {
    const clickables = [
      { name: "Home" },
      { name: "Favorites" },
      { name: "Contact Us" },
    ];
    return (
      <div className="fixed-navbar-container">
        <div className="navbar">
          <ul>
            {clickables.map((clickable, i) => {
              return (
                <Navbar
                  key={clickable.name}
                  name={clickable.name}
                  index={i}
                  isActive={this.state.activeIndex === i}
                  onClick={this.handleClick}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
