
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
	listarAutorizados()
	{
		return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: '../servlet/sedesServlet?accion=listarAutorizados',
				success: function (data, textStatus, jqXHR) {
					resolve(data)
					let printJson = ""
					printJson += "<option value=''>SELECCIONÉ</option>";
					for (var i in data.data) {
					
						printJson += "<option value='" + data.data[i].ID + "'>" + data.data[i].apePat+" - "+ data.data[i].Nombre + "</option>";
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
					$("#cboAutorizado").html(printJson);
					
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
		
			ListarTrabajadores();
		


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



function nombrecompleto() {


	let txtApePaterno = document.getElementById("txtApePaterno").value
	let nombres = document.getElementById("txtNombre").value
	let txtDisplay = document.getElementById("txtDisplay").value
	let nombreMayuscula
	nombreMayuscula = nombres.toUpperCase()
	let primeraLetra = nombreMayuscula.charAt(0)
	$("#txtDisplay").val(primeraLetra + "." + txtApePaterno)


}

  
					


function stopRKey(evt) {
var evt = (evt) ? evt : ((event) ? event : null);
var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
if ((evt.keyCode == 13) && (node.type=="text")) {return false;}
}
document.onkeypress = stopRKey; 
function ListarTrabajadores() {

	let cambiodetipo = document.getElementById("cbFiltro").value
	let json = ""
	if (cambiodetipo == 2) {
		
		let nombre = ""
		let cbfiltro = document.getElementById("cbFiltro").value
		let cboAutorizado = document.getElementById("cboAutorizado").value
		json = {
			"busqueda": nombre,
                        "cbfiltro":cbfiltro,
                        "cboAutorizado":cboAutorizado}
	} 
       else if (cambiodetipo == 3) {
		
		let nombre = document.getElementById("txtInputFiltro").value
		let cbfiltro = document.getElementById("cbFiltro").value
		let cboAutorizado=""
		//let cboAutorizado = document.getElementById("cboAutorizado").value
		json = {
			"busqueda": nombre,
                        "cbfiltro":cbfiltro,
                        "cboAutorizado":cboAutorizado}
	} else if (cambiodetipo == 1) {
		
		let nombre = document.getElementById("txtInputFiltro").value
		let cbfiltro = document.getElementById("cbFiltro").value
		let cboAutorizado=""
		//let cboAutorizado = document.getElementById("cboAutorizado").value
		json = {
			"busqueda": nombre,
                        "cbfiltro":cbfiltro,
                        "cboAutorizado":cboAutorizado}
	} else
	{
		
		let nombre = ""
		let cbfiltro = document.getElementById("cbFiltro").value
		let cboAutorizado=""
		//let cboAutorizado = document.getElementById("cboAutorizado").value
		json = {
			"busqueda": nombre,
                        "cbfiltro":cbfiltro,
                        "cboAutorizado":cboAutorizado}
	} 
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
			url: "../servlet/personalServlet?accion=listarGeneral",
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
			{targets: 1, orderable: false, width: "7%", className: "text-center"},
			{targets: 2, orderable: false, width: "13%", className: "text-left"},
			{targets: 3, orderable: false, width: "10%", className: "text-center"},
			{targets: 4, orderable: false, width: "11%", className: "text-left"},

			{targets: 5, orderable: false, width: "13%", className: "text-left"},
			{targets: 6, orderable: false, width: "10%", className: "text-center"},
			{targets: 7, orderable: false, width: "13%", className: "text-left"},
                        	{targets: 8, orderable: false, width: "8%", className: "text-center"},
			{targets: 9, orderable: false, width: "7%", className: "text-center"}
                       
		],
		"columns": [
                    {"data": "1", "render": (data, type, row) => {
						return data;
					
				}
			},
			{"data": "4", "render": (data, type, row) => {
					
					if (data === null) {
						return "sin dni"
					} else {
						return data;
					}
				}
			},{"data": "5", "render": (data, type, row) => {
					
					if (data === null) {
						return "sin nombre"
					} else {
						return data;
					}
				}
			},{"data": "6", "render": (data, type, row) => {
					
					if (data == 1) {
						return '<span class="label label-success">ACTIVO</span>'
					} else {
						return '<span class="label label-danger"> INACTIVO</span>';
					}
				}
			},{"data": "7", "render": (data, type, row) => {
					
					if (data === null) {
						return "sin cargo"
					} else {
						return data;
					}
				}
			},{"data": "10", "render": (data, type, row) => {
					
					if (data === null) {
						return "sin responsable"
					} else {
						return data;
					}
				}
			},{"data": "3", "render": (data, type, row) => {
					
					if (data === null) {
						return "sin fecha"
					} else {
						return data;
					}
				}
			},{"data": "11", "render": (data, type, row) => {
					
					if (data === null) {
						return "sin responsable"
					} else {
						return data;
					}
				}
			},{"data": "12", "render": (data, type, row) => {
					
					if (data == "M")
							return '<img src="../img/administrativo.png" width="20px" height="20px" />'
						if (data == "?")
							return '<img src="../img/incognita.png" width="20px" height="20px" />'
						else {
							return '<img src="../img/huella.png"   width="20px" height="25px" />';

						}
				}
			}
			,
			{"data": "6", "render": (data, type, row) => {
					
					let estiloojito = ""
					
					var actions = "";
					actions += ` <a class="detalleprogramacion" data-toggle="tooltip" data-placement="top" title="Ver detalle de programacion"><i style="font-size:17px" class="fa fa-eye"></i></a>&nbsp;&nbsp;&nbsp;`
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


$('#tbListadoPersonal tbody').on('click', '.detalleprogramacion', function () {
	var datos = $('#tbListadoPersonal').DataTable().row($(this).parents('tr')).data();
	codigo = datos[4];
       localStorage.setItem("dniGeneral",codigo);
window.location.href = 'reporteProgramacion.jsp';
});



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



const DOMEvents = {
	init() {
		
		this.capturarIdSede()
		this.cambiadorvalidador()
		this.cargarSelect()

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

				$("#divInputFiltro").html("<label>Personal que autorizo</label> <span class=\"text-danger\">(*)</span>\n\
                                    <div id=\"divInputFiltroTxt\">\n\
                                        <select  id=\"cboAutorizado\" name=\"cboAutorizado\" placeholder=\"\"  value=\"\" class=\"form-control\">\n\
                                    </div>");

				return new Promise((resolve, reject) => {
$.ajax({
				type: 'POST',
				url: '../servlet/sedesServlet?accion=listarAutorizados',
				success: function (data, textStatus, jqXHR) {
					resolve(data)
					let printJson = ""
					
					for (var i in data.data) {
					
						printJson += "<option value='" + data.data[i].ID + "'>" + data.data[i].apePat+" - "+ data.data[i].Nombre + "</option>";
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
					$("#cboAutorizado").html(printJson);
					
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
	},capturarIdSede() {
		$('#selSedes').on('change', function () {
			idSedes = $(this).val();
			
		});
	},
	validarSoloNumeros() {
		$("#txtNumDocumento").keypress((e) => {
			return funciones.soloNumeros(event);
		});
	},
	cargarSelect() {
		ListarTrabajadores()
	},
	InsertarPersonas() {
		$("#btnRegistrar").click(() => {
			validarCampos();
		})
	}





}




init = () => {

	DOMEvents.init();
	SetElements.init();

}


init()




