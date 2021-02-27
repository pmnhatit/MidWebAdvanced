import React from 'react';
import FacebookLogin from 'react-facebook-login';
import {useHistory} from 'react-router-dom';
 

export default function GoogleLoginBtn(props){

    const history = useHistory();
  
    const responseFacebook = async (response) => {
    console.log(response);
      console.log("kq trả về: "+response.accessToken);
      await fetch("https://api-mid.herokuapp.com/auth/facebook", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessToken:response.accessToken
          }),
        })
          .then((res) => res.json())
         .then(result =>{ 
        //  setSuccess(true);
        console.log(result);
        if(result.message==="200OK"){
          localStorage.setItem('token',JSON.stringify(result.token));
          localStorage.setItem('user',JSON.stringify(result.infoUser));
          history.push('/boards');
        }else{
          props.setIsSignIn("Username or password invalid!");
        }
      })
    }
    return(
        <FacebookLogin
        appId="361823401769904"
        fields="name,email,picture"
        callback={responseFacebook}
        size="small"
         />
        
    ); 
  }
  