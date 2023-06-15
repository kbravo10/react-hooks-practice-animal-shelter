import React from "react";

import Pet from "./Pet";

function PetBrowser({ pets, onAdoptPet }) {
  return (<div className="ui cards">
    {pets.map((pet, index) =>{
      return(
        <Pet key={index} pet={pet} onAdoptPet={onAdoptPet}/>
      )
    })}
    
  </div>)
}

export default PetBrowser;
