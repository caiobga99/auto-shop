import CartActionTypes from "./action-types";
import analyticsEventTracker from "../../analyticsEventTracker";

const initialState = {
  products: [],
  productsTotalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  const gaEventTracker = analyticsEventTracker(action.payload?.title);

  switch (action.type) {
    case CartActionTypes.ADD_PRODUCT:
      const productIsAlreadyInCart = state.products.some(
        (product) => product.id === action.payload.id
      );
      //verificar se o produto já está no carrinho

      //se ele estiver no carrinho, remove-lo,
      if (productIsAlreadyInCart) {
        gaEventTracker(`foi removido ao carrinho`);
        return {
          ...state,
          products: state.products.filter(
            (product) => product.id !== action.payload.id
          ),
          productsTotalPrice: parseFloat(
            parseFloat(state.productsTotalPrice) -
              parseFloat(action.payload.price)
          ),
        };
      }
      //se ele não estiver adiciona-lo
      gaEventTracker(`foi adicionado ao carrinho`);
      return {
        ...state,
        products: [...state.products, { ...action.payload }],
        productsTotalPrice: parseFloat(
          parseFloat(state.productsTotalPrice) +
            parseFloat(action.payload.price)
        ),
      };

    case CartActionTypes.REMOVE_PRODUCT:
      gaEventTracker(`foi removido ao carrinho`);
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
        productsTotalPrice: parseFloat(
          parseFloat(state.productsTotalPrice) -
            parseFloat(action.payload.price)
        ),
      };

    case CartActionTypes.REMOVE_ALL_PRODUCTS:
      gaEventTracker(`Todos produtos foram removidos do carrinho`);
      return {
        products: [],
        productsTotalPrice: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
