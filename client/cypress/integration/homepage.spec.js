describe("renders the home page", () => {
  it("renders correctly", () => {
    // Refers to the baseurl
    cy.visit("/")
    cy.get("#container").should("exist")
  })
})