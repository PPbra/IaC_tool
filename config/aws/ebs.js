module.exports = {
    config:[
        {
            type:"availability_zone",
            default:"ap-southeast-2"
        },
        {
            type:"size",
            default:"40"
        },
        {
            type:"tags",
            default:`Name = "Default ebs_volume"`
        },
    ],
    generator:(ebs_config)=>{
        return (
`resource "aws_ebs_volume" "${(!!ebs_config.name)?ebs_config.name:"main_ebs"}" {
    availability_zone = "${(!!ebs_config.availability_zone)?ebs_config.availability_zone:"ap-southeast-2"}"
    size = ${(!!ebs_config.size)?ebs_config.size:8}
    tags = {
        ${(!!ebs_config.tags)?ebs_config.tags:`Name = "Default ebs_volume"`}
}
}               
`)
    }
}