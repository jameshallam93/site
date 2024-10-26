import "./index.css"
import React from "react";
import { useEffect, useState } from "react";
import Sudoku from "./components/Sudoko";
import { Showcase } from "./components/Showcase";

function Lorem() {
  return(
    <div className="flex flex-col justify-center justify-items-center items-center">
      <p className="text-white text-3xl px-10 py-3 text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <p className="text-white text-3xl px-10 py-3 text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <p className="text-white text-3xl px-10 py-3 text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <p className="text-white text-3xl px-10 py-3 text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      </div>
  )
  }

function App() {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  };
  const [scrollY, setScrollY] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [yHeight, setYHeight] = useState(windowDimensions.height > 1000 ? 250 : 120);
  const [yOffset, setYOffset] = useState(windowDimensions.height > 400 ? -200 : -300 )
  

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
      setYHeight(windowDimensions.height > 1000 ? 250 : 120);
      setYOffset(windowDimensions.height > 400 ? -200 : -300 )
    };
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  })
  // Handle scroll event
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div className="h-auto bg-black">
      <div className="container h-full w-full  flex flex-col-reverse">
        <div className={`sticky-element w-screen flex h-screen z-0`} style={{
          transform: `translateY(${Math.max(yOffset +(-1.1 * scrollY), -800)}px)`,
          opacity: (yHeight-scrollY)/100,
        }}>
          <h1 className="text-7xl sm:text-1xl pb-20 pl-5  self-end text-white font-mono">James Hallam</h1>
        </div>
        <div className={`sticky-element w-screen flex flex-col-reverse`} style={{
          transform: `translateY(${Math.min(1.5 * scrollY, 800)}px)`,
          opacity: (yHeight-scrollY)/100,
        }}>
          <a
            style={{pointerEvents:scrollY > 250 ? "none": "auto" }}
            href="https://www.linkedin.com/in/james-hallam-73777753/"
            className="text-1xl self-end pr-20 text-terminal font-mono hover:text-white"
          >
            Linkedin
          </a>
          <a
            style={{pointerEvents:scrollY > 250 ? "none": "auto" }}
            href="https://github.com/jameshallam93"
            className="text-1xl self-end pr-20 text-terminal font-mono hover:text-white"
          >
            Github
          </a>
          <h1 className="text-6xl self-end py-10 px-10  text-white font-mono">Fullstack Platform Engineer</h1>
        </div>
      </div>
      <div className="bg-black z-1 flex md:flex-row flex-col justify-evenly items-between">
        <div className="content flex flex-col">
          <p className="text-slate-300 text-3xl px-10 py-3">
            Fullstack platform engineer with experience working in frontend and factory automation.
          </p>
          <p className="text-slate-300 text-3xl px-10 py-3">
            Proven track record of delivering high quality software solutions to meet business needs.
          </p>
          <p className="text-slate-300 text-3xl px-10 py-3">
            Exceptional problem solving skills and analytical thinking ability.
          </p>
          <p className="text-slate-300 text-3xl px-10 py-3">
            Dabbler in machine learning and game development.
          </p>
          <p className="text-slate-300 text-3xl px-10 py-3">
            I like making cool things.
          </p>
        </div>
        <div className="h-40 sm:h-20 md:h-0"/>
        <div className="bg-black m-3 pb-8 mr-10 flex flex-col items-center align-center justify-end" style={{zIndex:10}}>
          <Sudoku />
        </div>
      </div>
        <Showcase />
    </div>
  );
}

export default App;