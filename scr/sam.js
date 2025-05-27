import React from 'react';
import Home from './components/Home';
import About from './About';
import { Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Sample from './Sample';


function App() {
  /* return(
    <div className="App">
<Routes>


<Route path ="/home" element={<Home />} />

<Route path ="/about" element={<About />} />
<Route path ="/login" element={<Login />} />
<Route path ="/register" element={<Register />} />
<Route path ="/register" element={<Register />} />
<Route path ="/Sample" element={<Sample />} />


</Routes>
    </div>
    );*/
    return (
        < Sample />
    )
}

export default App;

