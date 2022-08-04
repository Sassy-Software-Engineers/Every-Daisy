import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { createUser } from '../store/allUsers';

export class NewUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createUser({ ...this.state });
    }

    render() {
        const { handleSubmit, handleChange } = this;
        const { email, password } = this.state;
        return (
            <div className='new-user-block'>
                <Link to='/'>Back</Link>
                <form id = 'new-user-form' onSubmit={handleSubmit}>
                    <h3>New Campus:</h3>
                    <div>
                        <label htmlFor='email'>Email: </label>
                        <input type='text' name= 'email' onChange={handleChange} value={email}/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password: </label>
                        <input type='password' name= 'password' onChange={handleChange} value={password} />
                    </div>
                    <div className='form-buttons'>
                        <button type='submit'>Submit</button>
                        <Link to='/'><button>Cancel</button></Link>
                    </div>
                    
                </form>
            </div>
        );
    }
}

const mapDispatch = (dispatch, { history }) => ({
    createUser: (user) => dispatch(createUser(user, history)),
});
 
export default connect(null, mapDispatch)(NewUser);