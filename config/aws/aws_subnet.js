module.exports = {
    generator:(config)=>{
        return(
`resource "aws_subnet" "${(!!config.name)?config.name:"main"}" {
    vpc_id = ${(!!config.vpc_id)?config.vpc_id:"aws_vpc.main.id"}
    cidr_block = "${(!!config.cidr_block)?config.cidr_block:"10.1.1.0/24"}"
    availability_zone = "${(!!config.availability_zone)?config.availability_zone:"ap-southeast-2a"}"
}`
        )
    }
}