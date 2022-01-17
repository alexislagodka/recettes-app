import React from 'react'
import PropTypes from 'prop-types'

function Login ({ authenticate }) {
  return (
    <div className='login'>
      <h2>Connecte toi pour créer tes recettes !</h2>
      <button
        className='facebook-button'
        onClick={authenticate}
      >Me connecter avec facebook
      </button>
    </div>
  )
}

Login.propTypes = {
  authenticate: PropTypes.func
}

export default Login
