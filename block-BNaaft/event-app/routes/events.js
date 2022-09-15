/** @format */

let express = require(`express`);
let router = express.Router();

let Remark = require(`../models/remark`);
let Event = require(`../models/event`);
let Moment = require(`moment`);
let common = require(`../common`);
const { events } = require("../models/remark");

router.get(`/new`, (req, res, next) => {
  res.render(`eventForm`);
});

// add event

router.post(`/`, (req, res, next) => {
  req.body.categories = req.body.categories.trim().split(` `);
  req.body.startDate = Moment(req.body.startDate).format(`l`);
  req.body.endDate = Moment(req.body.endDate).format(`l`);

  req.body.location = common.lowercase(req.body.location);

  // console.log(req.body.startDate);
  Event.create(req.body, (err, event) => {
    if (err) return next(err);
    // console.log(err, event);
    res.redirect(`/events/` + event.id);
  });
});

// find all events

router.get(`/`, (req, res, next) => {
  Event.find({}, (err, events) => {
    if (err) return next(err);
    Event.distinct(`categories`, (err, uniqueCategories) => {
      if (err) return next(err);
      Event.distinct(`location`, (err, uniqueLocation) => {
        if (err) return next(err);
        res.render(`events`, { events, uniqueCategories, uniqueLocation });
      });
    });
  });
});

// find single event

router.get(`/:id`, (req, res, next) => {
  let id = req.params.id;

  Event.findById(id)
    .populate(`remarks`)
    .exec((err, event) => {
      if (err) return next(err);
      // console.log(err, event);
      res.render(`event`, { event });
    });
});

// likes & dislike event

router.get(`/:id/likes`, (req, res, next) => {
  let id = req.params.id;

  Event.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, event) => {
    if (err) return next(err);
    res.redirect(`/events/` + id);
  });
});

router.get(`/:id/dislikes`, (req, res, next) => {
  let id = req.params.id;
  Event.findById(id, (err, event) => {
    if (err) return next(err);
    Event.findByIdAndUpdate(id, { $inc: { dislikes: 1 } }, (err, event) => {
      if (err) return next(err);
      res.redirect(`/events/` + id);
    });
  });
});

// edit event

router.get(`/:id/edit`, (req, res, next) => {
  let id = req.params.id;

  Event.findById(id, (err, event) => {
    if (err) return next(err);
    res.render(`editEvent`, { event });
  });
});

// update event

router.post(`/:id/update`, (req, res, next) => {
  let id = req.params.id;

  req.body.categories = req.body.categories.trim().split(` `);
  req.body.startDate = Moment(req.body.startDate).format(`LL`);
  req.body.endDate = Moment(req.body.endDate).format(`LL`);

  Event.findByIdAndUpdate(id, req.body)
    .populate(`remarks`)
    .exec((err, event) => {
      if (err) return next(err);
      res.redirect(`/events/` + id);
    });
});

// delete event

router.get(`/:id/delete`, (req, res, next) => {
  Event.findByIdAndDelete(req.params.id, (err, event) => {
    if (err) return next(err);
    Remark.deleteMany({ eventId: event.id }, (err, remark) => {
      if (err) return next(err);
      res.redirect(`/events`);
    });
  });
});

//  filter  events by categories

router.get(`/:param/categories`, (req, res, next) => {
  let param = req.params.param;

  Event.find({ categories: { $in: [param] } }, (err, events) => {
    if (err) return next(err);
    Event.distinct(`categories`, (err, uniqueCategories) => {
      if (err) return next(err);
      Event.distinct(`location`, (err, uniqueLocation) => {
        if (err) return next(err);
        // console.log(err, events, uniqueCategories, uniqueLocation);
        res.render(`events`, { events, uniqueCategories, uniqueLocation });
      });
    });
  });
});

//  filter  events by locations

router.get(`/:location/location`, (req, res, next) => {
  let param = req.params.location;

  Event.find({ location: param }, (err, events) => {
    if (err) return next(err);

    Event.distinct(`categories`, (err, uniqueCategories) => {
      if (err) return next(err);

      Event.distinct(`location`, (err, uniqueLocation) => {
        if (err) return next(err);
        res.render(`events`, { events, uniqueCategories, uniqueLocation });
      });
    });
  });
});

// filter by date

router.post(`/date`, (req, res, next) => {
  let sd = req.body.date[0];
  let ed = req.body.date[1];
  // console.log(sd, ed);

  Event.find(
    { startDate: { $gte: sd }, endDate: { $lte: ed } },
    (err, events) => {
      if (err) return next(err);
      // console.log(err, events);

      Event.distinct(`categories`, (err, uniqueCategories) => {
        if (err) return next(err);
        Event.distinct(`location`, (err, uniqueLocation) => {
          if (err) return next(err);
          res.render(`events`, { events, uniqueCategories, uniqueLocation });
        });
      });
    }
  );
});

// remark

router.post(`/:id/remarks`, (req, res, next) => {
  req.body.eventId = req.params.id;
  Remark.create(req.body, (err, remark) => {
    if (err) return next(err);
    let remarkId = remark.id;
    // console.log(err, remark);
    Event.findByIdAndUpdate(
      req.params.id,
      { $push: { remarks: remarkId } },
      (err, event) => {
        if (err) return next(err);
        console.log(err, event);
        res.redirect(`/events/` + req.params.id);
      }
    );
  });
});

module.exports = router;
