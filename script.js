// 🌍 Distância (Haversine)
const calcularDistancia = (lat1, lon1, lat2, lon2) => {
  const R = 6371, toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))).toFixed(2);
};

// 📌 Pegar localização do usuário
const getUserLocation = () => new Promise((res, rej) =>
  navigator.geolocation.getCurrentPosition(p => res(p.coords), rej)
);


const getWikiInfo = async q => {
  try {
    const r = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`);
    if (!r.ok) return "";
    const d = await r.json();
    return `<h2>${d.title}</h2><p>${d.extract}</p>${d.thumbnail ? `<img src="${d.thumbnail.source}">` : ""}`;
  } catch { return ""; }
};


const getPlaceCoords = async q => {
  const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`);
  const d = await r.json();
  return d[0] ? {lat:+d[0].lat, lon:+d[0].lon} : null;
};


document.getElementById("searchBtn").onclick = async () => {
  const q = document.getElementById("search").value.trim();
  if (!q) return alert("Digite um local!");

  const user = await getUserLocation();
  const place = await getPlaceCoords(q);
  if (!place) return result.innerHTML = "<p>Local não encontrado.</p>";

  const dist = calcularDistancia(user.latitude, user.longitude, place.lat, place.lon);
  const wikiHTML = await getWikiInfo(q);

  result.innerHTML = `
    <h2>📍 Informações</h2>
    <p><b>Sua localização:</b> ${user.latitude}, ${user.longitude}</p>
    <p><b>Local pesquisado:</b> ${place.lat}, ${place.lon}</p>
    <p><b>Distância:</b> ${dist} km</p>
    <a href="https://www.google.com/maps/dir/${user.latitude},${user.longitude}/${place.lat},${place.lon}" target="_blank">Ver rota 🚗</a>
    <hr>${wikiHTML}`;
};

document.getElementById("geoBtn").onclick = async () => {
  try {
    const u = await getUserLocation();
    result.innerHTML = `
      <h2>📍 Minha Localização</h2>
      <p><b>Latitude:</b> ${u.latitude}</p>
      <p><b>Longitude:</b> ${u.longitude}</p>
      <a href="https://www.google.com/maps?q=${u.latitude},${u.longitude}" target="_blank">Ver no Google Maps</a>`;
  } catch { alert("Não foi possível obter sua localização."); }
};

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(reg) {
        console.log('Service Worker registrado!', reg);
      })
      .catch(function(err) {
        console.log('Service Worker falhou:', err);
      });
  });
}
