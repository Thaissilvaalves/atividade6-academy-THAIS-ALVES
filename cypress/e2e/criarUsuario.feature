# language: pt

Funcionalidade: Cadastro de usuário

Contexto: Usuário deve ter acessado a página de cadastro
  Dado que acessei a funcionalidade de cadastro

  Cenário: Deve ser possível cadastrar um usuário com sucesso
  Quando informar um novo nome
  E informar um novo e-mail
  E confirmar a operação
  Então o usuário deverá ser cadastrado com sucesso

  Cenário: Não deve ser possível fazer um cadastro sem um e-mail
  Quando informar um novo nome
  E confirmar a operação
  Então deverá aparecer um alerta de que o campo e-mail é obrigatório

  Cenário: Não deve ser possível fazer um cadastro sem um nome
  Quando informar um novo e-mail
  E confirmar a operação
  Então deverá aparecer um alerta de que o campo nome é obrigatório

  Cenário: Não deve ser possível cadastrar um e-mail com mais de 60 caracteres
  Quando informar um novo nome
  E informar um e-mail com mais de 60 caracteres "thaiswertyuiopqwiuryqwertyuiopqwiuryqwertyuiopqasdasddfg@t.co"
  Então não deve ser possível extrapolar o limite de 60 caracteres do e-mail no cadastro

  Cenário: Não deve ser possível cadastar um nome com mais de 100 caracteres
  Quando informar um nome com mais de 100 caracteres "thaissilvaalvesmarquesthaissilvaalvesmarquesthaissilvaalvesmarquesthaissilvaalvesmarquesthaissilvaalv"
  E informar um novo e-mail
  E confirmar a operação
  Então não deve ser possível extrapolar o limite de 100 caracteres do nome no cadastro
  
  Esquema do Cenário: Não deve ser possível cadastrar um usuário com e-mail em formato inválido
  Quando informar um novo nome
  E informar o e-mail "<email>"
  E confirmar a operação
  Então deverá aparecer o alerta de que o formato do e-mail é inválido
  Exemplos:
    | email |
    | tha@  |
    | .com  |
    | @.com |
    | .444  |

  Cenário: Não deve ser possível cadastrar um nome com menos de 4 letras
  Quando informar um nome com menos de 4 letras "THA"
  E informar um novo e-mail
  E confirmar a operação
  Então deverá aparecer o alerta para informar pelo menos 4 letras para o nome
    
  @emailJaCadastrado
  Cenário: Não deve ser possível cadastrar um usuário com e-mail já cadastrado
  Quando informar um novo nome
  E informar um e-mail já utilizado
  E confirmar a operação
  Então devo visualizar uma mensagem de erro
