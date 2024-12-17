# API_Clima

Este é um projeto que permite visualizar um globo interativo, com o recurso de alternar entre a visualização do dia e da noite, exibindo mapas da Terra com texturas dinâmicas. O globo é renderizado em 3D utilizando a biblioteca `three.js` com integração ao React através de `react-three/fiber`.

## Funcionalidades

- **Globo interativo**: Um globo em 3D que gira continuamente.
- **Alternância de mapas**: Alterna entre o mapa diurno e noturno da Terra com um clique.
- **Controles de câmera**: O globo pode ser rotacionado e ampliado utilizando o controle de órbita.

## Tecnologias

- **React**: Biblioteca JavaScript para construção da interface de usuário.
- **React Three Fiber**: Biblioteca para integração do `three.js` com React.
- **Three.js**: Biblioteca JavaScript para renderização 3D.
- **@react-three/drei**: Conjunto de utilitários úteis para `react-three/fiber`, como a esfera (`Sphere`) e controles de órbita (`OrbitControls`).
  
## Instalação

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. **Instale as dependências:**

   Navegue até o diretório do projeto e instale as dependências:

   ```bash
   cd seu-repositorio
   npm install
   ```

3. **Execute o projeto:**

   Após a instalação das dependências, execute o projeto com o comando:

   ```bash
   npm run dev
   ```

   O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000).
## Como Funciona

O componente principal do projeto é o `Globo`, que utiliza uma esfera 3D para representar o planeta. O globo gira lentamente ao longo do eixo Y, e sua textura (mapa da Terra) alterna entre as versões diurna e noturna quando o usuário clica no botão.

### Estrutura dos Componentes:

- **App.jsx**: Componente principal que contém o canvas e renderiza o globo e os controles de luz e câmera.
- **Globo.jsx**: Componente que renderiza o globo 3D usando uma esfera, com a rotação contínua e aplicação de textura.
- **Luzes.jsx**: Componente que adiciona luzes na cena para iluminar o globo.
- **ControleCamera.jsx**: Componente para controle da câmera, permitindo que o usuário gire e faça zoom no globo.

## Como Usar

1. **Alternar entre mapas**: Clique no botão para alternar entre a visualização diurna e noturna do globo.
2. **Interação com a câmera**: Use o mouse para girar e ampliar o globo.

## Personalização

- **Textura do Globo**: As imagens de textura para o globo podem ser personalizadas, basta substituir os arquivos `earth_map_day.jpg` e `earth_map_night.jpg` no diretório `src/assets/`.
- **Velocidade de Rotação**: A rotação do globo pode ser ajustada modificando a linha `globeRef.current.rotation.y += 0.001;` no componente `Globo.jsx`.

## Contribuições

Contribuições são bem-vindas! Se você tiver sugestões de melhorias ou novos recursos, sinta-se à vontade para abrir um "pull request" ou "issue".

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
