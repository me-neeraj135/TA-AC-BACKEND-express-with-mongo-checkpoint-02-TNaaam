/** @format */

let express = require(`express`);
let router = express.Router();

let Event = require(`../models/event`);
let Remark = require(`../models/remark`);

//edit remark

router.get(`/:id/edit`, (req, res, next) => {
  let id = req.params.id;
  Remark.findById(id, (err, remark) => {
    if (err) return next(remark);
    console.log(err, remark);
    res.render(`editRemark`, { remark });
  });
});

// update remark

router.post(`/:id/update`, (req, res, next) => {
  let id = req.params.id;

  Remark.findByIdAndUpdate(id, req.body, (err, remark) => {
    if (err) return next(err);
    res.redirect(`/events/` + remark.eventId);
  });
});

// delete remarks

router.get(`/:id/delete`, (req, res, next) => {
  let id = req.params.id;

  Remark.findByIdAndDelete(id, (err, remark) => {
    if (err) return next(err);
    Event.findByIdAndUpdate(remark.eventId, { $pull: { remarks: remark.id } })
      .populate(`remarks`)
      .exec((err, event) => {
        if (err) return next(err);
        res.redirect(`/events/` + remark.eventId);
      });
  });
});

// like & dislike remark

router.get(`/:id/likes`, (req, res, next) => {
  let id = req.params.id;
  Remark.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, remark) => {
    if (err) return next(err);
    res.redirect(`/events/` + remark.eventId);
  });
});

router.get(`/:id/dislikes`, (req, res, next) => {
  Remark.findByIdAndUpdate(
    req.params.id,
    { $inc: { dislikes: 1 } },
    (err, remark) => {
      if (err) return next(err);
      res.redirect(`/events/` + remark.eventId);
    }
  );
});
module.exports = router;
