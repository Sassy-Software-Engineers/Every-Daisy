import React from 'react'
// import { connect } from 'react-redux'

export class Cart extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            // is cart item is greater than 0 ? (map all products in cart) : (return empty cart);
            <div className="cart-component">
                <h1>Shopping Cart</h1>
                    <p>Go pick some plants that won't unalive your pets :/</p>
            </div>
        )
    }
}

// const mapState = (state) => {
//     return {
//         // products: state.allProducts,
//     };
// };
  
// const mapDispatch = (dispatch) => {
//     return {
       
//     };
// };
  
// export default connect(mapState, mapDispatch)(Cart);