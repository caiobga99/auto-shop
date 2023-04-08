import CartActionTypes from "./action-types";

const initialState = {
  products: [],
  productsTotalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_PRODUCT:
      const productIsAlreadyInCart = state.products.some(
        (product) => product.id === action.payload.id
      );
      //verificar se o produto já está no carrinho

      //se ele estiver no carrinho, remove-lo,
      if (productIsAlreadyInCart) {
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
      return {
        ...state,
        products: [...state.products, { ...action.payload }],
        productsTotalPrice: parseFloat(
          parseFloat(state.productsTotalPrice) +
            parseFloat(action.payload.price)
        ),
      };

    case CartActionTypes.REMOVE_PRODUCT:
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
      return {
        products: [],
        productsTotalPrice: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
