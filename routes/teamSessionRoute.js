const router = require("express").Router();
const { AddTeamSession } = require("../controller/teamSession");
router.route("/:id").post(AddTeamSession);

module.exports = router;
