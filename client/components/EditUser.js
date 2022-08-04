import React from "react";
import { connect } from "react-redux";
import { deleteUser } from '../store/useres';
import { fetchUser, setUser, updateUser } from '../store/singleUser';

export class EditUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const user = { ...this.props.user };
        this.setState({
            email: user.email || '',
            password: '',
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.updateUser({ ...this.state, id: this.props.user.id });
    }

    render() {
        const { handleSubmit, handleChange } = this;
        const { email, password } = this.state;
        return (
            <div className = 'edit-user-form'>
                <form id = 'edit-user' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email: </label>
                        <input type='text' name= 'email' onChange={handleChange} value={email}/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password: </label>
                        <input type='password' name= 'password' onChange={handleChange} value={password} />
                    </div>
                    <div className='form-buttons'>
                        <button className='submit' type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapState = ({ user }) => ({ user });

const mapDispatch = (dispatch, { history }) => ({
    updateUser: (user) => dispatch(updateUser(user, history)),
    deleteUser: (user) => dispatch(deleteUser(user, history)),
    fetchUser: (id) => dispatch(fetchUser(id)),
    clearUser: () => dispatch(setUser({})),
});

export default connect(mapState, mapDispatch)(EditUser);