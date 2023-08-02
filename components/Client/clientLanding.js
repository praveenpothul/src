import React from 'react'
import { TextField, Button, Container, Typography, Link, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { clientLoginAction } from '../../actions/clientAction';
// import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';


const ClientLanding=({clientLoginAction, isAuth, errorMessage})=>{
	const navigate = useNavigate();
	const loginValidationSchema = Yup.object({
		email: Yup.string().email('Invalid email address').required('Required'),
		password: Yup.string().required('Required'),
	  });
	  const initialValues = {
		
		email: '',
		password: '',
		
	  };
	  React.useEffect(()=>{
		if(isAuth)
		{
			navigate('/clientDashboard')	
		}
	  },[isAuth])

	return (
		<div style={{background:'linear-gradient(to right, #74b1e0, #9666ba)', backgroundSize: 'cover', height:'100vh', overflow:'hidden'}}>
			<div style={{marginTop:'10vh'}}>
			<Container maxWidth="sm" style={{backgroundColor:'#e3eff7', borderRadius:30, paddingTop:'5vh', paddingBottom:'10vh'}}>
			<Typography variant="h4" align="center">
				Login 
			</Typography>
		<div>
  <Formik
    initialValues={initialValues}
    validationSchema={loginValidationSchema}
    onSubmit={(values) => {
    //   login({ values });
	clientLoginAction({values})
    }}
  >
    {({ errors, touched }) => (
      <Form>
        <Field
          name="email"
          as={TextField}
          label="Email"
          fullWidth
          margin="normal"
		  style={{backgroundColor:'white', borderRadius:10}}
          error={!!(touched.email && errors.email)}
          helperText={touched.email && errors.email}
        />

        <Field
          name="password"
          as={TextField}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
		  style={{backgroundColor:'white', borderRadius:10}}
          error={!!(touched.password && errors.password)}
          helperText={touched.password && errors.password}
        />
<div style={{justifyContent: 'center', display: 'flex', marginTop:'4vh'}}>
		<Button type="submit" variant="contained" color="success">
           Login
          </Button>
		  </div>
      
<div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          
          <div style={{ marginLeft: '10px', marginTop: '5px', textAlign:'center' }}>
            
          </div>
        </div>
      </Form>
    )}
  </Formik>
  </div>
  </Container>
			</div>
			
		</div>
	)
}


ClientLanding.propTypes = {
	clientLoginAction:PropTypes.func.isRequired,
	isAuth:PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
	isAuth:state.customerClient.isAuth,
  });


export default connect(mapStateToProps, {clientLoginAction})(ClientLanding)