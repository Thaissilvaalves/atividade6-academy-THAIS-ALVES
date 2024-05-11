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
Dado há usuários cadastrados
Quando buscar pelo e-mail do usuário cadastrado
Então deve ser possível ver detalhes do usuário encontrado

# Cenário: Deve aparecer mensagem de alerta ao não localizar um usuário 
# Quando
# Então