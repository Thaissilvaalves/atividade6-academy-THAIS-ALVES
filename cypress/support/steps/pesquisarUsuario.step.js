import { Given, When, Then, Before } from "cypress-cucumber-preprocessor/steps";

import { fakerPT_BR } from "@faker-js/faker";
import PesquisaPage from "../pages/pesquisa.page";

var pesquisaPage = new PesquisaPage();

Given("que acessei a página de busca", function () {
  cy.visit("/users");
});

Before({ tags: "@usuarioCadastrado" }, () => {
  var name = "teste" + fakerPT_BR.person.firstName();
  var email = fakerPT_BR.internet.email().toLowerCase();
  cy.request(
    "POST",
    "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users",

    {
      name,
      email,
    }
  ).as("usuarioExistente");
});
