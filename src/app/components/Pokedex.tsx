import React from "react"

interface CardPokemonProps {
    name: string
}
const CardPokemon: React.FC<CardPokemonProps> = ({ name}) => {
    return(
        <div className="card-pokemon">
            <strong className="card-pokemon-name">{name}</strong>
        </div>
    )
}

export default CardPokemon