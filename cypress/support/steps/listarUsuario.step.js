import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import ListarPage from "../pages/listar.page";

var listarPage = new ListarPage();

Given("que acessei a página inicial", function () {
  cy.visit("/users");
});

When("há usuários cadastrados", function () {
  cy.intercept("GET", "/api/v1/users", {
    statusCode: 200,
    fixture: "lista6Usuarios.json",
  }).as("getUsers");
});

When("há até 6 usuários cadastrados", function () {
  cy.intercept("GET", "/api/v1/users", {
    statusCode: 200,
    fixture: "lista6Usuarios.json",
  }).as("getUsers");
});

When("não há usuários cadastrados", function () {
  cy.intercept("GET", "/api/v1/users", {
    statusCode: 200,
    body: [],
  }).as("listaVazia");
});

When("há mais de 6 usuários cadastrados", function () {
  cy.intercept("GET", "/api/v1/users", {
    statusCode: 200,
    fixture: "lista12Usuarios.json",
  }).as("get12Users");
});

Then("consigo consultar a lista de usuários", function () {
  cy.wait("@getUsers").then(function (consultaUsuarios) {
    const listaUsuarios = consultaUsuarios.response.body;

    listaUsuarios.forEach((usuario) => {
      cy.contains(listarPage.labelNome, "Nome: " + usuario.name);
      cy.contains(
        listarPage.labelEmail,
        "E-mail: " + usuario.email.slice(0, 21)
      );
    });
  });
});

Then("o site dá a opção de cadastrar um usuário", function () {
  cy.wait("@listaVazia");
  cy.contains("Ops! Não existe nenhum usuário para ser exibido.").should(
    "be.visible"
  );
  cy.contains("Cadastre um novo usuário").should("be.visible");

  cy.contains("a", "Cadastre um novo usuário").click();

  cy.url("").should(
    "equal",
    "https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo"
  );
});

Then("deve ser possível visualizar paginação", function () {
  cy.wait("@get12Users");
  cy.get(listarPage.labelPaginacaoAtual).contains("1 de 2").and("be.visible");
});

Then("não deve ser possível avançar para a próxima página", function () {
  cy.wait("@getUsers");
  cy.get(listarPage.buttonProximaPagina)
    .should("be.disabled")
    .and("be.visible");
});

Then("deve ser possível transitar entre as páginas", function () {
  cy.wait("@get12Users");
  cy.contains(listarPage.labelPaginacaoAtual, "1 de 2");
  listarPage.ProximaPagina();
  cy.contains(listarPage.labelPaginacaoAtual, "2 de 2");
  cy.get(listarPage.buttonProximaPagina).should("be.disabled");
  cy.get(listarPage.buttonVoltarPagina).should("be.enabled");
  listarPage.VoltarPagina();
});

Then("deve existir opção para exibir detalhes dos usuários", function () {
  listarPage.getComponenteTodosUsuarios().each((componenteUsuario) => {
    cy.wrap(componenteUsuario)
      .find(listarPage.buttonVerDetalhesUsuario)
      .should("be.visible");
  });
});

Then("deve ser possível excluir um usuário", function () {
  listarPage.getComponenteTodosUsuarios().each((componenteUsuario) => {
    cy.wrap(componenteUsuario)
      .find(listarPage.buttonDeletarUsuario)
      .should("be.visible");
  });
});
