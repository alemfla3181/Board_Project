const express = require('express');
const router = express.Router();
const { Contents } = require("../models/Contents");

// 글 저장
router.post('/createBoard', (req, res) => {
  const contents = new Contents(req.body);

  contents.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({success: true})
  })
})

// 게시판 글 목록 가져옴
router.get('/Board', (req, res) => {
  Contents.find().exec((err, contents) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({
      success: true, contents
    })
  })
})

module.exports = router;