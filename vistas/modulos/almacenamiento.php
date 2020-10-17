
<!--=====================================
VENTANA MODAL PARA CHECKOUT
======================================-->

<div id="modalCheckout" class="modal fade modalFormulario" role="dialog">
	
	 <div class="modal-content modal-dialog">
	 	
		<div class="modal-body modalTitulo">
			
			<h3 class="backColor">REALIZAR PAGO</h3>

			<button type="button" class="close" data-dismiss="modal">&times;</button>

			<div class="contenidoCheckout">

				<?php

				$respuesta = ControladorCarrito::ctrMostrarTarifas();

				echo '<input type="hidden" id="tasaImpuesto" value="'.$respuesta["impuesto"].'">
					  <input type="hidden" id="envioNacional" value="'.$respuesta["envioNacional"].'">
				      <input type="hidden" id="envioInternacional" value="'.$respuesta["envioInternacional"].'">
				      <input type="hidden" id="tasaMinimaNal" value="'.$respuesta["tasaMinimaNal"].'">
				      <input type="hidden" id="tasaMinimaInt" value="'.$respuesta["tasaMinimaInt"].'">
				      <input type="hidden" id="tasaPais" value="'.$respuesta["pais"].'">

				';

				?>
				
				<div class="formEnvio row">
					
					<h4 class="text-center well text-muted text-uppercase">Información de envío</h4>

					<div class="col-xs-12 seleccionePais">
						
						<option value="">Seleccione el Pais</option>

					</div>

				</div>

				<br>

				<div class="formaPago row">
					
					<h4 class="text-center well text-muted text-uppercase">Elige la forma de pago</h4>

					<figure class="col-xs-6">
						
						<center>
							
							<input id="checkPaypal" type="radio" name="pago" value="paypal" checked>

						</center>	
						
						<img src="<?php echo $url; ?>vistas/img/plantilla/paypal.png" class="img-thumbnail">		

					</figure>

					<figure class="col-xs-6">
						
						<center>
							
							<input id="checkPayu" type="radio" name="pago" value="mercado">

						</center>

						<img src="<?php echo $url; ?>vistas/img/plantilla/mercadopago.png" class="img-thumbnail">

					</figure>

				</div>

				<br>

				<div class="listaProductos row">
					
					<h4 class="text-center well text-muted text-uppercase">Productos a comprar</h4>

					<table class="table table-striped tablaProductos">
						
						 <thead>
						 	
							<tr>		
								<th>Producto</th>
								<th>Cantidad</th>
								<th>Precio</th>
							</tr>

						 </thead>

						 <tbody>
						 	


						 </tbody>

					</table>

					<div class="col-sm-6 col-xs-12 pull-right">
						
						<table class="table table-striped tablaTasas">
							
							<tbody>
								
								<tr>
									<td>Subtotal</td>	
									<td>USD</span> $<span class="valorSubtotal" valor="0">0</span></td>	
								</tr>

								<tr>
									<td>Envío</td>	
									<td>USD</span> $<span class="valorTotalEnvio" valor="0">0</span></td>	
								</tr>

								<tr>
									<td>Impuesto</td>	
									<td>USD</span> $<span class="valorTotalImpuesto" valor="0">0</span></td>	
								</tr>

								<tr>
									<td><strong>Total</strong></td>	
									<td><strong>USD</span> $<span class="valorTotalCompra" valor="0">0</span></strong></td>	
								</tr>

							</tbody>	

						</table>

						 <div class="divisa">

						 	<select class="form-control" id="cambiarDivisa" name="divisa">
						 		
							  <option value="ARG">ARG</option>

						 	</select>	

						 	<br>

						 </div>

					</div>

					<div class="clearfix"></div>
					
					<button class="btn btn-block btn-lg btn-default backColor btnPagar">PAGAR</button>

				</div>

			</div>

		</div>

		<div class="modal-footer">
      	
      	</div>

	</div>

</div>