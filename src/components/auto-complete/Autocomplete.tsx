import { useState } from "react";
import { Country } from "../../shared/types/country";

import "./Autocomplete.css";

type AutocompleteProps = {
  filteredCountries: Array<Country>;
  countrySearch: string;
  setCountrySearch: (countrySearch: string) => void;
};

export default function Autocomplete(props: AutocompleteProps) {
  const { filteredCountries, countrySearch, setCountrySearch } = props;

  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const splitCountryLabel = (item: string, country: string) => {
    return [
      item.substring(0, country.length),
      item.substring(country.length, item.length),
    ];
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        if (countrySearch) {
          setCountrySearch(filteredCountries[selectedItemIndex].name.common);
          setSelectedItem(filteredCountries[selectedItemIndex].name.common);
          setSelectedItemIndex(0);
        }
        break;
      case "ArrowUp":
        if (selectedItemIndex > 0) {
          setSelectedItemIndex((prevIndex) => prevIndex - 1);
        }
        break;
      case "ArrowDown":
        if (selectedItemIndex < filteredCountries.length - 1) {
          setSelectedItemIndex((prevIndex) => prevIndex + 1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="container" onKeyDown={handleKeyDown}>
      <input
        value={countrySearch}
        onChange={(e) => {
          setCountrySearch(e.target.value);
          setSelectedItem("");
          setSelectedItemIndex(0);
        }}
        placeholder="Type to autocomplete"
      ></input>
      <ul>
        {countrySearch &&
          !selectedItem &&
          filteredCountries.map((filteredCountry: Country, index: number) => {
            const filteredCountryName = filteredCountry.name.common;
            const [highlightedLabel, regularLabel] = splitCountryLabel(
              filteredCountryName,
              countrySearch
            );
            return (
              <li
                className={selectedItemIndex === index ? "active" : ""}
                key={index}
                onClick={() => {
                  setCountrySearch(filteredCountryName);
                  setSelectedItem(filteredCountryName);
                }}
              >
                <span className="country--highlighted">{highlightedLabel}</span>
                <span>{regularLabel}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
