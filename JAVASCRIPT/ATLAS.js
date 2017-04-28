
  var map;
  require([
    "esri/map", 
    "esri/layers/KMLLayer",
    "dojo/parser", 
    "dojo/dom-style",
    "esri/dijit/Search",
    "dijit/layout/BorderContainer", 
    "dijit/layout/ContentPane", 
    "dojo/domReady!"
  ], function(
    Map, KMLLayer,
    parser, domStyle,Search
  ) {
    map = new Map("map", {
      basemap: "topo",



      center: [-40, -20],
      zoom: 8
    });

var search = new Search({
            map: map
         }, "search");
         search.startup();
         
         
    parser.parse();

    var kmlUrl = "https://raw.githubusercontent.com/tiagocetto/tiagocetto.github.io/master/KML/mapaA.kml";
    var kml = new KMLLayer(kmlUrl);
    map.addLayer(kml);
    kml.on("load", function() {
      domStyle.set("loading", "display", "none");
    });
  });
