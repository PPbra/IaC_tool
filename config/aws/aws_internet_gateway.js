module.exports = {
    generator:(config)=>{
        return(
`
resource  "aws_internet_gateway" "${(!!config.name)?config.name:"main"}" {
    vpc_id =  ${(!!config.vpc_id)?config.vpc_id:"aws_vpc.main.id"}
}
`
        )
    }
}