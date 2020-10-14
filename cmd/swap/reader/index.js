const fs = require("fs");

const removeCommentLine = (lines)=>{
    let reflectLines = [];
    lines.forEach(line => {
        line= line.trim(); 
        if((!line.includes("#")||line[0]!="#")&&line!=""){
            reflectLines.push(line);
        }
    });
    return reflectLines;
}

fs.readFile("test.tf",(error,data)=>{
    if(error) throw error;
    
    const textData =  data.toString().trim();
    const resourcesType = [];
    const dataType = [];
    const providerType = [];

    let isInsideResource = false;
    let isInsideData = false;
    let isInsideProvider = false;
    let isInsideSomething = false;

    const lines = removeCommentLine(textData.split("\n"));
    
    for(let i = 0 ; i < lines.length; i++){
        
    }

})


