import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../../store/user/singleUser';

export class AdminAccount extends React.Component {
    componentDidMount() {
        this.props.getAdmin(this.props.match.params.userId)
    }

    render() {
        const admin = this.props.admin;
        return (
            <div className="user-account">
                <h1>{admin.username}</h1>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        admin: state.singleUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAdmin: (id) => dispatch(fetchUser(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAccount);