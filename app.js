"use strict";

/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

const { findMode, findMean, findMedian } = require("./stats")


/** Finds mean of nums in qs: returns {operation: "mean", result } */

app.get("/mean", function (req, res) {
  const nums = req.query.nums;
  const numsArr = nums.split(",").map(num => parseInt(num));
  const mean = findMean(numsArr);
  return res.json( {response: {
    operation: "mean",
    value: mean,
  }})
});


/** Finds median of nums in qs: returns {operation: "median", result } */

app.get("/median", function (req, res) {
  const nums = req.query.nums;
  const numsArr = nums.split(",").map(num => parseInt(num));
  const median = findMedian(numsArr);
  return res.json( {response: {
    operation: "median",
    value: median,
  }})
});

/** Finds mode of nums in qs: returns {operation: "mean", result } */

app.get("/mode", function (req, res) {
  const nums = req.query.nums;
  const numsArr = nums.split(",").map(num => parseInt(num));
  const mode = findMode(numsArr);
  return res.json( {response: {
    operation: "mode",
    value: mode,
  }})
});


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;