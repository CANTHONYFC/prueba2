
//$('#txtNumDocumento').tooltip();
$('[data-toggle="tooltip"]').tooltip();
//Solo permite introducir numeros.

//$(document).ready(function (){
//			$(document).tooltip();
////      $('#txtNumDocumento').on('input', function () { 
////    this.value = this.value.replace(/[^0-9]/g,'');
////		 $( document ).tooltip();
////});
//    });

var dni, cambio, tipoTrabajador, dniBuscar = "", estado, codigo;
const httpRequest = {

	insertarSedes(json) {
		return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: '../servlet/personalServlet?accion=validarPersonal',
				dataType: "json",
				data: {
					jsonPersonal: JSON.stringify(json)
				}, success: function (data, textStatus, jqXHR) {
					resolve(data)
				},
				error: function (jqXHR, textStatus, errorThrown) {
					reject('Error en la petición')
				}
			})
		})
	}

	, validarPersonal(json) {
		return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: '../servlet/personalServlet?accion=validarPersonal',
				dataType: "json",
				data: {
					jsonPersonal: JSON.stringify(json)
				}, success: function (data, textStatus, jqXHR) {
					resolve(data)
				},
				error: function (jqXHR, textStatus, errorThrown) {
					reject('Error en la petición')
				}
			})
		})
	}
	,
	listarSedes()
	{

		return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: '../servlet/sedesServlet?accion=listarSedes',
				success: function (data, textStatus, jqXHR) {
					resolve(data)
					console.log(data.data)
					let printJson = ""
					for (var i in data.data) {
						printJson += "<option value='" + data.data[i].CodEquipo + "'>" + data.data[i].Descripcion + "</option>";
					}
					/*<div class="form-group">
					 <label class="font-noraml">Multi select</label>
					 <div class="input-group">
					 <select data-placeholder="Choose a Country..." class="chosen-select" multiple style="width:350px;" tabindex="4">
					 <option value="">Select</option>
					 <option value="United States">United States</option>
					 <option value="United Kingdom">United Kingdom</option>
					 <option value="Afghanistan">Afghanistan</option>
					 <option value="Aland Islands">Aland Islands</option>
					 </select>
					 </div>
					 </div>*/

					$("#selSedes").html(printJson);
					

				},
				error: function (jqXHR, textStatus, errorThrown) {
					reject('Error en la petición')
				}, complete: function () {

					var config = {
						'.chosen-select': {},
						'.chosen-select-deselect': {allow_single_deselect: true},
						'.chosen-select-no-single': {disable_search_threshold: 10},
						'.chosen-select-no-results': {no_results_text: 'Oops, nothing found!'},
						'.chosen-select-width': {width: "100%"}
					}
//					for (var selector in config) {
//						$(selector).chosen(config[selector]);
//					}
				}
			})
		})
	}, fechaactual()
	{
		let f = new Date();
		let fechaactual = (f.getDate() + "" + (f.getMonth() + 1) + "/" + f.getFullYear())
		document.getElementById("txtfechadesde").value = fechaactual
	}
	, actualizarestado(json) {
		
		return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: '../servlet/personalServlet?accion=actualizarEstado',
				dataType: "json",
				data: {
					json: JSON.stringify(json)
				}, success: function (data, textStatus, jqXHR) {
					resolve(data)
				},
				error: function (jqXHR, textStatus, errorThrown) {
					reject('Error en la petición')
				}
			})
		})
	}


}

