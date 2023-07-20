import { useState, useEffect } from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import { BACKEND_URL } from "./constant";
import { useNavigate } from "react-router-dom";
import VibingCat from "./vibingcat.gif";

export default function App() {
  const [sightings, setSightings] = useState([]);
  const [search, setSearch] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/sightings`)
      .then((response) => {
        console.log(response.data);
        setSightings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (isNaN(search)) {
      setSearch();
      alert("Search for a Number!");
      return;
    }
    axios.get(`${BACKEND_URL}/sightings`).then((info) => {
      const length = info.data.length;
      let searchIndex = search - 1;
      if (searchIndex >= length) {
        setSearch();
        alert(
          `You cannot search for a number above ${length}, as there are only ${length} results!`
        );
        return;
      } else {
        navigate(`/sightings/${searchIndex}`);
      }
    });
  };
  const sightingDisplay = sightings.map((info, index) => {
    return (
      <li key={index}>
        Year: {info.YEAR}, Season: {info.SEASON}, Location: {info.STATE}
      </li>
    );
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={VibingCat} className="App-logo" alt="logo" />
        <div>BIGFOOT SIGHTINGS!</div>
        <div>
          <input
            type="text"
            placeholder="e.g: 1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <ol>
          {sightingDisplay && sightingDisplay.length > 0 ? (
            <div>{sightingDisplay}</div>
          ) : null}
        </ol>
      </header>
    </div>
  );
}
