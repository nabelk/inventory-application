const express = require('express');
const app = express();
const path = require('node:path');
const methodOverride = require('method-override');
const indexRouter = require('./routes/indexRouter');
const addNewProductRouter = require('./routes/addNewProductRouter');
const deleteProductRouter = require('./routes/deleteProductRouter');
const updateProductRouter = require('./routes/updateProductRouter');

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/newProduct', addNewProductRouter);
app.use('/deleteproduct', deleteProductRouter);
app.use('/updateproduct', updateProductRouter);

const PORT = 5000;
app.listen(PORT);
