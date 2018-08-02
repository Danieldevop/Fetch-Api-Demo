import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    data: false,
    coins: false
  }

  componentDidMount() {
    const pair = 'btc_ltc'
    fetch(`https://shapeshift.io/marketinfo/${pair}`)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          data: result
        })
      })
      .catch(error => console.log(error))

    fetch('https://shapeshift.io/getcoins')
      .then(res => res.json())
      .then(result => {
        this.setState({
          coins: result.CVC
        })
      })
      .catch(error => console.error(error))
  }

  handleClick() {

    const post = {
      'withdrawal': 'LTdsVS8VDw6syvfQADdhf2PHAm3rMGJvPX',
      'pair': 'btc_ltc',
      'apiKey': '7faff8c68626e8a0d4aa0f6f3b488be1ea1e45b0ee4204dd915b3a0b62e74f5a4aa943328ea0b08ef0c88d2e537611014a12323c1db76fe31d0d57d8346aee81',
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(post),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }

    return fetch('https://shapeshift.io/shift', options)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(error => console.error(`Error: ${error} `))
  }

  render() {

    const { coins, data } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <h1 className="App-title">Pair: {data.pair}</h1>
        <p>Rate: {data.rate}</p>
        <p>Limit: {data.limit}</p>
        <p>MinerFee: {data.minerFee}</p>
        <br />
        <hr />
        <h1>coin: {coins.symbol}</h1>
        <img src={coins.image} alt="" />
        <hr />

        <form action="">
          <input type="text" />
          <input type="text" />
          <input type="button" value="Click" onClick={this.handleClick} />

        </form>
      </div>

    );
  }
}

export default App;
