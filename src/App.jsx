import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Loading from './Components/Loading';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
const App =() => {
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const timer = setTimeout(()=> {
      setLoading(false);
  /* Loading time in milliseconds */  }, 5000); 
  return () => clearTimeout(timer);
  }, []);
  if(loading) { //if a page gets opened or loaded newly then loading screen will be visible
    return (
      <>
        <Loading />;
      </>
    )
  } //other wise a navbar which will help user to navigate through our services so navbar is the component which is having navigation menu 
  return( //which is loaded after loading component
    <div>
      <Navbar/>
    </div>
  );
};

export default App
