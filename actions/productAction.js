import axios from 'axios'
import { 
		SAVE_PRODUCT_SUCCESS,
	 	SAVE_PRODUCT_FAILURE,
	 	GET_ALL_PRODUCTS_SUCCESS, 
	 	GET_SINGLE_PRODUCTS_SUCCESS,
	 	GET_ALL_PRODUCTS_FAILURE,
	 	GET_SINGLE_PRODUCTS_FAILURE, 
		DELETE_SINGLE_PRODUCTS_SUCCESS, 
		DELETE_SINGLE_PRODUCTS_FAILURE,
		UPDATE_SINGLE_PRODUCTS_SUCCESS,
		UPDATE_SINGLE_PRODUCTS_FAILURE,
		LOADING_DATA
} from './types'


export const saveProduct=({values})=>async dispatch=>{
	console.log(values)
	const fbody= {
		name:values.name,
		description:values.description,
		category:values.category,
		financialType:values.financialType,
		pitchingAmount:values.pitchingAmount

	}
	try{
	const response = await fetch('http://localhost:8000/api/saveProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fbody),
      });
	  console.log(response)
	  if (response.status==201) {
		const data = await response.json();
		console.log(data)

		dispatch({
			type:SAVE_PRODUCT_SUCCESS,
			payload:data.product
		})
	  }else{
		dispatch({
			type:SAVE_PRODUCT_FAILURE,
			// payload:fbody
		})
	  }
	}
	  catch(err)
	{
		console.log(err)
	}
}


export const getAllProducts=()=>async dispatch=>{

	try{
		dispatch({
			type:LOADING_DATA
		  })
	const response = await fetch('http://localhost:8000/api/getProducts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(fbody),
      });
	  console.log(response)
	  if (response.status==201) {
		const data = await response.json();
		console.log(data)
		dispatch({
			type:GET_ALL_PRODUCTS_SUCCESS,
			payload:data.products
		})
	  }else{
		dispatch({
			type:GET_ALL_PRODUCTS_FAILURE,
			
		})
	  }
	}catch(err)
	{
		console.log(err)
	}
	  
}

export const getSingleProducts=({id})=>async dispatch=>{
	console.log(id)
	try{
		dispatch({
			type:LOADING_DATA
		  })
	const response = await fetch(`http://localhost:8000/api/product/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(fbody),
      });
	  console.log(response)
	  if (response.status==201) {
		const data = await response.json();
		console.log(data)
		dispatch({
			type:GET_SINGLE_PRODUCTS_SUCCESS,
			payload:data.product
			
		})
	  }else{
		dispatch({
			type:GET_SINGLE_PRODUCTS_FAILURE
			
		})
	  }
	}catch(err)
	{
		console.log(err)
	}
	  
}

export const deleteProductById=({id})=>async dispatch=>{
	console.log(id)
	try{
		const response = await fetch(`http://localhost:8000/api/deleteProduct/${id}`, {
			method: 'DELETE',
			headers: {
			  'Content-Type': 'application/json',
			},
			// body: JSON.stringify(fbody),
		  });
		  console.log(response)
		  if (response.status==201) {
			const data = await response.json();
			console.log(data)
			dispatch({
				type:DELETE_SINGLE_PRODUCTS_SUCCESS,
				payload:id
				
			})
		  }else{
			dispatch({
				type:DELETE_SINGLE_PRODUCTS_FAILURE
				
			})
		  }
		}catch(err)
		{
			console.log(err)
		}
}

export const updateProduct=({values})=>async dispatch=>{
	console.log(values)
	const fbody= {
		name:values.name,
		description:values.description,
		category:values.category,
		financialType:values.financialType,
		id:values.id,
		pitchingAmount:values.pitchingAmount

	}
	try{
		dispatch({
			type:LOADING_DATA
		  })
	const response = await fetch(`http://localhost:8000/api/updateProduct/${values.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fbody),
      });
	  
	  console.log(response)
	  if (response.status==201) {
		const data = await response.json();
		console.log(data)

		dispatch({
			type:UPDATE_SINGLE_PRODUCTS_SUCCESS,
			payload:data.product
		})
	  }else{
		dispatch({
			type:SAVE_PRODUCT_FAILURE,
			// payload:fbody
		})
	  }
	}
	  catch(err)
	{
		console.log(err)
	}
}

