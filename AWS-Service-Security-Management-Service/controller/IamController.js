const { ListUsersCommand, ListAttachedUserPoliciesCommand, DetachUserPolicyCommand, IAMClient } = require("@aws-sdk/client-iam");
const client = new IAMClient({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'AKIAXYKJWI273DESKB2K',
        secretAccessKey: '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',
    },
});

getUsersWithPermission = async (req, res) => {
    try {
        let users = [];

        const listUsercommand = new ListUsersCommand({});
        const response = await client.send(listUsercommand);

        for (let index = 0; index < response.Users.length; index++) {
            getUserPermissionCommand = new ListAttachedUserPoliciesCommand({
                UserName: response.Users[index].UserName
            })
            permissions = await client.send(getUserPermissionCommand);
            users.push({
                userName: response.Users[index].UserName,
                policies: permissions.AttachedPolicies
            })
        }
        return res.status(200).send(users);
    } catch (error) {
        return res.status(201).send(error);
    }
}

deletPolicy = async (req, res) => {
    try {
        console.log(req.body);
        let policy = req.body.policy;
        let userName = req.body.userName;
        let deleteUserPolicyCommand;
        deleteUserPolicyCommand = new DetachUserPolicyCommand({
            UserName: userName,
            PolicyArn: policy,
        });
        response = await client.send(deleteUserPolicyCommand);
        res.status(201).send({ message: "Success" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: "errror"});
    }
}

module.exports = {
    getUsersWithPermission,
    deletPolicy
}