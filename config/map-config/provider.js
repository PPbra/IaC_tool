const REGION = require("./region");
const aws_gen = require("../aws");
const gcp_gen = require("../gcp");

const gcp = (config)=>{
    return gcp_gen.provider.generator({
        region:REGION.getRegion(config.location,"gcp"),
        project:config.project
    })
}

const aws = (config)=>{
    return aws_gen.provider.generator({
        region:REGION.getRegion(config.location,"aws")  
    })
}

module.exports = {
    aws, gcp
}