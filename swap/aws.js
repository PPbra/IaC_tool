#!/usr/bin/env node
const commander = require("commander");
const aws_reader =  require("./reader/aws");
const region_map_config =  require("../config/map-config/region");

commander
    .option("-f,--file <path to file>","path to tf file");

commander.parse(process.argv);

try{
    const file_path = !!commander.file?commander.file:"";
    const rawResources = aws_reader.read(file_path);
    // console.log(rawResources);
    const config = {};
    rawResources.forEach((e)=>{
        // console.log(region_map_config.getLocation("afsf","aws"));
        if(e.type == "provider"){
            config.location = region_map_config.getLocation(e.region,"aws");
            // console.log(region_map_config.getLocation(e.region,"aws"))
        }

        if(e.type = "resource"){
            
        }
    })

}catch(error){

}




