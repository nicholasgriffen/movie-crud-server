module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost/griff'
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    }
}
