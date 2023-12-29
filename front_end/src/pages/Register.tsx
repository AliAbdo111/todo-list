import React, { FC, useState, FormEvent } from 'react';
import '../App.css'
import { redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Api } from '../store/serviceApi';

const Register: FC= () => {


  const navigate=useNavigate ()
 const [error,setError]=useState({email:'',password:'',linkedIn_url:''}); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [linkedIn_url, setLinkedIn_url] = useState('');
  const [errorLinkedIn, setErrorLinked] = useState(false);



const submitHandler = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if(email===''||password===''){
	  toast.warn('email  password and Linked In Url  required ',{ position: toast.POSITION.TOP_CENTER,})
	  return ;
  }
  const isValide =isValidLinkedInProfileUrl(linkedIn_url)
  if(!isValide){
	  setErrorLinked(true)
	  return
  }
  try {
	  Api.post('/user', {email:email,password:password,linkedIn_url:linkedIn_url}).then((res)=>{
		  console.log(res.status)
		  if(res.status===201){
			navigate('/auth/login')
			  toast.success("valide login",{ position: toast.POSITION.TOP_CENTER})
		  }else if(res.status===400){
			  toast.error('ceriadentioal vailde ',{ position: toast.POSITION.TOP_CENTER})
			  return
		  }else{
			  toast.error('ceriadentioal vailde ',{ position: toast.POSITION.TOP_CENTER})
			  return
		  }	  
	  })
  } catch  {

	// setError(getResponseError(error))
	  toast.error('test',{ position: toast.POSITION.TOP_CENTER})
	  return
  }

}
const inputChangeHandlerEmail = (e: FormEvent<HTMLInputElement>) => {
  setEmail(e.currentTarget.value);
}
const inputChangeHandlerPassword = (e: FormEvent<HTMLInputElement>) => {
  setPassword(e.currentTarget.value);
}
function isValidLinkedInProfileUrl(url: string): boolean {
	// Regular expression for a LinkedIn profile URL
	const linkedInUrlPattern = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
  
	// Test if the provided URL matches the pattern
	return linkedInUrlPattern.test(url);
  }

const inputChangeHandlerLinked = (e: FormEvent<HTMLInputElement>) => {
	setLinkedIn_url(e.currentTarget.value);

  }

  return(
    <div className="containerLogin">
	<div className="screen screen__pluse">
		<div className="screen__content">
			<form className="login" onSubmit={submitHandler}>
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input 
					type="text" 
					onChange={inputChangeHandlerEmail}
					className="login__input"
					 placeholder="User name / Email" />

				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input 
					type="password"
					 className="login__input"
					 onChange={inputChangeHandlerPassword}
					 placeholder="Password" />
				</div>
                <div className="login__field">
					<input
					 type="text"
					  className="login__input" 
					  onChange={inputChangeHandlerLinked}
					  placeholder="LinkedIn Profile Url" />
					     {errorLinkedIn&& <span id="error-message" className="error-message">Enter vlide Link please</span>}
				</div>
				<button className="button login__submit">
					<span className="button__text">Sgin Up</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			
		</div>
		
	</div>
</div>);
}

export default Register