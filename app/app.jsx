import React from 'react'
import {render} from 'react-dom'

class App extends React.Component {
  render () {
    return (
      <div>
        No spied SMS yet. Please try sending one.
      </div>
    )
  }
}

render(
  <App />, document.getElementById('sms-spy-catcher')
)
