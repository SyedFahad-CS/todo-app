import { useState, useEffect, useRef } from 'react';

const CountdownTimer = () => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(5);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [theme, setTheme] = useState('indigo');
  const [showNotification, setShowNotification] = useState(false);
  const timerRef = useRef(null);
  
  // Calculate total initial time in seconds for progress bar
  const totalInitialTime = useRef((inputMinutes * 60) + inputSeconds);
  const remainingTime = (minutes * 60) + seconds;
  const progress = remainingTime > 0 ? (remainingTime / totalInitialTime.current) * 100 : 0;

  // Color themes
  const themes = {
    indigo: {
      gradient: 'from-indigo-500 to-purple-600',
      button: 'bg-indigo-500 hover:bg-indigo-600',
      accent: 'bg-purple-500',
      text: 'text-indigo-100',
      scribbles: 'text-indigo-300/50'
    },
    emerald: {
      gradient: 'from-emerald-500 to-teal-600',
      button: 'bg-emerald-500 hover:bg-emerald-600',
      accent: 'bg-teal-500',
      text: 'text-emerald-100',
      scribbles: 'text-emerald-300/50'
    },
    rose: {
      gradient: 'from-rose-500 to-pink-600',
      button: 'bg-rose-500 hover:bg-rose-600',
      accent: 'bg-pink-500',
      text: 'text-rose-100',
      scribbles: 'text-rose-300/50'
    },
    amber: {
      gradient: 'from-amber-500 to-orange-600',
      button: 'bg-amber-500 hover:bg-amber-600',
      accent: 'bg-orange-500',
      text: 'text-amber-100',
      scribbles: 'text-amber-300/50'
    },
  };

  // Effect to handle the countdown logic
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(timerRef.current);
          setIsActive(false);
          setCompletedCycles(prev => prev + 1);
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, minutes, seconds]);

  // Start or pause the timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Reset the timer
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(inputMinutes);
    setSeconds(inputSeconds);
    totalInitialTime.current = (inputMinutes * 60) + inputSeconds;
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Handle minutes input change
  const handleMinutesChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setInputMinutes(value);
    if (!isActive) {
      setMinutes(value);
      totalInitialTime.current = (value * 60) + inputSeconds;
    }
  };

  // Handle seconds input change
  const handleSecondsChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    const normalizedValue = value > 59 ? 59 : value;
    setInputSeconds(normalizedValue);
    if (!isActive) {
      setSeconds(normalizedValue);
      totalInitialTime.current = (inputMinutes * 60) + normalizedValue;
    }
  };

  // Change theme
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  // Format time display
  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  // Scribble SVG components for the background
  const ScribbleWavyLine = ({ className }) => (
    <svg 
      viewBox="0 0 200 100" 
      className={`absolute ${className} ${themes[theme].scribbles}`}
    >
      <path 
        d="M0,50 C20,30 40,70 60,50 S80,30 100,50 S120,70 140,50 S160,30 180,50 S200,70 220,50" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
    </svg>
  );

  const ScribbleSpiral = ({ className }) => (
    <svg 
      viewBox="0 0 100 100" 
      className={`absolute ${className} ${themes[theme].scribbles}`}
    >
      <path 
        d="M50,90 C30,90 20,70 20,50 C20,30 30,20 50,20 C70,20 80,30 80,50 C80,65 70,70 50,70 C35,70 30,65 30,50 C30,40 35,35 50,35 C60,35 65,40 65,50 C65,58 60,60 50,60 C45,60 40,58 40,50 C40,45 43,43 50,43" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
    </svg>
  );

  const ScribbleZigZag = ({ className }) => (
    <svg 
      viewBox="0 0 200 100" 
      className={`absolute ${className} ${themes[theme].scribbles}`}
    >
      <path 
        d="M0,20 L20,80 L40,20 L60,80 L80,20 L100,80 L120,20 L140,80 L160,20 L180,80 L200,20" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ScribbleCircles = ({ className }) => (
    <svg 
      viewBox="0 0 200 200" 
      className={`absolute ${className} ${themes[theme].scribbles}`}
    >
      <circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
      <circle cx="160" cy="60" r="15" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="70" cy="150" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="150" cy="150" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="2,4" />
    </svg>
  );

  const ScribbleSquiggly = ({ className }) => (
    <svg 
      viewBox="0 0 200 100" 
      className={`absolute ${className} ${themes[theme].scribbles}`}
    >
      <path 
        d="M10,40 C30,10 30,70 50,40 C70,10 70,70 90,40 C110,10 110,70 130,40 C150,10 150,70 170,40 C190,10 190,70 210,40" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
    </svg>
  );

  const ScribbleStars = ({ className }) => (
    <svg 
      viewBox="0 0 240 120" 
      className={`absolute ${className} ${themes[theme].scribbles}`}
    >
      {[
        [30, 30, 10], [70, 50, 8], [110, 25, 12],
        [150, 60, 7], [190, 40, 9], [210, 80, 11]
      ].map(([cx, cy, r], i) => (
        <path 
          key={i}
          d={`M${cx},${cy-r} L${cx+r*0.22},${cy-r*0.33} L${cx+r},${cy-r*0.11} L${cx+r*0.44},${cy+r*0.11} L${cx+r*0.55},${cy+r} L${cx},${cy+r*0.55} L${cx-r*0.55},${cy+r} L${cx-r*0.44},${cy+r*0.11} L${cx-r},${cy-r*0.11} L${cx-r*0.22},${cy-r*0.33} Z`} 
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );

  const ScribbleDots = ({ className }) => (
    <svg 
      viewBox="0 0 200 200" 
      className={`absolute ${className} ${themes[theme].scribbles}`}
    >
      {Array.from({ length: 40 }, (_, i) => {
        const x = 10 + (i % 8) * 25;
        const y = 10 + Math.floor(i / 8) * 25;
        const radius = 2 + Math.random() * 4;
        return (
          <circle 
            key={i} 
            cx={x} 
            cy={y} 
            r={radius} 
            fill="currentColor"
          />
        );
      })}
    </svg>
  );

  const ScribbleTriangles = ({ className }) => (
    <svg 
      viewBox="0 0 200 100" 
      className={`absolute ${className} ${themes[theme].scribbles}`}
    >
      <path d="M20,80 L40,30 L60,80 Z" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M80,80 L100,30 L120,80 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,3" />
      <path d="M140,80 L160,30 L180,80 Z" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );

  const ScribbleClouds = ({ className }) => (
    <svg 
      viewBox="0 0 240 120" 
      className={`absolute ${className} ${themes[theme].scribbles}`}
    >
      <path 
        d="M30,60 C30,50 40,40 50,40 C60,30 75,30 85,40 C95,35 110,35 120,45 C130,30 150,30 160,45 C170,35 190,35 200,50 C210,45 220,55 210,65 C220,75 210,85 200,80 C200,90 180,95 170,85 C160,95 140,95 130,85 C120,95 100,95 90,85 C80,95 60,95 50,85 C40,90 30,80 30,70 C20,65 20,55 30,60 Z" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className={`flex flex-col items-center justify-center h-dvh bg-gradient-to-br ${themes[theme].gradient} p-4 font-sans relative overflow-hidden`}>
      {/* Background Scribbles */}
      <ScribbleWavyLine className="top-10 left-0 w-64 h-32 transform rotate-12" />
      <ScribbleSpiral className="top-20 right-10 w-40 h-40 transform -rotate-6" />
      <ScribbleZigZag className="bottom-20 left-16 w-56 h-28 transform -rotate-3" />
      <ScribbleCircles className="top-1/4 left-1/2 w-48 h-48 transform -translate-x-1/2" />
      <ScribbleSquiggly className="bottom-16 right-0 w-64 h-32 transform rotate-6" />
      <ScribbleStars className="top-1/3 right-1/4 w-48 h-24" />
      <ScribbleDots className="bottom-1/3 left-1/4 w-40 h-40 transform rotate-12" />
      <ScribbleTriangles className="top-2/3 right-10 w-48 h-24 transform -rotate-6" />
      <ScribbleClouds className="top-10 left-1/3 w-64 h-32" />
      <ScribbleWavyLine className="bottom-12 left-1/2 w-56 h-28 transform -translate-x-1/2 rotate-180" />
      <ScribbleTriangles className="top-2/3 right-10 w-48 h-24 transform -rotate-6" />
      <ScribbleClouds className="top-10 left-1/3 w-64 h-32" />
      <ScribbleWavyLine className="bottom-12 left-1/2 w-56 h-28 transform -translate-x-1/2 rotate-180" />
      
      {/* Theme selector */}
      <div className="absolute top-4 right-4 flex space-x-2 z-10">
        {Object.keys(themes).map((themeName) => (
          <button
            key={themeName}
            onClick={() => changeTheme(themeName)}
            className={`w-6 h-6 md:w-8 md:h-8 rounded-full transition-transform ${
              theme === themeName ? 'scale-125 ring-2 ring-white' : ''
            } bg-gradient-to-br ${themes[themeName].gradient}`}
            aria-label={`${themeName} theme`}
          />
        ))}
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-lg w-full max-w-md relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-white font-sans tracking-tight">Countdown Timer</h1>
        
        {/* Timer Display */}
        <div className="flex justify-center items-center mb-6">
          <div className="text-6xl md:text-8xl font-inter tracking-tighter text-white tabular-nums">
            {formatTime(minutes)}:{formatTime(seconds)}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-3 mb-6">
          <div 
            className={`h-3 rounded-full ${themes[theme].accent} transition-all duration-300 ease-out`}
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Stats */}
        <div className="flex justify-between mb-6 text-white text-xs md:text-sm font-medium">
          <div>Completed: <span className="font-bold">{completedCycles}</span></div>
          <div>Total Time: <span className="font-bold">{Math.floor(totalInitialTime.current / 60)}:{formatTime(totalInitialTime.current % 60)}</span></div>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Input for setting time */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="flex flex-col">
              <label htmlFor="minutes" className="text-xs md:text-sm text-white mb-1 font-medium">Minutes</label>
              <input
                id="minutes"
                type="number"
                min="0"
                max="99"
                value={inputMinutes}
                onChange={handleMinutesChange}
                className="bg-white/20 rounded-lg px-2 py-2 text-base md:text-lg text-center text-white"
                disabled={isActive}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="seconds" className="text-xs md:text-sm text-white mb-1 font-medium">Seconds</label>
              <input
                id="seconds"
                type="number"
                min="0"
                max="59"
                value={inputSeconds}
                onChange={handleSecondsChange}
                className="bg-white/20 rounded-lg px-2 py-2 text-base md:text-lg text-center text-white"
                disabled={isActive}
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <button
              onClick={toggleTimer}
              className={`py-3 md:py-4 px-4 md:px-6 rounded-lg text-base md:text-lg font-medium transition-all transform active:scale-95 shadow-lg text-white ${
                isActive 
                  ? 'bg-amber-500 hover:bg-amber-600' 
                  : `${themes[theme].button}`
              }`}
            >
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetTimer}
              className="bg-blue-500 hover:bg-blue-600 py-3 md:py-4 px-4 md:px-6 rounded-lg text-base md:text-lg font-medium transition-all transform active:scale-95 shadow-lg text-white"
            >
              Reset
            </button>
          </div>
          
          {/* Quick Preset Buttons */}
          <div className="grid grid-cols-4 gap-2 mt-1">
            {[1, 3, 5, 10].map(preset => (
              <button
                key={preset}
                onClick={() => {
                  setInputMinutes(preset);
                  setInputSeconds(0);
                  if (!isActive) {
                    setMinutes(preset);
                    setSeconds(0);
                    totalInitialTime.current = preset * 60;
                  }
                }}
                className="py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs md:text-sm font-medium text-white transition-colors"
                disabled={isActive}
              >
                {preset}m
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Notification */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 md:p-4 flex items-center animate-bounce max-w-xs z-20">
          <div className="bg-green-500 rounded-full p-1 md:p-2 mr-2 md:mr-3 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm md:text-base">Timer Complete!</h3>
            <p className="text-gray-700 text-xs md:text-sm">Your countdown has finished</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;