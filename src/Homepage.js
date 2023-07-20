import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
function Homepage() {
  const navigate = useNavigate();
  const moveToHome = (e) => {
    e.preventDefault();
    navigate("/sightings");
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={moveToHome}>To BIGFOOT SIGHTINGS!</button>
      </header>
    </div>
  );
}

export default Homepage;
