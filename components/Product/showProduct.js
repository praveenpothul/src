import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Container, Typography, Select, MenuItem, InputLabel,FormControl, FormHelperText, CircularProgress} from '@mui/material';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import * as Yup from 'yup';
import { useParams } from "react-router-dom";
import {useNavigate } from 'react-router-dom';
import { Alert, AlertTitle } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { getSingleProducts, updateProduct, deleteProductById} from '../../actions/productAction';
const ShowProduct =({getSingleProducts, single_product_data, updateProduct, loading, deleteProductById})=>{
	// const id=1
	console.log(single_product_data)
  let navigate = useNavigate();
	const { id } = useParams();
	useEffect(()=>{
		
		getSingleProducts({id})
    
	},[])
	const createProductValidationSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		description: Yup.string().required('Description is required'),
		category: Yup.string().required('Category is required'),
    financialType:Yup.string().required('Financial Type is required'),
    pitchingAmount: Yup.number()
    .required('Pitching Amount is required')
    .positive('Pitching Amount must be a positive number')
    .test('isTenDigitsOrLess', 'Pitching Amount must be 10 digits or less', (value) => {
      return /^\d{0,8}$/.test(value);
    })
	  });
	  const categories = [
      
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
		// Add more categories as needed
	  ];
    const financialCategories = [
		{ value: 'Equities', label: 'Equities' },
		{ value: 'Funds', label: 'Funds' },
		{ value: 'Structured Products', label: 'Structured Products' },
    { value: 'Derivatives', label: 'Derivatives' },
    { value: 'Bonds', label: 'Bonds' },
		// Add more categories as needed
	  ];
	  const initialValues = {
		name: single_product_data.name,
		description: single_product_data.description,
		category:single_product_data.category,
    financialType:single_product_data.financialType,
	  id:single_product_data.id,
    pitchingAmount:single_product_data.pitchingAmount
	  };
	  const handleSubmit = (values) => {
		// Handle form submission here
		console.log(values);
		updateProduct({values})
    setTimeout(function() {
      
      navigate('/dashboard')
    }, 2000);
    
		// saveProduct({values})
	  };

    // const AlertBox=()=>(
    //   <Dialog open={showAlert} onClose={handleCloseAlert()}>
    //   <DialogTitle>'11111'</DialogTitle>
    //   <DialogContent>11111</DialogContent>
    //   <DialogActions>
    //     <Button onClick={handleCloseAlert()} color="primary">
    //       Cancel
    //     </Button>
    //     <Button onClick={handleCloseAlert()} color="primary" variant="contained">
    //       Confirm
    //     </Button>
    //   </DialogActions>
    // </Dialog>
    // )
    
    const deleteFunc=()=>{
      deleteProductById({id:single_product_data.id})
      navigate('/dashboard')

    }
	return (

    <div style={{background:'linear-gradient(to right, #74b1e0, #9666ba)', backgroundSize: 'cover', height:'100vh', overflow:'hidden'}}>
      {loading?<CircularProgress />:
		<div style={{marginTop:'10vh'}}>
    <Container maxWidth="sm" style={{backgroundColor:'#e3eff7', borderRadius:30, paddingTop:'5vh', paddingBottom:'10vh'}}>
    <Formik
      initialValues={initialValues}
      validationSchema={createProductValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            name="name"
            as={TextField}
            label="Name"
            fullWidth
            margin="normal"
            style={{backgroundColor:'white', borderRadius:10}}
            error={!!(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />

          <Field
            name="description"
            as={TextField}
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            
			      style={{ resize: 'vertical',backgroundColor:'white', borderRadius:10 }} 
            error={!!(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />
		   <Field name="category"
		//    error={!!(touched.description && errors.description)}
		//    helperText={touched.description && errors.description}
		   >
              {({ field }) => (
                <FormControl fullWidth margin="normal" error={!!(touched.category && errors.category)} helperText={touched.description && errors.description} >
                  <InputLabel htmlFor="category">
                    Category
                  </InputLabel>
                  <Select
                    {...field}
                    displayEmpty
                    style={{backgroundColor:'white', borderRadius:10}}
                  >
                  
                    {categories.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
				  <FormHelperText>
				  {touched.category && errors.category}
        </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="financialType">
              {({ field }) => (
                <FormControl fullWidth margin="normal" error={!!(touched.category && errors.category)} helperText={touched.description && errors.description} >
                  <InputLabel htmlFor="financialType">
                    Financial Category
                  </InputLabel>
                  <Select
                    {...field}
                    displayEmpty
                    style={{backgroundColor:'white', borderRadius:10}}
                    
                  >
                  
                    {financialCategories.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
				  <FormHelperText>
				  {touched.category && errors.category}
        </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field
              name="pitchingAmount"
              as={TextField}
              label="Pitching Amount"
              fullWidth
              style={{backgroundColor:'white', borderRadius:10}}
              margin="normal"
              type="number" // This enforces numeric input
              error={!!(touched.pitchingAmount && errors.pitchingAmount)}
              helperText={touched.pitchingAmount && errors.pitchingAmount}
            />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <Button type="submit" variant="contained" color="primary">
              Update Product
            </Button>
            <Button variant="outlined" color="error" onClick={()=>deleteFunc()}>
              Delete Product
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

ShowProduct.propTypes={
	getSingleProducts:PropTypes.func.isRequired,
	updateProduct:PropTypes.func.isRequired,
  deleteProductById:PropTypes.func.isRequired,
	single_product_data:PropTypes.object.isRequired,
  loading:PropTypes.bool.isRequired

}
const mapStateToProps=(state)=>({
	single_product_data:state.product.single_product_data,
  loading:state.product.loading
})
export default connect(mapStateToProps, {getSingleProducts, updateProduct,deleteProductById})(ShowProduct)

    

    

   