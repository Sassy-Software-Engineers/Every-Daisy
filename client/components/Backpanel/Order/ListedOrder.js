import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ListedOrder = (props) => {
    const order = props.order;
    return (
        <div>
        <Card className="card">
            <Link className="card-title" to={`/orders/${order.id}`}>
              <Card.Title>{`Order no. ${order.id}`}</Card.Title>
            </Link>
            <Card.Body>
                      <small>{order.user.username}</small>{' '}
            </Card.Body>
        </Card>
        </div>
    );
};

export default ListedOrder;