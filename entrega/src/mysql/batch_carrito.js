const options = require('./config');
const knex = require('knex')(options);

const prod = [
    {
		"id": 1,
		"timestamp": "1/8/2021 20:01:27",
		"producto_id": 1
	}

];

(async () => {
    try {
        
        await knex.schema.dropTableIfExists('carrito');

        
        await knex.schema.createTable('carrito', table => {
            table.increments('id').primary().notNullable();
            table.datetime('timestamp');            
            table.integer('producto_id',100);
        });

        
        await knex('carrito').insert(prod);

        rows= await knex.from('carrito').innerJoin('productos','productos.id','carrito.producto_id');

        

    } catch (error) {
        
    } finally {
        knex.destroy();
    }
})();
