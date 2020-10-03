module.exports =  {
    generator:(config)=>{
        return(
`resource "aws_route_table_association" "${(!!config.name)?config.name:"main"}" {
    subnet_id = aws_subnet.${!!config.aws_subnet?config.aws_subnet:"main"}.id
    route_table_id = aws_route_table.${!!config.aws_route_table?config.aws_route_table:"main"}.id
}`
        )
    }
}