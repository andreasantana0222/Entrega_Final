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
        console.log('--> borramos tabla carrito');
        await knex.schema.dropTableIfExists('carrito');

        console.log('--> tabla carrito creada!');
        await knex.schema.createTable('carrito', table => {
            table.increments('id').primary().notNullable();
            table.timestamp('timestamp');            
            table.integer('producto_id',100);
        });

        console.log('--> insertamos los productos');
        await knex('carrito').insert(prod);

        console.log('--> leemos todos los productos actualizados');
        //rows = await knex.from('carrito', 'productos').select('carrito.*', 'productos.*').where('carrito.producto_id','=','productos.id');
        rows= await knex.from('carrito').innerJoin('productos','productos.id','carrito.producto_id');

        for (row of rows) {
          console.log(`${row['id']} ${row['timestamp']} ${row['producto_id']} ${row['nombre']}`);
        }

    } catch (error) {
        console.log(error);
    } finally {
        knex.destroy();
    }
})();
