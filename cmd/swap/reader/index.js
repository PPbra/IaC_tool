const { count } = require("console");
const fs = require("fs");

const removeCommentLine = (lines)=>{
    let reflectLines = [];
    lines.forEach(line => {
        trimedLine= line.replace(/\s\s+/g, ' '); 
        if((!trimedLine.includes("#")||trimedLine[0]!="#")&&trimedLine!=""){
            reflectLines.push(trimedLine.trim());
        }
    });
    return reflectLines;
}



fs.readFile("test.tf",(error,data)=>{
    if(error) throw error;
    const resources = [];
    const textData =  data.toString().trim();
    const resourcesType = [];
    const dataType = [];
    const providerType = [];

    let countBraces = 0;
    let isInsideResource = false;
    let isInsideData = false;
    let isInsideProvider = false;
    let isInsideSomething = false;

    const lines = removeCommentLine(textData.split("\n"));

    for(let i = 0 ; i < lines.length; i++){
        const characterInLine =  lines[i].split(" ");

        if(!isInsideResource&&characterInLine.includes("resource")){
            const resource = {};
            resource.cloudType = characterInLine[1].toString();
            resource.type = "resource"
            resource.name = characterInLine[2].toString();
            isInsideResource = true;
            resources.push(resource);
        }

        if(!isInsideProvider&&!isInsideResource&&characterInLine.includes("provider")){
            const provider = {};
            provider.type = "provider"
            isInsideProvider = true;
            provider.cloudType = "provider";
            provider.cloud = characterInLine[1];
            resources.push(provider);
        }

        if(!isInsideData&&!isInsideResource&&!isInsideProvider&&characterInLine.includes("data")){
            const data = {};
            data.type = "data"
            isInsideData = true;
            data.cloudType = characterInLine[1];
            data.name = characterInLine[2];
            resources.push(data);
        }



        if(isInsideProvider&&!characterInLine.includes("provider")){
            const k = resources.length - 1;
            if(!!resources[k]){
                if(countBraces==1){
                    if(characterInLine.includes("=")&&!characterInLine.includes("{")){
                        resources[k][characterInLine[0]]=characterInLine[2]
                    }
                }
            }            
        }

        if(isInsideData&&!characterInLine.includes("data")){
            const k = resources.length - 1;
            if(!!resources[k]){
                if(countBraces==1){
                    if(characterInLine.includes("=")&&!characterInLine.includes("{")){
                        resources[k][characterInLine[0]]=characterInLine[2]
                    }
                }
            }            
        }

        if(isInsideResource&&!characterInLine.includes("resource")){
            const k = resources.length - 1;
            if(!!resources[k]){
                if(countBraces==1){
                    if(characterInLine.includes("=")&&!characterInLine.includes("{")&&characterInLine[0]!="name"){
                        resources[k][characterInLine[0]]=characterInLine[2]
                    }
                }
                // if(resources[k].type == `"aws_vpc"`){
                //     if(countBraces==1){
                //         console.log(characterInLine);
                //         if(characterInLine.includes("cidr_block")){
                //             resources[k].cidr_block = characterInLine[2];
                //         }  
                //     }
                // }

                // if(resources[k].type ==`"aws_instance"`){
                //     if(countBraces==1){
                //         if(characterInLine.includes("ami")){
                //             resources[k].ami = characterInLine[2];
                //         }
                //     }
                // }
            }            
        }

        

        if(characterInLine.includes("{")){
            countBraces++;
        }

        if(characterInLine.includes("}")){
            countBraces--;
        }

        if(countBraces==0){
            isInsideResource = false;
            isInsideProvider = false;
            isInsideData =  false;
        }

    }
    console.log(resources);
})


