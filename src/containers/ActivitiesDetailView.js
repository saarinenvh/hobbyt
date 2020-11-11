import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/categoryView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
import Nav from "./nav";
import Mapa from "./Mapa";
import Header from "./header";

class ActivitiesDetailView extends Component {
  constructor() {
    super();

    this.state = {
      extended: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getPrevLink() {
    if (window.location.href.includes("kategoriat")) {
      return `/kategoriat/${this.props.match.params.supercategoryname}/${
        this.props.match.params.categoryname
      }/${this.props.match.params.subcategoryname}`;
    } else if (window.location.href.includes("near")) {
      return "/near";
    } else {
      return "/search/result";
    }
  }
  toggleState() {
    this.setState({ extended: !this.state.extended });
  }
  render() {
    const activity = this.props.activities.find(
      n => n.id === this.props.match.params.activityid
    );

    return (
      <div className="listView">
        <Header title={activity.name} />
        <div className="centerView">
          <div className="activityUrl">
            <small>
              <a href={activity.url} target="_blank">
                Lue lisää organisaation kotisivuilta
              </a>
            </small>
          </div>

          <div className="listItem">
            <div className="row">
              <div className="col detailIconsInfo">
                <span>
                  <FontAwesomeIcon icon="map-marker" color="red" />
                </span>
              </div>
              <div className="col detailIconsInfo">
                <span>
                  <FontAwesomeIcon icon="calendar" color="white" />
                </span>
              </div>
              <div className="col detailIconsInfo">
                <span>
                  <FontAwesomeIcon icon="user" color="white" />
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col detailIconsInfo">
                <span>
                  <small className="ml-1">
                    {activity.address[0]} {activity.address[1]}{" "}
                    {activity.address[2]}
                  </small>
                </span>
              </div>
              <div className="col detailIconsInfo">
                <span>
                  <small className="ml-1">{activity.hours}</small>
                </span>
              </div>
              <div className="col detailIconsInfo">
                <span className="ml-2">
                  <small>{activity.whoFor}</small>
                </span>
              </div>
            </div>
          </div>
          <div className="wrapp">
            <Mapa activity={activity} />
          </div>
          <div className="listItem">
            <div
              className={`${
                this.state.extended ? "descriptionExtended" : "descriptionSmall"
              }
               ${activity.description.length > 520 ? "long" : ""}`}
            >
              <p>{activity.description}</p>
            </div>
            {activity.description.length > 520 ? (
              <div className="arrow" onClick={() => this.toggleState()}>
                {this.state.extended ? (
                  <FontAwesomeIcon icon="chevron-up" />
                ) : (
                  <FontAwesomeIcon icon="chevron-down" />
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <Nav link={this.getPrevLink()} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activities: state.activities
  };
}

export default connect(mapStateToProps)(ActivitiesDetailView);
