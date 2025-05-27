import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import DriverRegister from './components/DriverRegister';
import Home from './components/Home';
import User from './components/User';
import SignIn from './components/SignIn';
import Driver from './components/Driver'; 
import BookRide from './components/BookRide';
import Payment from  './components/Payment';
import RideRequest from './components/RideRequests';
import CurrentRides from './components/CurrentRides';
import ProfileManagement from './components/ProfileManagement';
import FeedbackForm from './components/FeedbackForm';
import { AuthProvider } from './components/UserContext'; 
import { DriverProvider } from './components/DriverContext'; 

function App() {
  return (
    <AuthProvider>
      <DriverProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/driver" element={<Driver/>} />
            <Route path="/driver_register" element={<DriverRegister />} />
            <Route path="/sign_in" element={<SignIn />} />
            <Route path="/user" element={<User />} />
            <Route path="/book_ride" element={<BookRide />} />
            <Route path="/current_rides" element={<CurrentRides />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/ride_request" element={<RideRequest />} />
            <Route path="/profile_management" element={<ProfileManagement/>} />
            <Route path="/feedback_form" element={<FeedbackForm/>} />






          </Routes>
        </div>
      </DriverProvider>
    </AuthProvider>
  );
}

export default App;
