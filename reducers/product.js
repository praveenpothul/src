import { SAVE_PRODUCT_SUCCESS,
	 	SAVE_PRODUCT_FAILURE, 
	 	GET_ALL_PRODUCTS_SUCCESS,
	    GET_ALL_PRODUCTS_FAILURE,
	    GET_SINGLE_PRODUCTS_FAILURE,
	    GET_SINGLE_PRODUCTS_SUCCESS,
	    DELETE_SINGLE_PRODUCTS_SUCCESS, 
		DELETE_SINGLE_PRODUCTS_FAILURE,
		UPDATE_SINGLE_PRODUCTS_SUCCESS,
		UPDATE_SINGLE_PRODUCTS_FAILURE,
		CLEAR_ALL_DATA,
		LOADING_DATA
	 } from "../actions/types";

const initialState={
	product_data:[],
	single_product_data:{},
	loading:false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState, action){
	const {type, payload} = action
	switch(type){
		case LOADING_DATA:
			return {
				...state,
				loading:true ,
				single_product_data:{},
				product_data:[]
				
				
			}
		case SAVE_PRODUCT_SUCCESS:
			return {
				...state, 
				product_data:[ ...state.product_data, payload]
			}
		case GET_ALL_PRODUCTS_SUCCESS:
			console.log('Success fetch all products in reducer')
			console.log(payload)
			return{
				...state, 
				product_data:payload,
				single_product_data:{},
				loading:false
				
			}
		case GET_SINGLE_PRODUCTS_SUCCESS:
			console.log('Success fetch Single products in reducer-')
			console.log(payload)
			return{
				...state, 
				single_product_data:payload,
				loading:false
				
			}
		case GET_SINGLE_PRODUCTS_FAILURE:
			console.log('Fetch all product in reducer - failure')
			console.log(payload)
			return{
				...state, 
				single_product_data:{}
				
			}
		case GET_ALL_PRODUCTS_FAILURE:
			console.log('Fetch all product in reducer - failure')
			console.log(payload)
			return{
				...state, 
				product_data:[]
				
			}
		case DELETE_SINGLE_PRODUCTS_SUCCESS:
			console.log(payload)
			return{
				...state,
				product_data:state.product_data.filter(prod=>prod.id!==payload)
			}
		case UPDATE_SINGLE_PRODUCTS_SUCCESS:
			return{
				...state, 
				single_product_data:payload,
				product_data: state.product_data.map((prod) =>
      				prod.id === payload.id ? payload : prod
   			    ),
			}
		case CLEAR_ALL_DATA:{
			return {
				product_data:[],
				single_product_data:{},
				loading:false
			}	
		}

		case DELETE_SINGLE_PRODUCTS_FAILURE:
		case SAVE_PRODUCT_FAILURE:
		default:

			return state;
	}
}