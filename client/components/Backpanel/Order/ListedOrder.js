import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOrders, deleteOrder } from '../../../store/orders/allOrders';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';

const ListedOrder = (props) => {
  const order = props.order;
  return (
    <div>
      <Card className="card">
        <Link className="card-title" to={`/orders/${order.id}`}>
          <Card.Title>{`Order no. ${order.id}`}</Card.Title>
        </Link>
        <Card.Body>
          {order.user ? <small>{order.user.username}</small> : ''}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ListedOrder;
