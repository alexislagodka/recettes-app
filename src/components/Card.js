import React from 'react'
import PropTypes from 'prop-types'

function Card ({ details }) {
  const ingredients = details.ingredients
    .split(',')
    .map((item, i) => <li key={i}>{item}</li>)

  const instructions = details.instructions
    .split('\n')
    .map((item, i) => <li key={i}>{item}</li>)

  const requireImage = chemin => {
    try {
      return require(`../img/${chemin}`)
    } catch (err) {
      return require('../img/default.jpeg')
    }
  }

  return (
    <div className='card'>
      <div className='image'>
        <img src={requireImage(details.image)} alt={details.nom} />
      </div>
      <div className='recette'>
        <h2>{details.nom}</h2>
        <ul className='liste-ingredients'>
          {ingredients}
        </ul>
        <ol className='liste-instructions'>
          {instructions}
        </ol>
      </div>
    </div>
  )
}

Card.propTypes = {
  details: PropTypes.object
}

export default Card
