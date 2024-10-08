require('dotenv').config();
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS inventory (
     id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     product text,
     price numeric,
     brand text,
     stock integer,
     category text
);

INSERT INTO inventory (product, price, brand, stock, category)
VALUES
('Yamaha FG800 Acoustic Guitar', 850.00, 'Yamaha', 15, 'Acoustic Guitar'),
('Fender Player Stratocaster', 1200.50, 'Fender', 8, 'Electric Guitar'),
('Pearl Export EXX Drum Kit', 2500.75, 'Pearl', 3, 'Percussion'),
('Casio Privia PX-160 Digital Piano', 1999.99, 'Casio', 5, 'Keyboard'),
('Ibanez SR500E Bass Guitar', 1300.00, 'Ibanez', 4, 'Bass Guitar'),
('Yamaha YAS-280 Alto Saxophone', 1800.00, 'Yamaha', 7, 'Woodwind'),
('Meinl Percussion Woodcraft Cajon', 300.00, 'Meinl', 12, 'Percussion'),
('Roland Juno-DS88 Synthesizer', 2500.00, 'Roland', 2, 'Keyboard');

`;

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

async function main() {
    console.log('seeding...');

    const clientParam = !process.argv[2]
        ? {
              connectionString: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
          }
        : {
              connectionString: process.argv[2],
              ssl: {
                  rejectUnauthorized: false,
              },
          };

    const client = new Client(clientParam);
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
}

main();
