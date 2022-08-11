import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OrderList from './Order/OrderList';

export class BPIndex extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <OrderList />    
        );
    }
}

export default BPIndex;