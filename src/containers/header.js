import React, { Component } from "react";
import "../styles/categoryView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import slugify from "react-slugify";

class Header extends Component {
  render() {
    return (
      <div className="header pt-1">
        <div className="row cont">
          <div className="col mt-2 pb-2 text-center title">
            <h5>{this.props.title}</h5>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
