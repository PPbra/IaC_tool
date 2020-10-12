const map_config = require("../map-config/network");
const generator = (config)=>{
    return (
`resource "google_compute_network" "${!!config.name?config.name:"vpc"}" {
name = "${!!config.name?config.name:"vpc"}"
${!!config.auto_create_subnetworks?`auto_create_subnetworks = "${config.auto_create_subnetworks}"`:``}
${!!config.description?`description = "${config.description}"`:``}
${!!config.routing_mode?`routing_mode = "${config.routing_mode}"`:``}
${!!config.project?`project = "${config.project}"`:``}
${!!config.delete_default_routes_on_create?`delete_default_routes_on_create = "${config.delete_default_routes_on_create}"`:``}
}`            
    )
}

const mapping = (config)=>generator(map_config.gcp(config));

module.exports = {
    generator,mapping
}