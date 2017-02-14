# Para usar #

Clone o repo, entre nele e venha para este branch:

```
git clone https://github.com/GOUP2/goup2cloud-frontend.git
cd goup2cloud-frontend
git checkout develop
```

Importe os aliases do projeto

`source activate.sh`

Construa o containner

`dcbuild`

Instale as dependências do projeto

```
npm install
bower install
```

Inicie o container

`dcrun`

Acompanhe os logs do conainer até ver que ele está pronto

`dclogs -f` // Use CTRL + C quando quiser liberar o console.

Acesse em http://localhost:3001

Para uma lista de aliases disponíveis execute

`dcaliases`

# Build
## Build dos arquios Web
`grunt build`

## Build do apk para android
`cordova build`


# Para fazer deploy faça:
## Em homologação ##
```
grunt build

deploy

```

Acesse em `https://goup2cloud.com.br`

## Em um emulador ##
`adb connect IP_EMULADOR` para connectar um emulador
`deploy2emulator`

# Testes 

## Para executar os testes unitarios, execute
`npm test`
