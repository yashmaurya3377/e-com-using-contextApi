import {} from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Userstate from "./context/Userstate.jsx";
import Viewstate from "./context/Viewstate";
import Filterstate from "./context/Filterstate.jsx";

createRoot(document.getElementById("root")).render(
  <Viewstate>
    <Userstate>
      <Filterstate>
      
          <App />
        
      </Filterstate>
    </Userstate>
  </Viewstate>
);
