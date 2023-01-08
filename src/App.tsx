import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Transactions from './components/Transactions/Transactions';
import MerkleTree from './components/MerkleTree/MerkleTree/MerkleTree';

function App() {

  const onNavigate = (path: string) => {
    console.log(path);
  }
  return (
    <div className="app">
      <div className="content">
        <Router>
          <Link to='/' className="App-link">Home</Link>
          <Link to='/trans' className="App-link">Transactions</Link>
          <Link to='/tree' className='App-link'>Merkle tree</Link>
          <Switch>
            <Route path="/trans">
              <Transactions />
            </Route>
            <Route path='/tree'>
              <MerkleTree />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
