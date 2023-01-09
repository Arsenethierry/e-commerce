import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter , Routes , Route, createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/Home';
import Cart from './components/Cart';
import About from './components/About';
import ErrorPage from './errorPage';

function App() {
const router = createBrowserRouter([
  {
    path: '/',
    exact: true,
    element: <Home />,
  },
  {
    path: '/about',
    exact: true,
    element: <About />,
  },
  {
    path: '/cart',
    exact: true,
    element: <Cart />,
  },
  {
    path: '/',
    errorElement: <ErrorPage />,
  }
])
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/about" element={<About />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      {/* <h1>Appp</h1>
      {/* <RouterProvider router={router} /> */}
    </div>
  );
}

export default App;
