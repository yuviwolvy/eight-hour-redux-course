const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunk = require("redux-thunk").thunk;
const axios = require("axios");

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

const fetchRequest = () => {
  return {
    type: FETCH_REQUEST,
  };
};

const fetchSuccess = (products) => {
  return {
    type: FETCH_SUCCESS,
    payload: products,
  };
};

const fetchError = () => {
  return {
    type: FETCH_ERROR,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

// This is a thunk action creator, it wil return a function and the returning function doesn't have to be pure
const fetchProducts = () => {
  return (dispatch) => {
    dispatch(fetchRequest());

    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const products = response.data.map((product) => product.title);
        dispatch(fetchSuccess(products));
      })
      .catch((error) => {
        dispatch(fetchError());
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchProducts());
