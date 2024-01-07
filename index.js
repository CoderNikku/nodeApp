const express = require("express");
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require("mongodb");

// Create middleware
const server = express();
server.use(express.json());
server.use(express.static("view")); // Static middleware


// Database connection
let db;
connectToDb((err) => {
  if (!err) {
    // Create the static server
    server.listen(3000, () => {
      console.log("Server started on port 3000"); // Use environment variable
    });
    db = getDb();
  }
});


// Create a basic GET API
server.get('/books', (req, res) => {
  let books = [];
  db.collection('books')
    .find()
    .sort({ author: 1 })
// .forEach(book=>books.push(book))
    .toArray() // Convert the cursor to an array
    .then((result) => {
      books = result;
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ err: "Could not fetch the documents" });
    });
});


// single document featch
server.get('/books/:id',(req,res)=>{
    db.collection('books')
    .findOne({_id:new ObjectId(req.params.id)})
    .then(doc=>{
        res.status(200).json(doc)
    })
    .catch(err=>{
        res.status(500).json({error:"could not fetch the documnets"})
    })
})
// server.get('/books/:id', (req, res) => {
//     db.collection('books')
//       .findOne({ _id: new ObjectId(req.params.id) }) // Use ObjectId to convert id
//       .then((doc) => {
//         if (doc) {
//           res.status(200).json(doc);
//         } else {
//           res.status(404).json({ error: "Book not found" });
//         }
//       })
//       .catch((err) => {
//         res.status(500).json({ error: "Could not fetch the documents" });
//       });
//   });
  




// create data  to post request 
// server.post('/books',(req,res)=>{
//     const books=req.body

//     db.collection('books')
//     .insertOne(books)
//     .then(result=>{
//         res.status(201).express.json(result)
//     })
//     .catch(err=>{
//         res.status(500).json({error:"could not create a new documents "})
//     })
// })
// insertMany data send 
server.post('/books', (req, res) => {
    const books = req.body;
    db.collection('books')
      .insertMany(books)  // Change insertOne to insertMany
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(500).json({ error: "Could not create new documents" });
      });
  }); 
  



// removing data in delete method 
server.delete('/books/:id',(req,res)=>{
  if(ObjectId.isValid(req.params.id)){
    db.collection("books")
    .deleteOne({_id: new ObjectId(req.params.id)})
    .then(result=>{
      res.status(201).json(result)
    })
    .catch(err=>{
      res.status(500).json({error:'could not deltethe documnets'})
    })
  }
  else{
    res.status(500).json({error:'not a valid doc id'})
  }
})


// patch request to updating the data 
server.patch('/books/:id',(req,res)=>{
  const updates= req.body

  if(ObjectId.isValid(req.params.id)){
    db.collection('books')
    .updateOne({_id: new ObjectId(req.params.id)},{$set:updates})
    .then(result=>{
      res.status(201).json(result)})
    .catch(err=>{
      res.status(500).json({error:"could not the update the data "})
    })
    }
    else{
      res.status(500).json({error:"not is valid doc id"})
    }
  })

// server.patch('/books/:id', (req, res) => {
//   const updates = req.body;

//   if (ObjectId.isValid(req.params.id)) {
//     db.collection('books')
//       .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
//       .then(result => {
//         if (result.matchedCount > 0) {
//           res.status(200).json({ message: "Update successful" });
//         } else {
//           res.status(404).json({ error: "Book not found" });
//         }
//       })
//       .catch(err => {
//         res.status(500).json({ error: "Could not update the data", details: err.message });
//       });
//   } else {
//     res.status(400).json({ error: "Invalid document ID" });
//   }
// });



// paggination to api simple ex
server.get('/pagging', (req, res) => {
  const value = req.query.v || 0;
  const booksparvalue = 3;

  let books = [];
  db.collection('books')
    .find()
    .sort({ author: 1 })
    .skip(value * booksparvalue)
    .limit(booksparvalue)
// .forEach(book=>books.push(book))
    .toArray() // Convert the cursor to an array
    .then((result) => {
      books = result;
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ err: "Could not fetch the documents" });
    });
});




