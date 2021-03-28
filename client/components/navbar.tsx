import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../constants/colors";

export const Navbar = () => {
  return (
    <nav className="navbar p-4" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/" passHref>
          <a className="navbar-item">
            <FontAwesomeIcon icon={faCalendarAlt} color={Colors.Brand01} />
            <span className="title">SimplyShift</span>
          </a>
        </Link>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">Home</a>
          <a className="navbar-item">About</a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link href="/signup" passHref>
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
              </Link>
              <Link href="/login" passHref>
                <a className="button is-light">Log in</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
