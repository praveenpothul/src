import React from 'react';
import { TextField, Button, Container, Typography, Link, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { register, login, loadUser } from '../../actions/auth';






const Home = ({ register, login, isAuthenticated, loadUser, userType, isAuth }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = React.useState(false);
  console.log(isAuthenticated)
  React.useEffect(() => {
    loadUser();
  }, []);

  React.useEffect(()=>{
    if(isAuthenticated)
    {
      
      navigate('/dashboard')
      
    }
    if(isAuth)
    {
      navigate('/clientDashboard')
    }

  },[navigate, isAuthenticated])

 

  return (
    <div style={{background: 'linear-gradient(to right, #74b1e0, #9666ba)', backgroundSize: 'cover', height:'100vh', overflow:'hidden'}}>
    {/* <Container maxWidth="sm" style={{backgroundColor:'#107bbb', width:'70vh', borderRadius:15}} > */}
       <div style={{marginTop:'10vh', textAlign:'center' }}>
        <Typography variant="h1" gutterBottom color={'white'}>
          Welcome
        </Typography>
        <Typography variant="h5" gutterBottom color={'white'}>
          To
        </Typography>
        <Typography variant="h2" gutterBottom color={'white'}>
          Wealth Management System 
        </Typography>
        <Typography variant="h6" gutterBottom color={'white'}> 
          Choose your role to get started
        </Typography>
        <Box mt={5} display="flex" justifyContent="center">
      {/* Add the buttons in the same parent container */}
      <Button variant="contained" color="primary" size="large" onClick={()=>navigate('/landingManager')}>
        I am Relationship Manager
      </Button>
      <Box ml={2}>
        {/* Adding some space between buttons */}
        <Button variant="contained" color="secondary" size="large" onClick={()=>navigate('/clientLanding')}>
          I am Client
        </Button>
      </Box>
      </Box>
        
      </div>
    {/* </Container> */}
    </div>
  );
  
};

Home.propTypes = {
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isAuth:PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuth:state.customerClient.isAuth,
  isAuthenticated: state.auth.isAuthenticated,
  userType:state.auth.userType
});

export default connect(mapStateToProps, { register, login, loadUser })(Home);
