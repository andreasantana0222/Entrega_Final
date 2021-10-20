const options = require('./config');
const knex = require('knex')(options);

const msj = [
    {
  		author: "user",
  		email: "malenauai@gmail.com",
  		text: "Hola",
  		datetime: "10/7/2021 22:32:29"
  	},
  	{
  		author: "masantana",
  		email: "malenauai@gmail.com",
  		text: "Hola",
  		datetime: "10/7/2021 22:42:54"
  	},
  	{
  		author: "christycalidad@gmail.com",
  		email: "malenauai@hotmail.com",
  		text: ":D",
  		datetime: "10/7/2021 22:43:14"
  	},
  	{
  		author: "malenauai@gmail.com",
  		email: "malenauai@hotmail.com",
  		text: "buenas",
  		datetime: "10/7/2021 22:45:43"
  	}
];

(async () => {
    try {
        console.log('--> borramos tabla chat');
        await knex.schema.dropTableIfExists('chat');

        console.log('--> tabla chat creada!');
        await knex.schema.createTable('chat', table => {
            table.increments('id').primary().notNullable();
            table.string('author',30);
            table.string('email',30);
            table.string('text',100);
            table.datetime('datetime').defaultTo(knex.fn.now());;
        });

        console.log('--> insertamos los mensajes');
        await knex('chat').insert(msj);

        console.log('--> leemos todos los mensajes actualizados');
        rows = await knex.from('chat').select('*');

        for (row of rows) {
          console.log(`${row['id']} ${row['author']} ${row['email']} ${row['text']} ${row['datetime']}`);
        }

    } catch (error) {
        console.log(error);
    } finally {
        knex.destroy();
    }
})();
