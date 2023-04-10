import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { logoutUser } from "../../redux/user/actions";
import { removeAllProductsToCart } from "../../redux/cart/actions";
import useAnalyticsEventTracker from "../../analyticsEventTracker";

import "./style.css";

const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.userReducer);

  const location = useLocation();
  const gaEventTracker = useAnalyticsEventTracker("Rotas");
  const handleLogoutClick = () => {
    dispatch(logoutUser());
    dispatch(removeAllProductsToCart());
    navigate("/");
  };

  const links = [
    {
      route: "/",
      title: "Home",
    },
    {
      route: "/venda",
      title: "Venda",
    },
    {
      route: "/register",
      title: "Cadastrar",
    },
    {
      route: "/login",
      title: "Entrar",
    },
  ];

  const linksIsLogged = [
    {
      route: "/",
      title: "Home",
    },
    {
      route: "/venda",
      title: "Venda",
    },
    {
      title: "Meu Perfil",
      route: "/profile",
    },
    {
      title: "Sair",
    },
  ];

  return (
    <header className="header-container">
      {currentUser
        ? linksIsLogged.map(({ route, title }, index) => {
            return (
              <nav key={index}>
                <ul>
                  <li>
                    <Link
                      to={route}
                      onClick={() => gaEventTracker(route)}
                      className={
                        location.pathname === route ? "currentUrl" : "link"
                      }
                    >
                      <div>
                        {title === "Sair" ? (
                          <h3
                            onClick={() => handleLogoutClick()}
                            className={
                              location.pathname === route
                                ? "currentUrl"
                                : "link"
                            }
                          >
                            {title}
                          </h3>
                        ) : (
                          <h3
                            className={
                              location.pathname === route
                                ? "currentUrl"
                                : "link"
                            }
                          >
                            {title}
                          </h3>
                        )}
                      </div>
                    </Link>
                  </li>
                </ul>
              </nav>
            );
          })
        : links.map(({ route, title }, index) => {
            return (
              <nav key={index}>
                <ul>
                  <li>
                    <Link
                      to={route}
                      className={
                        location.pathname === route ? "currentUrl" : "link"
                      }
                    >
                      <div>
                        <h3
                          className={
                            location.pathname === route ? "currentUrl" : "link"
                          }
                        >
                          {title}
                        </h3>
                      </div>
                    </Link>
                  </li>
                </ul>
              </nav>
            );
          })}
    </header>
  );
};

export default Header;
