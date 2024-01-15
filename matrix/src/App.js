import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from "./mainPages/index/indexPage"
import About from './mainPages/about/aboutPage';
import User from './mainPages/user/user';
import Modules from './modulesPages/modules';

// import TestUI from './uiText';
import './App.css';

function App() {
  return (
    <div className="body">
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='about' element={<About />} />
          <Route path='user/*' element={<User />} />
          <Route path='/modules/*' element={<Modules />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
