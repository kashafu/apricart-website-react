import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cart.slice';
import { wishReducer} from './wish.slice'
import { generalReducer } from './general.slice';
const reducer = {
  cart: cartReducer,
  wish: wishReducer,
  general :generalReducer
};

const store = configureStore({
  reducer,
});

export default store;
