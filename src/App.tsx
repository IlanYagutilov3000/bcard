import React, { createContext, useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/Aboout';
import Login from './components/Login';
import Signup from './components/Signup';
import PageNotFound from './components/PageNotFound';
import MyCards from './components/MyCards';
import FavCards from './components/FavCards';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/userContext';
import SandBox from './components/SandBox';
import { SearchProvider } from './context/SeachContext';
import CardDetails from './components/CardDetails';

const themes = {
  light: {
    color: "black",
    background: "white"
  },
  dark: {
    color: "white",
    background: "#040D12"
  }
}

export const SiteTheme = createContext(themes.light)

function App() {
  const savedTheme = localStorage.getItem("theme");
  const [darkMode, setDarkMode] = useState<boolean>(savedTheme === "dark");

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="App" style={{ backgroundColor: darkMode ? themes.dark['background'] : themes.light['background'], color: darkMode ? themes.dark['color'] : themes.light['color'] }}>
      <UserProvider>
        <ToastContainer />
        <SearchProvider>
          <Router>
            <SiteTheme.Provider value={darkMode ? themes.dark : themes.light}>
              <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/my-cards' element={<MyCards />} />
                <Route path='/fav-cards' element={<FavCards />} />
                <Route path=':id' element={<CardDetails />} />
                <Route path='/sandbox' element={<SandBox />} />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
              <Footer />
            </SiteTheme.Provider>
          </Router>
        </SearchProvider>
      </UserProvider>
    </div>
  );
}

export default App;
