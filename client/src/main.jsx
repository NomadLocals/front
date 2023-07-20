import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./Redux trad/store.js";
import { ClerkProvider } from "@clerk/clerk-react";
import { PersistGate } from "redux-persist/integration/react";

const clerk_pub_key = import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY;

  
ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider
      publishableKey={clerk_pub_key}
    >
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </PersistGate>
  </ClerkProvider>
);
