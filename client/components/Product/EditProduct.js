import React from "react";
import { connect } from "react-redux";
import { updateProduct } from "../store/singleProduct"

export class EditProduct extends React.Component {
    constructor () {
        super();
        this.state = {
            title: "",
            description: "",
            price: "",
            quantity: "",
            image: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.product.id !== this.props.product.id) {
            this.setState({
                title: this.props.product.title || "",
                description: this.props.product.description || "",
                price: this.props.product.price || "",
                quantity: this.props.product.quantity || "",
                image: this.props.product.image || "",
            })
        }
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.editProduct({...this.props.product, ...this.state});
    }

    render() {
        const { handleChange, handleSubmit } = this;
        const { title, description, price, quantity, image } = this.state;
        return (
            <div>
                <form id="editProduct-form" onSubmit={handleSubmit}>
                    <label >Title:</label>
                    <input type="text" name="title" value={title} onChange={handleChange} required />

                    <label >Description:</label>
                    <input type="text" name="description" value={description} onChange={handleChange} required />

                    <label >Price:</label>
                    <input type="text" name="price" value={price} onChange={handleChange} required />

                    <label >Quantity:</label>
                    <input type="text" name="quantity" value={quantity} onChange={handleChange} required />

                    <label >Image:</label>
                    <input type="text" name="image" value={image} onChange={handleChange} />

                    <button type="submit">Submit</button>
                </form>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editProduct: (product) => dispatch(updateProduct(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);