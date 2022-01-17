import React, { Component } from 'react'
import PropTypes from 'prop-types'
import recettes from '../recettes'

// firebase
import app from '../firebase'
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

const db = getDatabase(app)

const withFirebase = WrappedComponent => (
  class HOC extends Component {
    static propTypes = {
      match: PropTypes.shape({
        params: PropTypes.shape({
          pseudo: PropTypes.string
        })
      })
    }

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
        return (
          <WrappedComponent
            recettes={this.state.recettes}
            ajouterRecette={this.ajouterRecette}
            majRecette={this.majRecette}
            supprimerRecette={this.supprimerRecette}
            chargerExemple={this.chargerExemple}
            {...this.props}
          />
        )
      }
  }
)

export default withFirebase
