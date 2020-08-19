const express = require("express");
const readline = require("readline");
const test_router = express.Router();

test_router.get('/test',(req,res) =>{
    
})

const rl  = readline.createInterface({
    input: process.stdin,
    output:process.stdout
})

var hello = "a"
const dosomething = ()=>{
    console.log("hahaha!");
    rl.question("aws_ami name?",(hello_input)=>{
        hello = hello_input
    })
    console.log(hello);
}

dosomething()
module.exports = test_router;