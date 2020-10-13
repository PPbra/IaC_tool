
const aws = (config)=>{
    return {
        name:config.name,
        aws_vpc:config.network,
        ports:reflectConfig(config,"aws")
    }
}

const gcp = (config) =>{
    return {
        name:config.name,
        google_compute_network:config.network,
        allows:config.allows,
        denies:config.denies
    }
}

const reflectConfig  = (config,cloud) =>{
    if(cloud == "aws"){
        let ports = [];
        
        config.allows.forEach(element => {
            element.ports.forEach(e=>{
                ports.push({
                    protocol: element.protocol,
                    port: e
                })
            })
        });
        
        config.denies.forEach(element => {
            element.ports.forEach(e=>{
                ports.push({
                    protocol: element.protocol,
                    port: e
                })
            })
        });
        return ports;
    }
}


module.exports  = {
    aws,gcp
}