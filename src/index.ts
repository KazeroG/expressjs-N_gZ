const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');

const app = express();
const port = 7663;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint to convert HTML to PDF
app.post('/convert', (req, res) => {
  const { html } = req.body;

  pdf.create(html).toStream((err, stream) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      stream.pipe(res);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
