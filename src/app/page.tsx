"use client"

import axios from "axios"
import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Pokedex from "./components/CardPokemon"
import CardPokemon from "./components/CardPokemon"

const page: React.FC = () => {
  const [pokemonData, setPokemonData] = useState([])

  const getPokemons = async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon")
    const results = response.data.results

    const pokemonWithImages:any = await Promise.all(
      results.map( async (element:any) => {
        const moreInfo = await getMoreInfo(element.name)
        const specie = await getSpecie(moreInfo.species.url)
        return ({
          name: element.name,
          urlImage: moreInfo.sprites.front_default,
          especies: specie.egg_groups
        })
    }))
    
    setPokemonData(pokemonWithImages)
  }

  const getMoreInfo = async (pokemon:string) => {
    const sprites = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => {
      return response.data
    })

    return sprites
  }

  const getSpecie = async (url:string) => {
    const result = await axios.get(url)
    .then((response) => {
      return response.data
    })

    return result
  }

  useEffect(() => {
    getPokemons()
  }, [])
  
  useEffect(() => {
    console.log(pokemonData)
  })

  return(
    <Container>
      <Row>
        {pokemonData.map((pokemon:any, key) => (
          <Col md={6} lg={3} xl={2} key={key}>
              <CardPokemon
                urlImage={pokemon.urlImage}
                name={pokemon.name}
              ></CardPokemon>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default page