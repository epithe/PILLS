const db = require('./library_model');

const pillsController = {};

pillsController.getLibraryList = (req, res, next) => {
    const sqlString = "SELECT * FROM libraries";
    db.query(sqlString)
        .then((data) => {
            if (!data.rows) {
                return next({
                    log: 'pillsController.getLibraryList',
                    message: {err: 'Library list not found'}
                })
            }
            res.locals.libraries = data.rows;
            // console.log(res.locals.books)
            return next()
        })
        .catch((e) => console.log(e));
}

pillsController.getLibrary = (req, res, next) => {
    console.log("id", req.query.id)
    const id = Number(req.query.id);
    const values = [`${id}`]
    const sqlString = 'SELECT * FROM books WHERE books.libraryid = $1;'
    db.query(sqlString, values)
        .then((data) => {
            if (!data.rows) {
                return next({
                    log: 'pillsController.getLibrary',
                    message: {err: 'Library not found'}
                })
            }
            res.locals.books = data.rows;
            // console.log(res.locals.books)
            return next()
        })
        .catch((e) => console.log(e));
}

pillsController.removeBook = (req, res, next) => {
    const { book_id } = req.body
    const values = [`${book_id}`]
    const sqlString = 'DELETE FROM books WHERE book_id = $1'
    db.query(sqlString, values)
        .then(() => {
            console.log("Book removed");
            return next()
        })
        .catch(e => console.log(e))
    return next()
}

pillsController.addBook = (req, res, next) => {
    const { title, author, libraryid, owner, currLocation, notes } = req.body;
    const values = [`${title}`, `${author}`, `${notes}`, `${libraryid}`, `${owner}`, `${currLocation}`]
    const sqlString = "INSERT INTO books (title, author, notes, libraryid, owner, currentlocation) VALUES ($1, $2, $3, $4, $5, $6)"
    db.query(sqlString, values)
        .then(() => {
            console.log("Book added");
            return next();
        })
        .catch(e => console.log(e))
    return next();
}

module.exports = pillsController;