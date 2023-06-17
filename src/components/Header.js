// import React, {useState} from 'react'
import sun from '../images/icon-sun.svg'
import moon from '../images/icon-moon.svg'

const Header = ({ color, setColor }) => {

  const onChangeColor = e => {
    if (color === "light") {
      setColor("dark")
    } else {
      setColor("light")
    }
  }

  const image = color === "light" ? <img src={moon} alt="Moon icon" /> : <img src={sun} alt="Sun icon" />

  return (
    <header>
      <h1>TODO</h1>
      <button
        onClick={onChangeColor}
      >{image}</button>
    </header>
  )
}

export default Header