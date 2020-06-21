import React, { Component } from 'react'
import { Button, Form, Col} from 'react-bootstrap';
import shortid from "shortid"

const formStyle={
    textAlign: 'left',
    margin: '10px'
}

export default class TradeForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            strikePrice: '',
            buySell: '',
            tradeType: '',
            price: ''
        };
    }

    handleChange = event =>{
        const name = event.target.name;
        var value = event.target.value
        this.setState({
            [name]:value
        })
    }

	handleSubmit = event => {
		// alert(`${this.state.strikePrice} ${this.state.tradeType} ${this.state.price}`)
        event.preventDefault()
        this.props.onSubmit({
            id:shortid.generate(),
            strikePrice: parseFloat(this.state.strikePrice),
            buySell: this.state.buySell,
            tradeType: this.state.tradeType,
            price: parseFloat(this.state.price)
        });
        this.setState({
            strikePrice: '',
            buySell: '',
            tradeType: '',
            price: ''
        });
	};

	render() {
		const { strikePrice, buySell, tradeType, price} = this.state
		return (
                <Form onSubmit={this.handleSubmit} style={formStyle}>
                    <Form.Group controlId="formGridStrikePrice">
                    <Form.Label>Strike Price</Form.Label>
                    <Form.Control type='text'
                                name='strikePrice'
                                value={strikePrice}
                                onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formGridTradeType">
                    <Form.Label>Trade Type</Form.Label>
                    <Form.Row>
                        <Col>
                        <Form.Control as="select" name='buySell' value={buySell} onChange={this.handleChange}>
                            <option>Choose</option>
                            <option value="Buy">Buy</option>
                            <option value='Sell'>Sell</option>
                        </Form.Control>
                        </Col>
                        <Col>
                        <Form.Control as="select" name='tradeType' value={tradeType} onChange={this.handleChange}>
                            <option>Choose</option>
                            <option value="Call">Call</option>
                            <option value='Put'>Put</option>
                        </Form.Control>
                        </Col>
                        
                    </Form.Row>
                    
                    </Form.Group>

                    <Form.Group controlId="formGridPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='text'
                                name='price'
                                value={price}
                                onChange={this.handleChange}/>
                    </Form.Group>
                    <div>Contract size: 100</div><br />
                    <Button variant="primary" type="submit">Add</Button>          
                </Form>
		)
	}
}