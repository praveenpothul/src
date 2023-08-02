import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from '@mui/material';

const AlertComp = ({ errorMessage }) => {
  return (
    <div>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {/* Rest of the component's content */}
    </div>
  );
};

AlertComp.propTypes = {
  errorMessage: PropTypes.string,
};

const mapStateToProps = state => ({
  errorMessage: state.alert.errorMessage,
});

export default connect(mapStateToProps)(AlertComp);