const SetElements = {
	init() {
		this.setToolTip();
		this.validateNumber();
		this.validateLetter();
	},
	setToolTip() {
		$('[data-toggle="tooltip"]').tooltip();
		$(".js-example-basic-multiple").select2({
			placeholder: "SELECCIONÉ"
		});

	},
	validateNumber() {
		$('#codigogenerado').on('input', function () {
			this.value = this.value.replace(/[^0-9]/g, '');

		});
	}, validateLetter() {
		$('#txtApePaterno').on('input', function () {
			this.value = this.value.replace(/[^a-z]/g, '');

		});

		$('#txtApeMaterno').on('input', function () {
			this.value = this.value.replace(/[^a-z]/g, '');

		});
		$('#txtNombres').on('input', function () {
			this.value = this.value.replace(/[^A-Za-z\s]/g, '');

		});
		$('#txtCargo').on('input', function () {
			this.value = this.value.replace(/[^A-Za-z\s]/g, '');

		});


	}

}
function validate_fechaMayorQue(fechaInicial, fechaFinal)
{
	valuesStart = fechaInicial.split("/");
	valuesEnd = fechaFinal.split("/");

	// Verificamos que la fecha no sea posterior a la actual
	var dateStart = new Date(valuesStart[2], (valuesStart[1] - 1), valuesStart[0]);
	var dateEnd = new Date(valuesEnd[2], (valuesEnd[1] - 1), valuesEnd[0]);
	if (dateStart > dateEnd)
	{
		return 0;
	}
	return 1;
}
function validarcamposdefiltro() {

	var validator = $("#formulariolistado").validate({
		rules: {
			txtInputFiltro: {
				required: true
			}
		}, messages: {
			minlength: $.validator.format("Please, at least {0} characters are necessary")
		}
	});
	var estado = validator.form();

	if (estado) {
		if ($('#txtfechadesde').length) {




			var fechaInicial = document.getElementById("txtfechadesde").value;
			var fechaFinal = document.getElementById("txtfechahasta").value;
			if (validate_fechaMayorQue(fechaInicial, fechaFinal))
			{
				ListarTrabajadores();
			} else {

				alert("la fecha no es la indicada")
			}



		} else {
			ListarTrabajadores();
		}


	}

}
function solonumero() {
	$('#txtInputFiltro').on('input', function () {
		this.value = this.value.replace(/[^0-9]/g, '');

	});
}



function  formatoselect() {
	$("#sedefaltantes").select2()

}


function sololetra() {
	$('#txtInputFiltro').on('input', function () {
			this.value = this.value.replace(/[^A-Za-z-ñÑ\s]/g, '');

	});
}

function limpiartrabajadores() {

	dniBuscar = localStorage.getItem("dni");

	$("#cbFiltro").val(0);
	$("#cbEstado").val(0);
	$("#estadoPro").val(0);
	$("#divInputFiltro").html("<label>Todos</label> \n\
                                    <div id=\"divInputFiltroTxt\">\n\
                                        <input type=\"text\" id=\"txtInputFiltro\" name=\"txtInputFiltro\" placeholder=\"\" value=\"\" onchange=\"conMayusculas(this)\" class=\"form-control\">\n\
                                    </div>");
	document.getElementById("txtInputFiltro").disabled = true;



	ListarTrabajadores()







}


