
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Container, Typography, Select, MenuItem, CircularProgress,InputLabel, IconButton,FormControl, FormHelperText } from '@mui/material';
import * as Yup from 'yup';
import { saveClient, getAllClients, deleteClientById } from '../../actions/clientAction';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateClientByClient } from '../../actions/clientAction';
import DeleteIcon from '@mui/icons-material/Delete';

import styled from 'styled-components'

const EditClientPage=({clientDetails, loading, updateClientByClient})=>{
	let navigate = useNavigate();
	console.log(clientDetails)
	const [newCategoryPreference, setNewCategoryPreference] = useState([]);
  const createClientValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Required'),
    phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must contain only numbers')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits'),
    country: Yup.string().required('Country is required'),
    preferredCategory:Yup.string().required('Preferred Category is required')
    // categoryPreference: Yup.string().required('Category preference is required'),
  });
  const ScrollableList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  max-width: 50vh;
  max-height: 10vh;
  overflow-y: hidden;
  transition: max-height 0.3s; /* Add transition for smooth appearance */

  &:hover {
    max-height: 500px; /* Adjust the height as needed to show the scrollbar */
    overflow-y: scroll;
  }
`;

  const countries = [
    { value: 'USA', label: 'USA' },
	{ value: 'UK', label: 'UK' },
	{ value: 'Canada', label: 'Canada' },
	{ value: 'Australia', label: 'Australia' },
	{ value: 'Germany', label: 'Germany' },
	{ value: 'France', label: 'France' },
	{ value: 'Japan', label: 'Japan' },
	{ value: 'China', label: 'China' },
	{ value: 'Brazil', label: 'Brazil' },
	{ value: 'India', label: 'India' },
	{ value: 'Russia', label: 'Russia' },
    
  ];

  const categoryPreferences = [
    {value:'Agriculture',label:'Agriculture'},
    {value:'AI',label:'AI'},
    {value:'Automobile',label:'Automobile'},
    {value:'CloudComputing',label:'CloudComputing'},
    {value:'Construction',label:'Construction'},
    {value:'Education',label:'Education'},
    {value:'FinTech',label:'FinTech' },
    {value:'MediTech',label:'MediTech' },
    {value:'QuantumComputing',label:'QuantumComputing' },
    {value:'Robotics',label:'Robotics' },
    {value:'SpaceTechnology',label:'SpaceTechnology' },
    {value:'VR',label:'VR'}
  ];

  const initialValues = {
	name: clientDetails.name,
	email: clientDetails.email,
password:clientDetails.password,
	phoneNumber: clientDetails.phoneNumber,
	country: clientDetails.country,
	categoryPreference: newCategoryPreference,
preferredCategory:clientDetails.preferredCategory,
productPreference:clientDetails.productPreference,
newCategoryPreference: '',
	id:clientDetails.id
  };

  const handleSubmit = (values) => {
	// Handle form submission here
	console.log(values);
values.newCategoryPreference=JSON.stringify(newCategoryPreference)
	// updateClient({values})
	// saveProduct({values})
	updateClientByClient({values})
	// saveProduct({values})
setTimeout(function() {
  
  navigate('/dashboard')
}, 2000);
  };
  useEffect(() => {
    if (clientDetails.categoryPreference) {
      const parsedCategoryPreference = JSON.parse(clientDetails.categoryPreference);
      setNewCategoryPreference(parsedCategoryPreference);
    }
  }, [clientDetails.categoryPreference]);
return(
<div style={{background:'linear-gradient(to right, #74b1e0, #9666ba)', backgroundSize: 'cover', height:'100vh', overflow:'hidden'}}>
      {loading?<CircularProgress />:
		<div style={{marginTop:'5vh'}}>
    <Container maxWidth="sm" style={{backgroundColor:'#e3eff7', borderRadius:30, paddingTop:'5vh', paddingBottom:'10vh'}}>
  
  <Typography variant="h4" align="center">
    My Details 
  </Typography>
  <Formik
    initialValues={initialValues}
    validationSchema={createClientValidationSchema}
    onSubmit={handleSubmit}
  >
    {(props) => (
      <Form>
        <Field
          name="name"
          as={TextField}
          label="Name"
          fullWidth
          margin="normal"
           style={{backgroundColor:'white', borderRadius:10}}
          error={!!(props.touched.name && props.errors.name)}
          helperText={props.touched.name && props.errors.name}
        />

        <Field
          name="email"
          as={TextField}
          label="Email"
          fullWidth
           style={{backgroundColor:'white', borderRadius:10}}
          margin="normal"
          error={!!(props.touched.email && props.errors.email)}
          helperText={props.touched.email && props.errors.email}
        />

        <Field
          name="phoneNumber"
          as={TextField}
          label="Phone Number"
          fullWidth
          margin="normal"
           style={{backgroundColor:'white', borderRadius:10}}
    type="number" 
          error={!!(props.touched.phoneNumber &&props.errors.phoneNumber)}
          helperText={props.touched.phoneNumber && props.errors.phoneNumber}
        />

        <Field name="country">
          {({ field }) => (
            <FormControl fullWidth margin="normal" error={!!(props.touched.country && props.errors.country)}>
              <InputLabel htmlFor="country">Country</InputLabel>
              <Select {...field} displayEmpty  style={{backgroundColor:'white', borderRadius:10}}>
                {countries.map((country) => (
                  <MenuItem key={country.value} value={country.value}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{props.touched.country && props.errors.country}</FormHelperText>
            </FormControl>
          )}
        </Field>
        <Field name="preferredCategory">
              {({ field }) => (
                <FormControl fullWidth margin="normal" error={!!(props.touched.preferredCategory && props.errors.preferredCategory)}>
                  <InputLabel htmlFor="preferredCategory">Preferred Category</InputLabel>
                  <Select {...field} displayEmpty  style={{backgroundColor:'white', borderRadius:10}}>
                    {categoryPreferences.map((cat) => (
                      <MenuItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{props.touched.preferredCategory && props.errors.preferredCategory}</FormHelperText>
                </FormControl>
              )}
            </Field>

        
        <Field name="newCategoryPreference" >
        {({field})=>(
          <FormControl fullWidth margin="normal" error={!!(props.touched.categoryPreferences && props.errors.categoryPreferences)}>
              <InputLabel htmlFor="newCategory">Category Preference</InputLabel>
              <Select  {...field} displayEmpty  style={{backgroundColor:'white', borderRadius:10}} 
           
              onChange={(e)=> {
                // e.preventDefault();
                console.log('121212212121')
                let arr=[]
                arr=newCategoryPreference
                const newPreference = e.target.value;
                console.log(newPreference)
                if (newPreference  && !newCategoryPreference.includes(newPreference)) {
                  arr.push(newPreference)
                  
                  setNewCategoryPreference(arr)
                 
                }
              }
            }
              >
                {categoryPreferences.map((country) => (
                  <MenuItem key={country.value} value={country.value}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{props.touched.categoryPreferences && props.errors.categoryPreferences}</FormHelperText>
            </FormControl>
        )}
   
  </Field>
  <Typography variant="h5">
				My Product Preference
			</Typography>
 

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '10px' }}>
      <ScrollableList>
        {newCategoryPreference.length >= 1 && newCategoryPreference.map((category, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '10px', marginBottom: '10px', textAlign: 'center', backgroundColor: '#fefefe', borderRadius: 17 }}>
            <text style={{ marginRight: '5px', fontFamily: 'serif', fontWeight: '600', fontSize: '21px', paddingLeft: '10px' }}>{category}</text>
            <IconButton
              onClick={() => {
                const updatedCategory = newCategoryPreference.filter((e) => e !== category);
                setNewCategoryPreference(updatedCategory);
              }}
            >
              <DeleteIcon color="red" />
            </IconButton>
          </li>
        ))}
      </ScrollableList>
    </div>

 

        <div style={{ display: 'flex',justifyContent: 'center', marginTop: '1rem' }}>
          <Button type="submit" variant="contained" color="primary">
            Update my detail
          </Button>
          
        </div>
      </Form>
    )}
  </Formik>
  
</Container>

</div>

}
</div>
	)

}
EditClientPage.propTypes={
	updateClientByClient:PropTypes.func.isRequired,
	clientDetails:PropTypes.object.isRequired,
  loading:PropTypes.bool.isRequired

}
const mapStateToProps=(state)=>({
	clientDetails:state.customerClient.clientDetails,
	loading:state.customerClient.loading
	
})
export default connect(mapStateToProps, {updateClientByClient})(EditClientPage)

    

    
