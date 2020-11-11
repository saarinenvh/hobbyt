import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/categoryView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
import Nav from "./nav";
import Header from "./header";

class SubCategoryView extends Component {
  constructor(props) {
    super(props);
    const hrefArr = window.location.href.split("/");
    const category = this.findCategoryName(hrefArr[hrefArr.length - 1]);
    this.state = { category: category };
  }

  findCategoryName(name) {
    return this.props.categories.find(n => slugify(n.name) === name);
  }

  findSuperCategoryName(id) {
    return this.props.superCategories.find(n => n.id === id);
  }

  getSubCategories() {
    const hrefArr = window.location.href.split("/");
    const category = this.findCategoryName(hrefArr[hrefArr.length - 1]);

    return this.props.subCategories
      .filter(i => i.category === category.id)
      .map(n => (
        <div className="" key={n.id}>
          <Link
            to={`/kategoriat/${slugify(
              this.findSuperCategoryName(category.supercategory).name
            )}/${slugify(category.name)}/${slugify(n.name)}`}
          >
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
        <Header title={this.state.category.name} />
        <div className="centerView">{this.getSubCategories()}</div>
        <Nav
          link={`/kategoriat/${this.props.match.params.supercategoryname}`}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    subCategories: state.subCategories,
    superCategories: state.superCategories
  };
}

export default connect(mapStateToProps)(SubCategoryView);
