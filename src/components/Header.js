import React from 'react'
import PropTypes from 'prop-types'

import { ColorContext } from './Color'

export default function Header ({ pseudo }) {
  const formatPseudo = pseudo => /[aeiouy]/i.test(pseudo[0])
    ? `d'${pseudo}`
    : `de ${pseudo}`

  return (
    <ColorContext.Consumer>
      {
        context => (
          <header style={{ backgroundColor: context.state.color }}>
            <h1>La boite à recettes {formatPseudo(pseudo)}</h1>
          </header>
        )
      }
    </ColorContext.Consumer>
  )
}

Header.propTypes = {
  pseudo: PropTypes.string
}
