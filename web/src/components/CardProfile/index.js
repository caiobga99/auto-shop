import { useState } from "react";

import chevronRight from "../../images/chevron-right.svg";
import chevronLeft from "../../images/chevron-left.svg";

import { useDispatch } from "react-redux";
import { removeProductToCart } from "../../redux/cart/actions";

import iconHeartRed from "../../images/icon-heart-red.svg";

import "./style.css";

const Cart = ({ car }) => {
  const { link, price, title, author, year, km, fuel } = car;

  const dispatch = useDispatch();

  const [countImageIndex, setCountImageIndex] = useState(0);

  const handleProductClick = () => {
    dispatch(removeProductToCart({ id: car.id, price: car.price }));
  };

  return (
    <div className="card-profile">
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
            className="heart"
            src={iconHeartRed}
            alt="icon heart"
            onClick={handleProductClick}
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

export default Cart;
