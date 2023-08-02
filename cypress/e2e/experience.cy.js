describe('visit page', () => {
  it('Visits project page', () => {
    cy.visit('./index.html')
    cy.get('body > svg').children()

  })
})

