const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbURL: 'mongodb://localhost:27017/best-movies',
        origin: ['http://localhost:5555', 'http://localhost:4200']
    },
    production: {
        port: process.env.PORT || 3000,
        dbURL: 'mongodb://best-movies-db-account:6Vb9eIU5uYVrjUe9tZEiq7dxRnnxGjwXSYn1ehYD3gacQwlyij1lJlgazoJyJhcsXLXwpg8DVP2wACDb3uju9A==@best-movies-db-account.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@best-movies-db-account@',
        origin: []
    }
};

module.exports = config[env];
