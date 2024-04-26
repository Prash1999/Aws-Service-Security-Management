const express = require("express");
const router = express.Router();
const s3Controller = require("../controller/S3Controller");
const userController = require("../controller/userController");
const iamController = require("../controller/IamController");
const SsmController = require("../controller/SsmController");
const  auth = require("../middleware/auth");

let routes = app => {
    router.post("/addpublicblockaccess/:bucketName", auth, s3Controller.putPublicBlockAccess);
    router.post("/register", userController.registerUser);
    router.post("/login", userController.logIn);
    router.post("/delete/policy", iamController.deletPolicy);
    router.post("/document/:name", SsmController.updateDocumentsPermissions);
    router.get("/s3buckets", auth, s3Controller.getBuckets);
    router.get("/publicblockaccess/:bucketName", auth, s3Controller.getPublicBlockAccess);
    router.get("/users", iamController.getUsersWithPermission);
    router.get("/documents", SsmController.getDocuments);
    router.get("/document/:name", SsmController.getDocumentPermission);

    
    return app.use("/", router);
}

module.exports = routes;