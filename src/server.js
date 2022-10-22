require('dotenv').config()
const express = require("express")
const path = require('path');
const body = require("body-parser");
const fileUpload = require("express-fileupload");
var crypto = require('crypto');

const App = express();

const { getData, uploadImg, uploadJSON } = require("./helper/data_upload");


App.use(express.static(path.join(__dirname, '../node_modules')));
App.use(express.static(path.join(__dirname, '../build/contracts')));
App.use(express.static(path.join(__dirname, 'view/static')));
App.use(body.urlencoded({ extended: false }));
App.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

const logRequest = (req, res, next) => {
    console.log("Req : ", req.url);
    next();
}
App.use(logRequest);


App.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './view/index_2.html'));
})

App.get("/Register", (req, res) => {
    res.sendFile(path.join(__dirname, "./view/create_new_nft.html"));
})


App.get("/detail/:id", (req, res) => {
    var id = req.params.id;
    if (id == null || id == undefined) {
        res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "./view/detail_nft.html"));
})

App.post("/", async (req, res) => {
    let nft = req.files.nft_file;

    let fileName = Date.now().toString() + "_" + nft.name;
    let img_uploading = await uploadImg(nft.data, fileName);
    console.log(img_uploading);
    let data = await getData(fileName);
    console.log(data);
    let jsonFile = {
        ...req.body,
        "Item_URL": process.env.IMG_URL_PREFIX + data.Metadata.cid
    }
    console.log(fileName);
    var hash = crypto.createHash('md5').update(fileName).digest('hex');
    let uploadJson = await uploadJSON(jsonFile, hash);
    let uri = await getData(hash)
    console.log("NFT URI ")
    console.log(uri)
    console.log(uploadJson)

    console.log(req.files.nft_file);
    uploadPath = __dirname + '/NFTs/' + fileName;
    nft.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
    });

    res.status(200).json({
        "key": uploadJSON,
        "msg": "Data Upload to IPFS",
        "ci": uri.Metadata.cid,

    })
})

App.get("/test", async (req, res) => {
    console.log(process.env.IPFS_URL);
    console.log(process.env.ACCESS_KEY_ID);

    //Code For listing all Bucket 
    // s3.listBuckets(function (err, data) {
    //   if (err) {
    //     console.log("Error when listing buckets", err);
    //   } else {
    //     console.log("Success when listing buckets", data);
    //   }
    // });


    //Code To Upload File on filebase 
    // let file = await fs.readFile("./src/NFTs/img_!.jpg");
    // console.log(file);
    // const params = {
    //     Body: file,
    //     Bucket: "temp-for-trial",
    //     Key: "key1",
    //    ContentType: 'image/jpeg'
    // }
    // s3.putObject(params, (error,data)=>{
    //     if(error){
    //         console.log("Error Occure");
    //         console.log(error);
    //     }
    //     console.log("Data Uploaded Sucessfully");
    //     console.log(data);
    // })


    //Code for Retriving data From Filebase 
    // const params = { 
    //     Bucket: "temp-for-trial",
    //     Key: "key1"
    // }
    // s3.getObject(params, (error,data)=>{
    //     if(error){
    //         console.log("Error Occure");
    //         console.log(error)
    //     }
    //     else{
    //         console.log("Data Recived")
    //         console.log(data);
    //     }
    // })


    // await uploadJSON();

    res.end("response Get")
})


App.listen(process.env.SERVER_PORT, () => {
    console.log("Express Server Running on port 5000")
})
