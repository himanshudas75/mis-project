import { MDBCardText, MDBIcon, MDBListGroupItem } from 'mdb-react-ui-kit'
import React from 'react'

function NavRow({icon,title,iconColor,toggleState,category}) {

  
  return (
    <MDBListGroupItem id={title} active={category===title} className="d-flex justify-content-between align-items-center p-3 square border border-1" style={{cursor:'pointer'}} onClick={(e)=>toggleState(e.target.id)}>
                      <MDBIcon id={title} className={icon} style={{color:iconColor}}/>
                      <MDBCardText id={title}>{title}</MDBCardText>
    </MDBListGroupItem>
  )
}

export default NavRow