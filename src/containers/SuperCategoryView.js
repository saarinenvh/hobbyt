import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/categoryView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
import Nav from "./nav";
import Header from "./header";

class SuperCategoryView extends Component {
  getSuperCategories() {
    return this.props.superCategory.map(n => (
      <div className="" key={n.id}>
        <Link to={`/kategoriat/${slugify(n.name)}`}>
          <div className="listItem">
            <div className="row">
              <div className="col-6">{n.name} </div>
              <div className="col-6">
                <span className="nextIcon">
                  <FontAwesomeIcon icon="chevron-right" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ));
  }

  render() {
    return (
      <div className="listView">
        <Header title="Lähellä sinua" />
        <div className="centerView">{this.getSuperCategories()}</div>
        <Nav link="/" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    superCategory: state.superCategories
  };
}

export default connect(mapStateToProps)(SuperCategoryView);
