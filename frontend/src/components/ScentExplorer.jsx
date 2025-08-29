import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ScentExplorer.css';

const ScentExplorer = ({ onVibeSelect }) => {
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  
  // Quiz questions
  const questions = [
    {
      id: 'vibe',
      question: 'Pick your vibe today',
      options: [
        { value: 'energetic', label: 'Energetic', icon: '⚡', color: '#FFD700' },
        { value: 'romantic', label: 'Romantic', icon: '❤️', color: '#FF69B4' },
        { value: 'mysterious', label: 'Mysterious', icon: '✨', color: '#9370DB' }
      ]
    },
    {
      id: 'occasion',
      question: "What's the occasion?",
      options: [
        { value: 'everyday', label: 'Everyday', icon: '🌞', color: '#87CEEB' },
        { value: 'special', label: 'Special Event', icon: '🎭', color: '#FF6347' },
        { value: 'evening', label: 'Evening Out', icon: '🌙', color: '#483D8B' }
      ]
    },
    {
      id: 'notes',
      question: 'Preferred fragrance notes?',
      options: [
        { value: 'floral', label: 'Floral', icon: '🌸', color: '#DDA0DD' },
        { value: 'woody', label: 'Woody', icon: '🌲', color: '#8B4513' },
        { value: 'citrus', label: 'Citrus', icon: '🍊', color: '#FFA500' }
      ]
    }
  ];

  // Handle option selection
  const handleOptionSelect = (questionId, value) => {
    // Update answers
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // If last question, complete quiz
    if (currentQuestion === questions.length - 1) {
      completeQuiz({ ...answers, [questionId]: value });
    } else {
      // Move to next question
      setCurrentQuestion(prev => prev + 1);
    }
  };

  // Complete quiz and determine result
  const completeQuiz = (finalAnswers) => {
    // Map answers to a vibe
    const vibeMapping = {
      'energetic': {
        everyday: {
          floral: 'fresh',
          woody: 'sporty',
          citrus: 'vibrant'
        },
        special: {
          floral: 'playful',
          woody: 'confident',
          citrus: 'radiant'
        },
        evening: {
          floral: 'exciting',
          woody: 'bold',
          citrus: 'lively'
        }
      },
      'romantic': {
        everyday: {
          floral: 'delicate',
          woody: 'warm',
          citrus: 'sweet'
        },
        special: {
          floral: 'passionate',
          woody: 'sensual',
          citrus: 'charming'
        },
        evening: {
          floral: 'enchanting',
          woody: 'intimate',
          citrus: 'alluring'
        }
      },
      'mysterious': {
        everyday: {
          floral: 'intriguing',
          woody: 'deep',
          citrus: 'enigmatic'
        },
        special: {
          floral: 'captivating',
          woody: 'intense',
          citrus: 'surprising'
        },
        evening: {
          floral: 'seductive',
          woody: 'dark',
          citrus: 'exotic'
        }
      }
    };
    
    // Get the specific vibe based on answers
    const vibe = finalAnswers.vibe;
    const occasion = finalAnswers.occasion;
    const notes = finalAnswers.notes;
    
    // Set the selected vibe
    setSelectedVibe(vibe);
    
    // Call the parent component callback with the detailed vibe
    if (vibeMapping[vibe] && vibeMapping[vibe][occasion] && vibeMapping[vibe][occasion][notes]) {
      const detailedVibe = vibeMapping[vibe][occasion][notes];
      onVibeSelect(detailedVibe, vibe);
    } else {
      // Fallback to main vibe if mapping is incomplete
      onVibeSelect(vibe, vibe);
    }
    
    // Reset quiz
    setIsQuizActive(false);
    setCurrentQuestion(0);
  };

  // Start the quiz
  const startQuiz = () => {
    setIsQuizActive(true);
    setAnswers({});
    setCurrentQuestion(0);
  };

  // Reset the quiz
  const resetQuiz = () => {
    setSelectedVibe(null);
    setIsQuizActive(false);
    setCurrentQuestion(0);
    setAnswers({});
    onVibeSelect(null);
  };

  return (
    <div className="scent-explorer-container">
      {!isQuizActive && (
        <motion.div 
          className="scent-explorer-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Find Your Perfect Scent</h2>
          <p>Take our AI-driven Scent Quiz to discover fragrances that match your personality and preferences.</p>
          <motion.button 
            className="scent-explorer-start-btn"
            onClick={startQuiz}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {selectedVibe ? 'Retake Quiz' : 'Start Scent Quiz'}
          </motion.button>
          
          {selectedVibe && (
            <motion.div 
              className="selected-vibe-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p>Currently showing: <span className="vibe-tag">{selectedVibe}</span> fragrances</p>
              <button className="reset-vibe-btn" onClick={resetQuiz}>Reset</button>
            </motion.div>
          )}
        </motion.div>
      )}
      
      <AnimatePresence mode="wait">
        {isQuizActive && (
          <motion.div 
            className="quiz-container"
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="quiz-question">{questions[currentQuestion].question}</h3>
            
            <div className="quiz-options">
              {questions[currentQuestion].options.map((option) => (
                <motion.button
                  key={option.value}
                  className="quiz-option"
                  style={{
                    '--option-color': option.color
                  }}
                  onClick={() => handleOptionSelect(questions[currentQuestion].id, option.value)}
                  whileHover={{ scale: 1.05, boxShadow: `0 8px 20px ${option.color}40` }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-label">{option.label}</span>
                </motion.button>
              ))}
            </div>
            
            <div className="quiz-progress">
              {questions.map((_, index) => (
                <div 
                  key={index} 
                  className={`progress-dot ${index === currentQuestion ? 'active' : ''} ${index < currentQuestion ? 'completed' : ''}`}
                />
              ))}
            </div>
            
            {currentQuestion > 0 && (
              <button 
                className="back-button"
                onClick={() => setCurrentQuestion(prev => prev - 1)}
              >
                Back
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScentExplorer;