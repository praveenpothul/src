import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea,Button } from '@mui/material';

import FinTech from './../../images/FinTech.jpg';
import Agriculture from './../../images/Agriculture.jpg'
import AI from './../../images/AI.jpg'
import Automobile from './../../images/Automobile.jpg'
import CloudComputing from './../../images/CloudComputing.jpg'
import Construction from './../../images/Construction.jpg'
import Robotics from './../../images/Robotics.jpg'
import QuantumComputing from './../../images/QuantumComputing.jpg'
import SpaceTechnology from './../../images/SpaceTechnology.jpg'
import VR from './../../images/VR.jpg'
import MediTech from './../../images/MediTech.jpg'

import { Container, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getSingleProducts, deleteProductById } from '../../actions/productAction';
import { clientPreferredProdAction } from '../../actions/clientAction';

const ShowCustomer = ({ getSingleProducts, single_product_data, loading, deleteProductById, clientDetails, clientPreferredProdAction}) => {
  const navigate = useNavigate();
  const { id } = useParams();
console.log(single_product_data)
  useEffect(() => {
    getSingleProducts({ id });
  }, []);

  const deleteFunc = () => {
    deleteProductById({ id: single_product_data.id });
    navigate('/dashboard');
  };
  const imageRendererFunc=(category)=>{

    switch(category)
    {
      case 'FinTech': 
      return FinTech
      case 'Agriculture':
      return Agriculture
      case 'AI':
      return AI
      case 'VR':
      return VR
      case 'Automobile':
      return Automobile
      case 'CloudComputing':
      return CloudComputing
      case 'Construction':
      return Construction
      case 'Robotics':
      return Robotics
      case 'SpaceTechnology':
      return SpaceTechnology
      case 'MediTech':
      return MediTech
      case 'QuantumComputing':
      return QuantumComputing
      default: 
      return Agriculture
    }

  }
  const handlePreferredProd=()=>{
    console.log(single_product_data)
    console.log(clientDetails)
    const values={preferredProductId:single_product_data.id, previousPreference:clientDetails.productPreference, customerId:clientDetails.id}
    clientPreferredProdAction({values})
    setTimeout(function() {
      
      navigate('/dashboard')
    }, 2000);
  }

  return (
    <div style={{ background: 'linear-gradient(to right, #74b1e0, #9666ba)', backgroundSize: 'cover', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {loading ? (
        <CircularProgress />
      ) : (
		<div style={{fontSize:'34px', color:'#FFFF', fontFamily:'serif', lineHeight:'38px'}}>
			Product details 
        <Card sx={{ display: 'flex', maxWidth: 700 }}>
          <CardMedia
            component="img"
            height="500"
            image={imageRendererFunc(single_product_data.category)}
            alt="green iguana"
            sx={{ flex: 1 }}
          />
          <CardContent sm={{ flex: 4}}>
			
            <Typography gutterBottom variant="h3" component="div" >
              {single_product_data.name}
            </Typography>
			
			<Typography variant="body1" color="text.primary">
			Description
			</Typography>
            <Typography variant="body3" color="text.secondary">
             {single_product_data.description}
            </Typography>
			<Typography variant="body1" color="text.primary" style={{marginTop:'20px'}}>
			Financial Type
			</Typography>
            <Typography variant="body3" color="text.secondary">
             {single_product_data.financialType}
            </Typography>
			<Typography variant="body1" color="text.primary" style={{marginTop:'20px'}}>
			Pitching Amount
			</Typography>
            <Typography variant="body3" color="text.secondary">
             {single_product_data.pitchingAmount}
            </Typography>
            <div>
            <Button type="submit" variant="contained" color="primary" onClick={()=>handlePreferredProd()}>
            Preferred Product
          </Button>
          </div>
          </CardContent>
        </Card>
        
		</div>
      )}
    </div>
  );
};

ShowCustomer.propTypes = {
  getSingleProducts: PropTypes.func.isRequired,
  deleteProductById: PropTypes.func.isRequired,
  clientPreferredProdAction:PropTypes.func.isRequired,
  clientDetails:PropTypes.object.isRequired,
  single_product_data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  single_product_data: state.product.single_product_data,
  clientDetails:state.customerClient.clientDetails,
  loading: state.product.loading,
});

export default connect(mapStateToProps, { getSingleProducts, deleteProductById, clientPreferredProdAction })(ShowCustomer);
