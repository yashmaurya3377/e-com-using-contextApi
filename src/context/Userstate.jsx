import React, { useState } from "react";
import Userdata from "./Userdata";

const Userstate = (props) => {
  // console.log(Userdata);
  
  const [database, setdatabase] = useState([]);
  return (
    
      <Userdata.Provider value={{ database, setdatabase }}>
        {props.children}
      </Userdata.Provider>
   
  );
};

export default Userstate;
