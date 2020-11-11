import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/categoryView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
import Nav from "./nav";
import * as functions from "../functions/distance";
import Header from "./header";

class SearchList extends Component {
  constructor(props) {
    super(props);
  }

  getItems() {
    // Jos valittu alalajeja, filtteröidään itemit suoraan
    if (this.props.searchObject.subc.length > 0) {
      return this.filterActivitysFromSubCategory(this.props.searchObject.subc);

      // Jos alalajeja eikä kategorioita ole valittu, etsitään
      // kategorian joukoista ne, jotka osuvat valittuun superkategoriaan
    } else if (
      this.props.searchObject.subc.length == 0 &&
      this.props.searchObject.c.length == 0 &&
      this.props.searchObject.superc.length > 0
    ) {
      return this.getCategoriesFromSuperCategory();

      // Haetaan alakategoriat suoraan kategorioista
    } else if (this.props.searchObject.superc.length === 0) {
      return this.props.activities;
    } else {
      return this.getSubCategoriesFromCategory(this.props.searchObject.c);
    }
  }

  getCategoriesFromSuperCategory() {
    const categories = this.props.categories;
    let arr = [];
    if (this.props.searchObject.superc.length > 0) {
      for (let i of this.props.searchObject.superc) {
        for (let n of categories)
          if (n.supercategory === i && !arr.includes(n.id)) {
            arr.push(n.id);
          }
      }
      return this.getSubCategoriesFromCategory(arr);
    }
  }

  getSubCategoriesFromCategory(categories) {
    const subCategories = this.props.subCategories;
    let arr = [];
    for (let i of categories) {
      for (let n of subCategories)
        if (n.category === i) {
          arr.push(n.id);
        }
    }
    return this.filterActivitysFromSubCategory(arr);
  }

  filterActivitysFromSubCategory(arr) {
    const restaurants = this.props.activities;
    let res = [];
    for (let i of restaurants) {
      if (arr.includes(i.subcategory)) {
        res.push(i);
      }
    }

    return res;
  }

  filterWithOtherSpecs(arr) {
    if (this.props.searchObject.searchString.length > 0) {
      arr = arr.filter(n =>
        n.name.includes(this.props.searchObject.searchString)
      );
    }

    if (this.props.userLocation.coords) {
      arr = arr.filter(
        n =>
          functions.getDistanceFromLatLonInKm(
            this.props.userLocation.coords.latitude,
            this.props.userLocation.coords.longitude,
            n.coordinates[0],
            n.coordinates[1]
          ) < this.props.searchObject.distance
      );
    }

    arr = arr.filter(n =>
      n.age ? n.age[0] > this.props.searchObject.age : true
    );

    return arr;
  }

  getActivities() {
    const restaurants = this.filterWithOtherSpecs(this.getItems());
    return restaurants.length === 0 ? (
      <div className="listItem">
        <div className="row">
          <div className="col">
            <p>Ei hakutuloksia</p>
          </div>
        </div>
      </div>
    ) : (
      restaurants.map(n => (
        <div key={n.id}>
          <Link to={`/search/results/${n.id}`}>
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
      ))
    );
  }

  render() {
    return (
      <div className="listView">
        <Header title="Hakutulokset" />
        <div>{this.getActivities()}</div>
        <Nav link={`/search`} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    subCategories: state.subCategories,
    activities: state.activities,
    searchObject: state.searchObject,
    userLocation: state.userLocation
  };
}

export default connect(mapStateToProps)(SearchList);
