provider "aws" {
        region = "ap-southeast-2"
    }
    data "aws_ami" "ubuntu" { 
    most_recent = true
    owners=["*"]
    filter {
    name   = "name"
    values = ["ubuntu*"]
    }
}
resource "aws_instance" "main" {
    ami           = data.aws_ami.ubuntu.id
    instance_type = "t2.nano"
    tags = {
    Name="This is the test Name Tags"
}
}

resource "aws_volume_attachment" "volume-att-main"{
    device_name = "/dev/sdc"
    volume_id = aws_ebs_volume.ebs_name.id
    instance_id = aws_instance.main.id
}

    resource "aws_ebs_volume" "ebs_name" {
    availability_zone = "ap-southeast-2"
    size = 8
    tags = {
        Name = "Default ebs_volume"
}
}               

    
resource "aws_vpc" "main_vpc" {
    cidr_block       = "10.0.0.0/16"
    instance_tenancy = "default"  
    tags = {
        Name = "This is the test VPC!"
    }
}

    
resource  "aws_internet_gateway" "main" {
    vpc_id =  aws_vpc.main_vpc.id
}

    resource "aws_subnet" "main" {
    vpc_id = aws_vpc.main_vpc.id
    cidr_block = "10.1.1.0/24"
    availability_zone = "ap-southeast-2a"
}
    resource "aws_route_table" "main" {
    vpc_id = "aws_vpc.main_vpc.id"
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = "aws_internet_gateway.main.id"
}
}
    resource "aws_route_table_association" "default_table" {
    subnet_id = aws_subnet.main.id
    route_table_id = aws_route_table.main.id
}
    resource "aws_network_acl" "allowall" {
    vpc_id = aws_vpc.main_vpc.id

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
    vpc_id = aws_vpc.main_vpc.id

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

    