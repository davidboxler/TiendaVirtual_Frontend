

/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
VISUALIZAR LA CESTA DEL CARRITO DE COMPRAS
=============================================*/

if(localStorage.getItem("cantidadCesta") != null){

	$(".cantidadCesta").html(localStorage.getItem("cantidadCesta"));
	$(".sumaCesta").html(localStorage.getItem("sumaCesta"));

}else{

	$(".cantidadCesta").html("0");
	$(".sumaCesta").html("0");
}

/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
VISUALIZAR LOS PRODUCTOS EN LA PÁGINA CARRITO DE COMPRAS
=============================================*/


if(localStorage.getItem("listaProductos") != null){

	var listaCarrito = JSON.parse(localStorage.getItem("listaProductos"));

}else{

	$(".cuerpoCarrito").html('<div class="well">Aún no hay productos en el carrito de compras.</div>');
	$(".sumaCarrito").hide();
	$(".cabeceraCheckout").hide();
}

for(var i = 0; i < indice.length; i++){

	if(indice[i] == "carrito-de-compras"){

		listaCarrito.forEach(funcionForEach);

		function funcionForEach(item, index){

			var datosProducto = new FormData();
			var precio = 0;

			datosProducto.append("id", item.idProducto);

			$.ajax({

				url:rutaOculta+"ajax/producto.ajax.php",
				method:"POST",
				data: datosProducto,
				cache: false,
				contentType: false,
				processData:false,
				dataType: "json",
				success: function(respuesta){
		
					if(respuesta["precioOferta"] == 0){

						precio = respuesta["precio"];

					}else{

						precio = respuesta["precioOferta"];
						
					}

					$(".cuerpoCarrito").append(

						'<div clas="row itemCarrito">'+
							
							'<div class="col-sm-1 col-xs-12">'+
								
								'<br>'+

								'<center>'+
									
									'<button class="btn btn-default backColor quitarItemCarrito" idProducto="'+item.idProducto+'">'+
										
										'<i class="fa fa-times"></i>'+

									'</button>'+

								'</center>'+	

							'</div>'+
							'<div class="col-sm-1 col-xs-12">'+
								
								'<figure>'+
									
									'<img src="'+item.imagen+'" class="img-thumbnail">'+

								'</figure>'+

							'</div>'+

							'<div class="col-sm-4 col-xs-12">'+

								'<br>'+

								'<p class="tituloCarritoCompra text-left">'+item.titulo+'</p>'+

							'</div>'+

							'<div class="col-md-2 col-sm-1 col-xs-12">'+

								'<br>'+

								'<p class="precioCarritoCompra text-center">USD $<span>'+precio+'</span></p>'+

							'</div>'+

							'<div class="col-md-2 col-sm-3 col-xs-8">'+

								'<br>'+	

								'<div class="col-xs-8">'+

									'<center>'+
									
										'<input type="number" class="form-control cantidadItem" min="1" value="'+item.cantidad+'" tipo="'+item.tipo+'" precio="'+precio+'" idProducto="'+item.idProducto+'" item="'+index+'">'+	

									'</center>'+

								'</div>'+

							'</div>'+

							'<div class="col-md-2 col-sm-1 col-xs-4 text-center">'+
								
								'<br>'+

								'<p class="subTotal'+index+' subtotales">'+
									
									'<strong>USD $<span>'+(Number(item.cantidad)*Number(precio))+'</span></strong>'+

								'</p>'+

							'</div>'+
							
						'</div>'+

						'<div class="clearfix"></div>'+

						'<hr>');

					// /*=============================================
					// /*=============================================
					// /*=============================================
					// /*=============================================
					// /*=============================================
					// ACTUALIZAR SUBTOTAL
					// =============================================*/
					var precioCarritoCompra = $(".cuerpoCarrito .precioCarritoCompra span");

					cestaCarrito(precioCarritoCompra.length);

					sumaSubtotales();		
				
				}

			})	

		}		
		
	}

}



/*=============================================
/*=============================================
/*=============================================
/*=============================================
/*=============================================
AGREGAR AL CARRITO
=============================================*/

$(".agregarCarrito").click(function(){

	var idProducto = $(this).attr("idProducto");
	var imagen = $(this).attr("imagen");
	var titulo = $(this).attr("titulo");
	var precio = $(this).attr("precio");

	var agregarAlCarrito = false;

	/*=============================================
	CAPTURAR DETALLES
	=============================================*/

		var seleccionarDetalle = $(".seleccionarDetalle");
		
		for(var i = 0; i < seleccionarDetalle.length; i++){

			console.log("seleccionarDetalle", $(seleccionarDetalle[i]).val());

			if($(seleccionarDetalle[i]).val() == ""){

				swal({
					  title: "Debe seleccionar Talla y Color",
					  text: "",
					  type: "warning",
					  showCancelButton: false,
					  confirmButtonColor: "#DD6B55",
					  confirmButtonText: "¡Seleccionar!",
					  closeOnConfirm: false
					})

				return;

			}else{

				titulo = titulo + "-" + $(seleccionarDetalle[i]).val();

				agregarAlCarrito = true;

			}

		}		

	/*=============================================
	ALMACENAR EN EL LOCALSTARGE LOS PRODUCTOS AGREGADOS AL CARRITO
	=============================================*/

	if(agregarAlCarrito){

		/*=============================================
		RECUPERAR ALMACENAMIENTO DEL LOCALSTORAGE
		=============================================*/

		if(localStorage.getItem("listaProductos") == null){

			listaCarrito = [];

		}else{

			var listaProductos = JSON.parse(localStorage.getItem("listaProductos"));

			for(var i = 0; i < listaProductos.length; i++){

				if(listaProductos[i]["idProducto"] == idProducto){

					swal({
					  title: "El producto ya está agregado al carrito de compras",
					  text: "",
					  type: "warning",
					  showCancelButton: false,
					  confirmButtonColor: "#DD6B55",
					  confirmButtonText: "¡Volver!",
					  closeOnConfirm: false
					})

					return;

				}

			}

			listaCarrito.concat(localStorage.getItem("listaProductos"));

		}

		listaCarrito.push({"idProducto":idProducto,
						   "imagen":imagen,
						   "titulo":titulo,
						   "precio":precio,
				           "cantidad":"1"});

		localStorage.setItem("listaProductos", JSON.stringify(listaCarrito));

		/*=============================================
		ACTUALIZAR LA CESTA
		=============================================*/

		var cantidadCesta = Number($(".cantidadCesta").html()) + 1;
		var sumaCesta = Number($(".sumaCesta").html()) + Number(precio);

		$(".cantidadCesta").html(cantidadCesta);
		$(".sumaCesta").html(sumaCesta);

		localStorage.setItem("cantidadCesta", cantidadCesta);
		localStorage.setItem("sumaCesta", sumaCesta);
		
		/*=============================================
		MOSTRAR ALERTA DE QUE EL PRODUCTO YA FUE AGREGADO
		=============================================*/

		swal({
			  title: "",
			  text: "¡Se ha agregado un nuevo producto al carrito de compras!",
			  type: "success",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  cancelButtonText: "¡Continuar comprando!",
			  confirmButtonText: "¡Ir a mi carrito de compras!",
			  closeOnConfirm: false
			},
			function(isConfirm){
				if (isConfirm) {	   
					 window.location = rutaOculta+"carrito-de-compras";
				} 
		});

	}

})

