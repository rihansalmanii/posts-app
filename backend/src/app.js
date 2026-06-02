const express = require('express');
const app = express();
const multer = require('multer')
const uploadFile = require('./services/storage.service.js')
const postModel = require('./models/post.model.js')

app.use(express.json())

const upload = multer({ storage: multer.memoryStorage() })

app.post('/create-post', upload.single("image"), async (req, res) => {

    const result = await uploadFile(req.file.buffer)
    console.log(result)

    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption,
    })

    res.status(201).json({
        message: 'post created successfully',
        post
    })
})

app.get('/posts', async (req, res) => {
    const posts = await postModel.find()

    res.status(200).json({
        message: "posts fetched successfully",
        post: posts,
    })
})



module.exports = app;