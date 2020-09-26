module.exports = {
    generator: (ec2_config)=>{
        return (
`data "aws_ami" "ubuntu" { 
    most_recent = true
    owners=["*"]
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
}