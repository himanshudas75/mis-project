function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie() {
    let user = getCookie("username");
    if (user !== "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user !== "" && user != null) {
        setCookie("username", user, 365);
      }
    }
  }
  function formatResponse(response){
    
      const userData=response.data.user;
      delete userData._id;

      const date=new Date(userData.dob);
      const day=date.getDate();
      const month=date.getMonth();
      const year=date.getFullYear();
      const newDate=day+'/'+month+'/'+year;
      userData.dob=newDate;

      Object.keys(userData).forEach(key=>{
          userData[key.charAt(0).toUpperCase()+key.substring(1)]=userData[key];
          delete userData[key]
      })
  }
  module.exports={setCookie,getCookie,checkCookie,formatResponse};