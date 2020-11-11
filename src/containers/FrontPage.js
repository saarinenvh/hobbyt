import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

class FrontPage extends Component {
  render() {
    return (
      <div className="frontpage">
        <div className="headerLogo" id="headerLogo">
          <h1 id="headerText">Hobbyt</h1>
          <div id="subtitle" className="mt-1">
            <p>Kaikki harrastukset yhdessä paikassa</p>
          </div>
        </div>

        <div className="content">
          <div className="frontPageButtons">
            <Link to="/near">
              <button className="btn btn-outline-primary appButtons">
                Näytä lähellä olevat harrastukset
              </button>
            </Link>
          </div>
          <div className="frontPageButtons">
            <Link to="/kategoriat">
              <button className="btn btn-outline-primary appButtons">
                Selaa harrastuksia
              </button>
            </Link>
          </div>
          <div className="frontPageButtons">
            <Link to="/search">
              <button className="btn btn-primary appButtons ">
                Tarkempi haku
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default FrontPage;
