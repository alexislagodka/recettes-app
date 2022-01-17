import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AjouterRecette from './AjouterRecette'
import AdminForm from './AdminForm'
import Login from './Login'

// firebase
import app from '../firebase'
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import {
  getDatabase,
  ref,
  set,
  child,
  get
} from 'firebase/database'

const db = getDatabase(app)

export default class Admin extends Component {
    static propTypes = {
      pseudo: PropTypes.string,
      chargerExemple: PropTypes.func,
      ajouterRecette: PropTypes.func,
      recettes: PropTypes.object,
      majRecette: PropTypes.func,
      supprimerRecette: PropTypes.func
    }

    state = {
      uid: null,
      chef: null
    }

    componentDidMount () {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.handleAuth({ user })
        }
      })
    }

    handleAuth = authData => {
      get(child(ref(db), `${this.props.pseudo}`))
        .then((snapshot) => {
          if (!snapshot.val().chef) {
            set(ref(db, `${this.props.pseudo}/chef`), authData.user.uid)
          }
          this.setState({
            uid: authData.user.uid,
            chef: snapshot.val().chef || authData.user.uid
          })
        })
    }

    authenticate = () => {
      const provider = new FacebookAuthProvider()
      const auth = getAuth()
      signInWithPopup(auth, provider)
        .then(this.handleAuth)
        .catch((error) => {
          console.log(error)
        })
    }

    handleLogout = () => {
      const auth = getAuth()
      signOut(auth).then(() => {
        this.setState({ uid: null })
      }).catch((error) => {
        console.log(error)
      })
    }

    render () {
      const { recettes, ajouterRecette, majRecette, chargerExemple, supprimerRecette } = this.props

      const logout = <button onClick={this.handleLogout}>Déconnexion</button>
      // Si l'utilisateur n'est pas connecté
      if (!this.state.uid) {
        return <Login authenticate={this.authenticate} />
      }

      if (this.state.uid !== this.state.chef) {
        return (
          <div>
            <p>Tu n&apos;est pas le chef de cette boîte</p>
            {logout}
          </div>
        )
      }

      return (
        <div className='cards'>
          <AjouterRecette ajouterRecette={ajouterRecette} />
          {
              Object.keys(recettes)
                .map(key => <AdminForm
                  key={key}
                  id={key}
                  recettes={recettes}
                  majRecette={majRecette}
                  supprimerRecette={supprimerRecette}
                            />)
          }
          <footer>
            {logout}
            <button onClick={chargerExemple}>Remplir</button>
          </footer>
        </div>

      )
    }
}
