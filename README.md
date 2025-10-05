# ExporaBR 🌎

https://bright-starlight-a33c15.netlify.app/ Acesso ao app.

ExporaBR é um **Progressive Web App (PWA)** que permite ao usuário explorar lugares do Brasil de forma interativa. O app combina **geolocalização** e informações da **Wikipédia** para mostrar o local pesquisado, sua posição atual, distância entre os dois pontos e um resumo do local com imagem.  

---

## Funcionalidades

- 📍 **Minha Localização:** mostra latitude, longitude e link para ver no Google Maps.  
- 🔎 **Pesquisar Local:**  
  - Pega a posição do usuário.  
  - Busca coordenadas do local pesquisado usando **Nominatim (OpenStreetMap)**.  
  - Calcula a **distância** entre o usuário e o local pesquisado.  
  - Mostra resumo e imagem do local usando a **API da Wikipédia**.  
  - Link direto para ver a **rota no Google Maps**.  

---

## Tecnologias

- HTML, CSS, JavaScript  
- **PWA** (Progressive Web App)  
- API de geolocalização do navegador  
- **Wikipédia REST API** (`https://pt.wikipedia.org/api/rest_v1/page/summary/`)  
- **Nominatim OpenStreetMap API** (`https://nominatim.openstreetmap.org`)  

---

