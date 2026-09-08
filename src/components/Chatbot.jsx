import { useState } from 'react';
import { getTheme, crimson, crimsonBright } from '../theme.js';

function Chatbot({ isDarkMode }) {
  const theme = getTheme(isDarkMode);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome to LinConference Hub. How may I assist you?' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(text) {
    if (text.trim() === '') return;

    const userMessage = { sender: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: "I'm having trouble connecting right now — please try again shortly." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {isOpen && (
        <div
          className="mb-3 w-[85vw] max-w-80 border-2 rounded-sm flex flex-col overflow-hidden shadow-2xl animate-fade-in-up"
          style={{ backgroundColor: theme.panel, borderColor: theme.accent }}
        >
          <div className="px-4 py-3 font-['Bodoni_Moda'] text-sm uppercase tracking-widest text-center border-b" style={{ backgroundColor: theme.panelAlt, color: crimson, borderColor: theme.border }}>
            LinConference Concierge
          </div>

          <div className="flex-1 p-3 space-y-2 max-h-80 overflow-y-auto" style={{ backgroundColor: theme.bg }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className="animate-fade-in-up text-sm font-['Montserrat'] p-2.5 rounded-sm max-w-[85%]"
                style={
                  msg.sender === 'bot'
                    ? { backgroundColor: theme.panelAlt, color: theme.text }
                    : { backgroundColor: crimsonBright, color: '#fff', marginLeft: 'auto' }
                }
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="text-sm font-['Montserrat'] p-2.5 rounded-sm max-w-[85%]" style={{ backgroundColor: theme.panelAlt, color: theme.muted }}>
                Thinking...
              </div>
            )}
          </div>

          <div className="p-2 flex gap-2 flex-wrap border-t" style={{ borderColor: theme.border, backgroundColor: theme.panel }}>
            <button
              onClick={() => sendMessage('What AI conferences are coming up?')}
              className="text-xs font-['Montserrat'] uppercase tracking-wide px-2 py-1 border hover:scale-105 transition-all duration-200"
              style={{ borderColor: theme.border, color: theme.muted }}
            >
              AI conferences
            </button>
            <button
              onClick={() => sendMessage('How do I register?')}
              className="text-xs font-['Montserrat'] uppercase tracking-wide px-2 py-1 border hover:scale-105 transition-all duration-200"
              style={{ borderColor: theme.border, color: theme.muted }}
            >
              How to register
            </button>
          </div>

          <div className="p-2 border-t flex gap-2" style={{ borderColor: theme.border, backgroundColor: theme.panel }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputText)}
              placeholder="Type a message..."
              className="flex-1 min-w-0 border rounded-sm px-3 py-1.5 text-sm font-['Montserrat'] focus:outline-none transition-colors"
              style={{ backgroundColor: theme.bg, borderColor: theme.border, color: theme.text }}
            />
            <button
              onClick={() => sendMessage(inputText)}
              disabled={isLoading}
              className="shrink-0 px-3 py-1.5 rounded-sm text-xs font-['Montserrat'] font-bold uppercase hover:scale-105 transition-all duration-200"
              style={{ backgroundColor: theme.accent, color: '#150A0A' }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 relative ${isOpen ? '' : 'animate-float'}`}
        style={{ backgroundColor: theme.panel, borderColor: theme.accent, color: theme.accent }}
      >
        <div className="absolute inset-1 rounded-full border opacity-30" style={{ borderColor: theme.accent }}></div>
        <span className="text-xl sm:text-2xl relative">{isOpen ? '✕' : '✦'}</span>
      </button>
    </div>
  );
}

export default Chatbot;