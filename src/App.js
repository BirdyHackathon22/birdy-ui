import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from 'react';
import moment from 'moment'

function Nav() {
  return (
<nav role="navigation" aria-label="main navigation">
  <img src="birdy_logo.png" alt="Birdy logo" className="birdy-logo"></img>
  <div className="nav-right-container">
    <button className="nav-right-buttons">
      Explore
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
    <div className="card">
      <img src={props.imgSrc} alt={"bird"} className='bird-img'/>
      <div className='card-non-img'>
        <div className='card-top'>
          <div className='card-title'>
            <span className='species'><b>{props.species}</b> ({props.score})</span>
            {moment(props.dateSpotted).format('M/D/YYYY, h:mm a')}
          </div>
          <div className='classify'>
            Am I classified correctly?
            
          </div>
        </div>
        <div className='card-middle'>
          <div className='user-info'>
            <div className='user-img'></div>
            <div className='user-name-loc'>
              <span className='user-name'>BirdWatcher</span>
              {props.loc.latitute}, {props.loc.longitude}
            </div>
          </div>
          <p className='comment'>What a beautiful bird I saw in my backyard today!</p>
        </div>
      </div>
    </div>
  );
}

function Cards(props) {
  return (
    <div className="data">
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
    </div>
  );
}

function LeftNavContent() {
  return(
    <div className='left-nav-content'>
      <p className="title">Birdy: A Smart Bird Feeder to Fight Climate Change</p>
      <img src="IMG_2168.jpg" alt="your birdy" className='birdy-img' />
      <p className='subtitle'>What is Birdy?</p>
      <p className='desc'>Birdy is a wild bird feeder set up by members of the community, like you! As birds come by to feed, Birdy takes a photo, idenitifes/classifies the bird, and uploads the metadata to share with our virtual community. Not only will you be helping out your forest friends, you will also be able to log, view, and share these pictures with your friends and the Birdy community!</p>

      <p className='subtitle'>What do we use this data for?</p>
      <p className='desc'>The data collected by the community is used to create a Global Biodiversity Map that tracks bird species along their migration routes. This data is an invaluable tool to track the impact climate change, logging, forest fires and the like are having on biodiversity over time and inform the approaches we can take to address these issues.</p>

      <p className='subtitle'>This sounds fun! How do I join in?</p>
      <p className='desc'>The link below will teach you how to set up your own Birdy. You can also sign up to be part of the global Birdy community where you can contribute to improving our classification AI for more accurate data tracking, manage your collection, and interact with other Birdy users!</p>
      <div className="left-nav-btn-container">
        <button className="left-nav-btn">
          <p className="left-nav-btn-title">Set Up Birdy</p>
          <p className="left-nav-btn-sub">Step-by-Step Instructions</p>
        </button>
        <button className="left-nav-btn">
          <p className="left-nav-btn-title">Create an Account</p>
          <p className="left-nav-btn-sub">Join our Global Community</p>
        </button>
      </div>
    </div>
  )
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

  const [isLeftNavOpen, toggleLeftNavOpened] = useState(true);
  function toggleLeftNav() {
    toggleLeftNavOpened(!isLeftNavOpen);
  }

  return (
    <div>
      <Nav></Nav>
      <div className="main-container">
        <div className="left-nav">
          {isLeftNavOpen &&
            <LeftNavContent></LeftNavContent>
          }
          <button className="nav-slider" onClick={() => toggleLeftNav()}>
            <img src="Panel_Wood_Divider.png" alt="left slider button" className='left-nav-slide-img'></img>
            <img src="Panel_Close_Arrow.png" alt="left slider button arrow"
              className='left-nav-slide-arrow'
              style={{"transform": isLeftNavOpen ? "rotate(0)" : "rotate(180deg)"}}></img>
          </button>
        </div>
        <div className="main-data" style={{"margin-left": isLeftNavOpen ? "370px" : "20px"}}>
          <img src="Background_forest.jfif" alt="background" className='main-bkgd'></img>
          <img src="Filter_Bar.png" alt="filter bar" className="filter-bar"></img>
          {loading && "Loading..."}
          {error && "Error! Please reload the page."}
          {!loading && !error && <Cards data={data}/>}
        </div>
      </div>
    </div>
  );
}

export default App;
