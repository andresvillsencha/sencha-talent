
const express = require("express");

const positionController = require(
    "../controllers/position.controller"
);
const validateId = require("../middleware/validateId");

const router = express.Router();

router.get("/", positionController.getAll);

router.get("/candidates", positionController.getAllCandidates);

router.get(
    "/:id",
    validateId("id"),
    positionController.getById
);

router.get(
    "/:id/candidates",
    validateId("id"),
    positionController.getCandidatesbyPositionId
);

router.post("/", positionController.createPosition);
router.put("/:id", positionController.updatePosition);

module.exports = router;