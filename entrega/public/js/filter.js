const socketio2 = io.connect();

const filtro = document.querySelector('#filtro-formulario');
const filtroTitle = document.querySelector('#filtro-title');
const filtroCode = document.querySelector('#filtro-code');
const filtroPriceMin = document.querySelector('#filtro-price-min');
const filtroPriceMax = document.querySelector('#filtro-price-max');
const filtroStockMin = document.querySelector('#filtro-stock-min');
const filtroStockMax = document.querySelector('#filtro-stock-max');


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

    

//Formulario de filtro de productos
  filtro.addEventListener('submit', (e) => {
      
    e.preventDefault();
    const fTitle = filtroTitle.value.trim();
    //const fCode = filtroCode.value.trim();
    //const fPriceMin = filtroPriceMin.value.trim();;
    //const fPriceMax = filtroPriceMax.value.trim();
    //const fStockMin = filtroStockMin.value.trim();
    //const fStockMax = filtroStockMax.value.trim();



    filtroTitle.value = '';
    //filtroCode.value = '';
    //filtroPriceMin.value = '';
    //filtroPriceMax.value = '';      
    //filtroStockMin.value = '';
    //filtroStockMax.value = '';
})

  // actualizo template con la data del server
  socketio2.on('actualizar', (data,carrito) => {
      let listaProductos=data;
      let miFiltro=listaProductos.map(x => x.name==fTitle);
      let html = template({hayProductos: miFiltro});

      let html2=template2({hayCarrito: carrito});
      document.querySelector("#lista-productos").innerHTML = html;
      document.querySelector("#lista-carrito").innerHTML = html2;
  });
