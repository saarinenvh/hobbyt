import React, { Component } from "react";
import "../styles/App.css";
import "leaflet/dist/leaflet.css";
import CategoryView from "./CategoryView";
import SuperCategoryView from "./SuperCategoryView";
import SubCategoryView from "./SubCategoryView";
import ActivitiesListView from "./ActivitiesListView";
import ActivitiesDetailView from "./ActivitiesDetailView";
import NearActivities from "./NearActivities";
import FrontPage from "./FrontPage";
import Search from "./search";
import SearchList from "./searchList";
import { Route, Switch } from "react-router-dom";
import { addUserLocation } from "../actions/userLocation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faChevronUp,
  faSearch,
  faMapMarker,
  faCalendar,
  faUser,
  faHome
} from "@fortawesome/free-solid-svg-icons";

library.add(faChevronRight);
library.add(faChevronLeft);
library.add(faChevronDown);
library.add(faChevronUp);
library.add(faSearch);
library.add(faMapMarker);
library.add(faUser);
library.add(faHome);
library.add(faCalendar);

class App extends Component {
  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.props.addUserLocation(position);
        },
        err => {
          this.props.addUserLocation({
            coords: { latitude: 60.17894, longitude: 24.8271 }
          });
        }
      );
    } else {
      this.props.addUserLocation({
        coords: { latitude: 60.17894, longitude: 24.8271 }
      });
    }
  }

  render() {

    return (
      <div className="wrapper">
        {this.getUserLocation()}
        {console.log(this.props.userlocation)}
        <Switch>
          <Route exact path="/" component={FrontPage} />
          <Route exact path="/kategoriat" component={SuperCategoryView} />
          <Route
            exact
            path="/kategoriat/:supercategoryname"
            component={CategoryView}
          />
          <Route
            exact
            path="/kategoriat/:supercategoryname/:categoryname"
            component={SubCategoryView}
          />
          <Route
            exact
            path="/kategoriat/:supercategoryname/:categoryname/:subcategoryname"
            component={ActivitiesListView}
          />
          <Route
            exact
            path="/kategoriat/:supercategoryname/:categoryname/:subcategoryname/:activityid"
            component={ActivitiesDetailView}
          />
          <Route exact path="/near" component={NearActivities} />
          <Route
            exact
            path="/near/:activityid"
            component={ActivitiesDetailView}
          />
          <Route exact path="/search" component={Search} />
          <Route exact path="/search/result" component={SearchList} />
          <Route
            exact
            path="/search/results/:activityid"
            component={ActivitiesDetailView}
          />
        </Switch>
      </div>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ addUserLocation: addUserLocation }, dispatch);
}

export default connect(
  null,
  matchDispatchToProps
)(App);
