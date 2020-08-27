#!/usr/bin/env node
const readline = require("readline-sync");
const commander = require("commander");

//const { ec2 } = require("../../config/aws/config");
const aws_gen = require("../../config/aws/config");

const fs = require("fs");

commander
    .option("-f,--file <path to file>","Use JSON config file to generate terraform code!");

commander.parse(process.argv);

try {
    const config_path = !!commander.file?commander.file:"";
    const config = JSON.parse(fs.readFileSync(config_path));
    let terraform_code =
    `${(!!config.ec2)?aws_gen.ec2.generator(config.ec2):""}
    ${(!!config.ebs)?aws_gen.ebs.generator(config.ebs):""}
    ${(!!config.vpc)?aws_gen.vpc.generator(config.vpc):""}
    ${(!!config.aws_internet_gateway)?aws_gen.aws_internet_gateway.generator(config.aws_internet_gateway):""}
    ${(!!config.aws_subnet)?aws_gen.aws_subnet.generator(config.aws_subnet):""}
    ${(!!config.aws_route_table)?aws_gen.aws_route_table.generator(config.aws_route_table):""}
    ${(!!config.aws_route_table_association)?aws_gen.aws_route_table_association.generator(config.aws_route_table_association):""}
    ${(!!config.default_acl_security)?aws_gen.default_acl_security.generator(config.default_acl_security):""}
    `
    // console.log(terraform_code);

    fs.writeFile("main.tf",terraform_code,(err)=>{
        if(err){
            return console.log(err);
        }
        console.log("Output code is wrote in main.tf!")
    })
    
} catch (error) {
    console.log(error);
    console.log("Error: File location is wrong, check your \"-f\" parameter!");
}



// aws_ec2.config.map((e)=>{
//         const value = readline.question(`What ${e.type}?(Enter for default!):\n`);
//         if(!!value&&value!==`\n`){
//             e.value = value;
//         }else{
//             e.value = e.default;
//         }   
// })
// const ec2_config = {};
// aws_ec2.config.map((e)=>{
//     ec2_config[e.type] = e.value;
// })


// const terraform_code = `provider "aws" {
//     region = "ap-southest-2"
// }
// ${aws_ec2.generator(ec2_config)}
// ` 

// console.log(terraform_code);

// const ami_name =  readline.question("ami_name:");
// console.log(ami_name);
// console.log(aws_ec2);

