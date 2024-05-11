# language: pt

Funcionalidade: Atualizar usuários

Contexto: Usuário deve ter acessado a funcionalidade de editar usuário
  Dado que há pelo menos um usuário cadastrado
  E que acessei a funcionalidade de editar usuário

@usuarioAtualizado
Cenário: Deve ser possível atualizar um usuário com sucesso
Quando atualizar o nome do usuário com um formato válido
E atualizar o e-mail do usuário com um formato válido
E confirmar a operação
Então o usuário deverá ser atualizado com sucesso

@usuarioAtualizado
Cenário: Deve ser possível atualizar somente o nome do usuário
Quando atualizar o nome do usuário com um formato válido
E confirmar a operação
Então o usuário deverá ser atualizado com sucesso

@usuarioAtualizado
Cenário: Deve ser possível atualizar somente o e-mail do usuário
Quando atualizar o e-mail do usuário com um formato válido
E confirmar a operação
Então o usuário deverá ser atualizado com sucesso

Esquema do Cenário: Não deve ser possível atualizar um usuário com e-mail em formato inválido
Quando atualizar o e-mail com formato inválido "<email>"
E confirmar a operação
Então deverá aparecer o alerta de que o formato do e-mail é inválido
Exemplos:
  | email |
  | tha@  |
  | .com  |
  | @.com |
  | .444  |

  Cenário: Não deve ser possível atualizar um e-mail com mais de 60 caracteres
  Quando atualizar um e-mail com mais de 60 caracteres "thaiswertyuiopqwiuryqwertyuiopqwiuryqwertyuiopqasdasddfg@t.co"
  E confirmar a operação
  Então não deve ser possível extrapolar o limite de 60 caracteres do e-mail

  Cenário: Não deve ser possível atualizar um nome com mais de 100 caracteres
  Quando atualizar um nome com mais de 100 caracteres "thaissilvaalvesmarquesthaissilvaalvesmarquesthaissilvaalvesmarquesthaissilvaalvesmarquesthaissilvaalv"
  E confirmar a operação
  Então não deve ser possível extrapolar o limite de 100 caracteres do nome
  
  Cenário: Não deve ser possível atualizar um nome com menos de 4 letras
  Quando atualizar um nome com menos de 4 letras "THA"
  E confirmar a operação
  Então deverá aparecer o alerta para informar pelo menos 4 letras para o nome
    
  @emailJaCadastrado
  Cenário: Não deve ser possível atualizar um usuário com e-mail de um usuário existente
  E informar um e-mail já utilizado
  E confirmar a operação
  Então devo visualizar uma mensagem de erro


