const mapAttribute = (config) => {
    return {
        name:config.name,
        instance_type:config.instance_type,
        aws_ami: config.os,
        aws_ebs_volume: config.disk,
        aws_network_interface:config.network_interface
    }
}

module.exports = {
    mapAttribute
}


