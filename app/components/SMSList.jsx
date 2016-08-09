import React from 'react'
import { render } from 'react-dom'

import SMSItem from './SMSItem'

export default class SMSList extends React.Component {
  render () {
    const { list } = this.props

    if (list.length) {
      return (
        <div>
          { list.map(sms => {
            const { from, body } = sms
            return <SMSItem from={from} body={body} />
          }) }
        </div>
      )
    } else {
      return (
        <div>
          The spy hasn't intercepted any SMS yet
        </div>
      )
    }
  }
}

SMSList.propTypes = {
  list: React.PropTypes.array.isRequired
}
