import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBListGroup,
  } from 'mdb-react-ui-kit';
  import DetailRow from '../components/DetailRow';
import { Link} from 'react-router-dom';
import NavRow from '../components/NavRow';
import { useEffect, useState } from 'react';
import { filterArr } from '../utils/helper';

const ViewProfile=({profileData,setProfileData})=>{

  const [category,setCategory]=useState('Basic Details');
  const [userData,setUserData]=useState(profileData);
  useEffect(()=>{
    const newUserData=Object.keys(profileData).filter((key)=>{
        return filterArr[category].includes(key)
    }).reduce((obj, key) => {
      obj[key] = profileData[key];
      return obj;
    }, {})
    setUserData(newUserData);
  },[category,profileData])
  
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
                  <MDBListGroup flush className="rounded-3" >

                    <NavRow
                        icon={'fa-solid fa-circle-info fa-2xl'} 
                        title={'Basic Details'} 
                        iconColor={'#3b5998'} 
                        toggleState={setCategory} 
                        category={category}
                      />
                    <NavRow 
                      icon={'fa-solid fa-file-invoice-dollar fa-2xl'} 
                      title={'Employment Details'} 
                      iconColor={'#D1D348'} 
                      toggleState={setCategory} 
                      category={category}
                      />
                      
                    <NavRow 
                      icon={'fa-solid fa-people-roof fa-2xl'} 
                      title={'Family Member Details'} 
                      iconColor={'#25AD90'} 
                      toggleState={setCategory} 
                      category={category}
                      />
                    <NavRow 
                      icon={'fa-solid fa-user-graduate fa-2xl'} 
                      title={'Educational Qualifications'} 
                      iconColor={'#9625AD'} 
                      toggleState={setCategory}
                      category={category}
                      />
                    <NavRow 
                      icon={'fa-solid fa-house-chimney fa-2xl'} 
                      title={'Stay Details'} 
                      iconColor={'#3b5998'}
                       toggleState={setCategory}
                       category={category}
                       />
               
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  { Object.keys(userData).map((key,index) =>{
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