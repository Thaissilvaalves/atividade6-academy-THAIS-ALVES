export default class AtualizaPage {
  inputName = "#userName";
  inputEmail = "#userEmail";
  buttonEditar = '[type="button"]';

  typeName(nome) {
    cy.get(this.inputName).type(nome);
  }

  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  }

  clickEditar() {
    cy.get(this.buttonEditar).click();
  }
}
