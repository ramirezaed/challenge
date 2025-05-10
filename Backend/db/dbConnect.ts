// import sqlite3 from 'sqlite3';
// import { config } from "dotenv";

// config();

// const DB = process.env.DB_PATH || './database.sqlite';

// const connectDB = () => {
//     const dbConnect = new sqlite3.Database(DB, (err) => {
//         if (err) {
//             console.error('Error al conectar a SQLite:', err.message);
//         } else {
//             console.log('Conectado a base de datos SQLite');
//             // Crear tabla inicial (si no existe)
//             dbConnect.run(`
//                 CREATE TABLE IF NOT EXISTS TableTask (
//                     id INTEGER PRIMARY KEY AUTOINCREMENT,
//                     title TEXT,
//                     description TEXT,
//                     completed BOOLEAN,
//                     createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
//                 )
//             `, (err) => {
//                 if (err) console.error('Error al crear tabla:', err.message);
//             });
//         }
//     });

//     return dbConnect;
// };

// export default connectDB;



import sqlite3 from 'sqlite3';
import { config } from "dotenv";

config();

const DB = process.env.DB_PATH || './database.sqlite';

const connectDB = () => {
    const dbConnect = new sqlite3.Database(DB, (err) => {
        if (err) {
            console.error('Error al conectar a SQLite:', err.message);
        } else {
            console.log('Conectado a base de datos SQLite');
            // Crear tabla inicial (si no existe)
            dbConnect.run(`
                CREATE TABLE IF NOT EXISTS TableTask (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT,
                    description TEXT,
                    completed INTEGER DEFAULT 0,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `, (err) => {
                if (err) console.error('Error al crear tabla:', err.message);
            });
        }
    });

    return dbConnect;
};

// Función para eliminar la tabla
const dropTable = () => {
    const db = connectDB();
    const query = `DROP TABLE IF EXISTS TableTask`;

    db.run(query, (err) => {
        if (err) {
            console.error("Error al eliminar la tabla:", err.message);
        } else {
            console.log("Tabla 'TableTask' eliminada correctamente.");
        }
    });
};

// Ejecuta la función para eliminar la tabla
//dropTable(); // <- Descomenta esta línea y ejecuta el archivo para eliminar la tabla

export default connectDB;
