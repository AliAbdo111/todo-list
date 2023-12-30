import React, { FC, useState, FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { Api } from '../store/serviceApi';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/reducers/aouthReducer';
import { RootState } from '../store/store';
import { ErrorCatchple } from '../store/types';

const LoginPage: FC = () => {

	const navigate = useNavigate()
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (email === '' || password === '') {
			toast.warn('email and password required', { position: toast.POSITION.TOP_CENTER, })
			return;
		}
		try {
			const state = await dispatch(loginUser({ email: email, password: password }))			// Api.post('/user/signIn',{email:email,password:password}).then((res)=>{
			console.log(state)
			// if(res.status===201){
			// 	localStorage.setItem('accessToken',res.data.accessToken)
			// 	localStorage.setItem('data',res.data.id)
			navigate('/dashBoard')
			toast.success("valide login", { position: toast.POSITION.TOP_CENTER })
			// }else if(res.status===400){
			// 	toast.error('ceriadentioal vailde ',{ position: toast.POSITION.TOP_CENTER})
			// 	return
			// }else{
			// 	toast.error('ceriadentioal vailde ',{ position: toast.POSITION.TOP_CENTER})
			// 	return
			// }
			// })
		} catch (error) {
			toast.error('Server Error Try Agin After Few Minute ', { position: toast.POSITION.TOP_CENTER })
			return
		}

	}
	const inputChangeHandlerEmail = (e: FormEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value);
	}
	const inputChangeHandlerPassword = (e: FormEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
	}
	const hundelNavigtionToRegister = () => {
		navigate('/auth/register')
	}
	return (
		<div className="containerLogin">
			<div className="screen screen__pluse">
				<div className="screen__content">
					<form className="login" onSubmit={submitHandler}>
						<div className="login__field">
							<i className="login__icon fas fa-user"></i>
							<input
								type="text"
								className="login__input"
								onChange={inputChangeHandlerEmail}
								value={email}
								placeholder="User name / Email" />
						</div>
						<div className="login__field">
							<i className="login__icon fas fa-lock"></i>
							<input
								type="password"
								className="login__input"
								value={password}
								onChange={inputChangeHandlerPassword}
								placeholder="Password" />
						</div>
						<button className="button login__submit">
							<span className="button__text">Log In Now</span>
							<i className="button__icon fas fa-chevron-right"></i>
						</button>
					</form>
					<div className="social-login">
						<h3>Sign Up Now </h3>
						<div className="social-icons">
							<button className="button login__submit" onClick={hundelNavigtionToRegister}>
								<span className="button__text">Sign Up</span>
								<i className="button__icon fas fa-chevron-right"></i>
							</button>
						</div>
					</div>
				</div>

			</div>
		</div>);
}

export default LoginPage;