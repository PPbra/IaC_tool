module.exports =  {
    generator:(config)=>{
        return(
`resource "aws_route_table_association" "${(!!config.name)?config.name:"main"}" {
    subnet_id = ${!!config.subnet_id?config.subnet_id:"aws_subnet.main.id"}
    route_table_id = ${!!config.route_table_id?config.route_table_id:"aws_route_table.main.id"}
}`
        )
    }
}