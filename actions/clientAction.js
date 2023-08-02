import axios from 'axios';
import { 
  SAVE_CLIENT_SUCCESS,
  SAVE_CLIENT_FAILURE,
  GET_ALL_CLIENTS_SUCCESS,
  GET_ALL_CLIENTS_FAILURE,
  GET_SINGLE_CLIENTS_SUCCESS,
  GET_SINGLE_CLIENTS_FAILURE,
  DELETE_SINGLE_CLIENTS_SUCCESS,
  DELETE_SINGLE_CLIENTS_FAILURE,
  UPDATE_SINGLE_CLIENTS_SUCCESS,
  UPDATE_SINGLE_CLIENTS_FAILURE,
  LOADING_CLIENT_DATA,
  LOGIN_CLIENT_SUCCESS,
  LOGIN_CLIENT_FAILURE,
  LOGOUT_CLIENT_ACTIONTYPE,
  CLEAR_ALL_DATA,
	CLEAR_ALL_CLIENT_DATA,
  SET_ALERT,
  UPDATE_CLIENT_PRODUCT_PREFERENCE,
  UPDATE_CLIENT_DETAILS,
  REMOVE_ALERT
} from './types';

// Action to save a client
export const saveClient = ({values}) => async (dispatch) => {
	console.log(values)
	const fbody={
		name:values.name,
		email:values.email,
    password:values.password,
		phoneNumber:values.phoneNumber,
		country:values.country,
    preferredCategory:values.preferredCategory,
		categoryPreference:values.newCategoryPreference,
    productPreference:'[1]'
	}
  try {
    const response = await fetch('http://localhost:8000/api/createClient', {
		method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fbody),
	});
    if (response.status === 201) {
		const data = await response.json();
		console.log(data)
      dispatch({
        type: SAVE_CLIENT_SUCCESS,
        payload: data.client
      });
    } else {
      dispatch({
        type: SAVE_CLIENT_FAILURE
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: SAVE_CLIENT_FAILURE
    });
  }
};

// Action to get all clients
export const getAllClients = () => async (dispatch) => {
  try {
    dispatch({
      type:LOADING_CLIENT_DATA
    })
    const response = await fetch('http://localhost:8000/api/getAllClients', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(fbody),
      });
	  console.log(response)
    if (response.status === 201) {
		const data = await response.json();
		console.log(data)
      dispatch({
        type: GET_ALL_CLIENTS_SUCCESS,
        payload: data.clients
      });
    } else {
      dispatch({
        type: GET_ALL_CLIENTS_FAILURE
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ALL_CLIENTS_FAILURE
    });
  }
};

// Action to get a single client by ID
export const getSingleClient = ({id}) => async (dispatch) => {
	console.log(id)
  try {
    dispatch({
      type:LOADING_CLIENT_DATA
    })
    const response = await fetch(`http://localhost:8000/api/getClient/${id}`,{
		method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
	});
	console.log(response)
    if (response.status === 201) {
		const data = await response.json();
		console.log(data)
    // console.log(data)
      dispatch({
        type: GET_SINGLE_CLIENTS_SUCCESS,
        payload: data.client
      });
    } else {
      dispatch({
        type: GET_SINGLE_CLIENTS_FAILURE
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_SINGLE_CLIENTS_FAILURE
    });
  }
};

// Action to delete a client by ID
export const deleteClientById = ({id}) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8000/api/deleteClient/${id}`,{
		method: 'DELETE',
		headers: {
		  'Content-Type': 'application/json',
		},
		// body: JSON.stringify(fbody),
	  });
	  console.log(response)
    if (response.status === 201) {
		const data = await response.json();
			console.log(data)
      dispatch({
        type: DELETE_SINGLE_CLIENTS_SUCCESS,
        payload: id
      });
    } else {
      dispatch({
        type: DELETE_SINGLE_CLIENTS_FAILURE
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_SINGLE_CLIENTS_FAILURE
    });
  }
};

// Action to update a client by ID
export const updateClient = ({values}) => async (dispatch) => {
	console.log(values)
	const fbody={
		name:values.name,
		email:values.email,
    password:values.password,
		phoneNumber:values.phoneNumber,
		country:values.country,
    preferredCategory:values.preferredCategory,
    categoryPreference:values.newCategoryPreference,
    productPreference:values.productPreference
	}
  try {
    const response = await fetch(`http://localhost:8000/api/updateClient/${values.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fbody),
      });
	  console.log(response)
    if (response.status === 201) {
		const data = await response.json();
		console.log(data)
      dispatch({
        type: UPDATE_SINGLE_CLIENTS_SUCCESS,
        payload: data.client
      });
    } else {
      dispatch({
        type: UPDATE_SINGLE_CLIENTS_FAILURE
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_SINGLE_CLIENTS_FAILURE
    });
  }
};

