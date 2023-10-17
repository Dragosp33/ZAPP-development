const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

console.log('MONGODB_URI:', config.MONGODB_URI)
app.listen(config.PORT, () => {
  logger.info('MongoDB: ', config.MONGODB_URI)
  logger.info(`Server running on port ${config.PORT}`)
})
