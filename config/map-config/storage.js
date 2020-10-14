const google_compute_disk = require("../gcp/google_compute_disk");
const aws_ebs_volume = require("../aws/aws_ebs_volume");

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
    const code =aws_ebs_volume.generator({
        name:config.name,
        zone:config.zone,
        size:config.size,
        volume_type:typeFilter(config.type,'aws')
    });
    return  code;
}

const gcp = (config) =>{
    const code = google_compute_disk.generator({
        name:config.name,
        availability_zone:config.zone,
        size:config.size,
        volume_type:typeFilter(config.type,'gcp')
    });
    return code;
}


module.exports = {
    aws, gcp
}