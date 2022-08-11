import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const ListedOrder = (props) => {
    const { order } = props;
    return (
        <Card className="card">
            <Link className="card-title" to={`/orders/${order.id}`}>
              <Card.Title>{`Order no. ${order.id}`}</Card.Title>
            </Link>
            <Card.Body>
              
              <small>${order.total}</small>{' '}
            </Card.Body>
        </Card>
    );
};

export default ListedOrder;