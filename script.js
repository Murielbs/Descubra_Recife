document.getElementById("searchBtn").addEventListener("click", async () => {
    const query = document.getElementById("search").value.trim();

    if (!query) {
        alert("Digite um local para pesquisar!");
        return;
    }

    try {
        // Faz a requisição à API da Wikipédia
        const response = await fetch(
            `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
        );

        if (!response.ok) throw new Error("Não foi possível encontrar informações.");

        const data = await response.json();

        // Exibe título, resumo e imagem (se existir)
        document.getElementById("result").innerHTML = `
            <h2>${data.title}</h2>
            <p>${data.extract}</p>
            ${data.thumbnail ? `<img src="${data.thumbnail.source}" alt="${data.title}">` : ""}
        `;
    } catch (err) {
        document.getElementById("result").innerHTML = "<p>Não foi possível encontrar informações.</p>";
        console.error(err);
    }
});
