# Kirvano App - Frontend

## Overview

Este é o repositório do frontend do projeto realizado como desafio técnico para a vaga de Desenvolvedor Full Stack na Kirvano. 

### Escopo do projeto

O projeto consiste em uma aplicação web que envia dados do cartão de crédito através de um formulário para a API e exibe um alerta informando se houve sucesso ou falha na validação. A validação se faz necessária para que seja possível finalizar o pedido de um produto.

### Funcionalidades

Além do envio dos dados do formulário de cartão para validação pela API, a aplicação web também salva o endereço informado pelo usuário e permite que seja utilizado em próximas compras. Semelhantemente, também é possível salvar os dados do cartão de crédito para que possa ser utilizado novamente.

Na primeira página da aplicação (shipping), o usuário preenche as informações de endereço, ou seleciona um endereço pré-existente, caso haja, e as respectivas informações são populadas no formulário. Ao prosseguir para a página seguinte (payment), o usuário deve preencher as informações do cartão ou escolher um pré-existente, que também são populadas do formulário tal como o processo anterior. Os formulários de ambas a páginas possuem validação, impedindo que sejam submetidos com alguma informação incorreta.

Ao clicar em `Complete Order`, a requisição é feita ao back-end com todas as informações do endereço, do cartão e do pedido. No caso de sucesso, um alerta `success` é exibido. No caso de falha, um alerta com a mensagem de erro é exibida.

## Informações Técnicas

A aplicação foi desenvolvida utilizando as boas práticas do React, com separação de componentes, código limpo, eficiente e compreensível. A estrutura escolhida permite que o projeto escale tranquilamente sem necessidade de muitas modificações. Visto que o código foi 100% escrito em Typescript, todos os componentes, funções, objetos foram devidamente tipados, evitando o uso de `any` no código dificuldando manutenções futuras.

A estilização, feita com Tailwind, adota o conceito `CSS-in-JS`, o que unifica estilo e estrutura em um só arquivo facilitando encontrar estilizações específicas de elementos. Foram utilizadas cores customizadas na aplicacão definidas no arquivo tailwind.config.ts. Também importante mencionar que todas as páginas estão 100% resposivas, funcionando adequadamente em qualquer largura de dispositivo.

Com relação às requisições ao backend, conforme determinado na especificação do projeto, é adicionado um access token como query param para que possam ser devidamente recebidas e processadas. O valor do access token é armazenado no arquivo `.env` como `NEXT_PUBLIC_ACCESS_TOKEN`, e a URL do backend é definida como `NEXT_PUBLIC_API_URL`.

### Tecnologias Utilizadas

O projeto foi desenvolvido com Next.js na versão 14.2.2, React versão 18, Tailwind versão 3.4.1, React Hook Form versão 7.51.3, e Zod versão 3.23.3.

## Execução local do projeto

Para executar o projeto localmente, após cloná-lo, abra o terminal e execute o comando `npm i`. Aguarde todas as dependências serem instaladas, e em seguida execute um desses comandos:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Em seguida, no navegador acesse a url `http://localhost:3000` para abrir a aplicação.
