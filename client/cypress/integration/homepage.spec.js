describe("renders the home page", () => {
  it("renders correctly", () => {
    // Refers to the baseurl
    cy.visit("/")
    cy.get("#container").should("exist")
  })

  it("allows the date picker to be used", () => {
    cy.visit("/");
    cy.get('#date').click();
    cy.get('#date').type('2021-02-17');
    cy.findByText("Boston Celtics").should("exist");
  })
})