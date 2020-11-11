import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/categoryView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
import Nav from "./nav";
import Mapa from "./Mapa";
import * as functions from "../functions/distance";
import Header from "./header";

class ActivitiesListView extends Component {
  constructor(props) {
    super(props);
    const category = this.getSubCategory();
    this.state = { category: category };
  }
  getSubCategory() {
    return this.props.match
      ? this.props.subCategories.find(
          n => slugify(n.name) === this.props.match.params.subcategoryname
        )
      : "";
  }

  getNextLink(item) {
    if (this.props.match) {
      return `/kategoriat/${this.props.match.params.supercategoryname}/${
        this.props.match.params.categoryname
      }/${this.props.match.params.subcategoryname}/${item.id}`;
    } else {
      return "/";
    }
  }

  getPrevLink() {
    if (this.props.match) {
      return `/kategoriat/${this.props.match.params.supercategoryname}/${
        this.props.match.params.categoryname
      }`;
    } else {
      return "/";
    }
  }

  getActivities() {
    const restaurants =
      this.getSubCategory() === ""
        ? this.props.activities
        : this.props.activities.filter(
            n => n.subcategory === this.getSubCategory().id
          );
    return restaurants.map(n => (
      <div key={n.id}>
        <Link to={this.getNextLink(n)}>
          <div className="listItem">
            <div className="row">
              <div className="col-9">
                {n.name}
                <small className="distance">
                  {functions
                    .getDistanceFromLatLonInKm(
                      this.props.userLocation.coords.latitude,
                      this.props.userLocation.coords.longitude,
                      n.coordinates[0],
                      n.coordinates[1]
                    )
                    .toFixed(1)}
                  km
                </small>
              </div>
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
    const activities =
      this.getSubCategory() === ""
        ? this.props.activities
        : this.props.activities.filter(
            n => n.subcategory === this.getSubCategory().id
          );
    return (
      <div className="listView">
        <Header title={this.state.category.name} />
        <Mapa activitiesFiltered={activities} />
        <div className="centerView">{this.getActivities()}</div>
        <Nav link={this.getPrevLink()} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    subCategories: state.subCategories,
    activities: state.activities,
    userLocation: state.userLocation
  };
}

export default connect(mapStateToProps)(ActivitiesListView);
