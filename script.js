import * as tf from '@tensorflow/tfjs';

// Neural Network Class for LiTe AI
class NeuralNetwork {
  constructor() {
    this.model = null;
    this.tokenizer = {};
    this.maxLength = 100; // Max input length
  }

  // Initialize the model
  async initializeModel() {
    this.model = tf.sequential();

    // Add an embedding layer
    this.model.add(tf.layers.embedding({
      inputDim: 10000,  // Vocabulary size
      outputDim: 256,   // Embedding dimension
      inputLength: this.maxLength,
    }));

    // Add an LSTM layer for sequence processing
    this.model.add(tf.layers.lstm({
      units: 512,
      returnSequences: false,  // Return only the last output
      activation: 'relu',
    }));

    // Output layer for classification or response generation
    this.model.add(tf.layers.dense({
      units: 1,
      activation: 'sigmoid',  // Binary output (positive or negative response)
    }));

    // Compile the model
    this.model.compile({
      optimizer: 'adam',
      loss: 'binaryCrossentropy',
      metrics: ['accuracy'],
    });
    console.log("Neural Network Model Initialized.");
  }

  // Tokenize the input text into an array of indices
  tokenizeInput(input) {
    const words = input.split(' ');
    return words.map(word => this.tokenizer[word] || 0);
  }

  // Train the model based on user feedback
  async train(inputText, feedback) {
    const inputTensor = tf.tensor([this.tokenizeInput(inputText)]);
    const feedbackTensor = tf.tensor([feedback]);

    await this.model.fit(inputTensor, feedbackTensor, { epochs: 3 });
    console.log('Model Trained.');
  }

  // Make predictions based on input
  async predict(inputText) {
    const inputTensor = tf.tensor([this.tokenizeInput(inputText)]);
    const prediction = await this.model.predict(inputTensor);
    return prediction.dataSync()[0] > 0.5 ? 'Positive' : 'Negative';
  }

  // Save the model to IndexedDB for later use
  async saveModel() {
    await this.model.save('indexeddb://lite-model');
    console.log('Model saved to IndexedDB.');
  }

  // Load the model from IndexedDB
  async loadModel() {
    this.model = await tf.loadLayersModel('indexeddb://lite-model');
    console.log('Model loaded from IndexedDB.');
  }
}

// Export the network instance for use
export default new NeuralNetwork();