function editarTrabajador(codigoTrabajador,dni)
{

	let codigo = codigoTrabajador
	let json = {
		"codigo": codigo
	}
	var listar = bootbox.dialog({
		headerClass: "blue-bg",
		title: "Asignar Sedes Personal",
		tabindex: null,
		size: "large",
		message: `
		<div id="contgenerarcodigo">
<form id="formularioEditar" oncopy="return false" oncut="return false" onpaste="return false" novalidate="novalidate">
	             <div class="row">
	              <div style="margin-left:" class="col-sm-6">
              <div class="form-group">
								<label>Nombre Completo: </label> 
							 <input type="text" id="txtNombre"  maxlength="100" name="txtNombre"   placeholder="" class="form-control" disabled>
</div>
</div>			
<div class="col-sm-6">
<div class="form-group">
<label>Responsable: </label>
<input type="text" id="Responsable"  maxlength="100" name="txtApePaterno"   placeholder="" class="form-control" disabled>
</div>
</div>
</div>
<div class="row">
<div class="col-sm-6">
<div class="form-group">
<label>Cargo: </label> 

 <input type="text" id="Cargo"  class="form-control valid"   aria-required="true" aria-invalid="false" disabled>
</div>
</div>
<div class="row">
<div class="col-sm-6">
<div  >
<label>Sedes: </label> <span style="color:red;">(*)</span>
<div class="" id="divSedes">
		<select   class="js-example-basic-multiple" name="sedefaltantes" id="sedefaltantes"  data-placement="top" minlength="1" multiple="multiple" style="width:100%;" tabindex="4"  />
										</select>
		<input type="checkbox" id="checkbox" >Seleccionar todas las sedes
</div>

</div>
</div>

<div class=\"row\">
<div class="col-sm-6" ><div class="form-group">
		</br>

			
                        </div></div>
                        </form></div>
`,
		buttons: {
			grabar: {
				label: "<i  class='fa fa-check-square-o'></i>&nbsp;&nbspActualizar",
				className: "btn btn-m-m btn-success",
				callback: function () {

					actualizarEmpleadoo(codigo,dni)
					ListarTrabajadores()
				}
			},
			cancelar: {
				label: "<i class='ace-icon fa fa-times bigger-110'></i>&nbsp; cancelar",
				className: "btn btn-m-m btn-danger",
				callback: function () {

				}
			}
		}
	});
	listar.init(function () {
		$.fn.modal.Constructor.prototype.enforceFocus = function () {};
		$.ajax({
			type: 'POST',
			data: {
				json: JSON.stringify(json)
			},
			url: "../servlet/personalServlet?accion=ObtenerDataTrabajadorSinSede",
			dataType: 'JSON',
			success: function (data) {
				var td = ""
				if (data == "") {
					td = `<H1>no contiene registros<H1>`
				} else
				{
					document.getElementById("txtNombre").value=data.data[0][5]
					document.getElementById("Responsable").value=data.data[0][12]
                                        document.getElementById("Cargo").value=data.data[0][7]

$(".js-example-theme-single").select2({
  theme: "classic"
});

llenarSedes()}
}});});

}
function llenarSedes(){

return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: '../servlet/sedesServlet?accion=listarSedes',
				success: function (data, textStatus, jqXHR) {
					resolve(data)
					let printJson = ""
					//printJson +="<option value='9999!'>TODAS LAS SEDES</option>" 
					for (var i in data.data) {
						printJson += "<option value='" + data.data[i].CodEquipo + "'>" + data.data[i].Descripcion + "</option>";
					}
					
					$("#sedefaltantes").html(printJson);
					
				},
				error: function (jqXHR, textStatus, errorThrown) {
					reject('Error en la petición')
				}, complete: function () {

					var config = {
						'.chosen-select': {},
						'.chosen-select-deselect': {allow_single_deselect: true},
						'.chosen-select-no-single': {disable_search_threshold: 10},
						'.chosen-select-no-results': {no_results_text: 'Oops, nothing found!'},
						'.chosen-select-width': {width: "100%"}
					}
				for (var selector in config) {
					$(selector).chosen(config[selector]);
			}
				}
			})
		})}



function llenarsedesfaltantes(json)
{
	$.ajax({
		type: 'POST',
		data: {
			json: JSON.stringify(json)
		},
		url: "../servlet/personalServlet?accion=listarsedesfaltantes",
		dataType: 'JSON',
		success: function (data) {
			
			var td = ""
			if (data == "") {
				td = `<H1>no contiene registros<H1>`
			} else
			{
				let printJson = ""
				for (var i = 0; i < data.data.length; i++) {
					printJson += "<option value='" + data.data[i][1] + "'>" + data.data[i][2] + "</option>";
				}
				$("#sedefaltantes").html(printJson);
			}
		}});

}












function stopRKey(evt) {
var evt = (evt) ? evt : ((event) ? event : null);
var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
if ((evt.keyCode == 13) && (node.type=="text")) {return false;}
}
document.onkeypress = stopRKey; 

