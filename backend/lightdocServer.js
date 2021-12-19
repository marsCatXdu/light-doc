var http = require("http");
var url = require('url');
const fs = require('fs');


let fileList = fs.readdirSync('./');
let docList = [];
for(let i=0; i<fileList.length; i++) {
    if(fileList[i].endsWith('.md')) {
        let doc = {
            title: fileList[i].substring(0, fileList[i].lastIndexOf('.')),
            summary: ""
        };
        docList.push(doc);
    }
}

http.createServer(function(req, responseInterface) {

    responseInterface.setHeader('Access-Control-Allow-Credentials', true);
    responseInterface.setHeader('Access-Control-Allow-Origin', '*');
    
    let urlObj = url.parse(req.url);
    
    if(urlObj.pathname=="/api/getDocumentList") {
        getDocumentList(responseInterface);
    } else if(urlObj.pathname=="/api/searchDocument") {
        searchDocument(req, responseInterface);
    } else if(urlObj.pathname=="/api/getDocument") {
        getDocument(req, responseInterface);
    }
        
}).listen(3000);

function getDocumentList(responseInterface) {
    setTimeout(function(){
        responseInterface.write(JSON.stringify(docList));
        responseInterface.end();
    }, 10);

}

function searchDocument(req, responseInterface) {
    req.setEncoding("utf-8");

    let retData = [];

    req.on('data', (chunk) => {
        let keyword = (JSON.parse(chunk.toString())).keyword;
        console.log("searching for [" + keyword + ']');
        for(let i=0; i<docList.length; i++) {
            if(docList[i].title.match(RegExp(keyword, 'i'))) {
                retData.push({title: docList[i].title, summary: ""});
                continue;
            }
        }
        responseInterface.write(JSON.stringify(retData));
        responseInterface.end();
    })

}

function getDocument(req, responseInterface) {
    req.setEncoding("utf-8");
    req.on('data', (chunk) => {
        let param = JSON.parse(chunk.toString())
        let str = "";
        fs.readFile("./"+param.docTitle+".md", "utf-8", function(error, data) {
            str = data.replace(/\n/g, "\n");
            let retData = {
                title: "",
                summary: "",
                content: str
            }
            responseInterface.write(JSON.stringify(retData));
            responseInterface.end();
        }); 
    })
}
