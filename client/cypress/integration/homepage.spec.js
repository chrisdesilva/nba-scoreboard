const CELTICS = Cypress.env("celtics")

describe("renders the home page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("renders correctly", () => {
    // Refers to the baseurl
    cy.get("#container").should("exist")
  })

  it("allows the date picker to be used", () => {;
    cy.get('#date').click();
    cy.get('#date').type('2021-02-17');
    cy.findByText(CELTICS).should("exist");
  });

  it("routes to a team's page", () => {
    cy.get('#date').type('2021-02-17');
    cy.findByText(CELTICS).should("exist");
    cy.findAllByText(CELTICS).click()
    cy.url().should("include", "teams/2");
    cy.findByText("Conference: East").should("exist")
  })
})