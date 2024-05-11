# language: pt

Funcionalidade: Listar usuários

Contexto: Usuário deve ter acessado a página inicial
  Dado que acessei a página inicial

Cenário: Deve ser possível consultar a lista de usuários
Quando há usuários cadastrados
Então consigo consultar a lista de usuários

Cenário: Deve existir uma opção para cadastrar usuário quando não existirem usuários cadastrados
Quando não há usuários cadastrados
Então o site dá a opção de cadastrar um usuário 

Cenário: Deve exibir a paginação se existir mais de 6 usuários cadastrados
Quando há mais de 6 usuários cadastrados
Então deve ser possível visualizar paginação

Cenário: Não deve ser possível avançar para a próxima página se não existirem usuários para serem exibidos nela
Quando há até 6 usuários cadastrados
Então não deve ser possível avançar para a próxima página

Cenário: Deve ser possível transitar entre as páginas da lista de usuários
Quando há mais de 6 usuários cadastrados
Então deve ser possível transitar entre as páginas 

Cenário: Devem existir opções para exibir detalhes e excluir usuário
Quando há usuários cadastrados
Então deve existir opção para exibir detalhes dos usuários
E deve ser possível excluir um usuário
