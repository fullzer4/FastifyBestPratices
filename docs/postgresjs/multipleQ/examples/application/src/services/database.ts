import postgres from 'postgres'

const sql = postgres({
    host: "0.0.0.0",
    port: 5432,
    database: "SAEP",
    username: "fullzer4",
    password: "123456",
})

export default sql