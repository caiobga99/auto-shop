import { useEffect, useState } from "react";

import chevronRight from "../../images/chevron-right.svg";
import chevronLeft from "../../images/chevron-left.svg";

import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/cart/actions";

import iconHeart from "../../images/icon-heart.svg";
import iconHeartRed from "../../images/icon-heart-red.svg";

import "./style.css";

const Card = (car) => {
  const [isLiked, setIsLiked] = useState(false);
  const [countImageIndex, setCountImageIndex] = useState(0);

  const { link, price, title, author, year, km, fuel, id } = car;

  const dispatch = useDispatch();
  const { products } = useSelector((rootReducer) => rootReducer.cartReducer);
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

  const handleProductClick = () => {
    dispatch(addProductToCart(car));
    products.filter((obj) => {
      return obj.id === id ? setIsLiked(true) : setIsLiked(false);
    });
  };

  useEffect(() => {
    products.some((vehicle) =>
      vehicle.id === id ? setIsLiked(true) : setIsLiked(false)
    );
  }, [id, products]);

  return (
    <div className="card">
      <div className="container-images">
        <img
          className="setas esquerda"
          src={chevronLeft}
          alt="seta esquerda"
          onClick={() => {
            countImageIndex <= 0
              ? setCountImageIndex(link.length - 1)
              : setCountImageIndex(countImageIndex - 1);
          }}
        />
        <img src={link[countImageIndex]} className="image-card" alt={title} />
        <img
          className="setas direita"
          src={chevronRight}
          alt="seta direita"
          onClick={() => {
            countImageIndex >= link.length - 1
              ? setCountImageIndex(0)
              : setCountImageIndex(countImageIndex + 1);
          }}
        />
      </div>
      <div className="describe">
        <div className="heart-container">
          <img
            className={!currentUser ? "not-allowed" : "heart"}
            src={isLiked ? iconHeartRed : iconHeart}
            alt="icon heart"
            onClick={() =>
              currentUser
                ? handleProductClick()
                : alert("Entre com a sua conta para poder curtir!")
            }
          />
          <h3>{price}</h3>
        </div>
        <h5>{title}</h5>
        <p className="author">{author}</p>
      </div>
      <div className="horizontal-describe"></div>
      <div className="card-footer-describe">
        <p className="small">{year}</p>
        <p className="small">KM {km}</p>
        <p className="small">{fuel}</p>
      </div>
    </div>
  );
};

export default Card;
