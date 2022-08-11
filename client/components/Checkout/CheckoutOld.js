import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, setOrder } from '../../store/cart/cart';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      phoneNumber: '',
      email: '',
      street: '',
      apartment: '',
      city: '',
      state: '',
      zip: '',
      nameOnCard: '',
      cardNumber: '',
      secureCode: '',
      expiration: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount() {
    this.props.fetchCart();
  }

  render() {
    let cart = this.props.cart;
    let cartItems = cart.cartItems || [];
    let totalPrice = cartItems
      ? cartItems.reduce(
          (accum, cur) => accum + +cur.product.price * cur.quantity,
          0
        )
      : null;
    const { handleSubmit, handleChange } = this;
    const {
      name,
      phoneNumber,
      email,
      street,
      apartment,
      city,
      state,
      zip,
      nameOnCard,
      cardNumber,
      secureCode,
      expiration,
    } = this.state;

    return (
      <Form className="checkout-form">
        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="formBasicName">
            <Form.Control
              type="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={name}
            />
            <Form.Text className="text-muted">Required</Form.Text>
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="phone-number">
            <Form.Control
              type="phone-number"
              placeholder="Phone Number"
              onChange={handleChange}
              value={phoneNumber}
            />
            <Form.Text className="text-muted">Required</Form.Text>
          </Form.Group>

          <Form.Group as={Col} className="mb-3" controlId="phone-number">
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={email}
            />
            <Form.Text className="text-muted">Required</Form.Text>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="ShippingInformation">
            <Form.Label>Shipping Information</Form.Label>
            <Form.Control
              type="street"
              placeholder="Street Address"
              onChange={handleChange}
              value={street}
            />
            <Form.Text className="text-muted">Required</Form.Text>
            <Form.Control
              type="apt"
              placeholder="Apartment or Floor"
              onChange={handleChange}
              value={apartment}
            />
            <Form.Control
              type="city"
              placeholder="City"
              onChange={handleChange}
              value={city}
            />
            <Form.Text className="text-muted">Required</Form.Text>
            <Form.Control
              type="state"
              placeholder="State"
              onChange={handleChange}
              value={state}
            />
            <Form.Text className="text-muted">Required</Form.Text>
            <Form.Control
              type="zipcode"
              placeholder="Zip Code"
              onChange={handleChange}
              value={zip}
            />
            <Form.Text className="text-muted">Required</Form.Text>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="CreditCardInfo">
            <Form.Label>Credit Card Information</Form.Label>
            <Form.Control
              type="nameOnCard"
              placeholder="Cardholder Name"
              onChange={handleChange}
              value={nameOnCard}
            />
            <Form.Text className="text-muted">Required</Form.Text>
            <Form.Control
              type="cardNumber"
              placeholder="Card Number"
              onChange={handleChange}
              value={cardNumber}
            />
            <Form.Text className="text-muted">Required</Form.Text>
            <Form.Control
              type="secureCode"
              placeholder="PIN Number"
              onChange={handleChange}
              value={secureCode}
            />
            <Form.Text className="text-muted">Required</Form.Text>
            <Form.Control
              type="expiration"
              placeholder="Expiration Date MM/YY"
              onChange={handleChange}
              value={expiration}
            />
            <Form.Text className="text-muted">Required</Form.Text>
          </Form.Group>
        </Row>
      </Form>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    secret: state.checkout,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    setOrder: () => dispatch(setOrder()),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
