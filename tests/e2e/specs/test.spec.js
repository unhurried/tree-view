describe('Test', () => {
  it('should render a list of 3 layers', () => {
    cy.visit('/')
    cy.get('#app > ul > li:nth-of-type(1) > span').should('contain', 'one')
    cy.get('#app > ul > li:nth-of-type(2) > ul > li:nth-of-type(2) > span').should('contain', 'two-two')
    cy.get('#app > ul > li:nth-of-type(2) > ul > li:nth-of-type(1) > ul > li:nth-of-type(1) > span').should('contain', 'two-one-one')
  });
  it('should hide the children when their parent is clicked', () => {
    cy.visit('/')
    cy.get('#app > ul > li:nth-child(2) > ul > li:nth-child(1) > span:nth-child(1)').click()
    cy.get('#app > ul > li:nth-of-type(2) > ul > li:nth-of-type(1) > ul').should('not.visible')
    cy.get('#app > ul > li:nth-child(2) > span:nth-child(1)').click()
    cy.get('#app > ul > li:nth-of-type(2) > ul').should('not.visible')
  });
})