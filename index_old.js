///////////////
// temporary //
///////////////

const _username = "abc";
const _password = "123";

const activity_logs = [
    { id: 1, timestamp: "2025-01-01 08:00:00", panel: "Dashboard", action: "hello world!", manager_id: 1 },
];

///////////////
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '')));
app.use(express.static(path.join(__dirname, 'html')));
app.use(bodyParser.json());
app.use(session({
    secret: 'Dj*g2$-490+Gp{eSD3%',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));




app.get('/', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, './html/dashboard.html'));
    } else {
        res.sendFile(path.join(__dirname, './html/login.html'));
    }
});

app.get('/:page', (req, res) => {
    if (req.session.user) {
        const page = req.params.page;
        res.sendFile(path.join(__dirname, `./html/${page}.html`));
    } else {
        res.redirect('/');
    }
});


app.get('/api/dashboard', (req, res) => {
    res.json(activity_logs);
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (username === _username && password === _password) {
        req.session.user = { username: username };
        res.json({ success: true, message: 'Login successful' });
    } else {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
});





const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});