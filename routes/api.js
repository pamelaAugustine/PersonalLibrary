const BookModel = require('../models/BookModel')
const CommentModel = require('../models/CommentModel')

module.exports = (app) => {
    app.get('/', (req, res) => {
        BookModel.find({}, (err, data) => {
          if (err) {
            res.json({ error: err })
          } else {
            CommentModel.find({}, (err, commentdata) => {
              if (err) {
                res.json({ error: err })
              }
              else {
                let content = data.map(book => {
                  let obj = {
                    bookId: book._id,
                    title: book.title,
                    comments: commentdata.filter(comment => comment.reference == book.title)
                      .map(comment => comment.text)
                  }
                  obj.count = obj.comments.length
      
                  return obj
                })
           
                res.render('index', {
                  books: content
                })
      
              }
            })
          }
        })
      });
      
      //route for /api/books
      app.post('/api/books', (req, res) => {
        //console.log(req.body.booktitle)
      
        const NewBook = new BookModel({
          title: req.body.booktitle
        })
      
        NewBook.save((err, data) => {
          if (err) {
      
            res.render('bookAlreadyExists')
          } else {
            //console.log(data)
            res.redirect('/')
          }
        })
      })
      
      //route to add a comment to a book
      
      app.post('/api/books/comment', (req, res) => {
        // let booktitlecomment = req.body.reference
        BookModel.find({ title: req.body.reference }, (err, book) => {
          if (err) {
            console.log(err)
          }
          else {
            //console.log(book)
            if(book.length == 0){
             res.render('noBookEntered')
            }
            else{
            const NewComment = new CommentModel({
              text: req.body.bookcomment,
              reference: req.body.reference
            })
            //console.log(req.body.bookcomment)
            //console.log(req.body.reference)
            NewComment.save((err, data) => {
              if (err) {
                res.render('noBookEntered')
              }
              else {
                res.redirect('/')
              }
            })
          }
        }
        })
      })
      //delete a book and comment associated with it
      app.get('/api/books/:deletedbook', (req, res) => {
      
        let bookToRemove = req.params.deletedbook
        //console.log(bookToRemove)
        BookModel.findByIdAndRemove({ _id: bookToRemove }, (err, book) => {
          if (err) {
            res.json({ error: err })
          }
          else {
            let commentToRemove = req.body.reference
            //console.log(commentToRemove)
            CommentModel.findOneAndRemove({ comment: commentToRemove }, (err, comm) => {
              if (err) {
                console.log(err)
              }
              else {
                res.render('deleteOneBook')
              }
            })
          }
        })
      })
      
      //Delete All books in library
      app.post('/api/books/deleteall', (req, res) => {
        BookModel.remove({}, (err, data) => {
          if (err) {
            console.log(err)
          }
          else {
            CommentModel.remove({}, (err, comment) => {
              if (err) {
                console.log(err)
      
              }
              else {
                res.render('deleteAll')
              }
      
            })
          }
        })
      })
}