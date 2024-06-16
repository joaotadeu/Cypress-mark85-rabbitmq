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
        async deleteTask(taskName) {
          const tasks = db.collection('tasks')
          await tasks.deleteMany({ name: taskName })
          return null
        }

      })
    },
    baseUrl: 'http://localhost:3333'
  },
});
