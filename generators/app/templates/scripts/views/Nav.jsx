import React from 'react';
import {Link} from 'react-router';
import $ from 'jQuery';


export default class Nav extends React.Component {

  componentDidMount() {
    $('.button-collapse').sideNav({closeOnClick: true});
  }

  render() {
    return (
      <nav className="fixed-navbar">
        <section>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">Logo</a>
            <a href="#" data-activates="mobile-demo" className="button-collapse">
              <i className="mdi-navigation-menu"></i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="home">Home</Link>
              </li>
              <li>
                <Link to="about">About</Link>
              </li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li>
                <Link to="home">Home</Link>
              </li>
              <li>
                <Link to="about">About</Link>
              </li>
            </ul>
          </div>
        </section>
      </nav>
    );
  }
}
