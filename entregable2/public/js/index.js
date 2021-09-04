const socketio = io.connect();
const form = document.querySelector('#formulario');
const inputTitle = document.querySelector('#input-title');
const inputDescription = document.querySelector('#input-description');
const inputCode = document.querySelector('#input-code');
const inputPrice = document.querySelector('#input-price');
const inputImg = document.querySelector('#input-img');
const inputStock = document.querySelector('#input-stock');


//4. Un producto dispondrá de los siguientes campos: id, timestamp, nombre, descripcion,
// código, foto (url), precio, stock
const template= Handlebars.compile(`
  <h1>Vista de Productos</h1>
              <br>
              {{#if hayProductos}}
                  <div class="table-responsive">
                      <table class="table table-dark">
                          <tr> <th>ID</th> <th>Fecha</th> <th>Nombre</th> <th>Descripci&oacute;n</th> <th>C&oacute;digo</th>
                           <th>Precio</th> <th>Stock</th> <th>Foto</th></tr>
                          {{#each hayProductos}}
                              <tr> <td>{{this.id}}</td> <td> {{this.timestamp}}</td> <td> {{this.nombre}}</td>
                              <td>{{this.descripcion}}</td> <td> {{this.codigo}}</td> <td>$ {{this.precio}}</td>
                              <td>{{this.stock}}</td>
                              <td><img width="50" src={{this.foto}} alt="not found"></td> </tr>
                          {{/each}}
                      </table>
                  </div>
              {{else}}
                  <h3 class="alert alert-warning">No se encontraron productos</h3>
              {{/if}}
          <a href="/" class="btn btn-info m-3">Volver</a>
  `);

  const template2= Handlebars.compile(`
    <h1>Vista de Carrito</h1>
                <br>
                {{#if hayCarrito}}
                    <div class="table-responsive">
                        <table class="table table-dark">
                            <tr> <th>ID</th> <th>Fecha</th> <th>Producto-ID</th> <th>Producto-Nombre</th> <th>Foto</th></tr></tr>
                            {{#each hayCarrito}}
                                <tr> <td>{{this.id}}</td> <td> {{this.timestamp}}</td>  
                                <td> {{this.producto.id}}</td> <td> {{this.producto.nombre}}</td>
                                <td><img width="50" src={{this.producto.foto}} alt="not found"></td> </tr>
                            {{/each}}
                        </table>
                    </div>
                {{else}}
                    <h3 class="alert alert-warning">No se encontraron productos</h3>
                {{/if}}
            <a href="/" class="btn btn-info m-3">Volver</a>
    `);

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = inputTitle.value.trim();
      const description=inputDescription.value.trim();
      const code=inputCode.value.trim();;
      const price = inputPrice.value.trim();
      const thumbnail = inputImg.value.trim();
      const stock=inputStock.value.trim();

  

      if (title.length < 1) {return}
      if (description.length < 1) {return}
      if (code.length < 1) {return}
      if (price.length < 1) {return}
      if (thumbnail.length < 1) {return}
      if (stock.length < 1) {return}

      // envio el objeto con socket
      socketio.emit('guardar', {
        nombre: title,
        descripcion:description,
        codigo:code,
        foto: thumbnail,
        precio: price,
        stock:stock          
      })

      inputTitle.value = '';
      inputDescription.value = '';
      inputCode.value = '';
      inputPrice.value = '';      
      inputImg.value = '';
      inputStock.value = '';
  })

  // actualizo template con la data del server
  socketio.on('actualizar', (data,carrito) => {
      let html = template({hayProductos: data});
      let html2=template2({hayCarrito: carrito});
      document.querySelector("#lista-productos").innerHTML = html;
      document.querySelector("#lista-carrito").innerHTML = html2;
  });
