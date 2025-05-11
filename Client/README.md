# 🌍 API Clima - Visualizador de Clima Interativo

Um aplicativo web interativo que permite visualizar informações climáticas de qualquer cidade do mundo, com um globo terrestre 3D e mapas interativos.

## ✨ Funcionalidades

### 🌍 Visualização 3D do Globo
- Globo terrestre interativo com textura realista
- Rotação automática do globo quando nenhuma cidade está selecionada
- Zoom suave ao selecionar uma cidade
- Transição suave da câmera para a localização da cidade
- Marcador vermelho indicando a cidade selecionada
- Pontos cardeais (N, S, L, O) marcados com cores diferentes
- Alternância entre textura diurna e noturna baseada no tema

### 🎨 Interface e Interatividade
- Fundo espacial dinâmico com estrelas
- Transições suaves entre temas claro e escuro
- Efeitos de hover e animações nos elementos da interface
- Cards com efeito de vidro (glassmorphism)
- Imagens de fundo dinâmicas das cidades pesquisadas
- Animações de carregamento e transição

### 🗺️ Mapa Interativo
- Visualização em mapa 2D da cidade selecionada
- Transição suave entre globo e mapa
- Zoom automático na localização
- Marcador personalizado na cidade
- Controles de zoom e pan
- Opção de alternar entre visualização do globo e mapa

### 📊 Informações do Clima
- Temperatura atual e sensação térmica
- Condição climática com ícone
- Umidade do ar
- Velocidade e direção do vento
- Visibilidade
- Pressão atmosférica
- Índice UV
- Bandeira do país da cidade selecionada

### 🌟 Recursos Visuais
- Efeitos de partículas no fundo
- Iluminação dinâmica no globo
- Sombras e reflexos realistas
- Gradientes e transparências
- Animações de transição entre estados
- Efeitos de blur e glassmorphism

## 🚀 Tecnologias Utilizadas

- React
- Vite
- Three.js (React Three Fiber)
- Leaflet
- Axios
- WeatherAPI
- Pexels API

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Entre no diretório do projeto:
```bash
cd API_CLIMA/Client
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🔑 Configuração das APIs

O projeto utiliza duas APIs principais:

1. WeatherAPI (Clima)
2. Pexels API (Imagens)

As chaves das APIs já estão configuradas no código.

## 🎮 Como Usar

1. Digite o nome de uma cidade no campo de busca
2. Aguarde o carregamento das informações
3. Visualize os dados do clima e a localização no globo
4. Use o botão de alternar tema para mudar entre modo claro e escuro
5. Interaja com o globo usando o mouse:
   - Rotação: Clique e arraste
   - Zoom: Scroll do mouse
   - Pan: Clique direito e arraste
6. Use o botão "Mostrar Mapa" para alternar entre visualização do globo e mapa

## 📱 Responsividade

O aplicativo é totalmente responsivo e funciona bem em:
- Desktops
- Tablets
- Smartphones

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.
