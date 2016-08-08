import React from 'react'
import { render } from 'react-dom'
import SockJS from 'sockjs-client'

export default class SMSContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      smsList: [],
      connected: false
    }
  }

  componentDidMount () {
    this.sock = new SockJS('http://localhost:9999/ws')
    this.sock.onopen = () => {
      console.log("Listening to SMS")
    }

    this.sock.onerror = (error) => {
      console.log(error)
    }

    this.sock.onmessage = (e) => {
      console.log(e.data)
      const { type, data } = JSON.parse(e.data)

      if(type === 'sms') {
        this.setState({
          smsList: [
            ...this.state,
            data
          ]
        })
      }
    }
  }

  componentWillUnmount () {
    if(this.sock) {
      this.sock.close()
    }
  }

  render () {
    var { smsList } = this.state

    if(smsList && smsList.length) {
      return <div />
    } else {
      return (
        <div>
          The spy hasn't intercepted any SMS yet
        </div>
      )
    }
  }
}
