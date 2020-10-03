module.exports = {
    generator:(config)=>{
        return(
`resource "aws_route_table" "${(!!config.name)?config.name:"default"}" {
    vpc_id = aws_vpc.${config.aws_vpc}.id
    ${!!config.route?`route {
        cidr_block = "${config.route.cidr_block}"
        gateway_id = aws_internet_gateway.${config.route.aws_internet_gateway}.id
    }`:``}
}`
        )
    }
}