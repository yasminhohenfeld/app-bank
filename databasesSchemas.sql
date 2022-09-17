
create table if not exists users (
  id serial primary key,
  nome text not null,
  email text 
  senha text not null, 
  cpf text not null,
  saldo integer

  
)

create table if not exists transactions (
    id serial primary key, 
    id_conta_origem integer references users (id) not null,
    id_conta_destino integer references users (id) not null,
    descricao text, 
    valor integer not null, 
    data DATE NOT NULL DEFAULT NOW()
)