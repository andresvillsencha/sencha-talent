
const express = require("express");

const applicationController = require(
    "../controllers/application.controller"
);
const validateId = require("../middleware/validateId");

const router = express.Router();

router.get("/", applicationController.getAll);

router.get(
    "/candidate/:candidateId",
    validateId("candidateId"),
    applicationController.getByCandidateId
);

router.get(
    "/position/:positionId",
    validateId("positionId"),
    applicationController.getByPositionId
);

router.get(
    "/:id",
    validateId("id"),
    applicationController.getById
);

router.post("/", applicationController.createApplication);

module.exports = router;