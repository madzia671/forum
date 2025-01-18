const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = 'your-secret-key';
let comments = JSON.parse(fs.readFileSync('data.json', 'utf8'));

app.get('/api/comments', (req, res) => {
    res.json(comments);
});

app.post('/api/comments', async (req, res) => {
    const { token, pageName, message } = req.body;

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`, {
        method: 'POST',
    });
    const data = await response.json();

    if (data.success) {
        comments.push({ pageName, message });
        fs.writeFileSync('data.json', JSON.stringify(comments, null, 2));
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
