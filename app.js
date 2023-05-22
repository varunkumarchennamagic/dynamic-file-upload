const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Uploads will be saved to the 'uploads' directory

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).send('No file uploaded.');
  } else {
    // Read the uploaded file
    const filePath = path.join(__dirname, 'uploads', file.filename);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        // Do something with the file data here
        console.log(data.toString());
        res.send('File uploaded successfully.');
      }
    });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});