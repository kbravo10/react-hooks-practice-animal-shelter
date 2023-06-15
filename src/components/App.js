import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleFilter(newFilter) {
    setFilters((filters) => (filters = newFilter));
  }

  function onFindPetsClick() {
    let filter = "";

    if (filters.type !== "all") {
      filter = `?type=${filters.type}`;
    }

    fetch(`http://localhost:3001/pets${filter}`)
      .then((res) => res.json())
      .then((data) => setPets((pets) => (pets = data)));
  }

  function adoptPet(id) {
    fetch(`http://localhost:3001/pets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isAdopted: true,
      }),
    }).then((res) => res.json());

    const newPet = pets.filter((pet) => {
      if (id === pet.id) {
        pet.isAdopted = true;
      }
      return true;
    });
    setPets((pets) => (pets = newPet));
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={handleFilter}
              onFindPetsClick={onFindPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={adoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
