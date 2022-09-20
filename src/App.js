import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from 'react';
import moment from 'moment'

function Nav() {
  return (
<nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
    </a>

    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">

      <a className="navbar-item">
        <form>
          <input type="text" className="input" placeholder="Search..."/>
        </form>
      </a>

    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <span className="icon is-large fa-2x">
          <i className="fa-solid fa-earth-africa"></i>
        </span>
        <span className="icon is-large fa-2x">
          <i className="fa-solid fa-house"></i>
        </span>
        <span className="icon is-large fa-2x">
          <i className="fa-solid fa-heart"></i>
        </span>
        <span className="icon is-large">
          <span className="fa-stack fa-lg">
            <i className="fa-regular fa-user fa-stack-1x"></i>
            <i className="fa-regular fa-circle fa-stack-2x"></i>
          </span>
        </span>
      </div>
      <div className="navbar-item">
        <ul>
          <li>User XYZ1</li>
          <li>999 999</li>
        </ul>
      </div>
    </div>
  </div>
</nav>
  );
}

function Row(props) {
  return (
    <>
      <tr>
        <td rowSpan="3">
          <img src={props.imgSrc} alt={"bird"} width="350px"/>
        </td>
        <th>
          {props.species} ({props.score})
        </th>
      </tr>
      <tr>
          <td>location: {props.loc.latitute}, {props.loc.longitude}</td>
      </tr>
      <tr>
          <td>{moment(props.dateSpotted).format('M/D/YYYY, h:mm a')}</td>
      </tr>
    </>
  );
}

function Table(props) {
  return (
    <table className="table is-fullwidth">
      {props.data.map((bird) => {
        return (
          <Row
            key={bird.id}
            imgSrc={"https://birdyapi20220919135004.azurewebsites.net/Media/" + bird.imageName}
            species={bird.species}
            score={bird.score + "%"}
            loc={bird.location}
            dateSpotted={bird.dateSpotted}></Row>
        )
      })}
    </table>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Birdy Watch data
  // Because of CORS issue, install this chrome extension in the browser to avoid error:
  // https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf
  useEffect(() => {
    fetch("https://birdyapi20220919135004.azurewebsites.net/BirdyWatch")
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response;
  }).then(data => {
    setData(data);
  })
  .catch(error => {
    console.log(error);
    setError(error);
  }).finally(() => {
    setLoading(false);
  })
  });

  return (
    <div>
    <Nav></Nav>
    <section className="section">
    <div className="container">
      <div className="columns">
        <div className="column is-one-fifth">
          <p className="subtitle">Welcome to Birdy!</p>
          <img src={"https://github.com/francesco-sodano/birdy/raw/main/res/images/misc/birdy-device-promopicture1.jpg"} alt="your birdy" />
          <div className="left-nav-btn-container">
            <button className="button">
              Set up your own Birdy!
            </button>
            <button className="button">
              Contact Us
            </button>
          </div>
        </div>
        <div className="column">
          {loading && "Loading..."}
          {error && "Error! Please reload the page.s"}
          {!loading && !error && <Table data={data}/>}
        </div>
      </div>
    </div>
  </section>
  </div>
  );
}

export default App;
