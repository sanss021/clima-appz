# clima-appz
Single page application com Vue, utilizando a API do Open Weather Map, para informar o tempo e temperatura (em graus celsius) atuais e a previsão dos próximos 7 dias de uma cidade, a ser informada pelo usuário. Idealmente incluindo a representação do tempo com ícones.

Etapa 1):

Criar novo projeto com Vue Cli;

Criar uma conta no  Open Weather Map;

Ativar a chave da API;

Fazer barra de pesquisa e ajustar imagem de fundo;

Estilizar dados meteorológicos;

Acessando e mostrando dados meteorológicos da API;

Mostrar a data

Etapa 2):

Definir os componentes Vue;

Importar o Axios para consumir APIs;

Definir o data() Vue;

Definir o methods Vue;

Fazer a chamada API One Call no openweathermap:

const response = await axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${this.UNITS}&appid=${this.API_KEY}`)

Como resposta obterá 'timezone_offset":

para que possa fazer um loop sobre a matriz daily para obter a data:

const myDate = new Date(obj.dt*1000-(obj.timezone_offset*1000)));

Definir representação através de ícones;

## Project setup
```
npm install  ou sudo npm install
```

### Compiles and hot-reloads for development
```
npm run  dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
