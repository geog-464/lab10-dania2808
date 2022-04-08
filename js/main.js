// declare the map variable here to give it a global scope
let myMap;

// we might as well declare our baselayer(s) here too
const OpenTopoMap = L.tileLayer(
	'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', 
	{
		attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
	}
)

function initialize(){
    loadMap();
};

function fetchData(){
    //load the data
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(json, 
            	{style: styleAll, pointToLayer: generateCircles, onEachFeature: addPopups}).addTo(myMap);
        })
};

function loadMap(mapid){
	try {
		myMap.remove()
	} catch(e) {
		console.log(e)
		console.log("no map to delete")
	} finally {
	//put your map loading code in here
		if (mapid=='mapa'){
		//now reassign the map variable by actually making it a useful object, this will load your leaflet map
		myMap = L.map('mapdiv', {
			center: [45.50, -73.58]
			,zoom: 3
			,maxZoom: 18
			,minZoom: 3
			,layers: OpenTopoMap
			});
		// calling function fetchData with data
			fetchData(url='https://raw.githubusercontent.com/geog-464/lab10/main/data/Amtrak_Stations.geojson');

		}

		if (mapid=='mapb'){
		//now reassign the map variable by actually making it a useful object, this will load your leaflet map
			myMap = L.map('mapdiv', {
				center: [31.24967, 30.06263]
				,zoom: 2
				,maxZoom: 15
				,minZoom: 1
				,layers: OpenTopoMap
			});
			// calling function fetchData with data
			fetchData(url='https://raw.githubusercontent.com/geog-464/lab10/main/data/megacities.geojson');
		}
	}



	//add the basemap style(s) to a JS object, to which you could also add other baselayers. This object is loaded as a basemap selector as seen further down
	let baseLayers = {
		"OpenTopoMap": OpenTopoMap
		//,...
	};

	//declare basemap selector widget
	let lcontrol = L.control.layers(baseLayers);
	//add it to the map
	lcontrol.addTo(myMap);


	// calling function fetchData with data
	fetchData();

	console.log(mapid)

};



function generateCircles(feature, latlng) {
	return L.circleMarker(latlng);
}


function styleAll(feature, latlng) {
	
	// console.log(feature.properties.ZipCode);

	var styles = {dashArray:null, dashOffset:null, lineJoin:null, lineCap:null, stroke:false, color:'#000', opacity:1, weight:1, fillColor:null, fillOpacity:0 };

	if (feature.geometry.type == "Point") {
		styles.fillColor = '#fff'
		,styles.fillOpacity = 0.5
		,styles.stroke=true
		,styles.radius=9
	}

	if (typeof feature.properties.ZipCode == 'string') {
		styles.fillColor = '#00FFFF'
		,styles.fillOpacity = 0.5
		,styles.stroke=true
		,styles.radius=9
	}

	
	return styles;
}

function addPopups(feature, layer){

	layer.bindPopup();
	//console.log(feature)
	//console.log(layer),
	//console.log(layer._radius=80)
	//console.log(layer.options.fill=false)
	//console.log(layer.getLatLng())
}








//window.onload = initialize();