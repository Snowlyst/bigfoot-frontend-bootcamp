import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./constant";
import axios from "axios";
import logo from "./logo.png";

export default function SingleSight() {
  const [sighting, setSighting] = useState();
  const [index, setIndex] = useState();
  const [display, setDisplay] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    if (index) {
      axios.get(`${BACKEND_URL}/sightings/${index}`).then((info) => {
        console.log(info);
        setSighting(info);
      });
    } else {
      return null;
    }
  }, [index]);

  useEffect(() => {
    if (sighting) {
      setDisplay(
        <div>
          <div>Year: {sighting.data.YEAR}</div>
          <div>STATE: {sighting.data.STATE}</div>
          <div>
            DATE: {sighting.data.DATE} of {sighting.data.MONTH}
          </div>
          <div>DETAILS: {sighting.data.OBSERVED}</div>
          <br />
          <div>ENVIRONMENT: {sighting.data.ENVIRONMENT}</div>
        </div>
      );
    }
  }, [sighting]);

  const param = useParams();
  if (index !== param.index) {
    setIndex(param.index);
  }

  const moveToMain = (e) => {
    e.preventDefault();
    navigate("/sightings");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={moveToMain}>Back to MAIN Sighting Page</button>
        <div>{display ? display : null}</div>
      </header>
    </div>
  );
}
