import React, { Component } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap';
import TradeForm from './TradeForm'

const position = 1;
const contract_size = 100;

function calculateProfitLoss(underlyingPrice, trades) {
    var profitLoss = 0
    for (const [, leg] of trades.entries()) {
        var _strikePrice = leg.strikePrice;
        var _premium = leg.price;

        // calculate profit or loss
        var _profitLoss = 0;
        if (leg.tradeType === 'Call') {
            _profitLoss = Math.max((underlyingPrice - _strikePrice), 0) - _premium;
        } else if (leg.tradeType === 'Put') {
            _profitLoss = Math.max((_strikePrice - underlyingPrice), 0) - _premium;
        }

        // calculate long short position
        if (leg.buySell === "Sell") {
            _profitLoss = -_profitLoss;
        }
        profitLoss = profitLoss + _profitLoss * position * contract_size;
    }
    return profitLoss;
}

const deleteStyle={
    cursor: "pointer"
}

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trades: [],
            strikePrices: [0]
        };
    }

    addTrades = addTrade => {
        var _strikePrices = [addTrade.strikePrice, ...this.state.strikePrices]
        _strikePrices.sort(function (a, b) { return a - b });
        this.setState(state => ({
            trades: [addTrade, ...state.trades],
            strikePrices: _strikePrices
        }));
    }
    handleDelete = deleteTrade => {
        this.setState(state => ({
            trades: state.trades.filter(trade => trade.id !== deleteTrade.id),
            strikePrices: state.strikePrices.filter(strikePrice => strikePrice !== deleteTrade.strikePrice)
        }));
    }
    calculateProfitLoss = leg => {

    }

    render() {
        let trades = this.state.trades;
        var profitLoss_list = [];
        var strikePrice_list = this.state.strikePrices;
        var lastVal = strikePrice_list[strikePrice_list.length - 1] + 1;
        strikePrice_list = [...strikePrice_list, lastVal];
        for (const [, underlyingPrice] of strikePrice_list.entries()) {
            var profitLoss = calculateProfitLoss(underlyingPrice, trades);
            profitLoss_list = [profitLoss, ...profitLoss_list];
        }
        var inf_price_val = profitLoss_list[0];
        var max_strikeprice_val = profitLoss_list[1];
        profitLoss_list.shift();
        // max profit
        var max_profit = 0;
        if (inf_price_val > max_strikeprice_val) {
            max_profit = Number.POSITIVE_INFINITY;
        } else {
            max_profit = Math.max.apply(null, profitLoss_list);
        }
        // max loss
        var max_loss = 0;
        var warning_flag = false;
        if (inf_price_val < max_strikeprice_val) {
            max_loss = Number.NEGATIVE_INFINITY;
            warning_flag = true;
        } else {
            max_loss = Math.min.apply(null, profitLoss_list);
            if (max_loss < -10000) {
                warning_flag = true;
            }
        }
        var max_profit_str = "";
        var max_loss_str = "";
        if (max_profit<0){
            max_profit_str = '-$'+Math.abs(max_profit).toFixed(2);
        }else{
            max_profit_str = '$'+max_profit.toFixed(2);
        }
        if(max_loss<0){
            max_loss_str = '-$'+Math.abs(max_loss).toFixed(2);
        }else{
            max_loss_str = '$'+max_loss.toFixed(2);
        }
        console.log(strikePrice_list)

        return (
            <Container>
                <Row style={{margin:'50px', minHeight: '480px'}}>
                    <Col>
                        <TradeForm onSubmit={this.addTrades} />
                    </Col>
                    <Col>
                        <Table>
                            <tbody>
                                {trades.map(trade => (
                                    <tr key={trade.id}>
                                        <td>${trade.strikePrice} {trade.tradeType}</td>
                                        <td>
                                            {trade.buySell === 'Sell' ? '-$' + trade.price.toFixed(2) : '$' + trade.price.toFixed(2)}
                                        </td>
                                        <td style={deleteStyle} onClick={() => this.handleDelete(trade)}>x</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        

                        <Table style={{ textAlign: 'left' }}>
                            <tbody>
                                <tr>
                                    <td>Max profit:</td>
                                    <td>{max_profit_str}</td>
                                </tr>
                                <tr>
                                    <td>Max loss:</td>
                                    <td>{max_loss_str}</td>
                                </tr>
                            </tbody>
                        </Table>
                        {warning_flag && <div>Warning: system suggest not to trade. Exceed max loss of $10000.</div>}

                    </Col>
                </Row>
            </Container>

        )
    }

}
