import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
  } from 'mdb-react-ui-kit';
  import DetailRow from '../components/DetailRow';
import { Link} from 'react-router-dom';
import NavRow from '../components/NavRow';

const ViewProfile=({profileData})=>{

  
    return (
        <section style={{ backgroundColor: '#eee' }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle py-2"
                    style={{ width: '150px' }}
                    
                    fluid />
                  
                  <p className="text-muted mb-1">{profileData.Name}</p>
                  <p className="text-muted mb-4">{profileData.EmployeeId}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <Link to="/edit">
                    <MDBBtn color="secondary">Request Edits</MDBBtn>
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCard>
  
              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                  <MDBListGroup flush className="rounded-3" style={{cursor:'pointer'}}>

                    <NavRow icon={'fa-solid fa-circle-info fa-2xl'} title={'Basic Details'} iconColor={'#3b5998'}/>
                    <NavRow icon={'fa-solid fa-file-invoice-dollar fa-2xl'} title={'Employment Details'} iconColor={'#D1D348'}/>
                    <NavRow icon={'fa-solid fa-people-roof fa-2xl'} title={'Family Member Details'} iconColor={'#25AD90'}/>
                    <NavRow icon={'fa-solid fa-user-graduate fa-2xl'} title={'Educational Qualifications'} iconColor={'#9625AD'}/>
                    <NavRow icon={'fa-solid fa-house-chimney fa-2xl'} title={'Stay Details'} iconColor={'#3b5998'}/>
               
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  { Object.keys(profileData).map((key,index) =>{
                     if(!key.startsWith('_'))
                     return <DetailRow key={key} index={index} rowTitle={key} rowValue={profileData[key]} />
                      return <></>
                     }
                     )}   
                </MDBCardBody>
              </MDBCard>    
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    )
}
export default ViewProfile;