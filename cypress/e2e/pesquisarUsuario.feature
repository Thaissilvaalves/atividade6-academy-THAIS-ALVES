# language: pt

Funcionalidade: Pesquisar usuários

Contexto: Usuário deve ter acessado a página de busca de usuário
  Dado que acessei a página de busca 

@usuarioCadastrado
Cenário: Deve ser possível pesquisar um usuário pelo nome
Dado que há usuários cadastrados
Quando buscar pelo nome do usuário cadastrado
Então deve ser possível ver detalhes do usuário encontrado

@usuarioCadastrado
Cenário: Deve ser possível pesquisar um usuário pelo e-mail
Dado que há usuários cadastrados
Quando buscar pelo e-mail do usuário cadastrado
Então deve ser possível ver detalhes do usuário encontrado

Cenário: Deve aparecer mensagem de alerta ao não localizar um usuário 
Quando buscar por um usuário não existente
Então deve aparecer uma mensagem de alerta
E o site dá a opção de cadastrar um usuário

Cenário: Deve ser possível limpar o valor do campo de busca
Quando faço uma pesquisa de um usuário 
Então deve ser possível limpar o valor do campo de busca