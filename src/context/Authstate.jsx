import React, { useState } from 'react'
import Authdata from './Authdata'

const Authstate = (props) => {
const [Userdata, setUserdata] = useState();
  return (
    <Authdata.Provider value={{Userdata, setUserdata}}>
      {props.children}
    </Authdata.Provider>
  )
}

export default Authstate
