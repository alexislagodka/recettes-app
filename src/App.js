import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './components/Header'
import Admin from './components/Admin'
import Card from './components/Card'
import recettes from './recettes'

// firebase
import app from './firebase'
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  off,
  child,
  update
} from 'firebase/database'

// CSS
import './App.css'

const db = getDatabase(app)

class App extends Component {
  state = {
    pseudo: this.props.match.params.pseudo,
    recettes: {}
  }

  componentDidMount () {
    this.dbRecettesRef = ref(db, `/${this.state.pseudo}/recettes`)
    onValue(this.dbRecettesRef, (snapshot) => {
      if (snapshot.exists()) {
        const recettes = snapshot.val()
        this.setState({ recettes })
      }
    })
  }

  componentWillUnmount () {
    off()
  }

  ajouterRecette = recette => {
    const newRecetteKey = push(child(this.dbRecettesRef, 'recettes')).key
    const updates = {}
    updates[newRecetteKey] = recette
    update(this.dbRecettesRef, updates)
  }

  majRecette = (key, newRecette) => {
    const updates = {}
    updates[key] = newRecette
    update(this.dbRecettesRef, updates)
  }

  supprimerRecette = key => {
    console.log(key)
    const updates = {}
    updates[key] = null
    update(this.dbRecettesRef, updates)
  }

  chargerExemple = () => {
    Object.keys(recettes).forEach(key => {
      const newRecetteRef = push(this.dbRecettesRef)
      set(newRecetteRef, recettes[key])
        .catch((error) => {
          console.log(error)
        })
    })
  }

  render () {
    const cards = Object.keys(this.state.recettes)
      .map(key => <Card key={key} details={this.state.recettes[key]} />)

    return (
      <div className='box'>
        <Header pseudo={this.state.pseudo} />
        <div className='cards'>
          {cards}
        </div>
        <Admin
          pseudo={this.state.pseudo}
          recettes={this.state.recettes}
          ajouterRecette={this.ajouterRecette}
          majRecette={this.majRecette}
          chargerExemple={this.chargerExemple}
          supprimerRecette={this.supprimerRecette}
        />
      </div>
    )
  }
}

App.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      pseudo: PropTypes.string
    })
  })
}

export default App
