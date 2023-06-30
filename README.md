## Documentação da API
[Register Clients APP](https://api-clients-a79o.onrender.com/api)

## Descrição

Uma api contruída em [Nest](https://github.com/nestjs/nest) e [Prisma](https://github.com/prisma/prisma). O objetivo da aplicação é registrar uma lista de clientes para um usuário registrado e adicionar todos os contatos desses clientes e lista-los, cada cliente com a sua lista de contatos.

## Instalação

```bash
$ yarn install
```

## Inicialização do app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

# migrate mode
$ npx prisma migrate dev

```
## Env para conexão com banco de dados
```
DATABASE_URL="postgresql://username:password@host:port/db_name?schema=public"
SECRET_KEY=
EXPIRES_IN=
```

## Contato
[Linkedin](https://www.linkedin.com/in/andrew-da-silva-569101246/)


