# Sistema de Vendas

O **Sistema de Vendas** é uma aplicação web desenvolvida em **React** que permite o gerenciamento eficiente de clientes, produtos e vendas. Esta aplicação também oferece a funcionalidade de geração de notas fiscais em formato PDF, proporcionando uma solução completa para pequenas e médias empresas.

## Funcionalidades

- **Cadastro de Clientes**: Adicione, edite e remova clientes do sistema.
- **Cadastro de Produtos**: Gerencie o inventário de produtos, incluindo adição, edição e remoção.
- **Criação de Vendas**: Realize vendas selecionando clientes e produtos, com controle de quantidades.
- **Geração de Notas Fiscais em PDF**: Crie notas fiscais personalizadas em PDF após a realização de vendas.
- **Visualização de Vendas Realizadas**: Acesse um histórico completo de vendas feitas.
- **Dashboard**: Visualize informações resumidas sobre vendas, produtos e clientes em gráficos interativos.

## Tecnologias Utilizadas

Este projeto é construído utilizando as seguintes tecnologias:

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **React Router**: Para navegação entre diferentes páginas da aplicação.
- **Axios**: Para realizar requisições HTTP à API.
- **jsPDF e html2canvas**: Para gerar PDFs a partir do conteúdo da aplicação.
- **Chart.js**: Para criar gráficos interativos.
- **lucide-react**: Para ícones de alta qualidade.
- **QRCode**: Para geração de QR Codes.
- **react-chartjs-2**: Integração do Chart.js com React.
- **react-icons**: Conjunto de ícones personalizáveis.

## Pré-requisitos

Antes de começar, certifique-se de que você possui as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)

## Configuração

Siga os passos abaixo para configurar e executar o projeto localmente:

1. **Clone o repositório**

   git clone https://github.com/jonatasem/sistema-de-vendas.git
   cd sistema-de-vendas
   

2. **Instale as dependências**

   npm install
   

3. **Configure a URL da API**

   Crie um arquivo `.env` na raiz do projeto e adicione a seguinte linha, substituindo pela URL da sua API:

   plaintext
   VITE_API_URL=http://sua-api-url.com
   

4. **Inicie o servidor de desenvolvimento**

   npm run dev
   

   O aplicativo estará disponível em [`http://localhost:5173`](http://localhost:5173).

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte maneira:

1. Componentes reutilizáveis
2. Hooks personalizados para gerenciar estados
3. Páginas principais da aplicação
4. Funções de serviço para interações com a API
5. Estilos globais e específicos
6. Componente principal do aplicativo
7. Ponto de entrada do React


## Como Usar

1. **Registro de Clientes**: Navegue até a página de registro de clientes para adicionar um novo cliente.
2. **Registro de Produtos**: Vá para a página de registro de produtos para adicionar novos produtos ao inventário.
3. **Criação de Vendas**: Acesse a página de criação de vendas, selecione um cliente e produtos para realizar uma venda.
4. **Visualização de Vendas**: Após criar uma venda, você pode visualizar as vendas realizadas e gerar notas fiscais em PDF.

## Contribuições

Contribuições são bem-vindas! Se você deseja contribuir, siga estas etapas:

1. Fork o projeto.
2. Crie uma nova branch para sua feature ou correção (`git checkout -b feature/nome-da-sua-feature`).
3. Faça suas alterações e commit (`git commit -m 'Adicionando uma nova feature'`).
4. Faça o push para a branch (`git push origin feature/nome-da-sua-feature`).
5. Abra um Pull Request para revisão.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).
