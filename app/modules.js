var modules = {};

// root module name
modules.main = "S2it";

// centralized modules
modules.directives = modules.main.concat(".directives");
modules.filters = modules.main.concat(".filters");
modules.services = modules.main.concat(".services");

//controllers modules
modules.master = modules.main.concat(".master");