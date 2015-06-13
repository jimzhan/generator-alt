import React from 'react';
import {Link} from 'react-router';


export default class Nav extends React.Component {
  render() {
    return (
      <header className="navbar-fixed">
        <nav className="light-blue darken-4">
          <div className="nav-wrapper container">
            <a href="#" className="brand-logo">
              <i className="fa fa-home fa-2x"></i>
            </a>
            <a href="#" data-activates="mobile-demo" className="button-collapse">
              <i className="mdi-navigation-menu"></i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li><Link to="home">Home</Link></li>
              <li><Link to="about">About</Link></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
