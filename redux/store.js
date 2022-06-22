import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cart.slice';
import { wishReducer} from './wish.slice'
const reducer = {
  cart: cartReducer,
  wish: wishReducer
};

const store = configureStore({
  reducer,
});

export default store;