function ListarTrabajadores() {

	
	let json = ""
	
		
		json = {}
	$('#tbListadoPersonal').DataTable().destroy();
	$("#tbListadoPersonal").DataTable({
		"language": {
			"lengthMenu": "Mostrar: _MENU_",
			"zeroRecords": "&nbsp;&nbsp;&nbsp; No se encontraron resultados",
			"info": "&nbsp;&nbsp;&nbsp; Mostrando del _START_ al _END_ de un total de _TOTAL_ registros",
			"infoEmpty": "&nbsp;&nbsp;&nbsp; Mostrando 0 de 0 registros",
			"search": "Filtrar:",
			"processing": '<span style="width:100%;"><img src="../img/cargando.gif"  width="25%" height="25%"></span>',
			"paginate": {
				"first": "First",
				"last": "Last",
				"next": "Siguiente",
				"previous": "Anterior"
			}
		},
		dom: '<"datatable-scroll"t>r<"datatable-footers"ip>',
		"ajax": {
			type: 'POST',
			url: "../servlet/personalServlet?accion=listarPersonalSinSede",
			data:
				{
					json: JSON.stringify(json)

				}
		},
		"order": [],
		"responsive": true,
		"serverSide": true,
		"iDisplayLength": 50,
		"bSort": false,
		"bFilter": false,
		"processing": true,
		"aaSorting": [],
		"ordering": false,
		"bLengthChange": false,
		"bInfo": true,
		"paging": true,
		"columnDefs": [
			{targets: 0, orderable: false, width: "3%", className: "text-center"},
			{targets: 1, orderable: false, width: "11%", className: "text-center"},
			{targets: 2, orderable: false, width: "8%", className: "text-center"},
			{targets: 3, orderable: false, width: "18%", className: "text-left"},
			{targets: 4, orderable: false, width: "11%", className: "text-center"},

			{targets: 5, orderable: false, width: "13%", className: "text-left"},
			{targets: 6, orderable: false, width: "13%", className: "text-left"},
			{targets: 7, orderable: false, width: "7%", className: "text-center"},
			{targets: 8, orderable: false, width: "8%", className: "text-left"},
                        {targets: 9, orderable: false, width: "8%", className: "text-center"}
		],
		"columns": [
			{"data": "1", "render": (data, type, row) => {
					
					if (data === null) {
						return "sin fecha"
					} else {
						return data;
					}
				}
			}
			, {"data": "3", "render": (data, type, row) => {
					if (data === null) {
						return "sin fecha"
					} else {
						return data;
					}
				}
			},
			{"data": "4", "render": (data, type, row) => {
					if (data === null) {
						return "sin numero de doc"
					} else {
						return data.substr(2, 10);
					}
				}
			},
			{"data": "5", "render": (data, type, row) => {
					if (data === null) {
						return "sin nombre"
					} else {
						return data;
					}
				}
			},
			{"data": "6", "render": (data, type, row) => {
					if (data == 1) {
						return '<span class="label label-success">ACTIVO</span>'
					} else {
						return '<span class="label label-danger"> INACTIVO</span>';
					}
				}
			}, {"data": "7", "render": (data, type, row) => {
					if (data === null) {
						return "sin cargo"
					}
					if (data === "") {
						return "sin cargo"
					} else {
						return data;
					}
				}
			},{"data": "13", "render": (data, type, row) => {
					if (data === null) {
						return "sin autorizado"
					}
					if (data === "") {
						return "sin autorizado"
					} else {
						return data;
					}
				}
			}
			,{"data": "11", "render": (data, type, row) => {
					{
						if (data == "M")
							return '<img src="../img/administrativo.png" width="20px" height="20px" />'
						if (data == "?")
							return '<img src="../img/incognita.png" width="20px" height="20px" />'
						else {
							return '<img src="../img/huella.png"   width="20px" height="25px" />';

						}

					}
				}
			},{"data": "12", "render": (data, type, row) => {
					{
						if (data == null)
						return "SIN RESPONSABLE"
                                            if (data =="")
						return "SIN RESPONSABLE"
						else {
							return data;

						}

					}
				}
			},
			{"data": "6", "render": (data, type, row) => {
					let estado = ""
					let estiloojito = ""
					if (data == 1) {
						estado = "desactivar"
						estiloojito = "color:#4A4B4B;font-size:13px"
					} else {
						estado = "activar"
						estiloojito = "color:green;font-size:13px"
					}
					var actions = "";
					actions += `<a class="editarTrabajador" data-toggle="tooltip" data-placement="top" title="Actualizar Personal"><i style="color: #AB892D;font-size:17px;" class="fa fa-plus-square"></i></a>`
					return actions;
				}

			}
		],
		fnDrawCallback: () => {
//   loader.terminarLoader()
		}
	})
	$('#tbListadoPersonal').on('draw.dt', function () {
		$('[data-toggle="tooltip"]').tooltip();
	});
}

