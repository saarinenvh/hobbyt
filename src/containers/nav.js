import React, { Component } from "react";
import "../styles/categoryView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import slugify from "react-slugify";

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <div className="row icons-group cont">
          <div className="col-4">
            <Link to={this.props.link}>
              <span className="backIcon bottomNavIcon">
                <FontAwesomeIcon color="white" size="lg" icon="chevron-left" />
              </span>{" "}
            </Link>
          </div>

          <div className="col-4 text-center">
            <Link to="/">
              <span className="homeIcon bottomNavIcon">
                <FontAwesomeIcon color="white" size="lg" icon="home" />
              </span>
            </Link>
          </div>

          <div className="col-4">
            <Link to="/search">
              <span className="searchIcon bottomNavIcon">
                <FontAwesomeIcon color="white" size="lg" icon="search" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Nav;
