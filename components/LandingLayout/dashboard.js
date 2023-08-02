import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Tabs, Tab, Container, Paper, Typography, Avatar, IconButton,Button, CircularProgress} from '@mui/material';
import {useNavigate } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Carousel from '../../utils/CommonComponents/Carousel';
import { getAllProducts } from '../../actions/productAction';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';

import { logout } from '../../actions/auth';
import { getAllClients } from '../../actions/clientAction';
const Dashboard=({isAuthenticated, logout, user, getAllProducts, product_data, loading, getAllClients, loadingClient, client_data})=>{
	let navigate = useNavigate();
	// console.log(user)
	// Sample data for "Clients" and "Products"
	const clientsData = [
		{ id: 1, name: 'Client A', image: '/images/FinTech.jpg' },
		{ id: 2, name: 'Client B', image: 'path/to/client-b.jpg' },
		{ id: 3, name: 'Client C', image: 'path/to/client-b.jpg' },
		{ id: 4, name: 'Client D', image: 'path/to/client-b.jpg' },
		{ id: 5, name: 'Client E', image: 'path/to/client-b.jpg' },
		{ id: 6, name: 'Client F', image: 'path/to/client-b.jpg' },
		// Add more client data objects as needed
	  ];
	
	  const productsData = [
		{ id: 1, name: 'Product 1', image: 'path/to/product-1.jpg' },
		{ id: 2, name: 'Product 2', image: 'path/to/product-2.jpg' },
		// Add more product data objects as needed
	  ];
	const [selectedTab, setSelectedTab] = React.useState(0);
	React.useEffect(() => {
		if (!isAuthenticated) {
		  navigate('/');
		}
	  }, [isAuthenticated, navigate]);

	  const handleTabChange = (event, newValue) => {
		setSelectedTab(newValue);
	  };

	React.useEffect(()=>{
		getAllProducts()
		getAllClients()
	},[])
return(
	<div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px'}}>
	<Container maxWidth="md">
		<div style={{backgroundColor:'#4a4949', borderRadius:15}}>
		<Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', position:'relative'}}>
      
      <IconButton
        style={{
		 left:'90%',
		  position:'sticky',
          zIndex: 1,
          backgroundColor: '#d5cece',
        }}
        onClick={() => {
          // Add logout functionality here
		  logout()
		  setTimeout(function() {
      
			navigate('/')
		  }, 2000);
        }}
      >
        <LogoutIcon style={{color:'red'}}/>
      </IconButton>

      <Avatar
      alt="User Photo"
      sx={{
        width: 150,
        height: 150,
        margin: '0 auto',
        marginBottom: '20px',
        fontSize: '4rem', // Adjust the font size as needed
        backgroundColor: '#f0f0f0', // Customize the background color
        color: '#333', // Customize the text color
      }}
    >
      { user ? user.charAt(0).toUpperCase() : ''}
    </Avatar>
      <Typography variant="h5" align="center">
        Welcome, {user}
      </Typography>
    </Paper>
	  		<Container maxWidth="md">
	 			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom:'10px' }}>
	  				<text style={{color:'white', fontSize:'30px', fontFamily:'serif',lineHeight:'38px', fontWeight:800}}>
          				Clients
		  			</text>
              		<AddCircleOutlineOutlinedIcon style={{ fontSize: 30, color: 'white', cursor: 'pointer', marginRight:10 }} onClick={()=>navigate('/createClient')}/>
            	</div>
				{loading?<CircularProgress/>:
				<div>
				{client_data.length>=1?
        	<Carousel items={client_data} type='Client'  />:<div style={{color:'white', fontSize:'20px', fontFamily:'serif',lineHeight:'27px', fontWeight:600}}>There is no client data at the moment</div>}
			</div>}

				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom:'10px', marginTop:'30px'}}>
	  				<text style={{color:'white', fontSize:'30px', fontFamily:'serif',lineHeight:'38px', fontWeight:800}}>
          				Products
		  			</text>
              		<AddCircleOutlineOutlinedIcon style={{ fontSize: 30, color: 'white', cursor: 'pointer', marginRight:10 }} onClick={()=>navigate('/createProduct')}/>
            	</div>
				{loading? <CircularProgress/>:
				<div>
			{product_data.length>=1?
        	 <Carousel items={product_data} type='Product' />:<div style={{color:'white', fontSize:'20px', fontFamily:'serif',lineHeight:'27px', fontWeight:600}}>There is no product data at the moment</div>}
			 </div>}
			
			<div style={{height:'40px'}}></div>
		
    </Container>
	</div>
	  
	</Container>
  </div>
)
}
Dashboard.propTypes={
	isAuthenticated:PropTypes.bool,
	logout:PropTypes.func.isRequired,
	getAllProducts:PropTypes.func.isRequired,
	getAllClients:PropTypes.func.isRequired,
	loading:PropTypes.bool.isRequired,
	loadingClient:PropTypes.bool.isRequired
}
const mapStateToProps=state=>({
	isAuthenticated:state.auth.isAuthenticated,
	user:state.auth.user,
	product_data:state.product.product_data,
	client_data:state.clients.client_data,
	loading:state.product.loading,
	loadingClient:state.clients.loadingClient
})
export default connect(mapStateToProps, {logout, getAllProducts, getAllClients})(Dashboard)