import React from 'react';
import { connect } from 'react-redux';

export class AddReview extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            content: "",
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addReview(this.state)
        this.setState({
            title: "",
            content: "",
        });
    }

    render() {
        const { title, content } = this.state;
        const { handleSubmit, handleChange } = this;
        return (
            <div>
                <form id="ProductReview-form" onSubmit={handleSubmit}>
                    <label >Title:</label>
                    <input type="text" name="title" value={title} onChange={handleChange} required />

                    <label >Review:</label>
                    <input type="text" name="review" value={content} onChange={handleChange} required />

                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        addReview: (review) => dispatch(addNewReview(review))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
