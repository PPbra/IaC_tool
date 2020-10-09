const aws_gen = require("../../config/aws");
const gcp_gen = require("../../config/gcp")
console.log(aws_gen.aws_instance.mapping({
            type:"instance",
            name:"main_instance",
            instance_type:"micro",
            os:"ubuntu",
            network_interface:{
                vpc:"default_network",
                subnet:"subnet_1"
            },
            disk:"disk_1"
}))