import React from "react";
import openGdaxWebsocket from "../gdax-websocket";
import { ResponsiveLine } from '@nivo/line';

class App extends React.Component {

  state = {
    tickerMessages: []
  }

  componentDidMount() {
    this.websocket = openGdaxWebsocket("BTC-EUR", this.handleNewTickerMessage)
  }

  componentWillUnmount() {
    this.websocket.close()
  }

  handleNewTickerMessage = newTickerMessage => {
    this.setState(previousState => ({
      tickerMessages: previousState.tickerMessages.concat([{ ...newTickerMessage, time: new Date() }])
    }))
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <ResponsiveLine
          data={[{ id: "bitcoin", data: this.state.tickerMessages.map(data => ({
            x: data.time.getTime(),
            y: data.price
          }))}]}
          xScale={{
            type: 'point'
          }}
          yScale={{
            type: 'linear',
            stacked: true,
            min: 5600,
            max: 5650
          }}
        />
      </div>
    )
  }

}

export default App
