import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../constants/colors";

export function Navbar() {
  return (
    <nav className="navbar p-0" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/" passHref>
          <a className="navbar-item">
            <FontAwesomeIcon icon={faCalendarAlt} color={Colors.Brand01} />
            <span className="subtitle pl-2">SimplyShift</span>
          </a>
        </Link>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="menu-collapse"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="menu-collapse" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">About</a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link href="/signup" passHref>
                <a className="button is-primary has-text-weight-bold">
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
}
