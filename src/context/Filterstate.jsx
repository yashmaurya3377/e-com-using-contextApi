import React, { useState } from 'react'
import Filterdata from './Filterdata'

const Filterstate = (props) => {
    const [Filteritem, setFilteritem] = useState('');

  return (
   
      <Filterdata.Provider value={{ Filteritem, setFilteritem }}>
        {props.children}
      </Filterdata.Provider>
  )
}

export default Filterstate
