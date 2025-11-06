import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message, sender = 'user', timestamp, avatar, isAnimating = false }) => {
  const isUser = sender === 'user';
  const isAI = sender === 'ai';
  const isSystem = sender === 'system';

  return (
    <div className={`chat-message-wrap ${isUser ? 'user-message' : ''} ${isAI ? 'ai-message' : ''} ${isSystem ? 'system-message' : ''} ${isAnimating ? 'animating' : ''}`}>
      <div className="chat-message">
        <div className="chat-message-content">
          {!isSystem && (
            <div className="message-header">
              {avatar && <div className="message-avatar">{avatar}</div>}
              <div className="message-info">
                <span className="message-sender">{isUser ? 'You' : isAI ? 'AI Assistant' : sender}</span>
                {timestamp && <span className="message-time">{timestamp}</span>}
              </div>
            </div>
          )}
          <div className="message-text">{message}</div>
        </div>
      </div>
      <div className="chat-message-shadow"></div>
    </div>
  );
};

export default ChatMessage;



