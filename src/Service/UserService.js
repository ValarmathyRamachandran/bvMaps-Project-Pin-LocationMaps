import AxioService from "./AxioService";

const userService = new AxioService();

let baseurl='http://fundoonotes.incubation.bridgelabz.com/api/';

let header={
  headers: {
    // 'Content-Type': 'application/json',
  }
}

class UserService{

    SignUp(data){
       return userService.postMethod(`${baseurl}user/userSignUp`,data)
    }

    SignIn(data){
        return userService.getMethod(`${baseurl}user/login`,data)
    }

   
}

export default UserService;