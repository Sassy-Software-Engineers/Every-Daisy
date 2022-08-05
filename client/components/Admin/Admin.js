import React from 'react';
import { Link } from 'react-router-dom';


export class Admin extends React.Component {
    render() {
        return(
            <div className="admin-component">
                <h1>Admin</h1>
                <ul className="admin-functions">
                    <Link to={`/users/${user.id}`}>Your Information</Link>
                    <Link to={'/users_list'}>User List</Link>
                    <Link to={'/products_list'}>Product List</Link>
                    <Link to={'/orders_list'}>Order List</Link>
                </ul>
            </div>
        )
    }
}

export default Admin;