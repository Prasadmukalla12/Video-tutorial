const express = require("express")
const cors = require("cors")
const MongoClient = require("mongodb").MongoClient

const mongodb = "mongodb://127.0.0.1:27017"

const app = express()

app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/admin",(req,res)=>{
    MongoClient.connect(mongodb).then(obj=>{
        var database = obj.db("VideoLibrary")
        database.collection("adminDetails").find({}).toArray().then(document=>{
            res.send(document)
        })
    })
})

app.get("/user",(req,res)=>{
    MongoClient.connect(mongodb).then(obj=>{
        var database = obj.db("VideoLibrary")
        database.collection("userDetails").find({}).toArray().then(doc=>{
            res.send(doc)
        })
    })
})

app.post("/user",(req,res)=>{
    var result = {
        user_id:req.body.user_id,
        user_name:req.body.user_name,
        password:req.body.password,
        email:req.body.email
    }
    MongoClient.connect(mongodb).then(obj=>{
        var database = obj.db("VideoLibrary")
        database.collection("userDetails").insertOne(result).then(()=>{
            res.redirect("/user")
        })
    })
})

app.get("/categories",(req,res)=>{
    MongoClient.connect(mongodb).then(obj=>{
        var database = obj.db("VideoLibrary")
        database.collection("categoriesDetails").find({}).toArray().then(doc=>{
            res.send(doc)
        })
    })
})

app.post("/categories",(req,res)=>{
    var result = {
        id:req.body.id,
        category_id:parseInt(req.body.category_id),
        category_name:req.body.category_name
    }
    MongoClient.connect(mongodb).then(obj=>{
        var database = obj.db("VideoLibrary")
        database.collection("categoriesDetails").insertOne(result).then(()=>{
            res.redirect("/categories")
        })
    })
})

app.get("/videos",(req,res)=>{
    MongoClient.connect(mongodb).then(obj=>{
        var database = obj.db("VideoLibrary")
        database.collection("videosDetails").find({}).toArray().then(doc=>{
            res.send(doc)
        })
    })
})

app.get("/videos/:id",(req,res)=>{
    MongoClient.connect(mongodb).then(obj=>{
        var database = obj.db("VideoLibrary")
        database.collection("videosDetials").findOne({id:req.params.id}).then(doc=>{
            res.send(doc)
        })
    })
})

app.post("/videos",(req,res)=>{
    var video = {
        title: req.body.title,
        url:req.body.url,
        likes:req.body.likes,
        dislikes:req.body.dislikes,
        views:req.body.views,
        comments:req.body.comments,
        category_id:parseInt(req.body.category_id)
    }
    MongoClient.connect(mongodb).then(obj=>{
        var database = obj.db("VideoLibrary")
        database.collection("videosDetails").insertOne(video).then(()=>{
            res.send("Video uploaded")
        })
    })
})

app.put("/videos/:id",(req,res)=>{
    var video = {
        title: req.body.title,
        url:req.body.url,
        likes:req.body.likes,
        dislikes:req.body.dislikes,
        views:req.body.views,
        comments:req.body.comments,
        category_id:parseInt(req.body.category_id)
    }
    MongoClient.connect(mongodb).then(obj=>{
        var database = obj.db("VideoLibrary")
        database.collection("videosDetails").updateOne({category_id:parseInt(req.params.id)},{$set:video}).then(()=>{
            res.send("updated")
        })
    })
})

app.delete("/videos/:id",(req,res)=>{
    MongoClient.connect(mongodb).then(obj=>{
        var database = obj.db("VideoLibrary")
        database.collection("videosDetails").deleteOne({id:req.params.id}).then(()=>{
            res.send("deleted")
        })
    })
})

app.use((req,res)=>{
    res.status(404).write("Not Found")
    res.end()
})
app.listen(3200)
console.log("Server start : http://127.0.0.1:3200")