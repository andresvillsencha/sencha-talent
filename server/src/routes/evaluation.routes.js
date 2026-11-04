
const express = require("express");

const applicationController = require(
    "../controllers/application.controller"
);
const validateId = require("../middleware/validateId");

const router = express.Router();

router.get("/", applicationController.getAll);

router.get(
    "/:appId",
    validateId("appId"),
    applicationController.evaluateCandidate
);


module.exports = router;