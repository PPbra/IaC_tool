const readline = require("readline-sync");
const aws_ec2 = require("../../config/aws/config").ec2;

const terraform_code = `provider "aws" {
    region = "ap-southest-2"
}` 

aws_ec2.map((e)=>{
        
})

// const ami_name =  readline.question("ami_name:");


// console.log(ami_name);
// console.log(aws_ec2);


