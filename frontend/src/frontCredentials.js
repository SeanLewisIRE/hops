
if (process.env.LIVE) {
    module.exports = {
        bucketName: "hops-bucket",
        dirName: "user-images",
        accessKey: process.env.S3_ACCESS_KEY,
        secretKey: process.env.S3_SECRET_KEY
    }

} else {
    module.exports = {
        bucketName: "hops-bucket",
        dirName: "user-images",
        accessKey: process.env.LOCAL_S3_ACCESS_KEY,
        secretKey: process.env.LOCAL_S3_SECRET_KEY
    }
}