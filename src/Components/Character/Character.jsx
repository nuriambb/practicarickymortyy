import React from 'react'
import { useState, useEffect } from 'react'
import './Character.css'
function Characters() {
  const [character, setCharacter] = useState([])
  const [rotated, setRotated] = useState({})
  useEffect(() => {
    const getCharacterList = async () => {
      const character = await fetch(`https://rickandmortyapi.com/api/character`)
      const characterJson = await character.json()

      const isRotated = {}
      characterJson.results.forEach((c) => {
        isRotated[c.id] = false
      })
      setRotated(isRotated)
      setCharacter(characterJson.results)
    }
    getCharacterList()
  }, [])

  const handleImageClick = (id) => {
    setRotated((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }
  return (
    <div className='container1'>
      {character.map((c) => (
        <div className='container2' key={c.id}>
          <h1> Name: {c.name}</h1>
          <h2>Status: {c.status}</h2>
          <img
            src={c.image}
            alt={c.name}
            className={rotated[c.id] ? 'rotated' : 'default'}
            onClick={() => handleImageClick(c.id)}
          />
        </div>
      ))}
    </div>
  )
}
export default Characters
