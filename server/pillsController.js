const db = require('./library_model');

const pillsController = {};

pillsController.getUsers = (req, res, next) => {
    const sqlString = "SELECT * FROM users"
    db.query(sqlString)
        .then((data) => {
            if (!data.rows) {
                return next({
                    log: 'pillsController.getUsers',
                    message: {err: 'Users not found'}
                })
            }
            res.locals.users = data.rows;
            // console.log(res.locals.books)
            return next()
        })
        .catch((e) => console.log(e));
}

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

pillsController.requestBook = (req, res, next) => {
    console.log(req.body);
    const { book_id, library_id, selectedUser } = req.body;
    const user_id = selectedUser['user_id'];
    const values = [`${book_id}`, `${library_id}`, `${user_id}`]
    console.log(values)
    const sqlString = "INSERT INTO requests (book_id, library_id, user_id) VALUES ($1, $2, $3)"
    db.query(sqlString, values)
        .then(() => {
            console.log("Request received");
            return next();
        })
        .catch(e => console.log(e));

}

pillsController.getRequests = (req, res, next) => {
    const option = req.query.option;
    const user_id = Number(req.query['userid']);
    console.log(option, user_id);
    let sqlString;
    let values = [`${user_id}`];
    // get requests to owner_id
    if (option === "incoming") {
        sqlString = "SELECT * FROM books b INNER JOIN requests r ON b.book_id = r.book_id WHERE b.owner_id = $1"
    }
    else if (option === "outgoing") {
        sqlString = "SELECT * FROM books b INNER JOIN requests r ON b.book_id = r.book_id WHERE r.user_id = $1"
    }
    db.query(sqlString, values)
        .then((data) => {
            if (!data.rows) {
                console.log("error here")
                return next({
                    log: 'pillsController.getRequests',
                    message: {err: 'Requests not found'}
                })
            }
            res.locals.requestedBooks = data.rows;
            return next()
        })
        .catch((e) => console.log(e));
}

pillsController.clearRequest = (req, res, next) => {
    const { req_id } = req.body
    const values = [`${req_id}`]
    const sqlString = 'DELETE FROM requests WHERE req_id = $1'
    db.query(sqlString, values)
        .then(() => {
            console.log("Request removed");
            return next()
        })
        .catch(e => console.log(e))
}

pillsController.recommendBook = (req, res, next) => {
    console.log(req.body);
    const { book_id, rec_to, rec_by } = req.body;
    const values = [`${book_id}`, `${rec_by}`, `${rec_to}`]
    console.log(values)
    const sqlString = "INSERT INTO recommendations (book_id, recd_by_id, recd_to_id) VALUES ($1, $2, $3)"
    db.query(sqlString, values)
        .then(() => {
            console.log("Request received");
            return next();
        })
        .catch(e => console.log(e));

}

pillsController.getRecommendations = (req, res, next) => {
    console.log(req.body)
    const userid = Number(req.query.userid)
    const values = [`${userid}`]
    const sqlString = "SELECT * FROM books b INNER JOIN recommendations r ON b.book_id = r.book_id WHERE r.recd_to_id = $1"
    db.query(sqlString, values)
        .then((data) => {
            if (!data.rows) {
                console.log("error here")
                return next({
                    log: 'pillsController.getRecommendations',
                    message: {err: 'Recommendations not found'}
                })
            }
            res.locals.recommendedBooks = data.rows;
            return next()
        })
        .catch((e) => console.log(e));
}

pillsController.clearRecommendation = (req, res, next) => {
    const { rec_id } = req.body
    const values = [`${rec_id}`]
    const sqlString = 'DELETE FROM recommendations WHERE rec_id = $1'
    db.query(sqlString, values)
        .then(() => {
            console.log("Recommendation removed");
            return next()
        })
        .catch(e => console.log(e))
}

module.exports = pillsController;