const instance = require("./instance");
const storage = require("./storage");
const network = require("./network");
const firewall = require("./firewall");
const region = require("./region");
const subnet = require("./subnet");
const provider = require("./provider");

module.exports = {
    instance,network,storage,region,subnet,firewall,provider    
}