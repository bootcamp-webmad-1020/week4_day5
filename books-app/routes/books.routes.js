const express = require('express')
const router = express.Router()

const Book = require('./../models/book.model')


// Endpoints


// Listado de libros
router.get('/', (req, res) => {

    Book
        .find({}, { title: 1 })                                             // BONUS: con proyección! (segundo argumento opcional de find())
        .sort({ title: 1 })                                                 // BONUS: ordenados por título!
        .then(allBooks => res.render('books/books-list', { allBooks }))     // es lo mismo que  { allBooks: allBooks }
        .catch(err => console.log(err))
})




// Detalle de libro
router.get('/detalle/:book_id', (req, res) => {

    const bookId = req.params.book_id

    Book
        .findById(bookId)
        .then(theBook => res.render('books/details', theBook))
        .catch(err => console.log(err))
})





// Formulario nuevo libro: renderizar (GET)
router.get('/crear-libro', (req, res) => res.render('books/new-book-form'))


// Formulario nuevo libro: gestionar (POST)
router.post('/crear-libro', (req, res) => {

    const { title, description, rating, author } = req.body

    Book
        .create({ title, description, rating, author })
        .then(() => res.redirect('/libros'))
        .catch(err => console.log('Error:', err))
})





// Formulario edición libro: renderizar (GET)
router.get('/editar-libro', (req, res) => {

    const bookId = req.query.book_id

    Book
        .findById(bookId)
        .then(bookInfo => res.render('books/edit-book-form', bookInfo))
        .catch(err => console.log(err))
})



// Formulario edición libro: gestionar (POST)
router.post('/editar-libro', (req, res) => {

    const bookId = req.query.book_id                            // El ID lo recibodo como query string

    const { title, description, rating, author } = req.body     // Los datos del formulario POST, como req.body

    Book
        .findByIdAndUpdate(bookId, { title, description, rating, author })
        .then(bookInfo => res.redirect('/libros'))
        .catch(err => console.log(err))
})




// Eliminar libro
router.get('/eliminar-libro', (req, res) => {

    const bookId = req.query.book_id

    Book
        .findByIdAndDelete(bookId)
        .then(() => res.redirect('/libros'))
        .catch(err => console.log(err))
})




module.exports = router