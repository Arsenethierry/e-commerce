import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter , Routes , Route, } from 'react-router-dom'
import Cart from './components/Cart';
import About from './components/About';
import ErrorPage from './errorPage';
import HomePage from './pages/home-page';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/about" element={<About />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
