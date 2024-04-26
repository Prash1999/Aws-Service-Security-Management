const { SSMClient, ListDocumentsCommand, DescribeDocumentPermissionCommand, ModifyDocumentPermissionCommand } = require("@aws-sdk/client-ssm");
const client = new SSMClient({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'AKIAXYKJWI273DESKB2K',
        secretAccessKey: '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',
    },
});

getDocuments = async (req, res) => {
    try {
        let inputForFetchingDocumentPermissions;
        let getDocumentPermissionCommand;
        let finalResponse = [];
        const inputForFetchingDocuments = {
            Filters: [
                {
                    Key: "Owner",
                    Values: [
                        "Self"
                    ],
                },
            ],
        };
        const command = new ListDocumentsCommand(inputForFetchingDocuments);
        const response = await client.send(command);
        for(let i=0; i< response.DocumentIdentifiers.length; i++){
            inputForFetchingDocumentPermissions = {
                Name: response.DocumentIdentifiers[i].Name,
                PermissionType: "Share",
            }
            getDocumentPermissionCommand = new DescribeDocumentPermissionCommand(inputForFetchingDocumentPermissions);
            permissionsResponse = await client.send(getDocumentPermissionCommand);
            finalResponse.push({
                documentName: response.DocumentIdentifiers[i].Name,
                permissions: permissionsResponse.AccountIds
            })
        }
        return res.status(200).send(finalResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

getDocumentPermission = async (req, res) => {
    try {
        const input = {
            Name: req.params.name,
            PermissionType: "Share", 
        }
        const command = new DescribeDocumentPermissionCommand(input);
        const response = await client.send(command);
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

updateDocumentsPermissions = async (req, res) => {
    try {
        const input = {
            Name: req.params.name,
            PermissionType: "Share",
            AccountIdsToRemove: req.body.accountId, 
        }
        const command = new ModifyDocumentPermissionCommand(input);
        const response = await client.send(command);
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getDocuments,
    getDocumentPermission,
    updateDocumentsPermissions
}