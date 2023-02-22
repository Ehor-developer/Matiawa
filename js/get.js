//パラメータを取得する処理
function parm(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//四捨五入して、緯度と経度を表示
//document.getElementById("ido").innerHTML = Math.round(parm('ido') * 1000) / 1000;
//document.getElementById("keido").innerHTML = Math.round(parm('keido') * 1000) / 1000;
//document.getElementById("map").setAttribute("href", "https://www.google.co.jp/maps/@" + parm('ido') + "," + parm('keido') + ",19z");

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '©Google</a>'
});

var map = L.map('maps', {
    center: [parm('ido'), parm('keido')],
    zoom: 8,
    layers: [osm]
})
function customIcon(latLng, size, type) {
    var customIcon = L.divIcon({
        html: `<img class="pin" src="icon/icon.png" style="width: 40pt;">`,
        className: type,
        iconSize: [50, 67], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchorrelative to the iconAnchor
    });
    var marker = L.marker(latLng, { icon: customIcon });
    return marker;
}

customIcon([parm('ido'), parm('keido')], '90', 100, 'circle').addTo(map);