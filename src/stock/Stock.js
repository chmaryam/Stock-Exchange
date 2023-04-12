import React from "react";
import Plot from 'react-plotly.js';
import Select from 'react-select'
import {Container ,Button} from "react-bootstrap"


class Stock extends React.Component {
   constructor (props){
    super(props)
    this.state = {
        stockSymbol: 'AMZN',
        stockChartXValues: [],
        stockChartYValues: [],
    }
   }

    componentDidMount (){
        this.fetchStock();

     }

     fetchStock(){
    const pointerToThis = this;
    console.log(pointerToThis);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

       const API_KEY = '7URDWPHHFLX445FN';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.state.stockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
        
       fetch(API_Call) 
            .then(
                function (response) {
                    return response.json();

                }
            )
            .then(
                function (data){
                    console.log(data);
                    for(var key in data['Time Series (Daily)']){
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)']
                        [key]['1. open']);

                    }
                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction,
                    });
                }
            )
     }

    companies = [
        {value: 'IBM', label: 'IBM'},
        {value: 'AMZN', label: 'AMZN'},
        {value: 'AAPL', label: 'AAPL'},
        {value: 'MSFT', label: 'MSFT'},
    ]

    handleStockChange = (e) => {
        this.setState({
          stockSymbol: e.value,
          stockChartXValues: [],
          stockChartYValues: [],
        }, () => {
          this.fetchStock();
        })
      }

    render () {
        return(
         <div>
            <h1>Stock Market</h1>
            
            <Select placeholder={this.stockSymbol} options={this.companies} onChange={this.handleStockChange}/>

        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{width: 720, height: 440, title: `Stock Chart for ${this.state.stockSymbol}`}}
        />
        <Button variant="primary">Buy</Button>
        </div>
        )
    }
}
export default Stock;