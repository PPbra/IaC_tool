const instanceFilter = (type,cloud)=>{
    if(cloud == 'gcp')
        return config="micro"?"e2-micro":(config="small"?"e2-small":"e2-medium") 
    else
        if(cloud == 'aws')
        return config="micro"?"t2.micro":(config="small"?"t2.small":"t2.medium")
}

const osFilter = (type,cloud)=>{
    
}

const aws = (config) => {
    return {
        name:config.name,
        instance_type:instanceFilter(config.instance_type,"aws"),
        aws_ami: config.os,
        aws_ebs_volume: config.disk,
        aws_network_interface:{
            aws_subnet:config.network_interface.subnet
        }
    }
}

const gcp =(config)=>{
    return {
        name:config.name,
        machine_type:instanceFilter(config.instance_type,"gcp"),
        image:config.os,
        network_interface:{
            google_compute_network: config.network_interface.vpc,
            google_compute_subnetwork: config.network_interface.subnet
        },
        google_compute_disk:config.disk
    }
}

module.exports = {
    aws,gcp
}


