const { S3Client, ListBucketsCommand, GetPublicAccessBlockCommand, PutPublicAccessBlockCommand } = require("@aws-sdk/client-s3");
const client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'AKIAXYKJWI273DESKB2K',
        secretAccessKey: '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',
    },
});

getBuckets = async (req, res) => {
    try {
        const command = new ListBucketsCommand({});
        const response = await client.send(command);
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

getPublicBlockAccess = async (req, res) => {
    try {
        const input = {
            Bucket: req.params.bucketName
        }
        const command = new GetPublicAccessBlockCommand(input);
        const response = await client.send(command);
        return res.status(200).send(response.PublicAccessBlockConfiguration);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

putPublicBlockAccess = async (req, res) => {
    try {
        const input = {
            Bucket: req.params.bucketName,
            PublicAccessBlockConfiguration: { // PublicAccessBlockConfiguration
                BlockPublicAcls: true,
                IgnorePublicAcls: true,
                BlockPublicPolicy: true,
                RestrictPublicBuckets: true,
            }
        }
        const command = new PutPublicAccessBlockCommand(input);
        const response = await client.send(command);
        if (response['$metadata'].httpStatusCode == 200)
            return res.status(200).send({
                message: "Success",
                status: 200
            });
        else
        return res.status(200).send({
            message: "errror",
            status: 500
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getBuckets,
    getPublicBlockAccess,
    putPublicBlockAccess
}