import axios from "./axios-config";


export function login(email, password){
	return axios.post("auth/login",{email, password})
    .then(resp => {
      // get the token (from the Authorization header) and put it in session storage
      // NOTE: axios uses all lowercase letters for headers!
      const authorizationHeader = resp.headers["authorization"];
      const jwtToken = authorizationHeader.substring('Bearer '.length);
      sessionStorage.setItem('jwtToken', jwtToken);
      // return the user info (in the body of the response)
      const user = resp.data;
      return user;
    })
    .catch(error => {
      //console.log(error);
      if(error.status === 401){
        throw new Error("Invalid username or password");
      }else{
        throw new Error("Unable to login")
      }
    });
}

export function loginCheck(){
  return axios.get("auth/loginCheck")
    .then(resp => console.log(resp))
    .catch(error => console.log(error))
}

export function logout(){
  // if using cookies, rather than Authorization header
  // then you may want to delete the cookie
  sessionStorage.removeItem('jwtToken');
}





