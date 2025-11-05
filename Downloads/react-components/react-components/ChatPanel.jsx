import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import './ChatPanel.css';
import './Button.css';
import './Input.css';

const ChatPanel = ({ 
  title = 'Chat', 
  placeholder = 'Type your message...', 
  onSendMessage,
  messages = [],
  className = ''
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage?.(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`chat-panel-wrap ${className}`}>
      <div className="chat-panel">
        <div className="chat-panel-content">
          {/* Header */}
          <div className="chat-header">
            <h3 className="chat-title">{title}</h3>
            <div className="chat-status">
              <span className="status-dot"></span>
              <span className="status-text">Active</span>
            </div>
          </div>

          {/* Messages Container */}
          <div className="chat-messages-container" ref={chatContainerRef}>
            <div className="chat-messages">
              {messages.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">💬</span>
                  <p className="empty-text">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <ChatMessage
                    key={msg.id || index}
                    message={msg.message}
                    sender={msg.sender}
                    timestamp={msg.timestamp}
                    avatar={msg.avatar}
                    isAnimating={msg.isAnimating}
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="chat-input-area">
            <div className="input-wrap chat-input-wrap">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                className="chat-input"
              />
              <div className="input-shadow"></div>
            </div>
            <div className="button-wrap chat-send-btn" onClick={handleSend}>
              <button disabled={!inputValue.trim()}>
                <span>Send ➤</span>
              </button>
              <div className="button-shadow"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-panel-shadow"></div>
    </div>
  );
};

export default ChatPanel;


