import axios from 'axios'

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	LOGOUT,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	CLEAR_ALL_DATA,
	CLEAR_ALL_CLIENT_DATA,
	SET_ALERT,
	REMOVE_ALERT
} from './types'


export const loadUser=()=>async dispatch=>{
	console.log('Load user called in action')
	if(localStorage.token){
		console.log(localStorage.token)
	
	const response = await fetch('http://localhost:8000/api/user-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token:localStorage.token}),
      });
	console.log(response)
	const data = await response.json();
	console.log(data)
	dispatch({
		type: USER_LOADED,
		payload: {user:data.user.name, userType:data.user.type},
		
	});
	console.log('1111')
	}
	
}

//Register User

export const register =({values})=> async dispatch =>{
	console.log('Inside action register')
	const fbody= {
		name:values.name,
		email:values.email,
		password:values.password
	}
	
	try{
	const response = await fetch('http://localhost:8000/api/register', {
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
		console.log('Token:', data.token);

		dispatch({
			type:REGISTER_SUCCESS,
			payload:{user:fbody.name, token:data.token, userType:data.userType}
		})
		// Store the token or perform other actions
	  } else {
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
      
    }, 2000);
		
		dispatch({
			type:REGISTER_FAIL,
		})
	  }
	
	}catch(err)
	{
			console.log(err)
	}
}

export const login =({values})=>async dispatch=>{
	console.log('Inside Login action')
	const fbody= {
		// name:'12333',
		email:values.email,
		password:values.password
	}
	
	try{
	const response = await fetch('http://localhost:8000/api/login', {
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
			type:LOGIN_SUCCESS,
			payload:{user:data.user.name, token:data.token , userType:data.userType}

		})
		// dispatch(loadUser());
	}else if(response.status==401)
	{
		const data = await response.json();
			console.log(data)
		dispatch({
			type:LOGIN_FAIL
		})
		dispatch({
		  type:SET_ALERT,
		  payload:data.message
		})
		setTimeout(function() {
		  dispatch({
			type:REMOVE_ALERT,
			
		  })
		  
		}, 2000);
	  }
	}catch(err)
	{
			console.log(err)
	}

}

export const logout=()=>async dispatch=>{
	console.log('Inside logout')
	dispatch({
		type:LOGOUT
	})
	dispatch({
		type:CLEAR_ALL_DATA
	})
	dispatch({
		type:CLEAR_ALL_CLIENT_DATA
	})
}