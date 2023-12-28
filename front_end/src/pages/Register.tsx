import React, { FC, useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import '../App.css'
import { List, Task } from '../store/types';
import { addTask, setNotification } from '../store/actions';

interface AddNewTaskProps {
  
}

const Register: FC= () => {
  const dispatch = useDispatch();
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return(
    <div className="containerLogin">
	<div className="screen screen__pluse">
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
                <div className="login__field">
					<input type="password" className="login__input" placeholder="LinkedIn Profile Url" />
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