import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?page=1&results=1&seed=abc');
        const data = await response.json();
        setUserData(data.results[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const fadeAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 800 },
  });

  const hireMeAnimation = useSpring({
    opacity: isHovered ? 1 : 0,
  });

  return (
    <div className="App">
      <header className="App-header">
        {userData && (
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <animated.img
              src={userData.picture.large}
              className="App-logo"
              alt="user"
              style={fadeAnimation}
            />
            <div style={{ textAlign: 'left', marginLeft: '20px' }}>
              <animated.p style={fadeAnimation}>Name: {userData.name.first} {userData.name.last}</animated.p>
              <animated.p style={fadeAnimation}>Gender: {userData.gender}</animated.p>
              <animated.p style={fadeAnimation}>Phone Number: {userData.phone}</animated.p>
              <animated.p style={hireMeAnimation}>Hire Me</animated.p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
