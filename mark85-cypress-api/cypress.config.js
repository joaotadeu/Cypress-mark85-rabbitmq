const { defineConfig } = require("cypress");
const { connect, disconnect } = require('./cypress/support/mongo')

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const db = await connect()

      on('task', {

        async deleteUser(email) {
          const users = db.collection('users')
          await users.deleteMany({ email: email })
          return null
        },

        async deleteTask(taskName, emailUser) {
          const users = db.collection('users')
          const user = users.findOne({ email: emailUser })
          const tasks = db.collection('tasks')

          await tasks.deleteMany({ name: taskName, user: user._id })
          return null
        },

        async deleteTaskLike(key) {
          const tasks = db.collection('tasks')

          await tasks.deleteMany({ name: { $regex: key } })
          return null
        }


      })
    },
    baseUrl: 'http://localhost:3333',
    video: false,
    screenshotOnRunFailure: false,
    env: {
      amqpHost: 'https://woodpecker.rmq.cloudamap.com/api/queues/mbjznjwf',
      amqpQueue: 'tasks',
      amqpToken: 'Basic bWJqem5qd2Y6Q1IwLWpIR1pSODBWZ2]BcDUxUmNyWjFSN3JWRDdKZXE='
    }
  },
});
