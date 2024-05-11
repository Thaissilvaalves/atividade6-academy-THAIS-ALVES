import { Given, When, Then, Before } from "cypress-cucumber-preprocessor/steps";

import { fakerPT_BR } from "@faker-js/faker";
import CadastroPage from "../pages/cadastro.page";

var cadastroPage = new CadastroPage();
var nome = "teste" + fakerPT_BR.person.firstName();
var email = fakerPT_BR.internet.email().toLowerCase();

Given("que acessei a funcionalidade de cadastro", function () {
  cy.visit("/users/novo");
});

When("informar um novo nome", function () {
  cadastroPage.typeName(nome);
});

When("informar um novo e-mail", function () {
  cadastroPage.typeEmail(email);
});

When("confirmar a operação", function () {
  cy.intercept("POST", "api/v1/users").as("postUsuario");
  cadastroPage.clickSubmit();
});

When(
  "informar um e-mail com mais de {int} caracteres {string}",
  function (tamanho, email) {
    cadastroPage.typeEmail(email);
  }
);

When(
  "informar um nome com mais de {int} caracteres {string}",
  function (tamanho, nome) {
    cadastroPage.typeName(nome);
  }
);

When(
  "informar um nome com menos de {int} letras {string}",
  function (tamanho, nome) {
    cadastroPage.typeName(nome);
  }
);

When("informar o e-mail {string}", function (email) {
  cadastroPage.typeEmail(email);
});

Then("o usuário deverá ser cadastrado com sucesso", function () {
  cy.contains("Usuário salvo com sucesso!").should("be.visible");
});

Then(
  "deverá aparecer um alerta de que o campo e-mail é obrigatório",
  function () {
    cadastroPage.alertaEmail();
  }
);

Then(
  "deverá aparecer um alerta de que o campo nome é obrigatório",
  function () {
    cadastroPage.alertaNome();
  }
);

Then(
  "não deve ser possível extrapolar o limite de {int} caracteres do e-mail no cadastro",
  function (tamanhoMaximo) {
    cy.get(cadastroPage.inputEmail)
      .invoke("val")
      .then((emailDigitado) => {
        expect(emailDigitado.length).to.equal(tamanhoMaximo + 1);
      });
  }
);

Then(
  "não deve ser possível extrapolar o limite de {int} caracteres do nome no cadastro",
  function (tamanhoMaximo) {
    cy.get(cadastroPage.inputName)
      .invoke("val")
      .then((nomeDigitado) => {
        expect(nomeDigitado.length).to.equal(tamanhoMaximo + 1);
      });
  }
);

Then(
  "deverá aparecer o alerta para informar pelo menos 4 letras para o nome",
  function () {
    cy.contains("Informe pelo menos 4 letras para o nome.").should(
      "be.visible"
    );
  }
);

Then(
  "deverá aparecer o alerta de que o formato do e-mail é inválido",
  function () {
    cy.contains("Formato de e-mail inválido").should("be.visible");
  }
);

Before({ tags: "@emailJaCadastrado" }, () => {
  const email = fakerPT_BR.internet.email().toLowerCase();
  cy.wrap(email).as("emailJaCadastrado");
  cy.request(
    "POST",
    "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users",

    {
      name: fakerPT_BR.person.fullName(),
      email,
    }
  );
});

When("informar um e-mail já utilizado", function () {
  cy.get("@emailJaCadastrado").then((email) => {
    cadastroPage.typeEmail(email);
  });
});
Then("devo visualizar uma mensagem de erro", () => {
  cy.contains("Este e-mail já é utilizado por outro usuário.").should(
    "be.visible"
  );
});
