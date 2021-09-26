import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Transactions from './components/Transactions/Transactions';

function App() {

  const onNavigate = (path: string) => {
    console.log(path);
  }
  return (
    <div className="app">
      <Router>
        <Link to='/'>Home</Link>
        <Link to='/trans'>Transactions</Link>
        <Switch>
          <Route path="/trans">
            <Transactions />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
