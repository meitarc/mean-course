const Scrap = require("../models/‏‏scrap");
//get all the scraps
exports.getScraps = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const scrapQuery = Scrap.find();
  let fetchedScraps;
  if (pageSize && currentPage) {
    scrapQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  scrapQuery
    .then(documents => {
      fetchedScraps = documents;
      return Scrap.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Scraps fetched successfully!",
        scraps: fetchedScraps,
        maxScraps: count
      });
    }).catch(error => {
      res.status(500).json({
        message: "Fetching scraps failed!"
      });
    });
};
//get scrap by id
exports.getScrap = (req, res, next) => {
  Scrap.findById(req.params.id).then(scrap => {
    if (scrap) {
      res.status(200).json(scrap);
    } else {
      res.status(404).json({
        message: "Scrap not found!"
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching scrap failed!"
    });
  });
};


exports.getAllScraps = (req, res, next) => {
  const scrapQuery = Scrap.find();
  let fetchedScraps;
  scrapQuery
    .then(documents => {
      fetchedScraps = documents;
      return Scrap.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Scraps fetched successfully!",
        scraps: fetchedScraps,
        maxScraps: count
      });
    }).catch(error => {
      res.status(500).json({
        message: "Fetching scraps failed!"
      });
    });
};
