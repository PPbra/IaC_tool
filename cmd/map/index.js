const aws_gen = require("../../config/aws");
console.log(aws_gen.aws_instance.mapping({
            type:"instance",
            name:"main_instance",
            instance_type:"micro",
            os:"ubuntu",
            network:"default_network",
            disk:"disk_1"
}))