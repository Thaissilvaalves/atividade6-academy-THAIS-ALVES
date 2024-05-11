import {
  Given,
  When,
  Then,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";

import { fakerPT_BR } from "@faker-js/faker";
import CadastroPage from "../pages/cadastro.page";
import ListarPage from "../pages/listar.page";
import AtualizaPage from "../pages/atualiza.page";

var listarPage = new ListarPage();
var cadastroPage = new CadastroPage();
var atualizaPage = new AtualizaPage();

var nome = "teste nome" + fakerPT_BR.person.firstName();
var email = fakerPT_BR.internet.email().toLowerCase();
var atualizaNome;
var atualizaEmail;

Before({ tags: "@usuarioAtualizado" }, () => {
  atualizaNome = fakerPT_BR.person.firstName() + "teste nome";
  atualizaEmail = fakerPT_BR.internet.email().toLowerCase();
});

Given("que há pelo menos um usuário cadastrado", function () {
  cy.request("https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users").then(
    (response) => {
      if (response.body.length <= 0) {
        cy.request(
          "POST",
          "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users",
          {
            name: nome,
            email: email,
          }
        );
      }
    }
  );
});

Given("que acessei a funcionalidade de editar usuário", function () {
  cy.visit("/users");
  listarPage.VerDetalhes();
  atualizaPage.clickEditar();
});

When("atualizar o nome do usuário com um formato válido", function () {
  cy.get(atualizaPage.inputName).clear();
  atualizaPage.typeName(atualizaNome);
});

When("atualizar o e-mail do usuário com um formato válido", function () {
  cy.get(atualizaPage.inputEmail).clear();
  atualizaPage.typeEmail(atualizaEmail);
});

When("atualizar o e-mail com formato inválido {string}", function (email) {
  cy.get(atualizaPage.inputEmail).clear();
  atualizaPage.typeEmail(email);
});

When(
  "atualizar um e-mail com mais de {int} caracteres {string}",
  function (tamanho, email) {
    cy.get(atualizaPage.inputEmail).clear();
    atualizaPage.typeEmail(email);
  }
);

When(
  "atualizar um nome com mais de {int} caracteres {string}",
  function (tamanho, nome) {
    cy.get(atualizaPage.inputName).clear();
    atualizaPage.typeName(nome);
  }
);

When(
  "atualizar um nome com menos de {int} letras {string}",
  function (tamanho, nome) {
    cy.get(atualizaPage.inputName).clear();
    atualizaPage.typeName(nome);
  }
);

When("confirmar a operação", function () {
  cy.intercept("PUT", "api/v1/users/{id}").as("atualizarUsuario");
  cadastroPage.clickSubmit();
});

Then("o usuário deverá ser atualizado com sucesso", function () {
  cy.contains("Informações atualizadas com sucesso!").should("be.visible");
});

Then(
  "deverá aparecer o alerta de que o formato do e-mail é inválido",
  function () {
    cy.contains("Formato de e-mail inválido").should("be.visible");
  }
);

Then(
  "não deve ser possível extrapolar o limite de {int} caracteres do e-mail",
  function (tamanhoMaximo) {
    cy.get(atualizaPage.inputEmail)
      .invoke("val")
      .then((emailDigitado) => {
        expect(emailDigitado.length).to.equal(tamanhoMaximo + 1);
      });
    cy.contains("Informe no máximo 60 caracteres para o e-mail").should(
      "be.visible"
    );
  }
);

Then(
  "não deve ser possível extrapolar o limite de {int} caracteres do nome",
  function (tamanhoMaximo) {
    cy.get(atualizaPage.inputName)
      .invoke("val")
      .then((nomeDigitado) => {
        expect(nomeDigitado.length).to.equal(tamanhoMaximo + 1);
      });
    cy.contains("Informe no máximo 100 caracteres para o nome").should(
      "be.visible"
    );
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
    cy.get(atualizaPage.inputEmail).clear();
    atualizaPage.typeEmail(email);
  });
});

Then("devo visualizar uma mensagem de erro", () => {
  cy.contains("Este e-mail já é utilizado por outro usuário.").should(
    "be.visible"
  );
});
