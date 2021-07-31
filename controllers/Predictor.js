import * as tf from "@tensorflow/tfjs-node";
const { check, validationResult } = require("express-validator/check");
const router = express.Router();

router.post(
  "/predict",
  [check("date", "city").not.isEmpty()],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { date, city } = req.body;
    try {
    } catch (e) {
      console.log(err.message);
      res.status(500).send("Error in saving");
    }
  }
);
