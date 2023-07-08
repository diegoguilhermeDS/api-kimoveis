<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/diegoguilhermeDS/api-kimoveis?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/diegoguilhermeDS/api-kimoveis">

  <a href="https://github.com/diegoguilhermeDS/api-kimoveiso/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/diegoguilhermeDS/api-kimoveis">
  </a>
  
  <a href="https://github.com/diegoguilhermeDS/api-kimoveis/blob/main/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
  </a>
   
   <a href="https://github.com/diegoguilhermeDS/api-kimoveis/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/diegoguilhermeDS/api-kimoveis?style=social">
  </a>

  <a href="https://github.com/diegoguilhermeDS">
    <img alt="Feito por Diego Guilherme" src="https://img.shields.io/badge/feito%20por-DiegoGuilherme-%237519C1">
  </a>
</p>

<h4 align="center"> 
	🚧  Kimoveis - Concluído 🚀 🚧
</h4>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-autor">Autor</a> • 
 <a href="#user-content--licença">Licença</a>
</p>

## 💻 Sobre o projeto
A API de imóveis desenvolvida em Node.js com Express é uma solução completa para cadastrar e gerenciar imóveis e agendamentos. Com recursos avançados de autenticação utilizando JWT e validações de dados com a biblioteca Zod, oferece segurança e confiabilidade. Os usuários podem criar, editar e excluir imóveis e agendamentos, além de categorizá-los.

## ⚙️ Funcionalidades

- [x] Login
- [x] Usuário
    - Cadastro de usuário 
    - Editar informações do usuário
    - Remover usuário
- [x] Categoria
    - Criação de novas categorias
    - Listagem das categorias
    - Listagem das propiedades com tal categoria
- [x] Imóvel
  - Criação de imóveis
  - Listagem dos imóveis
- [x] Agendamentos
  - Criação de agendamentos para a compra do imóvel
  - listagem dos agendamentos feitos para tal imóvel


## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com/), [NodeJs](https://nodejs.org/en). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone git@github.com:diegoguilhermeDS/api-kimoveis.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd api-kimoveis

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação será aberta na porta:3000 - acesse http://localhost:3001

```
<p align="center">
  <a href="https://insomnia.rest/run/?label=Kimoveis&uri=https%3A%2F%2Fgithub.com%2FdiegoguilhermeDS%2Fapi-kimoveis%2Fblob%2F2bee49eefffb3a1acb4c11bbb1eaa21411ebd260%2Finsomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

#### ⚗️ Rodando os Tests (Jest)

Para rodar os testes é necessário que no seu terminal, você esteja dentro do diretório do projeto.

Estando no terminal e dentro do caminho correto, você poderá utilizar os comandos a seguir:

##### Rodar todos os testes

```bash
# caso use npm
npm run test

# caso use yarn
yarn test
```

##### Rodar todos os testes e ter um log ainda mais completo

```bash
# caso use npm
npm run test --all

# caso use yarn
yarn test --all
```

##### Rodar os testes de uma pasta específica

> detalhe: repare que tests está envolvido por 2 underlines. Isso se chama ***dunder***.

```bash
# caso use npm
npm run test <subpasta>

# caso use yarn
yarn test <subpasta>
```

##### Rodar os testes de um arquivo específico

```bash
# caso use npm
npm run test <subpasta>/<arquivo>

# caso use yarn
yarn test <subpasta>/<arquivo>
```

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Server** ([Express](https://expressjs.com/pt-br/) + [Typescript](https://www.typescriptlang.org/))

- **[TypeORM](https://typeorm.io/)**
- **[Zod](https://www.npmjs.com/package/zod)**
- **[PG](https://www.npmjs.com/package/pg)**
- **[Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**
- **[Bcryptjs](https://www.npmjs.com/package/bcryptjs)**

> Veja o arquivo [package.json](https://github.com/diegoguilhermeDS/api-kimoveis/blob/2bee49eefffb3a1acb4c11bbb1eaa21411ebd260/package.json)


## 🦸 Autor

<a href="https://github.com/diegoguilhermeDS">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/110187246?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Diego Guilherme</b></sub></a> <a href="https://github.com/diegoguilhermeDS" title="Github">🚀</a>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-Diego-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/diegoguilhermeds/)](https://www.linkedin.com/in/diegoguilhermeds/) 
[![Gmail Badge](https://img.shields.io/badge/-diegoguilherme752@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:diegoguilherme752@gmail.com)](mailto:diegoguilherme752@gmail.com)


## 📝 Licença
Este projeto esta sobe a licença [MIT](./LICENSE).

Feito com ❤️ por Diego Guilherme 👋🏽 [Entre em contato!](https://www.linkedin.com/in/diegoguilhermeds/)
