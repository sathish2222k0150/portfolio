import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import chatIcon from './assets/Images/Graident Ai Robot.jpg';

const ChatbotWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const y = useMotionValue(0);
  const rotate = useTransform(y, [0, 100], [0, 10]);
  const scale = useTransform(y, [0, 100], [1, 1.05]);

  useEffect(() => {
    const handleScroll = () => {
      y.set(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [y]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Floating animation for the chat icon
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <>
      {/* Animated Chat Icon Button with Parallax */}
      <motion.div 
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          cursor: 'pointer',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#2c3e50',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          y: useTransform(y, [0, 500], [0, -50]), // Parallax effect
          rotate, // Rotation based on scroll
          scale // Scale based on scroll
        }}
        animate={floatingAnimation}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.img 
          src={chatIcon} 
          alt="Chat" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
            filter: 'invert(0)',
            rotate: useTransform(y, [0, 500], [0, -5]) // Opposite rotation for inner image
          }} 
        />
      </motion.div>

      {/* Animated Chatbot Iframe */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '20px',
              zIndex: 1000,
              width: '350px',
              height: '500px',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          >
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/3BhyMpkaMCZR53YtY2ifB"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              title="Chatbot"
              allow="microphone"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;