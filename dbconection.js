
//pool connection
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 12,
    host: 'localhost',
    user: 'revital1',
    password: '123456',
    database: 'jbh_shop'
    //insecureAuth : true
});





//first pool event:
//connection-נותן את החיבור

pool.on('connection', (db) => {
    console.log(`New connection id:${db.threadId}`)
});

//first query
//1.כמה עולה המוצר הזול ביותר
pool.query('SELECT * FROM jbh_shop.products ORDER BY price LIMIT 1;', (err, res, fields) => {
    if (err) throw err;
    console.log(res);

});


// "call" the connection
pool.query()





//second pool event:acquire

pool.on('acquire', (db) => {
    console.log(`Acquire connection id:${db.threadId}`)
});

//second query

//2.כמה הזמנות קיימות בחנות

pool.query('SELECT  COUNT (*) FROM jbh_shop.orders ;', (err, res, fields) => {
    if (err) throw err;
    console.log(res);

});





//third pool event:enqueue
pool.on('enqueue', (db) => {
    console.log('waiting for available connection slot');
});

//third query

//3. מי קנה את המוצר היקר ביותר
// query brings the id and name fron the customers table
//pool.query('SELECT id,name FROM jbh_shop.customers;', (err, res, fields) => {

    //if (err) throw err;
    //console.log(res);

//});

//gives the id and query id from the orders table
pool.query('SELECT id,customer_id FROM jbh_shop.orders;', (err, res, fields) => {

    if (err) throw err;
    console.log(res);

});

//query brings id and name from the products table
pool.query('SELECT id,name FROM jbh_shop.products;', (err, res, fields) => {

    if (err) throw err;
    console.log(res);

});




// brings orders id = customer id
pool.query('SELECT  * FROM jbh_shop.orders AS orders INNER JOIN jbh_shop.customers AS customers ON orders.customer_id = customer_id INNER JOIN jbh_shop.orders_products AS products ON order_id = products.order_id ;', (err, res, fields) => {

    if (err) throw err;
    console.log(res);

});

//






//forth pool event:release
pool.on('release', (db) => {
    console.log('Connection %d released', db.threadId);
});

//forth query
//4. מי לא הזמין כלום
//pool.query('SELECT  id,name FROM jbh_shop.customers LEFT JOIN jbh_shop.orders ON customer.id=order.customer_id WHERE order id IS NULL;')
