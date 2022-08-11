import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ListedOrder from './ListedOrder';
import { fetchOrders, deleteOrder } from '../../../store/orders/allOrders';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class OrderList extends React.Component {
    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        const orders = this.props.orders || [];
        return (
            <div className='order-list-block'>
                <div className='list-controls'>
                    <div className='status-selector'>
                    </div>
                    <div className='user-selector'>
                    </div>
                </div>
                <div className='order-list'>
                { orders.map(order => {
                    return (<ListedOrder 
                              key={`${order.status + order.id}`} 
                              order={order}
                            />)})
                }
                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        orders: state.orders,
    };
};

const mapDispatch = (dispatch, { history }) => {
    return {
        fetchOrders: () => dispatch(fetchOrders()),
        deleteOrder: (id) => dispatch(deleteOrder(id, history))
    };
};

export default connect(mapState, mapDispatch)(OrderList);