import { wait } from '@testing-library/user-event/dist/utils'

describe('Blog app', function() {
  before(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test user',
      username: 'tuser',
      password: 'tpass'
    }
    const user2 = {
      name: 'user2',
      username: 'user2',
      password: 'pass2'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
  })
  beforeEach(function() {

    cy.visit('http://localhost:3000')
  })

  it('it login form can be seen', function() {
    // cy.visit('http://localhost:3000')
    cy.contains('login to see the blogs')
    cy.get('#loginBtn').contains('Login')
  })

  describe('Log in function ', function () {
    it('login successful with correct credentials', function () {
      cy.get('#username').type('tuser')
      cy.get('#password').type('tpass')
      cy.get('#loginBtn').click()
      cy.contains('User logged in tuser')
      cy.contains('Log Out').click()
    })

    it('login fails with wrong credentials', function () {
      cy.get('#username').type('wronguser')
      cy.get('#password').type('wrongpass')
      cy.get('#loginBtn').click()
      cy.contains('wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')

    })
  })

  describe('when logged in', function () {
    beforeEach(function() {

      cy.get('#username').type('tuser')
      cy.get('#password').type('tpass')
      cy.get('#loginBtn').click()
      cy.contains('User logged in tuser')

    })
    // add blog test
    it ('a user can add a blog', function() {
      cy.contains('new blog').click()
      cy.get('#blog-title').type('a blog about cypress')
      cy.get('#blog-author').type('cypress')
      cy.get('#blog-url').type('cypress-url')
      cy.contains('Add blog').click()
      cy.contains('a blog about cypress')
    })
    // like blog test
    it('a user can like a blog', function() {
      cy.contains('show').click()
      cy.get('.likeBtn').click()
      cy.get('.likes').contains(1)
    })

    it('blogs are ordered for likes', function() {

      cy.contains('new blog').click()
      cy.get('#blog-title').type('most liked blog')
      cy.get('#blog-author').type('cypress')
      cy.get('#blog-url').type('cypress-url')
      cy.contains('Add blog').click()
      // at first, the first added blog is in the first position, because it has 1 like
      cy.get('.title').eq(0).should('contain', 'a blog about cypress')
      cy.get('.title').eq(1).should('contain', 'most liked blog')
      cy.get('.visibleBtn').eq(1).click()
      for ( let i =0; i<5; i++ ) {
        cy.get('.likeBtn').click()
        wait(2000)
      }
      // after 5 likes for the second blog, it should now be the first seen blog
      cy.get('.title').eq(0).should('contain', 'most liked blog')

    })
  /*
    // delete tests
    it('a user can`t delete a blog he did not create', function () {
      cy.contains('Log Out').click()
      cy.get('#username').type('user2')
      cy.get('#password').type('pass2')
      cy.get('#loginBtn').click()
      cy.contains('show').click()
      cy.get('html').should('not.contain', '.deleteBtn')
    })
    it('a user can delete a blog he made', function () {
      cy.contains('show').click()
      cy.get('.deleteBtn').click()
      cy.get('html').should('not.contain', 'a blog about cypress')
    })
*/
  })


})
