import React, { FC, useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import '../App.css'
import { List, Task } from '../store/types';
import { addTask, setNotification } from '../store/actions';

interface AddNewTaskProps {
  
}

const LoginPage: FC= () => {
  const dispatch = useDispatch();
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return(
    <div className="containerLogin">
	<div className="screen">
		<div className="screen__content">
			<form className="login">
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" placeholder="User name / Email" />
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" placeholder="Password" />
				</div>
				<button className="button login__submit">
					<span className="button__text">Log In Now</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div className="social-login">
				<h3>Sign Up Now </h3>
				<div className="social-icons">
                <button className="button login__submit">
					<span className="button__text">Sign Up</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>
				</div>
			</div>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>);
}

export default LoginPage;