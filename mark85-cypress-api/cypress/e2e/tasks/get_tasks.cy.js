/// <reference types= "cypress" />

describe('GET /tasks', () => {

    beforeEach(function () {
        cy.fixture('tasks/get_tasks').then(function (tasks) {
            this.tasks = tasks
        })
    })

    context('Quando quero obter minhas tasks', function () {

        it('GET /tasks', function () {
            const { user, tasks } = this.tasks.list

            cy.task('deleteTaskLike', 'Pagar')
            cy.task('deleteUser', user.email)
            cy.postUser(user)

            cy.postSession(user)
                .then(responseUser => {

                    tasks.forEach(function (t) {
                        cy.postTask(t, responseUser.body.token)
                    })

                    cy.getTasks(responseUser.body.token).then(response => {
                        expect(response.status).to.eq(200)
                    }).its('body')
                        .should('be.an', 'array')
                        .and('have.length', tasks.length)
                })
        })

    })

    context('Quando quero obter minhas tasks pelo ID', function () {
        
        it('GET /tasks/:id Unique Task', function () {
            const { user, task } = this.tasks.unique

            cy.task('deleteTask', task.email, user.email)
            cy.task('deleteUser', user.email)
            cy.postUser(user)
            cy.postSession(user)
                .then(userResponse => {

                    cy.postTask(task, userResponse.body.token)
                        .then(taskResponse => {
                            cy.getUniqueTask(taskResponse.body._id, userResponse.body.token)
                                .then(response => {
                                    expect(response.status).to.eq(200)
                                })
                        })
                })
        })

    })

    context('Quando quero obeter minhas tarefas pelo GET', function () {

        it('GET /tasks/ not_found', function () {

            const { user, task } = this.tasks.not_found

            cy.task('deleteTask', task.email, user.email)
            cy.task('deleteUser', user.email)
            cy.postUser(user)

            cy.postSession(user)
                .then(userResponse => {

                    cy.postTask(task, userResponse.body.token)
                        .then(taskResponse => {

                            cy.api({
                                url: '/tasks/' + taskResponse.body._id,
                                method: 'DELETE',
                                headers: {
                                    authorization: userResponse.body.token
                                },
                                failOnStatusCode: false
                            }).then(response => {
                                expect(response.status).to.eq(204)
                            })

                            cy.api({
                                url: '/tasks/' + taskResponse.body._id,
                                method: 'GET',
                                headers: {
                                    authorization: userResponse.body.token
                                },
                                failOnStatusCode: false
                            }).then(response => {
                                expect(response.status).to.eq(404)
                            })

                        })
                })
        })

    })
})