import { useState } from "react";

import AdoptionHero from "../components/adoption/AdoptionHero";
import AdoptionStats from "../components/adoption/AdoptionStats";
import AdoptionFilters from "../components/adoption/AdoptionFilters";
import AdoptionGrid from "../components/adoption/AdoptionGrid";

function Adoptions() {
  const [filters, setFilters] = useState({
    search: "",
    animalType: "",
    location: "",
    status: "",
  });

  return (
    <>
      <AdoptionHero />

      <AdoptionStats />

      <AdoptionFilters
        filters={filters}
        setFilters={setFilters}
      />

      <AdoptionGrid
        filters={filters}
      />
    </>
  );
}

export default Adoptions;