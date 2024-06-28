Cypress.Commands.add('postUser', (user) => {
  cy.api({
    url: '/users',
    method: 'POST',
    body: user,
    failOnStatusCode: false
  }).then(response => { return response })
})

Cypress.Commands.add('postSession', (user) => {
  cy.api({
    url: '/sessions',
    method: 'POST',
    body: { email: user.email, password: user.password },
    failOnStatusCode: false
  }).then(response => { return response })

})

Cypress.Commands.add('postTask', (task, token) => {
  cy.api({
    url: '/tasks',
    method: 'POST',
    body: task,
    headers: {
      authorization: token
    },
    failOnStatusCode: false
  }).then(response => { return response })
})

Cypress.Commands.add('deleteTask', (task, token) => {
  cy.api({
    url: '/tasks',
    method: 'DELETE',
    body: task,
    headers: {
      authorization: token
    },
    failOnStatusCode: false
  }).then(response => { return response })
})

Cypress.Commands.add('getUniqueTask', (taskId, token) => {
  cy.api({
    url: '/tasks/' + taskId,
    method: 'GET',
    headers: {
      authorization: token
    },
    failOnStatusCode: false
  }).then(response => { return response })
})

Cypress.Commands.add('getTasks', (token) => {
  cy.api({
    url: '/tasks',
    method: 'GET',
    headers: {
      authorization: token
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('putUniqueTask', (taskId, token) => {
  cy.api({
    url: `/tasks/${taskId}/done`,
    method: 'PUT',
    headers: {
      authorization: token
    },
    failOnStatusCode: false
  }).then(response => { return response })
})