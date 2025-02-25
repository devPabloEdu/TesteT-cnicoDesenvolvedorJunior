# Projeto de Gestão de Alunos, Cursos e Matrículas

Este projeto consiste em uma API em ASP.NET Core para gerenciar alunos, cursos e matrículas, com um frontend feito em React e TypeScript. A API usa SQL Server Express e Migrations para gerenciar o banco de dados.

## Tecnologias Utilizadas
- **Backend (API)**: ASP.NET
- **Frontend (UI)**: React + TypeScript
- **Banco de Dados**: SQL Server Express
- **ORM**: Entity Framework Core

## Pré-requisitos

Para rodar este projeto localmente, você precisará:

- **.NET 6 ou superior** - Para rodar a API backend.
- **Node.js e npm** - Para rodar o frontend React.
- **SQL Server Express** - Banco de dados utilizado para persistência.
- **Visual Studio ou VS Code** - Para desenvolvimento backend e frontend (opcional, mas recomendado).

## Passo 1: Clonando o Repositório

Clone este repositório para sua máquina local:
git clone https://github.com/seu-usuario/projeto-gestao-alunos-cursos.git
cd projeto-gestao-alunos-cursos

## Passo 2: Configurando o Banco de Dados SQL Server Express

1 - Instalar o SQL Server Express (se não tiver instalado):
2 - Configurar a Conexão com o Banco de Dados:
Abra o arquivo appsettings.json no backend (API) e configure a string de conexão com seu banco de dados SQL Server

## Passo 3 : Rodar as Migrations:
Navegue até o diretório do projeto AlunosCursosApi no terminal e execute o seguinte comando para aplicar as migrations e criar o banco de dados:

![image](https://github.com/user-attachments/assets/878b99d3-2417-4707-9d6d-4e6cebaed0a4)

## Passo 4: Rodando o Backend (API)

Navegue para o diretório da API
Rode o Projeto Backend utilizando o comando dotnet run

## Passo 5: Rodando o Frontend (React + TypeScript)

Navegue para o diretório do seu frontEnd
Rode o projeto utilizando o comando NPM start
