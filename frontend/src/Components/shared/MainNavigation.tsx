import { Link } from "react-router-dom";
import "./MainNavigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faStore, faLightbulb, faPerson } from "@fortawesome/free-solid-svg-icons";


const MainNavigation = () => {
    return (
        <nav className="main-nav">
            <ul>
                <li>
                <Link to="/">
                    <FontAwesomeIcon icon={faHouse} /> Home   
                </Link>
                </li>
                <li>
                    <Link to="/store">
                        <FontAwesomeIcon icon={faStore} /> Merch
                    </Link>
                </li>

                <li>
                    <Link to="/register">
                        <FontAwesomeIcon icon={faLightbulb} /> New Merch
                    </Link>
                </li>
                <li>
                    <Link to="/staff">
                        <FontAwesomeIcon icon={faPerson} /> Staff
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default MainNavigation;
