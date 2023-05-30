context('Basic', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('basic nav', () => {
    cy.url()
      .should('eq', 'http://localhost:3333/')

    cy.contains('OpenTranslate')
      .should('exist')
    // cy.get('[btn]')
    //   .click()
    //   .url()
    //   .should('eq', 'http://localhost:3333/')
  })

  it('markdown', () => {
    cy.get('[title="About"]')
      .click()
      .url()
      .should('eq', 'http://localhost:3333/about')

    cy.get('.shiki')
      .should('exist')
  })
})
