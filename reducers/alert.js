/* eslint-disable import/no-anonymous-default-export */
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState ={
	errorMessage:'',
	showError:false
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            return {
				...state,
				showError:true,
				errorMessage:payload
			}
        case REMOVE_ALERT:
			return{
				...state,
				showError:false,
				errorMessage:''
			
			}
            
        default:
            return state;
    }
}
