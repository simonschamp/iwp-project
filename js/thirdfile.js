let fetchData = async () => {
  let url =
    "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
  let res = await fetch(url);
  let data = await res.json();
  //console.log(data);

  initMap(data);
};

let initMap = (data) => {
  let map = L.map("map", {
    minZoom: -4,
  });

  let geoJson = L.geoJSON(data, {
    onEachFeature: getFeature,
    //onEachFeature: getPsValue,
    //style: getStyle,
  }).addTo(map);

  let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //maxZoom: 19,
    attribution: "© OpenStreetMap",
    weight: 2,
  }).addTo(map);

  map.fitBounds(geoJson.getBounds());

  fetchDataPs();
};

let fetchDataPs = async () => {
  let urlPs =
    "https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f";
  let resPs = await fetch(urlPs);
  let dataPs = await resPs.json();
};

let getFeature = (feature, layer) => {
  if (!feature.properties.name) return;
  let name = feature.properties.name;
  layer.bindPopup("This is " + name);
  //console.log(name);
  layer.bindTooltip(name).openTooltip();

  /*layer.bindPopup(
    `<ul>
      <li>Positive: ${dataPs[value - 1].value}</li>
    </ul>`
  );*/
};

// Printing the map
let printBtn = document.getElementById("print-map");
printBtn.addEventListener("click", () => {
  window.print();
});

fetchData();
