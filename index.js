///////////////
// temporary //
///////////////

const _username = "abc";
const _password = "123";

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

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (username === _username && password === _password) {
        req.session.user = { username: username };
        res.json({ success: true, message: 'Login successful' });
    } else {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
});

app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, './html/dashboard.html'));
    } else {
        res.redirect('/');
    }
});

app.get('/menu', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, './html/menu.html'));
    } else {
        res.redirect('/');
    }
});

app.get('/orders', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, './html/orders.html'));
    } else {
        res.redirect('/');
    }
});

app.get('/sales', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, './html/sales.html'));
    } else {
        res.redirect('/');
    }
});




const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});