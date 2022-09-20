import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Nav() {
  return (
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">

      <a class="navbar-item">
        <form>
          <input type="text" class="input" placeholder="Search..."/>
        </form>
      </a>

    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <span class="icon is-large fa-2x">
          <i class="fa-solid fa-earth-africa"></i>
        </span>
        <span class="icon is-large fa-2x">
          <i class="fa-solid fa-house"></i>
        </span>
        <span class="icon is-large fa-2x">
          <i class="fa-solid fa-heart"></i>
        </span>
        <span class="icon is-large">
          <span class="fa-stack fa-lg">
            <i class="fa-regular fa-user fa-stack-1x"></i>
            <i class="fa-regular fa-circle fa-stack-2x"></i>
          </span>
        </span>
      </div>
      <div class="navbar-item">
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

function Table() {
  return (
    <table class="table is-fullwidth">
      <tr>
        <td rowspan="2">
          Image...
        </td>
        <th>
          Sparrow 78%
        </th>
      </tr>
      <tr>
        <td>Data</td>
      </tr>
    </table>
  );
}

function App() {
  return (
    <div>
    <Nav></Nav>
    <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-one-fifth">
          <p class="subtitle">Welcome to Birdy!</p>
        </div>
        <div class="column">
          <Table/>
        </div>
      </div>
    </div>
  </section>
  </div>
  );
}

export default App;
