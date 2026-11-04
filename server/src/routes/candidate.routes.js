
const express = require("express");

const candidateController = require(
    "../controllers/candidate.controller"
);
const validateId = require("../middleware/validateId");

const router = express.Router();

router.get("/", candidateController.getAll);

router.get(
    "/:id",
    validateId("id"),
    candidateController.getById
);

module.exports = router;