export default class ListarPage {
  labelEmail = '[data-test="userDataEmail"]';
  labelNome = '[data-test="userDataName"]';

  buttonVoltarPagina = "#paginacaoVoltar";
  buttonProximaPagina = "#paginacaoProximo";
  labelPaginacaoAtual = "#paginacaoAtual";
  buttonDeletarUsuario = '[data-test="userDataDelete"]';
  buttonVerDetalhesUsuario = "#userDataDetalhe";

  componenteTodosUsuarios = "#listaUsuarios #userData";

  ProximaPagina() {
    cy.get(this.buttonProximaPagina).click();
  }

  VoltarPagina() {
    cy.get(this.buttonVoltarPagina).click();
  }

  getComponenteTodosUsuarios() {
    return cy.get(this.componenteTodosUsuarios);
  }
}
