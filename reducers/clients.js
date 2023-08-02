import { SAVE_CLIENT_SUCCESS,
	SAVE_CLIENT_FAILURE, 
	GET_ALL_CLIENTS_SUCCESS,
   GET_ALL_CLIENTS_FAILURE,
   GET_SINGLE_CLIENTS_FAILURE,
   GET_SINGLE_CLIENTS_SUCCESS,
   DELETE_SINGLE_CLIENTS_SUCCESS, 
   DELETE_SINGLE_CLIENTS_FAILURE,
   UPDATE_SINGLE_CLIENTS_SUCCESS,
   UPDATE_SINGLE_CLIENTS_FAILURE,
   CLEAR_ALL_CLIENT_DATA,
   LOADING_CLIENT_DATA
} from "../actions/types";

const initialState={
client_data:[],
single_client_data:{},
loadingClient:false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState, action){
const {type, payload} = action
switch(type){

	case LOADING_CLIENT_DATA:
		return {
			...state,
			loadingClient:true,
			client_data:[],
			single_client_data:{},
		}
   case SAVE_CLIENT_SUCCESS:
	   return {
		   ...state, 
		   client_data:[ ...state.client_data, payload]
	   }
   case GET_ALL_CLIENTS_SUCCESS:
	   console.log('Success fetch all products in reducer')
	   console.log(payload)
	   return{
		   ...state, 
		   client_data:payload,
		   single_client_data:{},
		   loadingClient:false
		   
	   }
   case GET_SINGLE_CLIENTS_SUCCESS:
	   console.log('Success fetch Single products in reducer-')
	   console.log(payload)
	   return{
		   ...state, 
		   single_client_data:payload,
		   loadingClient:false
		   
	   }
   case GET_SINGLE_CLIENTS_FAILURE:
	   console.log('Fetch all product in reducer - failure')
	   console.log(payload)
	   return{
		   ...state, 
		   single_client_data:{}
		   
	   }
   case GET_ALL_CLIENTS_FAILURE:
	   console.log('Fetch all product in reducer - failure')
	   console.log(payload)
	   return{
		   ...state, 
		   client_data:[]
		   
	   }
   case DELETE_SINGLE_CLIENTS_SUCCESS:
	   console.log(payload)
	   return{
		   ...state,
		   client_data:state.client_data.filter(prod=>prod.id!==payload)
	   }
   case UPDATE_SINGLE_CLIENTS_SUCCESS:
	   return{
		   ...state, 
		   single_client_data:payload,
		   client_data: state.client_data.map((prod) =>
				 prod.id === payload.id ? payload : prod
			  ),
	   }
	case CLEAR_ALL_CLIENT_DATA:
		return{
			client_data:[],
			single_client_data:{},
			loadingClient:false
		}
   case DELETE_SINGLE_CLIENTS_FAILURE:
   case SAVE_CLIENT_FAILURE:
   case UPDATE_SINGLE_CLIENTS_FAILURE:
   default:

	   return state;
}
}