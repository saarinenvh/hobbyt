import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/categoryView.css";
import "../styles/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
import Nav from "./nav";
import Header from "./header";
import Mapa from "./Mapa";
import ActivitiesListView from "./ActivitiesListView";
import * as rc from "rc-slider";
import "rc-slider/assets/index.css";
import * as functions from "../functions/distance";

class NearActivities extends Component {
  constructor(props) {
    super(props);
    this.state = { distance: 30, activities: this.props.activities };
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
  }

  handleDistanceChange(distance) {
    this.setState({ distance: distance, activities: this.filterByDistance() });
  }

  filterByDistance() {
    const activities = this.props.activities.filter(
      n =>
        functions.getDistanceFromLatLonInKm(
          this.props.userLocation.coords.latitude,
          this.props.userLocation.coords.longitude,
          n.coordinates[0],
          n.coordinates[1]
        ) < this.state.distance
    );

    return activities;
  }
  getActivities() {
    if (this.state.activities.length > 0) {
      return this.state.activities.map(n => (
        <div key={n.id}>
          <Link to={`/near/${n.id}`}>
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
    } else {
      return (
        <div className="listItem">
          <div className="row">
            <div className="col">
              <p>Ei harrastuksia</p>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="mapviewcontainer">
        <Header title="Lähellä sinua" />

        <Mapa activitiesFiltered={this.state.activities} />
        <div className="listView">
          <div className="listItem">
            <div className="row">
              <div className="col-6">
                <div className="headerText">
                  <h4>Etäisyys</h4>
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
          <div className="centerView">{this.getActivities()}</div>
        </div>
        <Nav link="/" title="Lähellä sinua" />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userLocation: state.userLocation,
    subCategories: state.subCategories,
    activities: state.activities
  };
}

export default connect(mapStateToProps)(NearActivities);
