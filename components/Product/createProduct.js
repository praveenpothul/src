import { Formik, Form, Field } from 'formik';
import { TextField, Button, Container, Typography, Select, MenuItem, InputLabel,FormControl, FormHelperText} from '@mui/material';
import * as Yup from 'yup';
import { saveProduct, getAllProducts, deleteProductById} from '../../actions/productAction';
import { connect } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { useNavigate } from "react-router-dom";

const CreateProduct=({saveProduct, getAllProducts, deleteProductById})=> {
	// const classesFormControl = formControlStyles();
  let navigate = useNavigate();
 
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
    ,
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
		name: '',
		description: '',
		category: '',
    financialType:'',
    pitchingAmount:0
	  };
	  const handleSubmit = (values) => {
		// Handle form submission here
		console.log(values);
		saveProduct({values})
    setTimeout(function() {
      
      navigate('/dashboard')
    }, 2000);
	  };
	 

  return (
    <div style={{background:'linear-gradient(to right, #74b1e0, #9666ba)', backgroundSize: 'cover', height:'100vh', overflow:'hidden'}}>
      <div style={{marginTop:'10vh'}}>
	<Container maxWidth="sm" style={{backgroundColor:'#e3eff7', borderRadius:30, paddingTop:'5vh', paddingBottom:'10vh'}}>
  
      <Typography variant="h4" align="center">
				 Product Details
			</Typography>
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

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <Button type="submit" variant="contained" color="primary">
              Create Product
            </Button>
            
          </div>

        </Form>
      )}
    </Formik>
   
	</Container>
  </div>
  </div>

  
	)

}

CreateProduct.propTypes={
	saveProduct:PropTypes.func.isRequired,
  getAllProducts:PropTypes.func.isRequired,
  deleteProductById:PropTypes.func.isRequired
}


const mapStateToProps=(state)=>({

})
export default connect(mapStateToProps, {saveProduct, getAllProducts, deleteProductById})(CreateProduct)