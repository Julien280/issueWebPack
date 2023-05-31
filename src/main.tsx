import React   from "react";
import ReactDOM   from "react-dom/client";
import App   from "@/App";
//import "@/style.scss";
import { Provider }   from "react-redux";
import { configureStore }   from "@reduxjs/toolkit";
import { setupListeners }   from "@reduxjs/toolkit/query";


//import './style.css';

import { api }   from "@/state/api";
import { ApiProvider }   from "@reduxjs/toolkit/dist/query/react";

import reportWebVitals from './reportWebVitals';


//import {debug_join,debug_start_with_curLine,debug_with_curLine}   from "@/m_debug";
import getCurrentLine   from 'get-current-line'
//import {Debugger}   from "debug"

//import debug   from "debug"


const name_module :string = "main"
//const debug_main : Debugger = debug(debug_join([name_module,"a"]))

console.log("MAIN")
//console.log(debug_main)
//debug_main("MAIN")

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddelware) => getDefaultMiddelware().concat(api.middleware),
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
  <Provider store={store}>
      <ApiProvider api={api}>
    <App />
    </ApiProvider>
  </Provider>
  </React.StrictMode>

  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

//# sourceMappingURL=main.js.map