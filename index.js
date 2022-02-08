const express = require('express');
const app = express();
const con = require('./db')
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.get('/', (req, res) => {
    let query = "SELECT * FROM Todo";
    let items = []
    con.query(query, (err, result) => {
        if (err) throw err;
        items = result
        console.log(items)
        res.json( {
            items: items
        })
    })
});
app.post('/', (req, res) => {
    console.log(req.body)
    let query = "INSERT INTO Todo (task, status) VALUES ?";
    data = [
        [req.body.task, "ongoing"]
    ]
    con.query(query, [data], (err, result) => {
        if (err) throw err;
        console.log(result)
       res.end();
    })
})

app.put('/:id', (req, res) => {
    console.log(req.params)
    let query = "UPDATE Todo SET task='" + req.body.task + "' WHERE task_id=" + req.params.id
    con.query(query, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.end();
    })
});
app.delete('/:id', (req, res) => {
    console.log(req.params)
    let query = "DELETE FROM Todo WHERE task_id=" + req.params.id
    con.query(query, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.end();
    })
});
// port where app is served
app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});

