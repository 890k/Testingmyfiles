const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API Route Example: Process Loan Application
app.post('/api/apply-loan', (req, me, res) => {
  const { fullName, phoneNumber, loanAmount, tenure } = req.body;

  if (!fullName || !phoneNumber || !loanAmount) {
    return res.status(400).json({
      success: false,
      message: 'Please complete all required fields.'
    });
  }

  // Simulated processing response
  return res.status(200).json({
    success: true,
    message: 'Application received successfully.',
    referenceId: 'OML-' + Math.floor(100000 + Math.random() * 900000),
    data: { fullName, phoneNumber, loanAmount, tenure }
  });
});

// Explicit Route Handling for SPA / Static Fallbacks
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/page2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page2.html'));
});

// Start Server locally
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
