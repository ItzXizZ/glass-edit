import React, { useState } from 'react';
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
import ChatMessage from './ChatMessage';
import ChatPanel from './ChatPanel';

function Dev() {
  const [chatMessages, setChatMessages] = useState([
    { id: 1, message: 'Hello! How can I help you today?', sender: 'ai', timestamp: '2:30 PM', avatar: '🤖' },
    { id: 2, message: 'Hi! I need help with my project.', sender: 'user', timestamp: '2:31 PM', avatar: '👤' }
  ]);

  const handleSendMessage = (message) => {
    const newMessage = {
      id: chatMessages.length + 1,
      message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: '👤'
    };
    setChatMessages([...chatMessages, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatMessages.length + 2,
        message: 'I received your message! This is a demo response.',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: '🤖'
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div style={{ 
      width: '100%',
      minHeight: '100vh',
      margin: 0,
      padding: '2rem',
      paddingBottom: '4rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '3rem',
      fontSize: 'clamp(1rem, 2vw, 1.25rem)',
      backgroundColor: 'rgba(215, 215, 215, 1)',
      fontFamily: '"Inter", sans-serif',
      position: 'relative',
    }}>
      {/* Background pattern SVG */}
      <svg style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dottedGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(0,0,0,0.15)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dottedGrid)" />
      </svg>

      {/* Header */}
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        textAlign: 'center',
        marginTop: '2rem'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: '700',
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          React Component Library
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#666',
          margin: 0
        }}>
          A collection of beautiful glassmorphic UI components
        </p>
      </div>

      {/* Navigation Section */}
      <section style={{ 
        position: 'relative', 
        zIndex: 1, 
        width: '100%', 
        maxWidth: '1200px',
        marginTop: '2rem'
      }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: '600', 
          marginBottom: '1.5rem',
          color: '#333',
          textAlign: 'center'
        }}>
          Navigation
        </h2>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          width: '100%'
        }}>
          <Navigation />
        </div>
      </section>

      {/* Buttons Section */}
      <section style={{ 
        position: 'relative', 
        zIndex: 1, 
        width: '100%', 
        maxWidth: '1200px'
      }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: '600', 
          marginBottom: '1.5rem',
          color: '#333',
          textAlign: 'center'
        }}>
          Buttons
        </h2>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          gap: '2rem'
        }}>
          <Button />
        </div>
      </section>

      {/* Form Controls Section */}
      <section style={{ 
        position: 'relative', 
        zIndex: 1, 
        width: '100%', 
        maxWidth: '1200px'
      }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: '600', 
          marginBottom: '1.5rem',
          color: '#333',
          textAlign: 'center'
        }}>
          Form Controls
        </h2>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '2rem',
          width: '100%'
        }}>
          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '500', 
              marginBottom: '1rem',
              color: '#555',
              textAlign: 'center'
            }}>
              Input Fields
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '2rem'
            }}>
              <Input />
            </div>
          </div>

          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '500', 
              marginBottom: '1rem',
              color: '#555',
              textAlign: 'center'
            }}>
              Textarea
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '2rem'
            }}>
              <Textarea />
            </div>
          </div>

          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '500', 
              marginBottom: '1rem',
              color: '#555',
              textAlign: 'center'
            }}>
              Select Dropdown
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '2rem'
            }}>
              <Select />
            </div>
          </div>

          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '500', 
              marginBottom: '1rem',
              color: '#555',
              textAlign: 'center'
            }}>
              Checkbox
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '2rem'
            }}>
              <Checkbox />
            </div>
          </div>

          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '500', 
              marginBottom: '1rem',
              color: '#555',
              textAlign: 'center'
            }}>
              Radio Buttons
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '2rem'
            }}>
              <Radio />
            </div>
          </div>

          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '500', 
              marginBottom: '1rem',
              color: '#555',
              textAlign: 'center'
            }}>
              Toggle Switch
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '2rem'
            }}>
              <Toggle />
            </div>
          </div>

          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '500', 
              marginBottom: '1rem',
              color: '#555',
              textAlign: 'center'
            }}>
              Slider
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '2rem'
            }}>
              <Slider />
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section style={{ 
        position: 'relative', 
        zIndex: 1, 
        width: '100%', 
        maxWidth: '1200px'
      }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: '600', 
          marginBottom: '1.5rem',
          color: '#333',
          textAlign: 'center'
        }}>
          Feedback Components
        </h2>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '2rem',
          width: '100%'
        }}>
          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '500', 
              marginBottom: '1rem',
              color: '#555',
              textAlign: 'center'
            }}>
              Alerts
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '2rem'
            }}>
              <Alert />
            </div>
          </div>

          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '500', 
              marginBottom: '1rem',
              color: '#555',
              textAlign: 'center'
            }}>
              Progress Bars
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexDirection: 'column',
              gap: '2rem'
            }}>
              <Progress />
            </div>
          </div>

          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '500', 
              marginBottom: '1rem',
              color: '#555',
              textAlign: 'center'
            }}>
              Badges
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '2rem'
            }}>
              <Badge />
            </div>
          </div>

          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '500', 
              marginBottom: '1rem',
              color: '#555',
              textAlign: 'center'
            }}>
              Tooltip
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '2rem'
            }}>
              <Tooltip />
            </div>
          </div>
        </div>
      </section>

      {/* Layout Section */}
      <section style={{ 
        position: 'relative', 
        zIndex: 1, 
        width: '100%', 
        maxWidth: '1200px'
      }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: '600', 
          marginBottom: '1.5rem',
          color: '#333',
          textAlign: 'center'
        }}>
          Layout Components
        </h2>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '2rem',
          width: '100%'
        }}>
          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '500', 
              marginBottom: '1rem',
              color: '#555',
              textAlign: 'center'
            }}>
              Card
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '2rem'
            }}>
              <Card />
            </div>
          </div>

          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '500', 
              marginBottom: '1rem',
              color: '#555',
              textAlign: 'center'
            }}>
              Modal
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '2rem'
            }}>
              <Modal />
            </div>
          </div>
        </div>
      </section>

      {/* Chat Components Section */}
      <section style={{ 
        position: 'relative', 
        zIndex: 1, 
        width: '100%', 
        maxWidth: '1200px'
      }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: '600', 
          marginBottom: '1.5rem',
          color: '#333',
          textAlign: 'center'
        }}>
          Chat Components
        </h2>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '2rem',
          width: '100%'
        }}>
          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '500', 
              marginBottom: '1rem',
              color: '#555',
              textAlign: 'center'
            }}>
              Chat Messages
            </h3>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center',
              width: '100%',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <ChatMessage 
                message="Hello! This is a user message." 
                sender="user" 
                timestamp="2:30 PM"
                avatar="👤"
              />
              <ChatMessage 
                message="Hi there! This is an AI assistant response with some helpful information." 
                sender="ai" 
                timestamp="2:31 PM"
                avatar="🤖"
              />
              <ChatMessage 
                message="This is a system notification" 
                sender="system"
              />
            </div>
          </div>

          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '500', 
              marginBottom: '1rem',
              color: '#555',
              textAlign: 'center'
            }}>
              Chat Panel
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              width: '100%'
            }}>
              <ChatPanel 
                title="AI Assistant"
                placeholder="Type your message..."
                messages={chatMessages}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        position: 'relative', 
        zIndex: 1, 
        textAlign: 'center',
        marginTop: '3rem',
        marginBottom: '2rem',
        color: '#666'
      }}>
        <p>Built with React &amp; CSS</p>
      </footer>
    </div>
  );
}

export default Dev;


