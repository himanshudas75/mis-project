import { MDBCardText, MDBIcon, MDBListGroupItem } from 'mdb-react-ui-kit'
import React from 'react'

function NavRow({icon,title,iconColor}) {
    console.log(iconColor)
  return (
    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3" >
                      <MDBIcon className={icon} style={{color:iconColor}}/>
                      <MDBCardText >{title}</MDBCardText>
    </MDBListGroupItem>
  )
}

export default NavRow