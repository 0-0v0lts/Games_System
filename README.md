# **Biblioteca de Jogos - Lucas Ferraz dos Santos**

Este projeto é um sistema de gerenciamento de jogos (CRUD) desenvolvido para a disciplina de Experiência Criativa.

## **Objetivo**

O objetivo deste projeto é desenvolver uma aplicação web para o gerenciamento eficiente de uma coleção de jogos, permitindo ao usuário realizar operações completas de criação, leitura, atualização e exclusão (CRUD) de dados. O sistema visa organizar informações como título, gênero, plataforma, preço e conquistas, garantindo a integridade dos dados através de validações no backend e proporcionando uma interface intuitiva com suporte a paginação para otimização da visualização.

## **Aluno**
- **Nome:** Lucas Ferraz dos Santos
- **RA:** 40090790

## **Tecnologias**
- **Front-end:** React + CSS3
- **Back-end:** Node.js + Express
- **Banco de Dados:** MySQL

## **Como executar o projeto**

## **1. Banco de Dados**
O script para criação das tabelas e inserção dos dados iniciais está localizado em:
`./database/games_system_export.sql`
Importe este arquivo no seu MySQL Workbench antes de iniciar o servidor.

## **2. Backend**
```bash
cd Backend
npm install
npm start

## **3. Frontend**
```bash
cd Frontend
npm install
npm start

## **Funcionalidades**

Cadastro de novos jogos com validação.

Listagem com paginação (9 jogos por vez).

Edição e Exclusão de registros.

Visualização de detalhes por ID.

Tema Dark com botões em destaque Verde Neon.
