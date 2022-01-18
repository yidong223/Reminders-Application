const router = require('express').Router();
const upload = require("../middleware/upload");

const fs = require("fs");
const checkAuth = require("../middleware/checkAuth");
const {userModel} = require("../models/userModel");
router.use(checkAuth.ensureAuthenticated);

router.post('/',upload.single("file"), async (req, res) => {
    try {
        const url = await require("imgur").uploadFile(`./uploads/${req.file.filename}`)
        res.json({ url: url.link });
        let user = userModel.findById(req.user.id);
        user.image = url.link;
        fs.unlinkSync(`./uploads/${req.file.filename}`);
    } catch (err) {
        console.log(err);
    }
});

router.get('/', (req, res) => {
   res.render("upload")
});

module.exports = router;