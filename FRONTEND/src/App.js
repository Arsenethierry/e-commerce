import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import {BrowserRouter , Routes , Route, } from 'react-router-dom'
import About from './components/About';
import ErrorPage from './errorPage';
import HomePage from './pages/home-page';
import { ToastContainer } from 'react-toastify'
import CartPage from './pages/cart-page';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
      <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/about" element={<About />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
