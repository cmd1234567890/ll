const yourName = 'kasen';  
const yourID = 'xxxxxxx';  
const yourmac = ' xx-xx-xx-xx-xx';
const yourip = 'xxxxxxxxx';
console.log(`I'm ${yourName}.my IP is:${yourip}.my Mac address is:${yourmac}.NCC student ID is: (${yourID})`);   //to obtain user's information
  
const sqlite3 = require('sqlite3').verbose();  
const readline = require('readline');  
const rl = readline.createInterface({    //import some environment
    input: process.stdin,  
    output: process.stdout  
});  
  
//create database if not exist
const db = new sqlite3.Database('./books.db', (err) => {  
    if (err) {  
        return console.error(err.message);  
    }  
    console.log('Connected to the books database.');  
  
    //create table if not exist
    db.run(`  
        CREATE TABLE IF NOT EXISTS book (  
            id609 INTEGER PRIMARY KEY AUTOINCREMENT,  
            title609 TEXT NOT NULL,               
            author609 TEXT NOT NULL,  
            isbn609 TEXT NOT NULL,  
            context609 TEXT NOT NULL  
        )  
    `, (err) => {    
        if (err) { 

            return console.error(err.message);  
            
        }  

        console.log('Books table created or already exists.');  
        insertBooks();  

    });  
});  
  
function insertBooks() {  
    rl.question('Enter book title: ', (title609) => {  
        rl.question('Enter book author: ', (author609) => {  
            rl.question('Enter book ISBN: ', (isbn609) => {  
                rl.question('Enter book context: ', (context609) => {  
                    db.run(`INSERT INTO book (title609, author609, isbn609, context609) VALUES (?, ?, ?, ?)`,  
                        [title609, author609, isbn609, context609],  
                        (err) => {  
                            if (err) {  
                                return console.error(err.message);  
                            }  
                            console.log('Book inserted successfully.');  
  
                            rl.question('Do you want to enter another book? (yes/no): ', (answer) => {  
                                if (answer.toLowerCase() === 'yes') { 

                                    insertBooks();  

                                } else {  

                                    listAllBooks();  
                                    rl.close();  //close readline

                                }  
                            });  
                        }  
                    );  
                });  
            });  
        });  
    });  
}   
  

function listAllBooks() {                  //list bookdetails after the user entered
    console.log('Listing all book:');  
    db.all('SELECT * FROM book', [], (err, rows) => {  
        if (err) {  
            return console.error(err.message);  
        }  
        rows.forEach((row) => {  
            console.log(`ID: ${row.id609}, Title: ${row.title609}, Author: ${row.author609}, ISBN: ${row.isbn609},Context:${row.context609}`);  
        });  
    });  
}

// use the function  
insertBooks();