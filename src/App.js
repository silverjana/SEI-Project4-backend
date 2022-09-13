
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './components/Landing';
import NotFound from './components/NotFound';
import Pricelist from './components/Pricelist';
import Register from './components/Register';
import Login from './components/Login';
import PatientProfile from './components/PatientProfile';
import CaregiversList from './components/CaregiversList';
import CaregiverProfile from './components/CaregiverProfile';
import CreateTask from './components/CreateTask';
import SingleTask from './components/SingleTask';
import UserProfile from './components/userprofile';

function App() {
  return (
    <div className="site-wrapper">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/prices" element={<Pricelist />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/users/:userId" element={<PatientProfile />} />
          <Route path="/caregivers" element={<CaregiversList />} />
          <Route path="/caregivers/:carerId" element={<CaregiverProfile />} />
          <Route path="/:userId/tasks" element={<CreateTask />}/>
          <Route path="/tasks/:taskId" element={<SingleTask />}/>
          {/* <Route path="/" element={< />}/> */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>


  )
}

export default App;
