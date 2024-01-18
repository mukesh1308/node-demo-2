const http=require("http");
const fs=require("fs");
const qs=require("querystring");
const port=3030;


const server=http.createServer((req,res)=>{
    if(req.url==="/favicon.ico"){
        res.writeHead(200,{'Content-Type':'image/x-icon'});
        let stream=fs.createReadStream("./node-js-black-icon.png").pipe(res);
        stream.on("finish",()=>{
            res.end();
        });
        return;
    }
    if(req.url==="/"){
        let data=fs.readFileSync("./view/form.html");
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(data);
        return;
    }
    if(req.url==="/validate"){
        let chunk=[];
        req.on("data",(data)=>{
            chunk.push(data)
        });
        req.on("end",()=>{
            let data=qs.parse(Buffer.from(Buffer.concat(chunk)).toString());
            // console.log(data.user);
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(`<h1>Welcome ${data.user}</h1>`);
            res.write(`<p><b>password:</b> ${data.pwd}<br>`);
            res.write(`<b>DOB:</b> ${data.dob}<br>`);
            res.write(`<b>gender:</b> ${data.gender}<br>`);
            res.write(`<b>remark: </b>${data.remark}<br></p>`);
            res.end();
        });
        return;
    }
    res.end("not a valid url");
});

server.listen(port,()=>{
    console.log(`listening to port ${port}`);
})