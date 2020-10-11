const aws = (config)=>{
    return {
        name:config.name,
        cidr_block:config.cidr_block
    }
}


const gcp = ()=>{
    return {
        name:config.name
    }  
}

module.exports = {
    aws,gcp
}