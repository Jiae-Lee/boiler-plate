import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './Home';
import Menu from './service/Menu'
// import './App.css';

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/menu">메뉴</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" component={ Home } exact={true}></Route>
      <Route path="/menu" component={ Menu }></Route>
    </div>
  );
}

export default App;
