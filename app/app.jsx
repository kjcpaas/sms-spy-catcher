import React from 'react'
import { render } from 'react-dom'
import SMSContainer from './components/SMSContainer'

class App extends React.Component {
  render () {
    return (
      <div>
        <h1>SMS Spy Catcher</h1>
        <SMSContainer />
      </div>
    )
  }
}

render(
  <App />, document.getElementById('sms-spy-catcher')
)
