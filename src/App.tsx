import { useEffect, useState } from "react";
import Autocomplete from "./components/auto-complete/Autocomplete";
import { Country } from "./shared/types/country";

import "./App.css";
import ErrorDisplay from "./components/error/ErrorDisplay";

function App() {
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getCountries() {
      try {
        const resp = await fetch("https://restcountries.com/v3.1/all");
        const data = await resp.json();
        setCountries(data);
      } catch (error) {
        console.log(error);
        setError("We have encountered an error while fetching!");
      } finally {
        setLoading(false);
      }
    }

    getCountries();
  }, []);

  const filteredCountries: Country[] = countries?.filter((country: Country) =>
    country.name.common.toLowerCase().startsWith(countrySearch.toLowerCase())
  );

  return (
    <main className="wrapper">
      <header>
        <h1>Explore countries using this search feature!</h1>
      </header>

      <ErrorDisplay loading={loading} error={error} />

      {!loading && !error && (
        <Autocomplete
          filteredCountries={filteredCountries}
          countrySearch={countrySearch}
          setCountrySearch={setCountrySearch}
        />
      )}
    </main>
  );
}

export default App;
