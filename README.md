# App-bank

Esta aplicação permite o usuário a criar uma conta, fazer depósitos, saques e transferências entre as contas. Além de poder obter um extrato de suas transações ou de uma transação por id. 

#### Requisitos

- [node](https://nodejs.org/en/download/)
- [postgresql](https://www.postgresql.org/download/)

#### Como rodar a aplicação

Instalar os pacotes com

```
npm install
```

Levantar a aplicação com 

```
node index.js
```

#### Funcionalidades disponíveis 

##### Gerencimaneto de conta

- Criação de conta:

endpoint: POST ``` /user```
corpo:
```
{
    nome: nome do usuário, 
    email: email de cadastro, 
    senha: senha de acesso,
    cpf: cpf do usuário
}
```
retorno: 
```
{Bem-vindo, (nome cadastrado), cadastrado com sucesso!!}
```
descrição: Nessa rota será possível criar uma conta na aplicação. Retornará não autorizado no casos de não preencher os campos obrigatórios ou de utilizar um email de outro usuário já cadastrado.


##### Gerenciamento de sessão


##### Operações bancárias
- depósito
- saque
- transferência
- extrato 
