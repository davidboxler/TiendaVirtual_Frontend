/*=============================================
HEAD
=============================================*/

$("#btnCategorias").click(function(){

	if(window.matchMedia("(max-width:767px)").matches){

		$("#btnCategorias").after($("#categorias").slideToggle("fast"))

	}else{

		$("#head").after($("#categorias").slideToggle("fast"))
		
	}

		
})