import React from 'react';

class Confirmation extends React.Component {
  render() {
    return (
      <div className="confirmation-container">
        <h1 style={{ textAlign: 'center' }}> Thank you for your order! </h1>
        <div className="confirmation-div">
          <h1 style={{ textAlign: 'center' }}>
            YOUR ORDER WAS PLACED SUCCESSFULLY
          </h1>
        </div>
        <h3 style={{ textAlign: 'center' }}>
          Your Order Number: {Math.floor(Math.random() * Math.floor(9999))}
        </h3>
      </div>
    );
  }
}

export default Confirmation;
