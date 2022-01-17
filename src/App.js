import React from 'react'
import PropTypes from 'prop-types'
import Header from './components/Header'
import Admin from './components/Admin'
import Card from './components/Card'

import withFirebase from './hoc/whithFirebase'

// CSS
import './App.css'

import ColorContext from './components/Color'

const App = ({
  match,
  recettes,
  ajouterRecette,
  majRecette,
  supprimerRecette,
  chargerExemple
}) => {
  const cards = Object.keys(recettes)
    .map(key => <Card key={key} details={recettes[key]} />)

  return (
    <ColorContext>
      <div className='box'>
        <Header pseudo={match.params.pseudo} />
        <div className='cards'>
          {cards}
        </div>
        <Admin
          pseudo={match.params.pseudo}
          recettes={recettes}
          ajouterRecette={ajouterRecette}
          majRecette={majRecette}
          chargerExemple={chargerExemple}
          supprimerRecette={supprimerRecette}
        />
      </div>
    </ColorContext>
  )
}

App.propTypes = {
  pseudo: PropTypes.string,
  recettes: PropTypes.object,
  ajouterRecette: PropTypes.func,
  majRecette: PropTypes.func,
  supprimerRecette: PropTypes.func,
  chargerExemple: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      pseudo: PropTypes.string
    })
  })
}

const WrappedComponent = withFirebase(App)

export default WrappedComponent
