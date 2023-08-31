const express = require('express');
const app = express();
const port = 4000;

const Account = require('./models/account');
const { default: mongoose } = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bookstore');


// get body-parser 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const accountRouter = require('./routers/accountRouter')

app.use('/api/account/', accountRouter);

app.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
        const user = await Account.findOne({ username: username });

        if (!user) {
            return res.json({ message: 'user not found' });
        }

        // Compare with password
        if (user.password !== password) {
            return res.json({ message: 'Invalid password' });
        }

        res.json({ message: 'Login successfully', username: user.username })

    } catch (error) {
        res.json(error);
    }
})

app.post('/register', async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    let user = await Account.findOne({
        username: username
    })

    console.log(user);

    if(!user) {
        Account.create({
            username: username,
            password: password
        })
        .then((result) => {
            return res.json({
                message: 'Create new User',
                username: username,
                password: password
            })
        }).catch((err) => {
            return res.json({
                message: 'Somthing wrong'
            })
        });
        
    }
    else {
        return res.json({
            message: 'Account existed'
        })
    }
})

app.get('/', (req, res) => {
    res.json('Home');
})

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server running on port ${port}`);
    }
    else {
        console.log(`Server error: ${err}`);
    }
})