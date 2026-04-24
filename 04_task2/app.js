import expess from "express";

const book = [
    {
        id: 1,
        title: "book1",
    },
    {
        id: 2,
        title: "book2"
    }

]


const app = expess();
const port = 9000;


// Middleware
app.use(expess.json());


// Routes 
// ---> homePage Routes
app.get("/", (req, res) => {
    res.status(200).send("wellcome");
});

// Access all book 
app.get("/all-books", (req, res) => {
    res.status(200).json({
        message: "fetch all books",
        data: book
    })
})

//! -----add new book 
app.post("/add-book", (req, res) => {
    console.log(req.body);

    if (!req.body.title) {
        return res.status(400).json({
            message: "Title not found",
        })
    }
    let newbook = {
        id: book.length + 1,
        title: req.body.title,
    };
    book.push(newbook);

    res.status(201).json({
        message: "New book created",
        data: newbook,
    })

})

//! get single book 
app.get("/get-book/:id", (req, res) => {
    let bookID = Number(req.params.id);
    let mybook = book.find((ele) => ele.id === bookID);
    if (!mybook) {
        return res.status(400).json({
            message: "Book Not found",
        })
    }
    res.status(2001).json({
        message: "book found",
        data: mybook,
    })
})

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log("Server Start at 9000");
})