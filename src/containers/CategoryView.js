import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/categoryView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
import Nav from "./nav";
import Header from "./header";

class CategoryView extends Component {
  constructor(props) {
    super(props);
    const hrefArr = window.location.href.split("/");
    const superCategory = this.findCategoryName(hrefArr[hrefArr.length - 1]);
    this.state = { superCategory: superCategory };
  }

  findCategoryName(name) {
    return this.props.superCategories.find(n => slugify(n.name) === name);
  }

  getCategories() {
    const hrefArr = window.location.href.split("/");
    const superCategory = this.findCategoryName(hrefArr[hrefArr.length - 1]);
    return this.props.category
      .filter(i => i.supercategory === superCategory.id)
      .map(n => (
        <div className="" key={n.id}>
          <Link
            to={`/kategoriat/${slugify(superCategory.name)}/${slugify(n.name)}`}
          >
            <div className="listItem">
              <div className="row">
                <div className="col-9">{n.name} </div>
                <div className="col-3">
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
        <Header title={this.state.superCategory.name} />
        <div className="centerView">{this.getCategories()}</div>
        <Nav link="/kategoriat" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    category: state.categories,
    superCategories: state.superCategories
  };
}

export default connect(mapStateToProps)(CategoryView);
