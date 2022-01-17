import React, { Component } from 'react'
import PropTypes from 'prop-types'

const ColorContext = React.createContext()

export default class ColorProvider extends Component {
    static propTypes = {
      children: PropTypes.element
    }

    state = {
      color: 'seagreen'
    }

    render () {
      return (
        <ColorContext.Provider
          value={{
            state: this.state
          }}
        >
          {this.props.children}
        </ColorContext.Provider>
      )
    }
}

export { ColorContext }
