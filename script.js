// 📍 Função para calcular distância usando fórmula de Haversine
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // distância em km
}

// 🌍 Buscar local digitado e comparar com a posição do usuário
document.getElementById("searchBtn").addEventListener("click", async () => {
    const query = document.getElementById("search").value.trim();

    if (!query) {
        alert("Digite um local para pesquisar!");
        return;
    }

    try {
        // 1. Pegar localização do usuário
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const userLat = pos.coords.latitude;
            const userLon = pos.coords.longitude;

            // 2. Buscar coordenadas do local via Nominatim (OpenStreetMap)
            const geoResponse = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
            );
            const geoData = await geoResponse.json();

            if (geoData.length === 0) {
                document.getElementById("result").innerHTML = "<p>Local não encontrado.</p>";
                return;
            }

            const place = geoData[0]; // pega o primeiro resultado
            const placeLat = parseFloat(place.lat);
            const placeLon = parseFloat(place.lon);

            // 3. Calcular distância
            const distancia = calcularDistancia(userLat, userLon, placeLat, placeLon).toFixed(2);

            // 4. Buscar informações da Wikipédia
            const wikiResponse = await fetch(
                `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
            );
            let wikiHTML = "";
            if (wikiResponse.ok) {
                const wikiData = await wikiResponse.json();
                wikiHTML = `
                    <h2>${wikiData.title}</h2>
                    <p>${wikiData.extract}</p>
                    ${wikiData.thumbnail ? `<img src="${wikiData.thumbnail.source}" alt="${wikiData.title}">` : ""}
                `;
            }

            // 5. Mostrar resultado completo
            document.getElementById("result").innerHTML = `
                <h2>📍 Informações de Localização</h2>
                <p><b>Sua localização:</b> ${userLat}, ${userLon}</p>
                <p><b>Local pesquisado:</b> ${placeLat}, ${placeLon}</p>
                <p><b>Distância aproximada:</b> ${distancia} km</p>
                <a href="https://www.google.com/maps/dir/${userLat},${userLon}/${placeLat},${placeLon}" target="_blank">
                    Ver rota no Google Maps 🚗
                </a>
                <hr>
                ${wikiHTML}
            `;
        });
    } catch (err) {
        document.getElementById("result").innerHTML = "<p>Erro na busca.</p>";
        console.error(err);
    }
});
