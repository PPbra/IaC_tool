//terrafrom version ^3.*.*
module.exports = {
    ec2:{
        generator: (ec2_config)=>{
            return (
`data "aws_ami" "ubuntu" { 
    most_recent = true
    filter {
    name   = "name"
    values = ["${(!!ec2_config.ami_name)?ec2_config.ami_name:"ubuntu"}*"]
    }
}
resource "aws_instance" "${(!!ec2_config.name)?ec2_config.name:"Default_name"}" {
    ami           = data.aws_ami.ubuntu.id
    instance_type = "${(!!ec2_config.instance_type)?ec2_config.instance_type:"t2.micro"}"
    tags = {
    ${(!!ec2_config.tags)?ec2_config.tags:`Name="Default Instance"`}
    }
}
${(!!ec2_config.ebs)?`
resource "aws_volume_attachment" "volume-att-${ec2_config.name}"{
    device_name = "/dev/sdc"
    volume_id = aws_ebs_volume.${ec2_config.ebs}.id
    instance_id = aws_instance.${ec2_config.name}.id
   }
`:""}`)
        },
        config:[
            {
                type:"resource_name",
                default:"Default_name"
            },
            {
                type:"instance_type",
                default:"t2.micro"
            },
            {
                type:"ami_name",
                default:"ubuntu"
            },
            {
                type:"tags",
                default:`Name="Default Instance"`
            }
        ]
    },
    ebs:{
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
`resource "aws_ebs_volume" "${(!!ebs_config.resoure_name)?ebs_config.resoure_name:"main_ebs"}" {
    availability_zone = "${(!!ebs_config.availability_zone)?ebs_config.availability_zone:"ap-southeast-2"}"
    size = ${(!!ebs_config.size)?ebs_config.size:8}
    tags = {
        ${(!!ebs_config.tags)?ebs_config.tags:`Name = "Default ebs_volume"`}
    }
}               
`)
        }
    },
    vpc:{
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
    },
    aws_internet_gateway:{
        generator:(config)=>{
            return(
`
resource  "aws_internet_gateway" "${(!!config.name)?config.name:"main"}" {
    vpc_id =  ${(!!config.vpc_id)?config.vpc_id:"aws_vpc.main.id"}
}
`
            )
        }
    },
    aws_subnet:{
        generator:(config)=>{
            return(
`resource "aws_subnet" "${(!!config.name)?config.name:"main"}" {
    vpc_id = ${(!!config.vpc_id)?config.vpc_id:"aws_vpc.main.id"}
    cidr_block = "${(!!config.cidr_block)?config.cidr_block:"10.1.1.0/24"}"
    availability_zone = "${(!!config.availability_zone)?config.availability_zone:"ap-southeast-2a"}"
}`
            )
        }
    },
    aws_route_table:{
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
    },
    aws_route_table_association:{
        generator:(config)=>{
            return(
`resource "aws_route_table_association" "${(!!config.name)?config.name:"main"}" {
    subnet_id = ${!!config.subnet_id?config.subnet_id:"aws_subnet.main.id"}
    route_table_id = ${!!config.route_table_id?config.route_table_id:"aws_route_table.default.id"}
}`
            )
        }
    },
    default_acl_security:{
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
}