const redux = require("redux");
const createStore = redux.createStore;
const combineReducer = redux.combineReducers;

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

const store = createStore(rootReducer); // reducer is our reducer function

console.log("Initial State: ", store.getState());

// the function in subscribe method runs whenever the state in the redux store changes
const unsubscibe = store.subscribe(() =>
  console.log("Updated state: ", store.getState())
);

store.dispatch(orderPizza());
store.dispatch(orderBurger());

unsubscibe();

// this won't work as we have unsubscribed!
store.dispatch(orderPizza());
