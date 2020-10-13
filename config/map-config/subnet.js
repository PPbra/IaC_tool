const region = require("./region");
const region_map_config = require("./region");

const aws = (config)=>{
    return {
        name:config.name,
        aws_vpc:config.network,
        cidr_block:config.cidr_block,
        availability_zone:region_map_config.getZone(config.location)
    }
}


const gcp = (config) =>{
    return {
        name:config.name,
        ip_cidr_range:config.cidr_block,
        google_compute_network:config.network,
        region:region_map_config.getRegion(config.location)
    }
}

module.exports = {
    aws, gcp
}