$('#tbListadoPersonal tbody').on('click', '.editarTrabajador', function () {
	var datos = $('#tbListadoPersonal').DataTable().row($(this).parents('tr')).data();
	codigo = datos[2];
        dni = datos[4];
	editarTrabajador(codigo,dni.substr(2, 10));
	
	$("#sedefaltantes").select2();
	
	$(".js-example-basic-multiple").select2({
		placeholder: "SELECCIONÉ"
	});
	$(".js-example-basic-single").select2({
		tags: true,
			placeholder: "SELECCIONÉ"
	});
	$("#checkbox").click(function(){
    if($("#checkbox").is(':checked') ){
        $("#sedefaltantes > option").prop("selected","selected");
        $("#sedefaltantes").trigger("change");
    }else{
        $("#sedefaltantes > option").removeAttr("selected");
         $("#sedefaltantes").trigger("change");
     }
});

	
	

	$("#txtApePaterno").focusout(() => {
		let txtApePaterno = document.getElementById("txtApePaterno").value
//			toUpperCase
		let apellido_mayusculas = txtApePaterno.toUpperCase()
		$("#txtApePaterno").val(apellido_mayusculas)
	})

	$("#txtNombre").focusout(() => {
		let txtNombre = document.getElementById("txtNombre").value
//			toUpperCase
		let txtNombre_mayusculas = txtNombre.toUpperCase()
		$("#txtNombre").val(txtNombre_mayusculas)
	})
	$("#txtNombre").focusout(() => {
		let txtNombre = document.getElementById("txtNombre").value
//			toUpperCase
		let txtNombre_mayusculas = txtNombre.toUpperCase()
		$("#txtNombre").val(txtNombre_mayusculas)
	})


	$("#txtCargo").focusout(() => {
		let txtCargo = document.getElementById("txtCargo").value
//			toUpperCase
		let txtCargo_mayusculas = txtCargo.toUpperCase()
		$("#txtCargo").val(txtCargo_mayusculas)
	})




	$("#txtApeMaterno").focusout(() => {
		let txtApeMaterno = document.getElementById("txtApeMaterno").value
//			toUpperCase
		let txtApeMaterno_mayusculas = txtApeMaterno.toUpperCase()
		$("#txtApeMaterno").val(txtApeMaterno_mayusculas)
	})

	$('#txtApePaterno').on('input', function () {
		this.value = this.value.replace(/[^A-Za-z\s]/g, '');

	});
	$('#txtApeMaterno').on('input', function () {
		this.value = this.value.replace(/[^A-Za-z\s]/g, '');

	});

	$('#txtNombre').on('input', function () {
		this.value = this.value.replace(/[^A-Za-z\s]/g, '');

	});
	$('#txtCargo').on('input', function () {
		this.value = this.value.replace(/[^A-Za-z\s]/g, '');

	});




});


$('#tbListadoPersonal tbody').on('click', '.cambiarEstadoInactivo', function () {
	var datos = $('#tbListadoPersonal').DataTable().row($(this).parents('tr')).data();
	codigo = datos[2];
	let estadocambio = datos[6];
	if (estadocambio == 0)
	{
		estado = 1;
	} else {
		estado = 0;
	}
	cambio = 0;
	conformidad(estado, codigo);
});
$('#tbListadoPersonal tbody').on('click', '.programar', function () {
    
	var datos = $('#tbListadoPersonal').DataTable().row($(this).parents('tr')).data();
	codigo = datos[2];
	let estadocambio = datos[6];
	modificarProgramaciones(codigo)
	
	var checked = false;

$('.check-all').on('click',function(){

if(checked == false) {
$('.settings').prop('checked', true);
checked = true;
} else {
$('.settings').prop('checked', false);
checked = false;
}

});
	
	
});
$('#tbListadoPersonal tbody').on('click', '.listarprogramaciones', function () {
	var datos = $('#tbListadoPersonal').DataTable().row($(this).parents('tr')).data();
	codigo = datos[2];
	let estadocambio = datos[6];
	abrirListaSedes(codigo)
});




