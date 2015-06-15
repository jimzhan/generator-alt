import React from 'react';
import {Link} from 'react-router';
import $ from 'jQuery';


export default class Nav extends React.Component {

  componentDidMount() {
    $('.button-collapse').sideNav();
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="light-blue lighten-1" role="navigation">
          <div className="nav-wrapper container">
            <a id="logo-container" href="#" className="brand-logo">Logo</a>
            <ul className="right hide-on-med-and-down">
              <li><Link to="home">Home</Link></li>
              <li><Link to="about">About</Link></li>
            </ul>

            <ul id="nav-mobile" className="side-nav">
              <li><Link to="home">Home</Link></li>
              <li><Link to="about">About</Link></li>
            </ul>
            <a href="#" data-activates="nav-mobile" className="button-collapse">
              <i className="mdi-navigation-menu"></i>
            </a>
          </div>
        </nav>
      </div>
    );
  }
}
