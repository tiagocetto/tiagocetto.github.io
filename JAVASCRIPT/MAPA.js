

var kml = {
    	KMLa: {
        	name: "KML1",
        	url: "https://raw.githubusercontent.com/tiagocetto/tiagocetto.github.io/master/KML/mapaA.kml"
    	},
	KMLb: {
        	name: "KML2",
        	url: "https://raw.githubusercontent.com/tiagocetto/tiagocetto.github.io/master/KML/mapaB.kml"
    	},
	KMLc: {
        	name: "KML3",
        	url: "https://raw.githubusercontent.com/tiagocetto/tiagocetto.github.io/master/KML/mapaC.kml"
    	}
};




var map;
function initAutocomplete() {
	
    var options = {
	center: {lat: -20.282, lng: -40.321},
        zoom: 9,

    }
    map = new google.maps.Map(document.getElementById("map"), options);

    createTogglers();
    
    
//CAIXA DE PESQUISA - INÍCIO//
    
 // Create the search box and link it to the UI element.
    
 var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
   
  // Bias the SearchBox results towards current map's viewport.
    
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
    });
    var markers = [];
    
  // Listen for the event fired when the user selects a prediction and retrieve
    
  // more details for that place.
    
  searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }
        
  // Clear out the old markers.
       
   markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];
        
   // For each place, get the icon, name and location.
        
   var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }
        var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };
        
   // Create a marker for each place.
        
   markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
        }));
        if (place.geometry.viewport) {
            
   // Only geocodes have viewport.
  
      bounds.union(place.geometry.viewport);
        }else{
            bounds.extend(place.geometry.location);
        }
        });
        map.fitBounds(bounds);
        });
        
   //CAIXA DE PESQUISA - FINAL//
 
   
};

google.maps.event.addDomListener(window, 'load', initAutocomplete);

// the important function... kml[id].xxxxx refers back to the top 
function toggleKML(checked, id) {

    if (checked) {

        var layer = new google.maps.KmlLayer(kml[id].url, {
            preserveViewport: true,
            suppressInfoWindows: true 
        });
        // store kml as obj
        kml[id].obj = layer;
        kml[id].obj.setMap(map);
    }
    else {
        kml[id].obj.setMap(null);
        delete kml[id].obj;
    }

};



function createTogglers() {


var html = "<ul class=\"unstyled" + "\">";
    for (var prop in kml) {
        html += "<li id=\"selector-" + prop + "\"><input class=\"normal" + "\" type='checkbox' id='" + prop + "'" +
        " onclick='highlight(this,\"selector-" + prop + "\"); toggleKML(this.checked, this.id)' \/>" +
         "<label for=\"" + prop + "\">" +
     kml[prop].name +  "</label>" +"<\/li>";
    }

html += "<li id='selector-removecamadas'><input class='normal' type='checkbox'    id='removecamadas'" +
        " onclick='removeAll();return false;' \/>" +
         "<label for='removecamadas'>" +
        "Remover Camadas</label>" +"<\/li>" + 
    "<\/ul>";
	document.getElementById("camadas").innerHTML = html;
};



// easy way to remove all objects
function removeAll() {
    for (var prop in kml) {
        if (kml[prop].obj) {
            kml[prop].obj.setMap(null);
            delete kml[prop].obj;
        }

    }
};


// Append Class on Select
function highlight(box, listitem) {
    var selected = 'selected';
    var normal = 'normal';
    document.getElementById(listitem).className = (box.checked ? selected: normal);
};

function startup() { 
// for example, this toggles kml b on load and updates the menu selector
var checkit = document.getElementById('b');
checkit.checked = true;
toggleKML(checkit, 'b');
highlight(checkit, 'selector1');
 }




 