function actualizarPersonal(json) {
   
   jQuery.validator.addMethod("lettersonly", function (value, element) {
		return this.optional(element) || /^[a-zAZ_áéíóúñ\s]+$/i.test(value);
	}, "");
	var validator = $("#formularioEditar").validate({
		rules: {sedefaltantes: {
				required: true
			}
		}
	});
	var validador = validator.form()
	
	if (validador) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: '../servlet/personalServlet?accion=actualizarPersonalSinSede',
			dataType: "json",
			data: {
				json: JSON.stringify(json)
			}, success: function (data, textStatus, jqXHR) {
				resolve(data)
			},
			error: function (jqXHR, textStatus, errorThrown) {
				reject('Error en la petición')
			}
		})
	})
    }
}

function actualizarEmpleadoo(codigo,dni)
{
	let sedes
	if ($("#sedefaltantes").val() != null) {
		sedes = {
			sedes: $("#sedefaltantes").val()
		}
	} else {
		sedes = {
			sedes: []
		}
	}
	let json = {
		"codigo": codigo,
		"sede_personal": sedes
	}
       
        console.log(json)
	actualizarPersonal(json)
		.then(data => {
		
			if (data.status) {
                            bootbox.alert({

                headerClass: "modal-bg-success",
                        title: "<i class='ace-icon fa fa-tags white'></i> <span class='white' >Notificacion</span>",
                        size: "small",
                        message: "Sedes Asignadas exitosamente,programarlo en DICÓN y WEB de registro.",
                        buttons: {
                         
                           ok: {
                          label:"<i class='fa fa-check bigger-110' style='color:white'></i>&nbsp;<label style='color:white;font-size:11px;'>Aceptar</label>",
                           className: "btn-notify"
                            } ,
                        
                    },
                        callback: function (result){
                            var DNI = dni;
                      
                         localStorage.setItem("dni", DNI);
                                window.location = "listadoPersonal.jsp";
                                Limpiar()  
                            }
                        
                });
                        
                        
			} 
		})
}




function conformidad(estado, dni) {

	dialogo = bootbox.dialog({
		headerClass: "modal-bg-primary",
		title: "<i class='ace-icon fa fa-check-circle white'></i> <span class='white' >Confirmacion</span>",
		size: "small",
		message: "¿Está seguro de realizar el cambio de Estado?",
		buttons: {
			si: {
				label: "<i class='fa fa-check bigger-110'></i>&nbsp; Si",
				className: "btn-success",
				callback: function () {
					actualizarEstado(estado, dni);
					if (estado == 0) {
						alerta("Se desactivo correctamente")
					}else
					{
						alerta("Se activo correctamente")
					}					
					ListarTrabajadores()
				}
			},
			no: {
				label: "<i class='fa fa-times bigger-110'></i>&nbsp; No",
				className: "btn-danger",
				callback: function () {
				}
			}
		}
	});
}

function alerta(mensaje)
{	dialogo = bootbox.alert({
		headerClass: "modal-bg-success",
		title: "<i class='ace-icon fa fa-tags white'></i> <span class='white' >Notificacion</span>",
		size: "small",
		message: mensaje,
		buttons: {
			ok: {
				label: "<i class='fa fa-check bigger-110' style='color:white'></i>&nbsp;<label style='color:white;font-size:11px;'>Aceptar</label>",
				className: "btn-notify",
				callback: function () {

				}}}
	});	
}

function cargarformatofecha() {
	$(function () {
		$('.datepicker').datepicker({
			dateFormat: 'dd/mm/yy',
			beforeShowMonth: true,
//            showButtonPanel: true,
			changeMonth: true,
			changeYear: true,
			minDate: '-10Y', //-1M
			maxDate: '2Y', //1M
			inline: true,
			defaultDate: fecha()
		});

	});
	$.datepicker.regional['es'] = {
		closeText: 'Cerrar',
		prevText: '<Ant',
		nextText: 'Sig>',
		currentText: 'Hoy',
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
		dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
		dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
		dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['es']);
}


//actualiza el estado 
function  actualizarEstado(estado, codigo) {
	let json = {
		"codigo": codigo,
		"estado": estado
	}
	httpRequest.actualizarestado(json)
		.then(data => {
			
			if (data.status) {
//						document.getElementById("formAlumno").reset()
				//    $('#modal').modal('hide')
//						helpers.cargarTableEstudiante()
			} else {
			}
		})
}

