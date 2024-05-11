export default class PesquisaPage {
  inputBuscar = ".sc-dcJsrY";
  inputName = "#userName";
  inputEmail = "#userEmail";
  buttonFechar = ".sc-dcJsrY > :nth-child(3)";

  typePesquisarNome(nome) {
    cy.get(this.inputBuscar).type(nome);
  }
  typePesquisarEmail(email) {
    cy.get(this.inputBuscar).type(email);
  }

  clickFechar() {
    cy.get(this.buttonFechar).click();
  }
}
