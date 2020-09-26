module.exports = {
    generator:(config)=>{
        return(
`resource "aws_network_acl" "allowall" {
    vpc_id = ${!!config.vpc_id?config.vpc_id:"aws_vpc.main.id"}

    egress {
        protocol = "-1"
        rule_no = 100
        action = "allow"
        cidr_block = "0.0.0.0/0"
        from_port = 0 
        to_port =  0
    }

    ingress {
        protocol = "-1"
        rule_no  = 200
        action = "allow"
        cidr_block = "0.0.0.0/0"
        from_port = 0
        to_port = 0

    }

    tags = {
        Name = "tf-acl-aws"
    }
    }

    resource "aws_security_group" "allowall" {
    name = "SG allow all"
    description  = "Allow all traffic - naughty"
    vpc_id = ${!!config.vpc_id?config.vpc_id:"aws_vpc.main.id"}

    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks  = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0 
        to_port = 0 
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}
`
        )
    }
}