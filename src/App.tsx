
import { CssBaseline, ThemeProvider }   from "@mui/material";

import { BrowserRouter, Route, Routes }   from "react-router-dom";
import Login   from "./pages/User/Login/Login";




//import { debug,debug_join,debug_start_with_curLine,debug_with_curLine}   from "@/m_debug";
import getCurrentLine   from 'get-current-line'
//import {Debugger}   from "debug"

//const debug_cmd :string = process.env.DEBUG ? process.env.DEBUG : "";
//console.log("debug_cmd : " + debug_cmd)

//global.localStorage.setItem("debug",debug_cmd)


const name_module :string = "app"
//const debug_app_main : Debugger = debug(debug_join([name_module,"a"]))


//debug_start_with_curLine(debug_app_main,getCurrentLine())


function App() {
 
  
  return (
    <div className="app">
      <p style={{color: "white"}} > Application </p>
       <BrowserRouter>
       <CssBaseline />
       <Routes>
        <Route path="/user/login" element={<Login />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//# sourceMappingURL=App.js.map