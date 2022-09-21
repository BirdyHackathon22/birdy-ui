import './App.css';
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from 'react';
import moment from 'moment'

function Nav() {
  return (
<nav role="navigation" aria-label="main navigation">
  <img src="birdy_logo.png" alt="Birdy logo" className="birdy-logo"></img>
  <div className="nav-right-container">
    <button className="nav-right-buttons">
      <p>Explore</p>
      <img src="Header_Explore_icon.png" alt="explore" className="nav-right-btn-img"></img>
    </button>
    <button className="nav-right-buttons">
      My Birdy
      <img src="Header_MyBirdy_icon.png" alt="explore" className="nav-right-btn-img"></img>
    </button>
    <button className="nav-right-buttons">
      Notifications
      <img src="Header_Notifications_icon.png" alt="explore" className="nav-right-btn-img"></img>
      <img src="Notifications_2.png" alt="number of notifications" className="num-noti-img"></img>
    </button>
    <img src="Header_Profile.png" alt="user profile" className="user-profile-img"></img>
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
          {error && "Error! Please reload the page."}
          {!loading && !error && <Table data={data}/>}
        </div>
      </div>
    </div>
  </section>
  </div>
  );
}

export default App;
