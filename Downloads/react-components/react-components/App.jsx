import React from 'react';
import Button from './Button';
import Card from './Card';
import Toggle from './Toggle';
import Input from './Input';
import Textarea from './Textarea';
import Checkbox from './Checkbox';
import Radio from './Radio';
import Badge from './Badge';
import Alert from './Alert';
import Progress from './Progress';
import Tooltip from './Tooltip';
import Modal from './Modal';
import Navigation from './Navigation';
import Slider from './Slider';
import Select from './Select';

function App() {
  return (
    <div style={{ 
      width: '100%',
      minHeight: '100vh',
      margin: 0,
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      fontSize: 'clamp(1rem, 2vw, 1.25rem)',
      backgroundColor: 'rgba(215, 215, 215, 1)',
      fontFamily: '"Inter", sans-serif',
    }}>
      {/* Background pattern SVG */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dottedGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(0,0,0,0.15)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dottedGrid)" />
      </svg>

      {/* Components */}
      <Button />
      <Card />
      <Toggle />
      <Input />
      <Textarea />
      <Checkbox />
      <Radio />
      <Badge />
      <Alert />
      <Progress />
      <Tooltip />
      <Modal />
      <Navigation />
      <Slider />
      <Select />
    </div>
  );
}

export default App;
