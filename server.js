const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get the talk data
app.get('/api/talks', (req, res) => {
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data file');
      return;
    }

    let talks = JSON.parse(data);
    const { speaker, category } = req.query;

    if (speaker) {
      talks = talks.filter(talk =>
        talk.speakers.some(s => s.toLowerCase().includes(speaker.toLowerCase()))
      );
    }

    if (category) {
      talks = talks.filter(talk =>
        talk.categories.some(c => c.toLowerCase().includes(category.toLowerCase()))
      );
    }

    res.json(talks);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
