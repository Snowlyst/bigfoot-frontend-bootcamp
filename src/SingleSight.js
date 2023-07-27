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
  const [comment, setComment] = useState("");
  const [commentDisplay, setCommentDisplay] = useState();
  const [commentInput, setCommentInput] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    if (index) {
      axios.get(`${BACKEND_URL}/sightings/${index}`).then((info) => {
        // console.log(info);
        setSighting(info);
        setDate(info.data.date);
        setLocation(info.data.location);
        setNotes(info.data.notes);
      });
      axios.get(`${BACKEND_URL}/sightings/${index}/comments`).then((info) => {
        setComment(info.data);
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

  useEffect(() => {
    if (comment) {
      console.log(comment);
      const toDisplay = comment.map((comment) => (
        <div key={comment.id}>
          {comment.createdAt} : {comment.content}
          <button onClick={() => handleDeleteComment(comment.id)}>X</button>
        </div>
      ));
      setCommentDisplay(toDisplay);
    } else return;
  }, [comment]);

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

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (commentInput) {
      await axios
        .post(`${BACKEND_URL}/sightings/${index}/comments`, {
          data: commentInput,
        })
        .then((info) => {
          console.log(info);
          setComment(info.data);
          setCommentInput("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDeleteComment = async (deleteId) => {
    console.log(deleteId);
    axios
      .delete(`${BACKEND_URL}/sightings/${index}/comments/${deleteId}`)
      .then((info) => {
        console.log(info);
        setComment(info.data);
        navigate("/sightings");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={VibingCat} className="App-logo" alt="logo" />
        <button onClick={moveToMain}>Back to MAIN Sighting Page</button>
        <div>{display ? display : null}</div>
        <br />
        <div>COMMENTS:</div>
        <div>
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
        <div>
          {commentDisplay ? (
            <div>{commentDisplay}</div>
          ) : (
            <div>No Comment Exists yet! Be the first?</div>
          )}
        </div>
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
