import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/categoryView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
import Nav from "./nav";
import * as rc from "rc-slider";
import "rc-slider/assets/index.css";
import { bindActionCreators } from "redux";
import { search } from "../actions/search";
import Header from "./header";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: 30,
      age: 5,
      categoriesId: [],
      superCategoriesId: [],
      subCategoriesId: [],
      searchString: ""
    };
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSuperCategoryChange = this.handleSuperCategoryChange.bind(this);
    this.handleSubCategoryChange = this.handleSubCategoryChange.bind(this);
  }

  checkValue(item, args) {
    switch (args) {
      case "category":
        return this.state.categoriesId.includes(item.id);
      case "subCategory":
        return this.state.subCategoriesId.includes(item.id);
      case "superCategory":
        return this.state.superCategoriesId.includes(item.id);
      default:
        return false;
    }
  }

  handleSearchString(s) {
    this.setState({ searchString: s.target.value });
  }

  handleDistanceChange(distance) {
    this.setState({ distance: distance });
  }

  handleAgeChange(age) {
    this.setState({ age: age });
  }

  handleCategoryChange(item) {
    if (this.state.categoriesId.includes(item.id)) {
      const arr = this.state.categoriesId.filter(n => n !== item.id);
      this.setState({ categoriesId: arr });
    } else {
      const arr = this.state.categoriesId;
      arr.push(item.id);
      this.setState({ categoriesId: arr });
    }
  }

  handleSubCategoryChange(item) {
    if (this.state.subCategoriesId.includes(item.id)) {
      const arr = this.state.subCategoriesId.filter(n => n !== item.id);
      this.setState({ subCategoriesId: arr });
    } else {
      const arr = this.state.subCategoriesId;
      arr.push(item.id);
      this.setState({ subCategoriesId: arr });
    }
  }
  handleSuperCategoryChange(item) {
    if (this.state.superCategoriesId.includes(item.id)) {
      let arr = this.state.superCategoriesId.filter(n => n !== item.id);
      this.setState({ superCategoriesId: arr });
    } else {
      let arr = this.state.superCategoriesId;
      arr.push(item.id);
      this.setState({ superCategoriesId: arr });
    }
  }

  search() {
    const object = {
      c: this.state.categoriesId,
      subc: this.state.subCategoriesId,
      superc: this.state.superCategoriesId,
      searchString: this.state.searchString,
      age: this.state.age,
      distance: this.state.distance
    };
    this.props.search(object);
  }

  filterCategories() {
    let arr = [];
    for (let i of this.state.superCategoriesId) {
      arr = this.props.categories.filter(n =>
        this.state.superCategoriesId.includes(n.supercategory)
      );
    }
    return arr;
  }

  filterSubCategories() {
    let arr = [];
    for (let i of this.state.categoriesId) {
      arr = this.props.subCategories.filter(n =>
        this.state.categoriesId.includes(n.category)
      );
    }
    return arr;
  }

  render() {
    const quickSearch = (
      <div className="listItem">
        <div className="row">
          <h5>Hae nimellä</h5>
          <input
            value={this.state.searchString}
            onChange={ev => this.handleSearchString(ev)}
            className="form-control"
            type="text"
            placeholder="Hae harrastuksia"
            aria-label="Search"
          />
        </div>
      </div>
    );

    const superCategories = (
      <div className="listItem">
        <div className="headerText">
          <h5>Kategoriat</h5>
        </div>
        <div className="row">
          {this.props.superCategories.map(n => (
            <div className="col-6" key={`sub${n.id}`}>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`super${n.id}`}
                  checked={this.checkValue(n, "superCategory")}
                  onChange={() => this.handleSuperCategoryChange(n)}
                />
                <label htmlFor={`super${n.id}`} className="form-check-label">
                  {n.name}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    const subCategories = (
      <div className="listItem">
        <div className="headerText">
          <h5>Alalajit</h5>
        </div>
        <div className="row">
          {this.state.categoriesId.length > 0 ? (
            this.filterSubCategories().map(n => (
              <div className="col-6" key={`cat${n.id}`}>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`cat${n.id}`}
                    checked={this.checkValue(n, "subCategory")}
                    onChange={() => this.handleSubCategoryChange(n)}
                  />
                  <label htmlFor={`cat${n.id}`} className="form-check-label">
                    {n.name}
                  </label>
                </div>
              </div>
            ))
          ) : (
            <div className="col">
              <p>Valitse Laji, jotta alalajit päivittyvät</p>
            </div>
          )}
        </div>
      </div>
    );

    const categories = (
      <div className="listItem">
        <div className="headerText">
          <h5>Lajit</h5>
        </div>
        <div className="row">
          {this.state.superCategoriesId.length > 0 ? (
            this.filterCategories().map(n => (
              <div className="col-6" key={`super${n.id}`}>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`sub${n.id}`}
                    checked={this.checkValue(n, "category")}
                    onChange={() => this.handleCategoryChange(n)}
                  />
                  <label htmlFor={`sub${n.id}`} className="form-check-label">
                    {n.name}
                  </label>
                </div>
              </div>
            ))
          ) : (
            <div className="col">
              <p>Valitse kategoria, jotta lajit päivittyvät</p>
            </div>
          )}
        </div>
      </div>
    );

    const distanceSlider = (
      <div className="listItem">
        <div className="row">
          <div className="col-6">
            <div className="headerText">
              <h5>Etäisyys</h5>
            </div>
          </div>
          <div className="col-4">
            <h5>{this.state.distance}km</h5>
          </div>

          <rc.default
            className="slider"
            defaultValue={this.state.distance}
            min={0.1}
            step={0.1}
            max={80}
            onChange={this.handleDistanceChange}
          />
        </div>
      </div>
    );

    const ageSlider = (
      <div className="listItem">
        <div className="row">
          <div className="col-6">
            <div className="headerText">
              <h5>Ikä</h5>
            </div>
          </div>
          <div className="col-4">
            <h5>{this.state.age}+</h5>
          </div>

          <rc.default
            className="slider"
            defaultValue={this.state.age}
            min={4}
            step={1}
            max={50}
            onChange={this.handleAgeChange}
          />
        </div>
      </div>
    );
    return (
      <div className="wrap">
        <Header title="Haku" />
        <div className="centerView">
          {quickSearch}
          {superCategories}
          {categories}
          {subCategories}
          {distanceSlider}
          {ageSlider}
          <div className="listItem searchButton">
            <Link to="/search/result">
              <button
                onClick={() => this.search()}
                className="btn btn-outline-primary appButtons"
              >
                Hae
              </button>
            </Link>
          </div>
        </div>
        <Nav link="/" title="Haku" />
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ search: search }, dispatch);
}

function mapStateToProps(state) {
  return {
    subCategories: state.subCategories,
    categories: state.categories,
    superCategories: state.superCategories,
    searchObject: state.searchObject
  };
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Search);
