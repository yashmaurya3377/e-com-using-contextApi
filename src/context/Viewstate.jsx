import React, { useState } from 'react'
import Viewdata from './Viewdata'

const Viewstate = (props) => {
    const [viewarr, setviewarr] = useState([]);
  return (
    <Viewdata.Provider value={{viewarr,setviewarr}}>
      {props.children}
      
    </Viewdata.Provider>
  )
}

export default Viewstate
