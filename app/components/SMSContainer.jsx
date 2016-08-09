import React from 'react'
import { render } from 'react-dom'
import SockJS from 'sockjs-client'
import SMSList from './SMSList'

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
      this.setState({connected: true})
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
    var { smsList, connected } = this.state

    if (!connected) {
      return <div>
        Connecting websockets port...
      </div>
    } else {
      return <SMSList list={smsList} />
    }
  }
}
