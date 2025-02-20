const redux = require("redux");
const createStore = redux.createStore;
const combineReducer = redux.combineReducers;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

const ORDER_PIZZA = "ORDER_PIZZA";
const ORDER_BURGER = "ORDER_BURGER";

// Action Creator
const orderPizza = () => {
  return { type: ORDER_PIZZA, shop_name: "Pizza Shop" };
};

const orderBurger = () => {
  return { type: ORDER_BURGER };
};

// Reducer
const initialStateForPizza = { pizzaBase: 100 };
const initialStateForBurger = { burgerBuns: 200 };

const reducerForPizza = (state = initialStateForPizza, action) => {
  switch (action.type) {
    case ORDER_PIZZA:
      return {
        ...state,
        pizzaBase: state.pizzaBase - 1,
      };
    default:
      return state;
  }
};

const reducerForBurger = (state = initialStateForBurger, action) => {
  switch (action.type) {
    case ORDER_BURGER:
      return {
        ...state,
        burgerBuns: state.burgerBuns - 1,
      };
    default:
      return state;
  }
};

// Store
const rootReducer = combineReducer({
  pizza: reducerForPizza,
  burger: reducerForBurger,
});

const store = createStore(rootReducer, applyMiddleware(logger)); // reducer is our reducer function

console.log("Initial State: ", store.getState());

// the function in subscribe method runs whenever the state in the redux store changes
const unsubscibe = store.subscribe(() => {});

store.dispatch(orderPizza());
store.dispatch(orderBurger());

// unsubscribe only stops the callback function in subscribe from executing, it doesn't stops dispatching the action
unsubscibe();

store.dispatch(orderPizza());
