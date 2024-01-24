import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from "./mainPages/index/indexPage"
import About from './mainPages/about/aboutPage';
import User from './mainPages/user/user';
import Modules from './modulesPages/modules';
import Tables from './modulesPages/tables/tables';

import './App.css';

function App() {
  return (
    <div>
      <Router className="body">
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='about' element={<About />} />
          <Route path='users/*' element={<User />} />
          <Route path='/modules/*' element={<Modules />} />
          <Route path='/tables/*' element={<Tables/>} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
