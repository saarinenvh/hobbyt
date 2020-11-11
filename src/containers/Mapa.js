import React, { Component } from "react";
import { connect } from "react-redux";
import * as L from "leaflet";
import "../styles/map.css";
import "../styles/App.css";

// import { Dispatch } from "redux";
import userMarkerSVG from "../assets/marker_user.svg";
import activityMarkerSVG from "../assets/marker_activity.svg";
//
const defaultZoomLevel = 11;

// // TODO: ASK LOCATION OR CITY INSTEAD OF GIVING HARDCODED VALUE
const defaultLocation = {
  // Helsinki coords
  lat: 60.192059,
  lng: 24.945831
};

// Markers
const activityMarkerHeight = 75 * 0.5;
const activityMarkerWidth = 50 * 0.5;
const activityMarker = L.icon({
  iconUrl: activityMarkerSVG,
  iconSize: [activityMarkerWidth, activityMarkerHeight],
  iconAnchor: [activityMarkerWidth / 2, activityMarkerHeight],
  popupAnchor: [0, -activityMarkerHeight]
});

const userPositionIconSize = 30;
const userPositionIcon = L.divIcon({
  html: `<img src="${userMarkerSVG}"/><div class="pulse"/>`,
  className: "user-position-marker",
  iconSize: [userPositionIconSize, userPositionIconSize],
  iconAnchor: [userPositionIconSize / 2, userPositionIconSize / 2],
  popupAnchor: [0, -userPositionIconSize / 2]
});

export class Map extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      map: undefined,
      location: defaultLocation,
      haveUserLocation: false,
      zoom: defaultZoomLevel,
      userLayer: new L.FeatureGroup(),
      allActivitiesGroup: new L.FeatureGroup(),
      activity: undefined
    };
  }

  componentDidMount() {
    if (this.props.activity) {
      this.setState({ activity: this.props.activity });
    }
    this.createMap();
  }

  centerUserLocation() {
    if (this.state.map) {
      this.state.map.flyTo(
        [
          this.props.userLocation.coords.latitude,
          this.props.userLocation.coords.longitude
        ],
        defaultZoomLevel
      );
    }
  }

  createMap() {
    const position = [this.state.location.lat, this.state.location.lng];
    const map = L.map("hobbyt-map", {
      center: [position[0], position[1]],
      zoom: this.state.zoom,
      maxZoom: 19,
      scrollWheelZoom: false
    });

    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={}",
      {
        attribution:
          '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
      }
    )
      .setUrl(
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
      )
      .addTo(map);
    this.setState({ map });
  }

  addActivityMarkers() {
    this.state.allActivitiesGroup.clearLayers();
    if (this.props.activity) {
      const newMarker = L.marker(this.props.activity.coordinates, {
        icon: activityMarker,
        title: this.props.activity.name
      });
      newMarker.bindPopup(this.props.activity.name);
      this.state.allActivitiesGroup.addLayer(newMarker);
    } else {
      this.props.activitiesFiltered.forEach(n => {
        const newMarker = L.marker(n.coordinates, {
          icon: activityMarker,
          title: n.name
        });
        newMarker.bindPopup(n.name);
        this.state.allActivitiesGroup.addLayer(newMarker);
      });
    }

    if (this.state.map) {
      this.state.allActivitiesGroup.addTo(this.state.map);
    }
  }

  addUserMarker() {
    if (this.props.userLocation.coords && this.state.map) {
      const userMarker = L.marker(
        [
          this.props.userLocation.coords.latitude,
          this.props.userLocation.coords.longitude
        ],
        {
          icon: userPositionIcon
        }
      );
      this.state.userLayer.addLayer(userMarker);
      this.state.userLayer.addTo(this.state.map);
      if (this.state.activity) {
        this.state.map.fitBounds(
          this.state.allActivitiesGroup
            .getBounds()
            .extend(this.state.userLayer.getBounds())
        );
      } else {
        this.centerUserLocation();
      }
    }
  }

  render() {
    this.addActivityMarkers();
    this.addUserMarker();
    return (
      <div className="map-wrapper center" id="hobbyt-map">
        {/* Recenter & location button */}
        <button
          type="button"
          className="relocate-button"
          onClick={() => {
            this.centerUserLocation();
          }}
        >
          <i className="material-icons">my_location</i>
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userLocation: state.userLocation,
    category: state.categories,
    superCategories: state.superCategories,
    activities: state.activities
  };
}

export default connect(mapStateToProps)(Map);
