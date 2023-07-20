import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer.js";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage,
  // agregar una whiteList si queremos que se guarde solo una parte de nuestros estados globales
};
const persitedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persitedReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);
const persistor = persistStore(store);

export default store;
export { persistor };
