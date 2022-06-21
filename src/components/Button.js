import React from 'react';


const Button = ({setPlay}) => {
  return (
    <div>
      <button id='btn' onClick={setPlay}>Begin Game</button>
    </div>
  )
}
export default Button
