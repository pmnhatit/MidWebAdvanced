import React from 'react';
import GoogleLogin from 'react-google-login';
import {useHistory} from 'react-router-dom';

export default function GoogleLoginBtn(props){

  const history = useHistory();

  const responseGoogle = async (response) => {
    console.log(response);
    const id_token = response.tokenId;
    console.log("kq trả về: "+id_token);
    await fetch("https://api-mid.herokuapp.com/auth/google", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenId:response.tokenId
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
    <GoogleLogin
            clientId="694490159126-cb0b9lgnja6v8ni0oa9jtdi178g0n4j1.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
  ); 
}
