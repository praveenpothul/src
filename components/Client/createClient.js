import { Formik, Form, Field } from 'formik';
import { TextField, Button, Container, Typography, Select, MenuItem, InputLabel, IconButton,FormControl, FormHelperText } from '@mui/material';
import * as Yup from 'yup';
import { saveClient, getAllClients, deleteClientById } from '../../actions/clientAction';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import DeleteIcon from '@mui/icons-material/Delete';

import styled from 'styled-components'
const CreateClient = ({ saveClient, getAllClients, deleteClientById }) => {
  let navigate = useNavigate();
  
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
    name: '',
    email: '',
    password:'',
    phoneNumber: '',
    country: '',
    categoryPreferences: [],
    preferredCategory:'',
    newCategoryPreference: '',
  };

  const handleSubmit = (values) => {
    console.log(values);
    values.newCategoryPreference=JSON.stringify(values.categoryPreferences)
    console.log(values)
    saveClient({ values });
     setTimeout(function() {
      
      navigate('/dashboard')
    }, 2000);
  };

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

  return (
   <div style={{background:'linear-gradient(to right, #74b1e0, #9666ba)', backgroundSize: 'cover', height:'100vh', overflow:'hidden'}}>
      <div style={{marginTop:'5vh'}}>
	<Container maxWidth="sm" style={{backgroundColor:'#e3eff7', borderRadius:30, paddingTop:'5vh', paddingBottom:'10vh'}}>
  
      <Typography variant="h4" align="center">
				Create Client 
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
          name="password"
          as={TextField}
          label="Password"
          // type="password"
          fullWidth
          margin="normal"
		  style={{backgroundColor:'white', borderRadius:10}}
          error={!!(props.touched.password && props.errors.password)}
          helperText={props.touched.password && props.errors.password}
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
                    
                    const newPreference = e.target.value;
                    if (newPreference  && !props.values.categoryPreferences.includes(newPreference)) {
                      props.setFieldValue('categoryPreferences', [...props.values.categoryPreferences, newPreference]);
                     
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
				Added Client Preference
			</Typography>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop:'10px'}}>
  
  <ScrollableList>
    {props.values.categoryPreferences.map((category, index) => (
      <li key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '10px', marginBottom: '10px', textAlign:'center', backgroundColor:'#fefefe', borderRadius:17 }}>
        <text style={{ marginRight: '5px', fontFamily:'serif', fontWeight:'600', fontSize:'21px', paddingLeft:'10px' }}>{category}</text>
        <IconButton
        
          onClick={() => {
            const updatedPreferences = [...props.values.categoryPreferences];
            updatedPreferences.splice(index, 1);
            props.setFieldValue('categoryPreferences', updatedPreferences);
          }}
        >
          <DeleteIcon color='red'/>
        </IconButton>
      </li>
    ))}
  </ScrollableList>
</div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <Button type="submit" variant="contained" color="primary">
                Create Client
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      
	</Container>
  </div>
  </div>
  );
};

CreateClient.propTypes = {
  saveClient: PropTypes.func.isRequired,
  getAllClients: PropTypes.func.isRequired,
  deleteClientById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { saveClient, getAllClients, deleteClientById })(CreateClient);
