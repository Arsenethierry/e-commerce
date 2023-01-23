import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import {BrowserRouter , Routes , Route, } from 'react-router-dom'
import About from './components/About';
import ErrorPage from './errorPage';
import HomePage from './pages/home-page';
import { ToastContainer } from 'react-toastify'
import CartPage from './pages/cart-page';
import AuthPage from './pages/register-login-page';
import PaymentSuccess from './components/payment/payment-success';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
      <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/auth/register" element={<AuthPage isNewUser={true} />} />
          <Route exact path="/auth/login" element={<AuthPage isNewUser={false}/>} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/checkout-success" element={<PaymentSuccess />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
