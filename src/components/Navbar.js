import React from "react";
import { Link } from "gatsby";
import logo from "../img/logo.svg";

const Navbar = class extends React.Component {
  componentDidMount() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener("click", () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        });
      });
    }
  }

  render() {
    return (
      <nav id="main-navigation" role="navigation" aria-label="main-navigation">
        <div className="nav-wrapper">
          <div className="container">
            <Link to="/" className="brand-logo" title="Logo">
              <img src={logo} alt="Pixel Parlor" style={{ width: "30px" }} />
            </Link>

            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link className="navbar-item" to="/guide/u3-studio/">
                  U3 Studio
                </Link>
              </li>
              <li>
                <Link
                  className="navbar-item"
                  to="/guide/springboard-collaborative/"
                >
                  Springboard
                </Link>
              </li>
              <li>
                <Link
                  className="navbar-item"
                  to="/guide/sustainable-business-network-of-greater-philadelphia/"
                >
                  SBN Philly
                </Link>
              </li>
              <li>
                <Link
                  className="navbar-item"
                  to="/guide/society-for-marketing-professional-services-new-york-chapter/"
                >
                  SMPS NY
                </Link>
              </li>
              <li>
                <a
                  className="navbar-item"
                  href="https://github.com/delster/pixelparlor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="material-icons">code</i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
