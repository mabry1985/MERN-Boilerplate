const Tutorial = require('../models/tutorial-model')

createTutorial = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a tutorial',
    })
  }
  //const scrapeResults = await youtubeScraper(body.url);
  const tutorial = new Tutorial(body)

  if (!tutorial) {
    return res.status(400).json({ success: false, error: err })
  }

  tutorial
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: tutorial._id,
        message: `${tutorial.title} added to db!`,
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'tutorial not created!',
      })
    })
}

updateTutorial = async (req, res) => {
  const body = req.body
  console.log(body)
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  Tutorial.findOne({ _id: req.params.id }, (err, tutorial) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Tutorial not found!',
      })
    }
    tutorial.title = body.title
    tutorial
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: tutorial._id,
          message: 'Tutorial updated!',
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Tutorial not updated!',
        })
      })
  })
}

deleteTutorial = async (req, res) => {
  await Tutorial.findOneAndDelete({ _id: req.params.id }, (err, tutorial) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!tutorial) {
      return res
        .status(404)
        .json({ success: false, error: `tutorial not found` })
    }

    return res.status(200).json({ success: true, data: tutorial })
  }).catch(err => console.log(err))
}

getTutorialById = async (req, res) => {
  await Tutorial.findOne({ _id: req.params.id }, (err, tutorial) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!tutorial) {
      return res
        .status(404)
        .json({ success: false, error: `tutorial not found` })
    }
    return res.status(200).json({ success: true, data: tutorial })
  }).catch(err => console.log(err))
}

getTutorials = async (req, res) => {
  await Tutorial.find({}, (err, tutorials) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!tutorials.length) {
      return res
        .status(404)
        .json({ success: false, error: `tutorial not found` })
    }
    return res.status(200).json({ success: true, data: tutorials })
  }).catch(err => console.log(err))
}

module.exports = {
  createTutorial,
  updateTutorial,
  deleteTutorial,
  getTutorials,
  getTutorialById,
}