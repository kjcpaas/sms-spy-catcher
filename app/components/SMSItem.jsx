import React from 'react'
import { render } from 'react-dom'

export default class SMSItem extends React.Component {
  render () {
    const { from, body } = this.props

    return (
      <dl>
        <dt>From</dt>
        <dd>{from}</dd>

        <dt>Body</dt>
        <dd>{body}</dd>
      </dl>
    )
  }
}


SMSItem.propTypes = {
  from: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired
}
