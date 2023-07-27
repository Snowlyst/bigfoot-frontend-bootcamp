import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { BACKEND_URL } from "./constant";
import { useNavigate } from "react-router-dom";
import VibingCat from "./vibingcat.gif";

export default function App() {
  const [sightings, setSightings] = useState([]);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

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

  const sightingDisplay = sightings.map((info, index) => {
    console.log(info);
    return (
      <li key={index}>
        <div>
          {info.id}: Date: {info.date} , Location: {info.location}
        </div>
        <button
          onClick={(e) => {
            navigate(`/sightings/${info.id}`);
          }}
        >
          Explore Sighting {info.id}
        </button>
        <br />
      </li>
    );
  });
  const addSighting = async (e) => {
    e.preventDefault();
    if (date && location && notes) {
      await axios
        .post(`${BACKEND_URL}/sightings`, {
          date: date,
          location: location,
          notes: notes,
        })
        .then((response) => {
          console.log(response.data.sighting);
          setSightings(response.data.sighting);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={VibingCat} className="App-logo" alt="logo" />
        <div>BIGFOOT SIGHTINGS!</div>
        <div>ADD SIGHTING HERE</div>
        <div>
          <div>
            Date:
            <input
              type="text"
              value={date}
              placeholder="Date here"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            Location:
            <input
              type="text"
              value={location}
              placeholder="Date here"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            Notes:
            <input
              type="text"
              value={notes}
              placeholder="Date here"
              onChange={(e) => setNotes(e.target.value)}
            />
            <button onClick={addSighting}>Add Sighting!</button>
          </div>
        </div>
        <ul>
          {sightingDisplay && sightingDisplay.length > 0 ? (
            <div>{sightingDisplay}</div>
          ) : null}
        </ul>
      </header>
    </div>
  );
}
