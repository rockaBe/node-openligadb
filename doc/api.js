YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "EntityPrototype",
        "Leagues",
        "List",
        "ManagerPrototype",
        "Nodeopenligadb",
        "Sport",
        "Sports"
    ],
    "modules": [
        "Entities",
        "Manager",
        "Tools",
        "node-openligadb"
    ],
    "allModules": [
        {
            "displayName": "Entities",
            "name": "Entities",
            "description": "EntityPrototype is the prototype for all entity objects.\n\nIt provides a common access to the connection which was used to load the data."
        },
        {
            "displayName": "Manager",
            "name": "Manager",
            "description": "The prototype of all manager objects."
        },
        {
            "displayName": "node-openligadb",
            "name": "node-openligadb",
            "description": "Wraps all interaction with the openligadb API.\n\n    var oldb = require('node-openligadb')()\n\nSupported options:\n - baseURL: the URL of the API without \"?WDSL\". Defaults to the currently valid URL.\n - verbose: true or false, indicates if you want some verbose console logs. Defaults to false.\n - useCache: true or false, wether the internal cache should be used. Defaults to true."
        },
        {
            "displayName": "Tools",
            "name": "Tools"
        }
    ]
} };
});