const options = require('./config');
const knex = require('knex')(options);

const prod = [
  {
		"id": 1,
		"timestamp": "1/8/2021 19:04:18",
		"nombre": "Colchón Chocolate",
		"descripcion": "Colchón de lona relleno de copos de gomaespuma",
		"codigo": 123456,
		"foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
		"precio": 345.67,
		"stock": 200
	},
	{
		"id": 2,
		"timestamp": "1/8/2021 19:04:18",
		"nombre": "Colchón Rubí",
		"descripcion": "Colchón de lona relleno de copos de gomaespuma",
		"codigo": 123456,
		"foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
		"precio": 345.67,
		"stock": 100
	},
	{
		"id": 3,
		"timestamp": "1/8/2021 19:04:18",
		"nombre": "Colchón Rubí",
		"descripcion": "Colchón de lona relleno de copos de gomaespuma",
		"codigo": 123456,
		"foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
		"precio": 345.67,
		"stock": 100
	}

];

(async () => {
    try {
        
        await knex.schema.dropTableIfExists('productos');

        
        await knex.schema.createTable('productos', table => {
            table.increments('id').primary().notNullable();
            table.datetime('timestamp');
            table.string('nombre',100);
            table.string('descripcion',200);
            table.integer('codigo');
            table.string('foto');
            table.float('precio');
            table.integer('stock',100);
        });

        
        await knex('productos').insert(prod);

        
        rows = await knex.from('productos').select('*');

        

    } catch (error) {
        
    } finally {
        knex.destroy();
    }
})();
