"use client"

import axios from "axios"
import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Pokedex from "./components/Pokedex"
import CardPokemon from "./components/Pokedex"

const page: React.FC = () => {
  const [pokemonData, setPokemonData] = useState([])

  const getPokemons = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon")
     .then((response) => {
       setPokemonData(response.data.results)
     })
  }

  useEffect(() => {
    getPokemons()
  }, [])

  return(
    <Container>
      <Row>
        {pokemonData.map((pokemon:any, key) => (
          <Col md={6} lg={4} key={key}>
              <CardPokemon
                name={pokemon.name}
              ></CardPokemon>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default page