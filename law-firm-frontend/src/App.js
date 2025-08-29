import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import AdminLogin from './components/AdminDashboard/AdminLogin';
import TeamList from './components/AdminDashboard/TeamList.js'
import Team from './components/Team';
import TeamProfile from './components/TeamProfile';
import Booking from './components/Booking';
import ProtectedRoute from "./components/AdminDashboard/ProtectedRoute.js";
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<><Hero /><About /><Footer /></>} />
        <Route path="/services" element={<Services />} />
        <Route path="/team" element={<Team />} />
        <Route path="/team/:teamId" element={<TeamProfile />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/team" element={<TeamList />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}/>
        <Route path="/blog/:postId" element={<BlogPost />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;