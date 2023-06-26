import React, { useState, useEffect } from 'react'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Footer from './components/Footer';

function App() {
  const [color, setColor] = useState("light")
  const [device, setDevice] = useState("mobile")
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [actionsChosen, setActionsChosen] = useState("All")

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize < 600) {
      setDevice("mobile")
    } else {
      setDevice("desktop")
    }
  }, [windowSize]);


  useEffect(() => {
    document.body.style.backgroundImage = `url(/images/bg-${device}-${color}.jpg)`
  }, [device, color])

  useEffect(() => {
    if (color === "light") {
      document.body.style.backgroundColor = `var(--very-light-gray)`
    } else {
      document.body.style.backgroundColor = `var(--very-vark-blue)`
    }
  }, [device, color])

  return (
    <>
      <Header
        color={color} setColor={setColor}
      />
      <Tasks
        color={color}
        actionsChosen={actionsChosen}
        setActionsChosen={setActionsChosen}
      />
      <Footer
        color={color}
        actionsChosen={actionsChosen}
        setActionsChosen={setActionsChosen}
      />
    </>
  );
}

export default App;
