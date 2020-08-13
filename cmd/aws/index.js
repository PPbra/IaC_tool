const readline = require("readline-sync");
const { ec2 } = require("../../config/aws/config");
const aws_ec2 = require("../../config/aws/config").ec2;

aws_ec2.config.map((e)=>{
        const value = readline.question(`What ${e.type}?(Enter for default!):\n`);
        if(!!value&&value!==`\n`){
            e.value = value;
        }else{
            e.value = e.default;
        }   
})
const ec2_config = {};
aws_ec2.config.map((e)=>{
    ec2_config[e.type] = e.value;
})

console.log(ec2_config);
const terraform_code = `provider "aws" {
    region = "ap-southest-2"
}
${aws_ec2.generator(ec2_config)}
` 

console.log(terraform_code);



// const ami_name =  readline.question("ami_name:");


// console.log(ami_name);
// console.log(aws_ec2);


