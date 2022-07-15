import axios from 'axios';
import {
	SET_LOADER,
	CLOSE_LOADER,
	SET_TOKEN,
	REGISTER_ERRORS,
	LOGIN_ERRORS,
} from '../types/UserTypes';



export const postRegister = (state) => {
	return async (dispatch) => {
		
		dispatch({ type: SET_LOADER });
		try {
			const { data } = await axios.post('https://cbe.apricart.pk/auth/open/register', state);
			dispatch({ type: CLOSE_LOADER });
			localStorage.setItem('token', data.data.token);
			dispatch({ type: SET_TOKEN, payload: data.token });
			alert(data.message)
		} catch (error) 
		{
			dispatch({ type: CLOSE_LOADER });
			dispatch({
				type: REGISTER_ERRORS,
				payload: error.response.data.errors,
			});
		}
	};
};

export const postLogin = (state) => {
	return async (dispatch) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		//https://stag.apricart.pk/v1/auth/open/login
		try {
			dispatch({ type: SET_LOADER });
			const { data } = await axios.post('https://cbe.apricart.pk/auth/login', state, config);
			dispatch({ type: CLOSE_LOADER });
			localStorage.setItem('token', data.data.token);
			dispatch({ type: SET_TOKEN, payload: data.data.token });
			alert(data.message)
		} catch (error) {
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: LOGIN_ERRORS, payload: error.response.data.errors });
			alert(error.response.data.message)
		}
	};
};
