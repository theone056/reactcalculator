import React from 'react'

const Button = ({Text, HandleClick}) => {
  return (
    <button onClick={HandleClick}>{Text}</button>
  )
}

export default Button