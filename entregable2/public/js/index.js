const socketio = io.connect();
const form = document.querySelector('#formulario')
const inputTitle = document.querySelector('#input-title')
const inputPrice = document.querySelector('#input-price')
const inputImg = document.querySelector('#input-img')

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
      e.preventDefault()
      const title = inputTitle.value.trim()
      const price = inputPrice.value.trim()
      const thumbnail = inputImg.value.trim()

      if (title.length < 1) {return}
      if (price.length < 1) {return}
      if (thumbnail.length < 1) {return}

      // envio el objeto con socket
      socketio.emit('guardar', {
          title: title,
          price: price,
          thumbnail: thumbnail
      })

      inputTitle.value = ''
      inputPrice.value = ''
      inputImg.value = ''
  })

  // actualizo template con la data del server
  socketio.on('actualizar', (data,carrito) => {
      let html = template({hayProductos: data});
      let html2=template2({hayCarrito: carrito});
      document.querySelector("#lista-productos").innerHTML = html;
      document.querySelector("#lista-carrito").innerHTML = html2;
  });
