const redux = require("redux");
const createStore = redux.createStore;

const ORDER_PIZZA = "ORDER_PIZZA";

// Action
// const action = { type: ORDER_PIZZA, shop_name: "Pizza Shop" };

// Action Creator
const orderPizza = () => {
  return { type: ORDER_PIZZA, shop_name: "Pizza Shop" };
};

// Reducer
const initialState = { pizzaBase: 100 };

const reducer = (state = initialState, action) => {
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

// Store
const store = createStore(reducer); // reducer is our reducer function

console.log("Initial State: ", store.getState());

// the function in subscribe method runs whenever the state in the redux store changes
const unsubscibe = store.subscribe(() =>
  console.log("Updated state: ", store.getState())
);

store.dispatch(orderPizza());

// unsubscribe only stops the callback function in subscribe from executing, it doesn't stops dispatching the action
unsubscibe();

store.dispatch(orderPizza());
