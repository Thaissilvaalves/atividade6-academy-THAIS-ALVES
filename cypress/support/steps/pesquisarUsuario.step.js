import {
  Given,
  When,
  Then,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";

import { fakerPT_BR } from "@faker-js/faker";
import PesquisaPage from "../pages/pesquisa.page";
import CadastroPage from "../pages/cadastro.page";
import ListarPage from "../pages/listar.page";

var pesquisaPage = new PesquisaPage();
var listarPage = new ListarPage();
var cadastroPage = new CadastroPage();

var nome = "teste nome" + fakerPT_BR.person.firstName();
var email = fakerPT_BR.internet.email().toLowerCase();

Before({ tags: "@usuarioCadastrado" }, () => {
  cy.intercept("POST", "api/v1/users").as("usuarioExistente");
  cy.intercept("GET", "api/v1/search?value=*").as("pesquisa");
  cadastroPage.salvarUsuario(nome, email);
  cy.wait("@usuarioExistente");
});

Given("que acessei a página de busca", function () {
  cy.visit("/users");
});

Given("que há usuários cadastrados", function () {
  cy.request(
    "rarocrud-80bf38b38f1f.herokuapp.com/api/v1/search?value=" + email
  ).then(function (request) {
    expect(request.body.length > 0).to.equal(true);
  });
});

When("buscar pelo nome do usuário cadastrado", function () {
  pesquisaPage.typePesquisarNome(nome);
  cy.wait("@pesquisa");
});

When("buscar pelo e-mail do usuário cadastrado", function () {
  pesquisaPage.typePesquisarEmail(email);
  cy.wait("@pesquisa");
});

When("buscar por um usuário não existente", function () {
  pesquisaPage.typePesquisarEmail("erro5454fdf");
});

When("faço uma pesquisa de um usuário", function () {
  pesquisaPage.typePesquisarEmail("pesquisaUsuario");
});

Then("deve ser possível ver detalhes do usuário encontrado", function () {
  listarPage.VerDetalhes();
  cy.get(pesquisaPage.inputName).should("have.value", nome);
  cy.get(pesquisaPage.inputEmail).should("have.value", email);
});

Then("deve aparecer uma mensagem de alerta", function () {
  cy.contains("Ops! Não existe nenhum usuário para ser exibido.").should(
    "be.visible"
  );
});

Then("o site dá a opção de cadastrar um usuário", function () {
  cy.contains("Cadastre um novo usuário").should("be.visible");

  cy.contains("a", "Cadastre um novo usuário").click();

  cy.url("").should(
    "equal",
    "https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo"
  );
});

Then("deve ser possível limpar o valor do campo de busca", function () {
  pesquisaPage.clickFechar();
  cy.get(pesquisaPage.inputBuscar).should("not.have.value");
});
