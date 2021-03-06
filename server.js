
const path = require('path');
const app = require('express')();
const config = require('./config');
const PORT = process.env.PORT || config.port;
const router = require(path.resolve(__dirname, 'src', 'router', 'routes'));
const jsonParser = require('body-parser').json;
const cors = require('cors');

app.use(jsonParser());
app.use(cors());
app.use(router);

app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
    if (err.status) {
        return res.status(err.status).json({ message: err.message });
    }
    next(err);
});
app.use((err, req, res, next) => {
    res.status(500).json({ message: 'SERVER ERROR' });
});

module.exports = app;