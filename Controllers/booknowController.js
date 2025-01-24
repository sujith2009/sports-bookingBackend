const booknowModel = require("../Models/booknowModel");
//POST CONTROLLER
exports.booknowPostController = async (req, res) => {
  try {
    const {
      sportsName,
      sportsDate,
      teamName,
      teamLeaderName,
      city,
      teamEmail,
    } = req.body;

    if (
      !sportsName ||
      !sportsDate ||
      !teamName ||
      !teamLeaderName ||
      !city ||
      !teamEmail
    ) {
      return res.status(400).json({ message: "All field required" });
    }

    const newPlayers = await booknowModel({
      sportsName,
      sportsDate,
      teamName,
      teamLeaderName,
      city,
      teamEmail,
    });
    await newPlayers.save();
    return res.status(201).json({ message: "Successfull", newPlayers });
  } catch (error) {
    return res.status(500).json({ error: "Server Error!" });
  }
};

//GET CONTROLLER
exports.booknowGetController = async (req, res) => {
  try {
    const {
      sportsName,
      sportsDate,
      teamName,
      teamLeaderName,
      city,
      teamEmail,
    } = req.body;

    const filter = {};
    if (sportsName) filter.sportsName = sportsName;
    if (sportsDate) filter.sportsDate = sportsDate;
    if (teamName) filter.teamName = teamName;
    if (teamLeaderName) filter.teamLeaderName = teamLeaderName;
    if (city) filter.city = city;
    if (teamEmail) filter.teamEmail = teamEmail;
    const getPlayersData = await booknowModel.find(filter);

    return res
      .status(200)
      .json({ message: "Successfully", data: getPlayersData });
  } catch (error) {
    return res.status(500).json({ error: "Server Error!" });
  }
};
