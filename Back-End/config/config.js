const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbURL: 'mongodb://127.0.0.1:27017/best-movies',
        origin: ['http://localhost:5555', 'http://localhost:4200']
    },
    production: {
        port: process.env.PORT,
        dbURL: 'mongodb+srv://DimitarMagaranov:Dd73194655!@cluster0.jx8aev5.mongodb.net/test',
        origin: ['https://best-movies.azurewebsites.net/']
    }
};

module.exports = config[env];
