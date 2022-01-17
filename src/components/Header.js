import React from 'react'
import PropTypes from 'prop-types'

export default function Header ({ pseudo }) {
  const formatPseudo = pseudo => /[aeiouy]/i.test(pseudo[0])
    ? `d'${pseudo}`
    : `de ${pseudo}`

  return (
    <header>
      <h1>La boite à recettes {formatPseudo(pseudo)}</h1>
    </header>
  )
}

Header.propTypes = {
  pseudo: PropTypes.string
}
