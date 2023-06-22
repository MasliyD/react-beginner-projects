import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('UAH');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);
  const [rates, setRates] = React.useState({});

  React.useEffect(() => {
    fetch('https://api.metalpriceapi.com/v1/latest?api_key=bedbc712980ecbf2e70527bd94a47e1f&base=USD&currencies=EUR,UAH,GBP,USD')
    .then(data => data.json())
    .then(json => {
      setRates(json.rates);
      console.log(json.rates);
    })
    .catch(err => {
      console.log('Error');
      alert('Fetch error')
    })
  }, []);
  
  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    setToPrice(result);
    setFromPrice(value);
  }

  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    setFromPrice(result);
    setToPrice(value);
  }

  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangeFromPrice} 
      />
      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onChangeToPrice} 
      />
    </div>
  );
}

export default App;
