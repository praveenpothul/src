/* eslint-disable default-case */
import { LOGIN_CLIENT_SUCCESS, LOGIN_CLIENT_FAILURE,LOGOUT_CLIENT_ACTIONTYPE, UPDATE_CLIENT_PRODUCT_PREFERENCE, UPDATE_CLIENT_DETAILS} from "../actions/types";

const initialState = {
	isAuth:false,
	loading:false,
	token: localStorage.getItem('clientoken'),
	user:null,
	userType:null,
	clientDetails:{},
	errorMessage:''

}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state=initialState, action){
	const {type, payload} = action

	switch(type){
		case LOGIN_CLIENT_SUCCESS:
			return {
				...state,
				isAuth:true,
				user:payload.data,
				token:payload.token,
				userType:payload.userType,
				clientDetails:payload.clientDetails,
				loading:false


			}
		case UPDATE_CLIENT_PRODUCT_PREFERENCE:
			return{
				...state, 
				clientDetails:payload
			}
		case UPDATE_CLIENT_DETAILS:{
			return{
				...state,
				clientDetails:payload
			}
		}
		case LOGIN_CLIENT_FAILURE:
			return{
				
				...state,
				isAuth:false,
				loading:false,
				token: '',
				user:null,
				userType:null,
				clientDetails:{},
				errorMessage:payload
			
			}

		case LOGOUT_CLIENT_ACTIONTYPE:
			return{
				
				...state,
				isAuth:false,
				loading:false,
				token: '',
				user:null,
				userType:null,
				clientDetails:{}
			
			}
		
		default:
			return state;
	}
}