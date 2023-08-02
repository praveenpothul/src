import React from "react";
import { TextField, Button, Container, Typography, Link, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { register, login, loadUser } from '../../actions/auth';
import StyledTextField from "../../utils/CommonComponents/StyledTextField";
const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

const registerValidationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const LoginForm = ({ setIsLogin, login }) => (
	<div>
  <Formik
    initialValues={initialValues}
    validationSchema={loginValidationSchema}
    onSubmit={(values) => {
      login({ values });
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
            <div>
			<text style={{fontFamily:'Sans-Serif', fontSize:'21px', lineHeight:'28px'}}>	
              Don't have an account?{' '}
			  
              <Link
                component="button"
                variant="body1"
                underline="always"
				style={{ fontSize: 'inherit' }}

                onClick={() => setIsLogin(false)}
              >
                Register here
              </Link>
			  </text>
            </div>
          </div>
        </div>
      </Form>
    )}
  </Formik>
  </div>
);
const RegisterForm = ({ register, login, setIsLogin, loadUser }) => (
	<div>
  <Formik
    initialValues={initialValues}
    validationSchema={registerValidationSchema}
    onSubmit={(values) => {
      register({ values });
    }}
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
        <Field
          name="confirmPassword"
          as={TextField}
          label="Confirm Password"
          type="password"
          fullWidth
		  style={{backgroundColor:'white', borderRadius:10}}
          margin="normal"
          error={!!(touched.confirmPassword && errors.confirmPassword)}
          helperText={touched.confirmPassword && errors.confirmPassword}
        />
		<div style={{justifyContent: 'center', display: 'flex', marginTop:'4vh'}}>
		<Button type="submit" variant="contained" color="success">
            Register
          </Button>
		  </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          
          <div style={{ marginLeft: '10px', marginTop: '5px', textAlign:'center' }}>
            <div>
			<text style={{fontFamily:'Sans-Serif', fontSize:'21px', lineHeight:'28px'}}>	
              Already have an account?{' '}
			  
              <Link
                component="button"
                variant="body1"
                underline="always"
				style={{ fontSize: 'inherit' }}

                onClick={() => setIsLogin(true)}
              >
                Login here
              </Link>
			  </text>
            </div>
          </div>
        </div>
      </Form>
    )}
  </Formik>
  </div>
);

const LandingManager=({register,login, loadUser, isAuthenticated})=>{
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = React.useState(false);
  console.log(isAuthenticated)
  if (isAuthenticated) {
    console.log('111')
    navigate('/dashboard');
  }
	return (
		<div style={{background:'linear-gradient(to right, #74b1e0, #9666ba)', backgroundSize: 'cover', height:'100vh', overflow:'hidden'}}>
			<div style={{marginTop:'10vh'}}>
			
			
			<Container maxWidth="sm" style={{backgroundColor:'#e3eff7', borderRadius:30, paddingTop:'5vh', paddingBottom:'10vh'}}>
			<Typography variant="h4" align="center">
				{isLogin ? 'Login' : 'Register here'}
			</Typography>
			{isLogin ? <LoginForm setIsLogin={setIsLogin} login={login} /> : (
				<RegisterForm register={register} login={login} setIsLogin={setIsLogin} />
			)}
			</Container>
			</div>
			
		</div>
	)
}

LandingManager.propTypes = {
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { register, login, loadUser })(LandingManager);