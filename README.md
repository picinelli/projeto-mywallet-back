<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/picinelli/projeto-mywallet-front">
    <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4b0.svg" alt="Logo" width="100">
  </a>

<h3 align="center">Projeto - MyWallet (BACK-END)</h3>
  <h4 align="center"> 
	🚀 Concluído! 🚀
  </h4>
  <p align="center">
    API de um Aplicativo de Controle de Gastos.
    <br />
    <a href="https://github.com/picinelli/projeto-mywallet-front/tree/main/src"><strong>Código JSX»</strong></a>
</div>

<!-- ABOUT THE PROJECT -->

![Banner](https://github.com/picinelli/projeto-mywallet-front/blob/main/src/assets/images/MyWalletBanner.png)

## OBS: Esse é um projeto FULL-STACK, para ver o repositório do FRONT-END, <a href="https://github.com/picinelli/projeto-mywallet-front"><strong>Clique Aqui»</strong></a>

# Requisitos

- Geral
    - [x]  Versionamento usando Git é obrigatório, crie um **repositório público** no seu perfil do GitHub
    - [x]  Faça commits a cada funcionalidade implementada
    - [x]  Separe o projeto em dois projetos diferentes: um para o *front-end* e outro pro *back-end*.
    - [x]  Implemente o *front-end* utilizando HTML, CSS, JS e **React** e as tecnologias que utilizamos até aqui, conforme o necessário para atender o *layout*.

- POST Login (rota `/`)
    - [x]  Deve ser recebido o email e senha e fazer a validação dos dados através de schemas
    - [x]  Deve ser feito a verificação se a senha criptografada está correta
    - [x]  Deve ser enviado para o usuário um token para navegação segura através da biblioteca uuid

- POST Cadastro (rota `/cadastro`)
    - [x]  Deve ser recebido o email e senha e fazer a validação dos dados através de schemas
    - [x]  Deve ser feito uma verificação caso haja email cadastrado
    - [x]  A senha deverá ser criptografada através da biblioteca bcrypt
        
- GET Entradas (rota `/inicio`)
    - [x]  Deverá enviar para o usuário um array com todas as suas entradas e saídas

# Bônus (opcional)

- DELETE Entradas (rota `/inicio`)
    - [x]  Deverá remover somente a entrada/saida selecionada pelo usuário no Front-End.

- PUT Entradas/Saidas (rota  `/nova-entrada` e `/nova-saida`)
    - [x]  Deverá alterar a entrada/saida selecionada pelo usuário no Front-End.


### Tecnologias Utilizadas

![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

<!-- CONTACT -->

### Contato

[![LinkedIn][linkedin-shield]][linkedin-url]
[![Mail][mail-shield]][mail-url]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/pedro-ivo-brum-cinelli//
[mail-shield]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[mail-url]: mailto:cinelli.dev@gmail.com
