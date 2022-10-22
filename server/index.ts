import service from './service'

const PORT = 8080
service.client.connect()
service.express.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})