import { useState, useEffect } from 'react';

const DashBoard = () => {
  const [text, setText] = useState('');
  const [animationClass, setAnimationClass] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
      
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
          setUsername(storedUsername);
      }
  }, []);

  useEffect(() => {
    const words = `welcome ${username}...`;
    const delay = 100; // Adjust delay for desired typing speed

    const typeWriter = () => {
      const currentText = text;
      const nextChar = words.charAt(currentText.length);
      setText(currentText + nextChar);

      if (currentText.length === words.length) {
        setAnimationClass(''); // Remove animation after typing is done
      }
    };

    const interval = setInterval(typeWriter, delay);

    return () => clearInterval(interval); // Cleanup on unmount
  });

  return (
    <div className="bg-slate-400 h-screen flex flex-col justify-center items-center">
      <h1 className={`text-[28px] font-serif animate-type ${animationClass}`}>
        {text}
      </h1>
    </div>
  );
};

export default DashBoard;
