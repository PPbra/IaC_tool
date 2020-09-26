module.exports = {
    config:[
        {
            type:"name"
        },
        {
            type:"cidr_block"
        },
        {
            type:"tags"
        }
    ],
    generator:(vpc_config)=>{
        return (
`
resource "aws_vpc" "${(!!vpc_config.name)?vpc_config.name:"main"}" {
    cidr_block       = "${(!!vpc_config.cidr)?vpc_config.cidr:"10.0.0.0/16"}"
    instance_tenancy = "default"  
    tags = {
        ${(!!vpc_config.tags)?vpc_config.tags:"Name = \"This is the test VPC!\""}
    }
}
`
)
    }
}