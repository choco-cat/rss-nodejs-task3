const express = require('express');
const app = express();
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller')

app.use(require('body-parser'));
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'))
app.use('/api/game', game);
app.listen(4000, () => {
    console.log('Your app is listening on port 4000');
});
