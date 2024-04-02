import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Twitter = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
    } else {
      const timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleTap = () => {
    if (!gameOver) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setTimeLeft(10);
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Time Left: {timeLeft}</Text>
      <Text style={styles.score}>Score: {score}</Text>
      {gameOver ? (
        <View>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <Text style={styles.finalScore}>Final Score: {score}</Text>
          <TouchableOpacity onPress={handleRestart} style={styles.restartButton}>
            <Text style={styles.restartButtonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={handleTap} style={styles.tapArea}>
          <Text style={styles.tapText}>Tap Me!</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 20,
    marginBottom: 20,
	color:"black"
  },
  score: {
    fontSize: 20,
	color:"black",
    marginBottom: 20,
  },
  tapArea: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    backgroundColor: 'lightblue',
	color:"black",
    borderRadius: 75,
  },
  tapText: {
	color:"black",
    fontSize: 20,
  },
  gameOverText: {
    fontSize: 30,
	color:"black",
	textAlign:"center",

    marginBottom: 20,
  },
  finalScore: {
    fontSize: 20,
	color:"black",
    marginBottom: 20,
	textAlign:"center",

  },
  restartButton: {
    backgroundColor: 'lightblue',
	color:"black",
    padding: 10,
    borderRadius: 5,
  },
  restartButtonText: {
	color:"black",
	textAlign:"center",
    fontSize: 20,
  },
});

export default Twitter;
