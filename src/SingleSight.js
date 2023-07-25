import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./constant";
import axios from "axios";
import VibingCat from "./vibingcat.gif";

export default function SingleSight() {
  const [sighting, setSighting] = useState();
  const [index, setIndex] = useState();
  const [display, setDisplay] = useState();
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    console.log(index);
    if (index) {
      axios.get(`${BACKEND_URL}/sightings/${index}`).then((info) => {
        console.log(info);
        setSighting(info);
        setDate(info.data.date);
        setLocation(info.data.location);
        setNotes(info.data.notes);
      });
    } else {
      return null;
    }
  }, [index]);

  useEffect(() => {
    if (sighting) {
      setDisplay(
        <div>
          <div>Location: {sighting.data.location}</div>
          <div>Time: {sighting.data.date}</div>
          <div>Notes: {sighting.data.notes}</div>
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

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${BACKEND_URL}/sightings/${index}`)
      .then(navigate("/sightings"));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (date && location && notes) {
      await axios
        .put(`${BACKEND_URL}/sightings/${index}`, {
          date: date,
          location: location,
          notes: notes,
        })
        .then((response) => {
          console.log(response);
          setSighting(response);
          navigate("/sightings");
          alert("Edited Record!");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return;
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={VibingCat} className="App-logo" alt="logo" />
        <button onClick={moveToMain}>Back to MAIN Sighting Page</button>
        <div>{display ? display : null}</div>
        <button
          onClick={() => {
            setShowEdit(!showEdit);
          }}
        >
          Toggle Edit Window
        </button>
        <div>
          {showEdit ? (
            <div>
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
                  <button onClick={handleEdit}>EDIT THIS SIGHTING</button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div>
          <button onClick={handleDelete}>Erase this Evidence</button>
        </div>
      </header>
    </div>
  );
}
