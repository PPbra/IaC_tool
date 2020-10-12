
const typeFilter = (type,cloud)=>{
    if(cloud == "aws"){
        if(type == 'ssh'){
            return "gp2"
        }
        if (type == "hdd") {
            return "sc1"
        }

    }else{
        if(cloud == "gcp"){
            if(type == 'ssh'){
                return "pd-balanced"
            }
            if (type == "hdd") {
                return "pd-standard"
            }
        }
    }
}

const aws = (config)=>{
    return {
        name:config.name,
        zone:config.zone,
        size:config.size,
        volume_type:typeFilter(config.type,'aws')
    }
}

const gcp = (config) =>{
    return {
        name:config.name,
        availability_zone:config.zone,
        size:config.size,
        volume_type:typeFilter(config.type,'gcp')
    }
}

module.exports = {
    aws, gcp
}