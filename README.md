# Copa Filmes
A melhor ferramenta para o melhor filme :D

## Passos iniciais

Essas são as instruções para executar a aplicação API sem a dependêcia do visual studio. O ideal é que utilize o visual studio e selecione a opção Docker.

### Pré-Requisitos docker

É necessário ter o docker instalado e rodando em sua máquina, caso não tenha siga as instruções contidas no link abaixo

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

#### Executando com DockerFile

Para executar a aplicação utilizando o dockerfile execute os comandos abaixo no diretorio `src/CopaFilmes.API`

```shell
docker run -dt -p 52521:80 copafilmesapi
```

### Pré-Requisitos dotnet CLI

É necessário ter o .net core 3.0 SDK instalado em sua máquina, caso não tenha siga as instruções contidas no link abaixo

* [Download](https://dotnet.microsoft.com/download/dotnet-core/3.0)

#### Executando com dotnet CLI

Para executar a aplicação utilizando o .net core cli execute os comandos abaixos na raiz do repositório

```shell
cd src\CopaFilmes.Api
dotnet restore
dotnet run
```

### Aplicação Front-End

A aplicação front end se encontra no diretorio `src/app`. Para rodar basta executar o comando abaixo:

```shell
yarn
yarn start
```

## Testes

A aplicação está documentada seguindo a especificação do Swagger, os testes poderão ser realizados acessando a url /swagger. Além disso, foi desenvolvido testes de unidade, para executá-los sem a dependência do visual studio siga os passos abaixo:

### Pré-Requisitos dotnet CLI

É necessário ter o .net core 3.0 SDK instalado em sua máquina, caso não tenha siga as instruções contidas no link abaixo

* [Download](https://dotnet.microsoft.com/download/dotnet-core/3.0)

#### Executando com dotnet CLI

Para executar a aplicação utilizando o .net core cli execute os comandos abaixos na raiz do repositório

```shell
dotnet test
```

