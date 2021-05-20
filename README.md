# Quafundó - Front-end

Esta aplicação é parte do projeto Quafundó, plataforma de distribuição de quizzes desenvolvida como forma de avaliação para minha possível contratação pela Cafundó.

Esta aplicação é a interface de usuário para interação com a API Quafundó, disponível no seguinte repositório: https://github.com/stephenfg92/quafundo

## Utilização

1. Basta instalar o NodeJS versão 14.17.0 LTS, disponível no seguinte website: https://nodejs.org/

2. Com o NodeJS instalado, clone este repositório usando o comando `git clone https://github.com/stephenfg92/quafundo_client.git`. Ou, faça o download do repositório utilizando o botão "Code" disponibilizado pelo GitHub.

3. Utilizando o terminal de seu sistema, navegue até a pasta onde está o repositório e execute o comando `npm install` para instalar as dependências do projeto.

4. Na mesma pasta, execute o comando `npm start` para iniciar a aplicação.

## Configuração padrão

Por padrão, este aplicativo irá se conectar ao servidor de API hospedado em `http://www.quafundo.xyz/api/`. Caso deseje servir a API localmente, acesse o link disponibilizado no início deste arquivo de instruções. Com API em execução, edite o arquivo .env, alterando a variável REACT_APP_API_URL para o endereço de execução desejado.