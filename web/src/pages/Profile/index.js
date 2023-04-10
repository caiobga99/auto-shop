import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header/index";
import CardProfile from "../../components/CardProfile/index";
import api from "../../lib/axios";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/user/actions";
import {
  deleteUser,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";
import "./style.css";

const Profile = () => {
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);
  const { products } = useSelector((rootReducer) => rootReducer.cartReducer);
  const auth = getAuth();
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const { productsTotalPrice } = useSelector(
    (rootReducer) => rootReducer.cartReducer
  );

  const navigate = useNavigate();

  const handleClickRemoveAccount = () => {
    if (
      window.confirm(
        "Deseja mesmo apagar sua conta? todos os dados serão removidos"
      )
    ) {
      console.log(user);
      deleteUser(user)
        .then(() => {
          dispatch(logoutUser());
          navigate("/");
        })
        .catch((error) => console.log("erro ao apagar sua conta: ", error));
    }
  };
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
    return;
  }, [currentUser, navigate]);

  return (
    <div className="container">
      <div className="header-container">
        <Header />
      </div>
      <div className="profile-container">
        <div className="button-group">
          <button className="button-delete" onClick={handleClickRemoveAccount}>
            Apagar Conta
          </button>
        </div>
        <div className="informations">
          <h2>Nome: {currentUser?.displayName}</h2>
          <h2>Email: {currentUser?.email}</h2>
        </div>
        <div className="profile-content">
          {products.length !== 0 ? (
            <h4>
              Carros Curtidos ({products.length}) Preço Total: R${" "}
              {productsTotalPrice}
            </h4>
          ) : (
            <h4>Nenhum Carro curtido</h4>
          )}
        </div>
        <div className="card-container">
          {products.map((car) => {
            return <CardProfile car={car} link={car.images} key={car.id} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Profile;
