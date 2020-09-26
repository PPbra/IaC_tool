module.exports = {
    generator:(config)=>{
        return(
`resource "aws_route_table" "${(!!config.name)?config.name:"default"}" {
    vpc_id = "${(!!config.vpc_id)?config.vpc_id:"aws_vpc.main.id"}"
    route {
        cidr_block = "${(!!config.route.cidr_block)?config.route.cidr_block:"0.0.0.0/0"}"
        gateway_id = "${(!!config.route.gateway_id)?config.route.gateway_id:"aws_internet_gateway.main.id"}"
}
}`
        )
    }
}