'use strict';

import React from 'react';
import Plot from 'react-plotly.js';
import AsyncSelect from 'react-select/async';
// import Card from './Card.js';

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const styles = {
  input: styles => ({ ...styles, ...dot() }),
  placeholder: styles => ({ ...styles, ...dot() }),
  control: styles => ({
    ...styles,
    width: '50%',
    margin: '0 auto'
  }),
  option: styles => ({
    ...styles,
    // borderBottom: '1px dotted black',
    margin: '0 auto'
  }),
  menu: styles => ({
    ...styles,
    margin: '0 auto'
  })
}

class Stock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartOpenValues: [],
      stockChartLowValues: [],
      stockChartHighValues: [],
      stockSymbol: '',
      API: ''
    }
    this.stockSymbolRef = React.createRef();
  }

  componentDidMount() {
  }

  onChange = async (selectedStockSymbol) => {
    this.setState({
      stockSymbol: selectedStockSymbol.value
    }, () => this.fetchStock(this.state.stockSymbol));
  }


  loadOptions = async (inputText, callBack) => {
    const API_KEY = 'HGJWFG4N8AQ66ICD';
    let SEARCH_API = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputText}&apikey=${API_KEY}`;
    this.setState({
      API: SEARCH_API
    })
    /*
     * Use the following url to view the output of the response
     * https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=ACN&apikey=HGJWFG4N8AQ66ICD
     */
    let arr = [];

    await fetch(SEARCH_API)
      .then(
        function (response) {
          return response.json();
        }
      )
      .then(
        function (data) {
          for (var key in data['bestMatches']) {
            let name = data['bestMatches'][key]['2. name'];
            let symbol = data['bestMatches'][key]['1. symbol'];
            arr.push({
              label: '(' + symbol + ') ' + name,
              value: symbol
            })
          }
        }
      )
    callBack(arr);
  }

  fetchStock = async (StockSymbol) => {
    const pointerToThis = this;
    const API_KEY = 'HGJWFG4N8AQ66ICD';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.state.stockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    this.setState({
      API: API_Call
    })
    /*
     * Use the following url to view the output of the response
     * https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AAPL&outputsize=compact&apikey=HGJWFG4N8AQ66ICD
     */

    let stockChartXValuesFunction = [];
    let stockChartOpenValuesFunction = [];
    let stockChartLowValuesFunction = [];
    let stockChartHighValuesFunction = [];

    await fetch(API_Call)
      .then(
        function (response) {
          return response.json();
        }
      )
      .then(
        function (data) {

          for (var key in data['Time Series (Daily)']) {
            stockChartXValuesFunction.push(key);
            stockChartOpenValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
            stockChartHighValuesFunction.push(data['Time Series (Daily)'][key]['2. high']);
            stockChartLowValuesFunction.push(data['Time Series (Daily)'][key]['3. low']);
          }

          console.log(stockChartXValuesFunction);

          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartOpenValues: stockChartOpenValuesFunction,
            stockChartLowValues: stockChartLowValuesFunction,
            stockChartHighValues: stockChartHighValuesFunction
          })

        }
      )
    this.render();
  }

  handleInputChange = async (event) => {
    this.setState({
      stockSymbol: event.target.value
    })
    this.fetchStock(this.state.stockSymbol);
  }

  render() {

    const { stockSymbol, API } = this.state;

    return (
      <div className="stocks-body">
        
        <br /><br />
        <h1>Stock Symbol: {stockSymbol} </h1>
        {/* <p>Current API: {API}</p> */}

        <AsyncSelect
          cacheOptions
          maxMenuHeight={200}
          onChange={this.onChange}
          value={this.state.stockSymbol}
          placeholder={'Stock Symbol (e.g. AMZN)'}
          theme={theme => ({
            ...theme,
            borderRadius: 2,
            colors: {
              ...theme.colors,
              primary25: 'lightblue',
              primary: 'black',
            },
          })}
          styles={styles}
          loadOptions={this.loadOptions}
        />

        <Plot
          useResizeHandler={true}
          data={[
            {
              name: this.state.stockSymbol + ' Open',
              x: this.state.stockChartXValues,
              y: this.state.stockChartOpenValues,
              type: 'scatter',
              mode: 'lines',
              marker: { color: '#7F7F7F' },
            },
            {
              name: this.state.stockSymbol + ' High',
              x: this.state.stockChartXValues,
              y: this.state.stockChartHighValues,
              type: 'scatter',
              mode: 'lines',
              marker: { color: '#6eabbf' },
            },
            {
              name: this.state.stockSymbol + ' Low',
              x: this.state.stockChartXValues,
              y: this.state.stockChartLowValues,
              type: 'scatter',
              mode: 'lines',
              marker: { color: '#f00a31' },
            }
          ]}
          layout={
            {
              title: 'Prices',
              width: 1080,
              height: 720,
              autosize: true,
              style: { position: 'relative', width: '100%', height: '100%' },
              xaxis: {
                autorange: true,
                rangeselector: {
                  buttons: [
                    {
                      count: 1,
                      label: '1m',
                      step: 'month',
                      stepmode: 'backward'
                    },
                    {
                      count: 3,
                      label: '3m',
                      step: 'month',
                      stepmode: 'backward'
                    },
                    {
                      count: 6,
                      label: '6m',
                      step: 'month',
                      stepmode: 'backward'
                    },
                    {
                      count: 1,
                      label: '1y',
                      step: 'year',
                      stepmode: 'backward'
                    },
                    {
                      count: 5,
                      label: '5y',
                      step: 'year',
                      stepmode: 'backward'
                    },
                    { step: 'all' }
                  ]
                },
                rangeslider: { range: [] },
                type: 'date'
              }
            }
          }
        />

        {/* <Card changeLink={this.state.stockSymbol} /> */}

      </div>

    )
  }

}

export default Stock;