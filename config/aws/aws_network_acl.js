module.exports = {
    generator:(config)=>{
        const code = ``;
        config.ports.map(port=>{
            code += `
    egress {
        protocol = "${port.protocol}"
        rule_no = 100
        action = "${port.action}"
        cidr_block = "${port.cidr_block}"
        from_port = ${port.port} 
        to_port =  ${port.port}
    }

    ingress {
        protocol = "${port.protocol}"
        rule_no = 100
        action = "${port.action}"
        cidr_block = "${port.cidr_block}"
        from_port = ${port.port} 
        to_port =  ${port.port}
}
            `  
        })
        return(
`resource "aws_network_acl" "allowall" {
    vpc_id = aws_vpc.${config.aws_vpc}.id
        ${code}
    }
`
        )
    }
}