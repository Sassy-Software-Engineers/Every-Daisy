import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ListedOrder } from './ListedOrder';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class OrderList extends React.Component {
    componentDidMount() {

    }

    render() {
        const { orders } = this.props;
        return (
            <div className='order-list-block'>
                <div className='list-controls'>
                    <div className='status-selector'>
                    </div>
                    <div className='user-selector'>
                    </div>
                </div>
                <div className='order-list'>
                {
                    orders.map(order => (<ListedOrder 
                                            key={`${order.status + order.id}`} 
                                            order={order}
                                         />))
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

    };
};

export default connect(mapState, mapDispatch)(OrderList);