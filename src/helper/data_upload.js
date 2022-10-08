require('dotenv').config()
const S3 = require('aws-sdk/clients/s3');

const s3 = new S3({
    endpoint: 'https://s3.filebase.com', signatureVersion: 'v4',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

async function uploadJSON(Obj, name) {
    const params = {
        Body: JSON.stringify(Obj),
        Bucket: process.env.BUCKET_NAME,
        Key: name,
        ContentType: 'application/json'
    }
    let dataR = await new Promise(resolve => {
        console.log("Upload JSON fun called ");
        s3.putObject(params, (error, data) => {
            if (error) {
                console.log("Error Occure");
                console.log(error);
                resolve(null)
            }
            console.log("Data Uploaded Sucessfully");
            console.log(data);
            resolve(data);
        })
    })
    return dataR;
}

async function uploadImg(Obj, img_name) {
    const params = {
        Body: Obj,
        Bucket: process.env.BUCKET_NAME,
        Key: img_name,
        ContentType: 'image/jpeg'
    }
    let dataR = await new Promise(resolve => {
        console.log("Upload IMG Called ");
        s3.putObject(params, (error, data) => {
            if (error) {
                console.log("Error Occure");
                console.log(error);
                resolve(null)
            }
            console.log("Data Uploaded Sucessfully");
            console.log(data);
            resolve(data);
        })
    })
    return dataR;
}

async function getData(key) {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: key
    }
    let dataR = await new Promise(resolve => {
        s3.getObject(params, (error, data) => {
            if (error) {
                console.log("Error Occure");
                console.log(error)
                resolve(null);
            }
            else {
                console.log("Data Recived")
                console.log(data);
                resolve(data);
            }
        })
    })
    return dataR;
}

module.exports = {
    getData,
    uploadImg,
    uploadJSON,

}