function dibujartextarea() {
	
	let estadomotivo = document.getElementById("estadoMot").value
	if (estadomotivo == 2)
	{
		$("#contenedordetabla").html(`<div ">
                  <label>Motivo</label> 
                   <textarea class="form-control"  rows="2" style="border-color: rgb(54,138,67);" id="Motivo" required></textarea></div> `);
		$('#Motivo').on('input', function () {
			this.value = this.value.replace(/[^A-Za-z\s]/g, '');

		});

	} else {

		$("#contenedordetabla").html(``);
	}

}
  $( document ).ready(function() {
       $('#formulariolistado').removeAttr('class').attr('class', '');
                var animation ='flipInX'
                $('#formulariolistado').addClass('animated');
                $('#formulariolistado').addClass(animation);
                return false;
});
const DOMEvents = {
	init() {
		
		this.capturarIdSede()
		this.cambiadorvalidador()
		this.comprobarlocalstorage()

	},
	cambiadorvalidador() {
		
		$("#cbFiltro").change(() => {
			let filtro = document.getElementById("cbFiltro").value
			

			if (filtro === "1") {

				$("#divInputFiltro").html("<label>Apellido</label> <span class=\"text-danger\">(*)</span>\n\
                                    <div id=\"divInputFiltroTxt\">\n\
                                        <input type=\"text\" id=\"txtInputFiltro\" name=\"txtInputFiltro\" placeholder=\"\"  onkeypress=\"sololetra()\"  value=\"\" class=\"form-control\">\n\
                                    </div>");

			} else if (filtro === "2") {

				$("#divInputFiltro").html("<label>Sede</label> <span class=\"text-danger\">(*)</span>\n\
                                    <div id=\"divInputFiltroTxt\">\n\
                                        <select  id=\"selSedes\" name=\"selSedes\" placeholder=\"\"  value=\"\" class=\"form-control\">\n\
                                    </div>");

				return new Promise((resolve, reject) => {
					$.ajax({
						type: 'POST',
						url: '../servlet/sedesServlet?accion=listarSedes',
						success: function (data, textStatus, jqXHR) {
							resolve(data)
							
							let printJson = ""
							for (var i in data.data) {
								printJson += "<option value='" + data.data[i].CodEquipo + "'>" + data.data[i].Descripcion + "</option>";
							}


							$("#selSedes").html(printJson);
							

						},
						error: function (jqXHR, textStatus, errorThrown) {
							reject('Error en la petición')
						}, complete: function () {

							var config = {
								'.chosen-select': {},
								'.chosen-select-deselect': {allow_single_deselect: true},
								'.chosen-select-no-single': {disable_search_threshold: 10},
								'.chosen-select-no-results': {no_results_text: 'Oops, nothing found!'},
								'.chosen-select-width': {width: "100%"}
							}
//					for (var selector in config) {
//						$(selector).chosen(config[selector]);
//					}
						}
					})
				})

			} else if (filtro === "3") {
				$("#divInputFiltro").html("<label>N° Documento </label> <span class=\"text-danger\">(*)</span>\n\
                                    <div id=\"divInputFiltroTxt\">\n\
                                        <input type=\"text\" id=\"txtInputFiltro\" name=\"txtInputFiltro\" placeholder=\"\"  minlength=\"8\"  maxlength=\"8\" onkeypress=\"solonumero()\"   value=\"\" class=\"form-control\" >\n\
                                    </div>");
			} else if (filtro === "4") {
				$("#divInputFiltro").html("<div class=\"col-lg-6 col-md-6 col-sm-6\">\n\
<div class=\"form-group\" id=\"data_1\">\n\
<label>Fecha Inicio </label> <span class=\"text-danger\">(*)</span>\n\
                                     <i class=\"fa fa-calendar\"></i>\n\
                                        <input class=\"datepicker form-control\" type=\"text\" id=\"txtfechadesde\">\n\
                                    </div>\n\
																		</div>\n\
<div class=\"col-lg-6 col-md-6 col-sm-6\">\n\
<div class=\"form-group\" id=\"data_2\">\n\
<label>Fecha Fin </label> <span class=\"text-danger\">(*)</span>\n\
                                     <i class=\"fa fa-calendar\"></i>\n\
                                        <input class=\"datepicker form-control\" type=\"text\" id=\"txtfechahasta\">\n\
                                    </div>\n\
																		</div>");
				let f = new Date();
				let fechaactual = (f.getDate() + "/0" + (f.getMonth() + 1) + "/" + f.getFullYear())
				document.getElementById("txtfechadesde").value = fechaactual
				document.getElementById("txtfechahasta").value = fechaactual
				cargarformatofecha()
			} else {
				$("#divInputFiltro").html("<label>Todos</label> \n\
                                    <div id=\"divInputFiltroTxt\">\n\
                                        <input type=\"text\" id=\"txtInputFiltro\" name=\"txtNumDocumento\" placeholder=\"\"   value=\"\" class=\"form-control\">\n\
                                    </div>");
				document.getElementById("txtInputFiltro").disabled = true;


			}

//             let txtDni = document.getElementById("cbFiltro").value
//     }       alert(txtDni)

		})
	},comprobarlocalstorage(){	
		
		if(localStorage.getItem("dni")===null)
 {	
			ListarTrabajadores()
}else {
	 $("#divInputFiltro").html("<label>N° Documento </label> <span class=\"text-danger\">(*)</span>\n\
                                    <div id=\"divInputFiltroTxt\">\n\
                                        <input type=\"text\" id=\"txtInputFiltro\" name=\"txtInputFiltro\" placeholder=\"\"  minlength=\"8\"  maxlength=\"8\" onkeypress=\"solonumero()\"   value=\"\" class=\"form-control\" >\n\
                                    </div>");
			$("#cbFiltro").val(3);
			document.getElementById("txtInputFiltro").value=localStorage.getItem("dni")
			let dni=localStorage.getItem("dni")
			let json = {
		"dni": dni
	}
		
			
			$.ajax({
			type: 'POST',
			data: {
				json: JSON.stringify(json)
			},
			url: "../servlet/personalServlet?accion=ObtenerfiltroXdni",
			dataType: 'JSON',
			success: function (data) {
                            
		$("#estadoPro").val(data.data[0][4]);
		$("#cbEstado").val(data.data[0][3]);
		ListarTrabajadores()
		
			}});
			
			
			
			
			localStorage.removeItem("dni");
	}
}
	,
	capturarIdSede() {
		$('#selSedes').on('change', function () {
			idSedes = $(this).val();
			
		});
	},
	validarSoloNumeros() {
		$("#txtNumDocumento").keypress((e) => {
			return funciones.soloNumeros(event);
		});
	},
	EstadoEvento() {
	},
	cargarSelect() {
		ListarTrabajadores()
	},
	InsertarPersonas() {
		$("#btnRegistrar").click(() => {
			validarCampos();
		})
	}


	//,	InsertarxEquipoPersonal() {
	//		let txtNumDocumento = document.getElementById("txtNumDocumento").value
	//		let sede = document.getElementById("selSedes").value
	//		let estado = 1;
	//		let horaActual = new Date();

	//		let json = {
	//		"dni_personal": txtNumDocumento,
	//			"sede_personal": sede
	//	}
	//	httpRequest.insertarPersonalSede(json)
	//		.then(data => {
	//			console.log(data);
	//		if (data.status) {
	//			alert(data.message)
//						document.getElementById("formAlumno").reset()
//						$('#modal').modal('hide')
//						helpers.cargarTableEstudiante()
	//		} else {
	//		alert(data.message)
	//	}
	//	})


//	}




}


//const iniciarPeticiones = {
//
//	cargarSedes() {
//		httpRequest.listarSedes()
//			.then(data => {
//				console.log("inicia la peticion")
//				console.log("la data llega "+data +"aaaa")
//				let print = ''
//				if (data.status) {
//					alert("llego en true el estado")
//				} else {
//					print = '<option>No hay datos disponibles</option>'
//				}
//				$('#divSede').html(print)
//			})
//	}


init = () => {

	DOMEvents.init();
	SetElements.init();

}


init()




