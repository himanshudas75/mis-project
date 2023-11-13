import { MDBRow,MDBCol,MDBCardText } from "mdb-react-ui-kit";
const DetailRow=({index,rowTitle,rowValue})=>{

    return (
      <>
    {index===0?<b/>:<hr/>}
    <MDBRow>
        <MDBCol sm="3">
          <MDBCardText tag="strong">{rowTitle}</MDBCardText>
        </MDBCol>
        <MDBCol sm="9">
          <MDBCardText className="text-muted">{rowValue}</MDBCardText>
        </MDBCol>
      </MDBRow>
      
      </>
      )
}
export default DetailRow;