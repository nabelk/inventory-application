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

INSERT INTO inventory (product, brand, category, price, stock) VALUES
('Fender Stratocaster Electric Guitar', 'Fender', 'Guitar', 899.99, 5),
('Yamaha Pacifica 112V', 'Yamaha', 'Guitar', 399.99, 10),
('Roland TD-1K Electronic Drum Kit', 'Roland', 'Drum Kit', 499.99, 7),
('Gibson Les Paul Studio', 'Gibson', 'Guitar', 1199.99, 3),
('Ibanez SR500E Bass Guitar', 'Ibanez', 'Bass', 799.99, 4),
('Casio Privia PX-S1100 Digital Piano', 'Casio', 'Keyboard', 649.99, 8),
('Taylor GS Mini Acoustic Guitar', 'Taylor', 'Guitar', 699.99, 6),
('Boss RC-505 Loop Station', 'Boss', 'Loop Station', 499.99, 12),
('Korg Minilogue XD Synthesizer', 'Korg', 'Synthesizer', 749.99, 9),
('Pioneer DJ DDJ-400 Controller', 'Pioneer', 'DJ Controller', 299.99, 15),
('Yamaha YTR-2330 Trumpet', 'Yamaha', 'Brass', 499.99, 5),
('Pearl Export EXX Drum Set', 'Pearl', 'Drum Kit', 999.99, 2),
('Shure SM58 Microphone', 'Shure', 'Microphone', 99.99, 25),
('Zildjian A Custom 18" Crash Cymbal', 'Zildjian', 'Cymbal', 249.99, 10),
('Akai MPC Live II Music Production Center', 'Akai', 'Sampler', 1199.99, 4),
('Martin D-28 Acoustic Guitar', 'Martin', 'Guitar', 2799.99, 2),
('Roland SP-404 MKII Sampler', 'Roland', 'Sampler', 499.99, 6),
('Kala KA-15S Soprano Ukulele', 'Kala', 'Ukulele', 69.99, 20),
('Mackie CR5-X Studio Monitors', 'Mackie', 'Studio Monitors', 199.99, 10),
('Epiphone Casino Hollow Body Guitar', 'Epiphone', 'Guitar', 699.99, 7);
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
