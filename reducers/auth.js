/* eslint-disable default-case */
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, LOGOUT, LOGIN_SUCCESS,LOGIN_FAIL} from "../actions/types";

const initialState = {
	isAuthenticated:false,
	loading:true,
	token: localStorage.getItem('token'),
	user:null,
	userType:null

}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state=initialState, action){
	const {type, payload} = action

	switch(type){
		case USER_LOADED:
			console.log('In Reducer, User loaded')
			
			return {
				...state,
				userType:payload.userType,
				user:payload.user,
				token:localStorage.getItem('token'),
				isAuthenticated:true

			}
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			
			console.log('In Reducer, Register LOGIN success')
			localStorage.setItem('token', payload.token);
			return {
				...state,
				user:payload.user,
				token:payload.token,
				userType:payload.userType,
				isAuthenticated:true
			};
		case REGISTER_FAIL:
		case LOGIN_FAIL:
			console.log('Login fail, register fail in reducer')
			return {
				...state,
				token:null,
				user:null,
				userType:null,
				isAuthenticated:false
			};
		case LOGOUT:
			localStorage.setItem('token', '');
			return {
				...state, 
				token:null,
				isAuthenticated:false,
				user:null,
				userType:null
				
			}
		default:
			return state;
	}
}