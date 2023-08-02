import { combineReducers } from 'redux';
import auth from './auth';
import product from './product';
import clients from './clients';
import customerClient from './customerClient';
import alert from './alert';
export default combineReducers({
    alert,
    auth,
    product,
    clients,
    customerClient
});