export const updateClientByClient = ({values}) => async (dispatch) => {
  console.log(values)
	const fbody={
		name:values.name,
		email:values.email,
    password:values.password,
		phoneNumber:values.phoneNumber,
		country:values.country,
    preferredCategory:values.preferredCategory,
    categoryPreference:values.newCategoryPreference,
    productPreference:values.productPreference
	}
  try {
    const response = await fetch(`http://localhost:8000/api/updateClient/${values.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fbody),
      });
	  console.log(response)
    if (response.status === 201) {
		const data = await response.json();
		console.log(data)
      dispatch({
        type: UPDATE_CLIENT_DETAILS,
        payload: data.client
      });
    } else {
      dispatch({
        type: UPDATE_SINGLE_CLIENTS_FAILURE
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_SINGLE_CLIENTS_FAILURE
    });
  }
}



export const clientLoginAction= ({values}) => async (dispatch) => {
  console.log('Inside Login action')
	const fbody= {
		// name:'12333',
		email:values.email,
		password:values.password
	}
	console.log(fbody)
	try{
	const response = await fetch('http://localhost:8000/api/loginClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fbody),
      });
	  //eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksIm5hbWUiOiIxMjMzMyIsImVtYWlsIjoiMUBnbWFpbC5jb20iLCJleHAiOjE2ODk0NDc2OTV9.pizCJ5puV4p9IHH4kRN2mpAIWO-H9bwb3lmTxwQt4rE

	console.log(response)
	if (response.ok) {
		const data = await response.json();
		console.log(data)
		console.log('Token:', data.token);
  
		dispatch({
			type:LOGIN_CLIENT_SUCCESS,
			payload:{user:data.client.name, token:data.token , userType:'Client', clientDetails:data.client}

		})
  }else{
    const data = await response.json();
		console.log(data)
    dispatch({
      type:SET_ALERT,
      payload:data.message
    })
    setTimeout(function() {
      dispatch({
        type:REMOVE_ALERT,
        
      })
      
    }, 10000);
  }
	// 	// dispatch(loadUser());
	// }else if(response.status==401)
	// {
	// 	dispatch({
	// 		type:LOGIN_FAIL
	// 	})
  console.log('1111')
	
	}catch(err)
	{
			console.log(err)
	}


}


export const clientPreferredProdAction=({values})=>async  (dispatch)=>{
  console.log(JSON.parse(values.previousPreference))
  let newData = JSON.parse(values.previousPreference);
console.log(newData);

if (!newData) {
  newData = []; // Create an empty array if newData is null
}

newData.push(values.preferredProductId);
  console.log(newData)


  const fbody= {
		// name:'12333',
		productPreference:JSON.stringify(newData),
		id:values.customerId
	}
	console.log(fbody)
	try{
	const response = await fetch('http://localhost:8000/api/updateProductPreference', {
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
          type:UPDATE_CLIENT_PRODUCT_PREFERENCE,
          payload:data.client
        })
      }
    }catch(err)
    {
      console.log(err)
    }
}

export const clientLogoutAction=() => async (dispatch) => {
  dispatch({
type:LOGOUT_CLIENT_ACTIONTYPE
  })
  dispatch({
type:CLEAR_ALL_CLIENT_DATA
  })
  dispatch({
    type:CLEAR_ALL_DATA
  })
}

