const aws = (config)=>{
    return {
        name:config.name,
        aws_vpc:config.network,
        cidr_block:config.cidr_block,
        availability_zone:config.zone
    }
}

const zoneFilter = (config,cloud) =>{
    if(cloud == "gcp"){
        
    }
}

const gcp = (config) =>{
    return {
        name:config.name,
        ip_cidr_range:config.cidr_block,
        google_compute_network:config.network,
        region:config.zone
    }
}

module.exports = {
    aws, gcp
}