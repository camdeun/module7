// lab1

import { userState, useEffect } from "react"

const currencies = ['USD', 'AUD', 'NZD', 'GBP', 'EUR', 'SGD'];

function BitcoinRates() {

    const [currency, setCurrency] = useState(currencies[0]);

    const [btcPrice, setBtcPrice] = useState(0)

    useEffect(() => {
        let ignore = false

        fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}')
        .then(response => response.json)
        .then(json => {
            if (!ignored) setBtcPrice(json.bitcoin[currency.toLowerCase()])
        })

        return() => {
            ignore = true
        }


    }, [currency])

    
    const options = currencies.map(curr => <option value={curr} key={curr}>{curr}</option>);

    return (

    <div className="BitcoinRates componentBox">
        <h3>Bitcoin Exchange Rate</h3>
        <label>Choose currency:
            <select value={currency} onChange={e => setCurrency(e.target.value)}>
                {options}
            </select>
        </label>
        <div>1BTC is worth {btcPrice} {currency}</div>
</div> )
}

export default BitcoinRates

//lab 2

import { userState, useEffect } from "react"
import { useDataReducer } from "../hooks/useDataReducer";
import { useEmojiContext} from "../context/EmojiContext";

const currencies = ['USD', 'AUD', 'NZD', 'GBP', 'EUR', 'SGD'];

function BitcoinRates() {

    const [currency, setCurrency] = useState(currencies[0]);
    const btcResponse = useDataReducer('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}')
    const btcPrice = !btcResponse.loading && btcResponse.data ? btcResponse.data.bitcoin[currency.toLocaleLowerCase()] : 0
    const {emoji} = useEmojiContext()

    const options = currencies.map(curr => <option value={curr} key={curr}>{curr}</option>);

    return (

    <div className="BitcoinRates componentBox">
        <h3>Bitcoin Exchange Rate</h3>
        <label>Choose currency:
            <select value={currency} onChange={e => setCurrency(e.target.value)}>
                {options}
            </select>
        </label>
        {btcResponse.loading ? <div>please wait...</div>
        :<div>1BTC is worth {btcPrice} {currency} {emoji}</div>
        <div>{btcPrice.Response.error}</div>
    </div> )
}

export default BitcoinRates