const aws = (config)=>{
    return {
        name:config.name,
        cidr_block:config.cidr_block
    }
}

const gcp = ()=>{
    
}

module.exports = {
    aws,gcp
}