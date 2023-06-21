const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const port = 8080;
// parsing application
app.use(bodyParser.urlencoded());

const inventors = [
    { id: 1, first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { id: 2, first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { id: 3, first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { id: 4, first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { id: 5, first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { id: 6, first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 }
];

app.get('/', (req, res, next) => {
    res.send('<p>Day la trang chu</p>');
});
app.get('/inventors', (req, res) => {
    let list = '<h2>Danh sách nhà khoa học<ul>';
    inventors.forEach(e => {
        list += `<li><a style="text-decoration:none;color:green;" href="/inventor/${e.id}">${e.last}</a></li>`;
    });
    list += '</ul></h2>';
    res.send(list);
})
app.get('/inventor/:id', (req, res) => {
    let id = req.params.id;
    inventor = inventors.find(e => e.id == id);
    info = `<h2>Thông tin chi tiết nhà khoa học:Full name: ${inventor.first} ${inventor.last}, Year: ${inventor.year},Passed: ${inventor.passed}</h2>`;
    res.send(info);
});
app.get('/add-inventor', (req, res) => {
    res.send('<h1>Thêm Nhà Khoa Học</h1><form action="/inventor" method="POST"><input type="text"name="first" placeholder="input first name"><input type="text" name="last" placeholder="input last name"><br><input type="number" name="year" placeholder="Year"><input type="number" name="passed" placeholder="passed"><br><button type="submit">Add Product</button></form>');
});
app.post('/inventor', (req, res) => {
    let newInventor = req.body;
    newInventor.id = inventors.length + 1;
    inventors.push(newInventor);
    res.redirect('/inventors');
});

//Product

app.get('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="productName"><button type="submit">Add Product</button></form>');
});
app.post('/product', (req, res, next) => {
    console.log(req.body)
    res.send('<p>Day la trang Product</p>');
});

app.get('/product/:id', (req, res, next) => {
    res.send(`<p>Day la trang Product id: ${req.params.id}</p>`);
});

app.listen(port, () => {
    console.log(`Dang chay ${port}`);
});