import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Tabs, Tab, Container, Paper, Typography, Avatar, IconButton,Button, CircularProgress} from '@mui/material';
import {useNavigate } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Carousel from '../../utils/CommonComponents/Carousel';
import { getAllProducts } from '../../actions/productAction';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import AnotherCarousel from '../../utils/CommonComponents/AnotherCarousel';
import { clientLogoutAction } from '../../actions/clientAction';

const ClientDashboard=({isAuth, getAllProducts, product_data, loading,clientDetails, clientLogoutAction})=>{
	let navigate = useNavigate();
	const [newCategoryPreference, setNewCategoryPreference] = useState([]);
	const [newCustomerProductPref,setNewCustomerProductPref]=useState([])
	React.useEffect(()=>{
		if(!isAuth)
		{
			navigate('/')	
		}
	},[])
	React.useEffect(()=>{
		getAllProducts()
	
	},[])
	React.useEffect(()=>{
		if(clientDetails.categoryPreference) {
			const parsedCategoryPreference = JSON.parse(clientDetails.categoryPreference);
			setNewCategoryPreference(parsedCategoryPreference);
		  }
		

	},[])
	React.useEffect(()=>{
		if(clientDetails.productPreference){
			const productPrefCate=JSON.parse(clientDetails.productPreference)
			console.log(productPrefCate)
			console.log(product_data)
			const arr = product_data.filter((ele)=>productPrefCate.includes(ele.id))
			setNewCustomerProductPref(arr)
			
		}
	}, [clientDetails.productPreference, product_data])
	
	const ShowProductsInN = ({ product_data, n }) => {
		// Filter products that have category present in n array
		const productsToShow = product_data.filter((product) => n.includes(product.category));
	  
		return (
		  <div>
			{/* {productsToShow.map((product) => ( */}
			{productsToShow.length>=1 &&
			<div>
				<text style={{color:'white', fontSize:'30px', fontFamily:'serif',lineHeight:'38px', fontWeight:800}}>
          				{n}
		  			</text>
			  <AnotherCarousel items={productsToShow} type='Product' />
			  </div>
			}
			{/* ))} */}
		  </div>
		);
	  };
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
		//   logout()
		clientLogoutAction()
		 
      
			navigate('/')
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
	  onClick={()=>navigate('/editClientPage')}
    >
      { clientDetails ? clientDetails.name.charAt(0).toUpperCase() : ''}

    </Avatar>
      <Typography variant="h5" align="center">
        Welcome {clientDetails.name}
      </Typography>
    </Paper>
	  		<Container maxWidth="md">
	 			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom:'10px' }}>
	  				<text style={{color:'white', fontSize:'30px', fontFamily:'serif',lineHeight:'38px', fontWeight:800}}>
          				All products 
		  			</text>
              		
            	</div>
				{loading? 
					<CircularProgress/>:
						<div>
							{product_data.length>=1?
        	 					<AnotherCarousel items={product_data} type='Product' />:
			 						<div style={{color:'white', fontSize:'20px', fontFamily:'serif',lineHeight:'27px', fontWeight:600}}>
										There is no product data at the moment</div>
							}
			 			</div>
				}
			 {newCategoryPreference.length>=1 && newCategoryPreference.map((n)=>(
 				<ShowProductsInN product_data={product_data} n={n}/>
			 ))}
			 {loading? 
					<CircularProgress/>:
					<div>
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom:'10px' }}>
	  				<text style={{color:'white', fontSize:'30px', fontFamily:'serif',lineHeight:'38px', fontWeight:800}}>
          				Your preferences 
		  			</text>
              		
            	</div>
						<div>
							{newCustomerProductPref.length>=1?
        	 					<AnotherCarousel items={newCustomerProductPref} type='Product' />:
			 						<div style={{color:'white', fontSize:'20px', fontFamily:'serif',lineHeight:'27px', fontWeight:600}}>
										There is no product data at the moment</div>
							}
			 			</div>
						</div>
				}
               
			
			
			<div style={{height:'40px'}}></div>
		
    </Container>
	</div>
	</Container>
  </div>
)
}
ClientDashboard.propTypes={
	isAuth:PropTypes.bool,
	getAllProducts:PropTypes.func.isRequired,
	clientLogoutAction:PropTypes.func.isRequired,
	loading:PropTypes.bool.isRequired,
}
const mapStateToProps=state=>({
	isAuth:state.customerClient.isAuth,
	product_data:state.product.product_data,
	loading:state.product.loading,
	clientDetails:state.customerClient.clientDetails
	
})
export default connect(mapStateToProps, {getAllProducts, clientLogoutAction})(ClientDashboard)