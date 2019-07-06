
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
 listarSedes()
	{

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
function stopRKey(evt) {
var evt = (evt) ? evt : ((event) ? event : null);
var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
if ((evt.keyCode == 13) && (node.type=="text")) {return false;}
}
document.onkeypress = stopRKey; 

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





function sololetra() {
	$('#txtInputFiltro').on('input', function () {
			this.value = this.value.replace(/[^A-Za-z-ñÑ\s]/g, '');

	});
}

function limpiartrabajadores() {
	$("#cbFiltro").val(4);
	$("#cbEstado").val(0);
	$("#estadoPro").val(0);
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
	ListarTrabajadores()
}


$( document ).ready(function() {
       $('#formulariolistado').removeAttr('class').attr('class', '');
                var animation ='flipInX'
                $('#formulariolistado').addClass('animated');
                $('#formulariolistado').addClass(animation);
                return false;
});

function ListarTrabajadores() {
	
	let cambiodetipo = document.getElementById("cbFiltro").value
	let json = ""
	if (cambiodetipo == 2) {
		let nombre = ""
		let cbfiltro = document.getElementById("cbFiltro").value
		//		let FechaDesde =document.getElementById("txtfechadesde").value
		let FechaDesde = ""
		//let FechaHasta =document.getElementById("txtfechahasta").value
		let FechaHasta = ""
		let Sedes = document.getElementById("selSedes").value
		let cbModoMarcacion = document.getElementById("cbModoMarcacion").value
	
		let cbEstado = document.getElementById("cbEstado").value
		json = {
			"busqueda": nombre,
			"cbfiltro": cbfiltro,
			"fechadesde": FechaDesde,
			"fechahasta": FechaHasta,
			"cbEstado": cbEstado,
			"sedes": Sedes,
			"cbModoMarcacion":cbModoMarcacion
		
		}
	} else if (cambiodetipo == 3) {
		let nombre = document.getElementById("txtInputFiltro").value
		let cbfiltro = document.getElementById("cbFiltro").value
		let cbModoMarcacion = document.getElementById("cbModoMarcacion").value
//		let FechaDesde =document.getElementById("txtfechadesde").value
		let FechaDesde = ""
		//let FechaHasta =document.getElementById("txtfechahasta").value
		let FechaHasta = ""
		let Sedes = ""
		
		let cbEstado = document.getElementById("cbEstado").value
		json = {
			"busqueda": nombre,
			"cbfiltro": cbfiltro,
			"fechadesde": FechaDesde,
			"fechahasta": FechaHasta,
			"cbEstado": cbEstado,
			"sedes": Sedes,
			"cbModoMarcacion":cbModoMarcacion
		}
	} else if (cambiodetipo == 0) {
		let nombre = ""
		let cbfiltro = document.getElementById("cbFiltro").value
		let cbModoMarcacion = document.getElementById("cbModoMarcacion").value
//		let FechaDesde =document.getElementById("txtfechadesde").value
		let FechaDesde = ""
		//let FechaHasta =document.getElementById("txtfechahasta").value
		let FechaHasta = ""
		let Sedes = ""
		
		let cbEstado = document.getElementById("cbEstado").value
		json = {
			"busqueda": nombre,
			"cbfiltro": cbfiltro,
			"fechadesde": FechaDesde,
			"fechahasta": FechaHasta,
			"cbEstado": cbEstado,
			"sedes": Sedes,
			"cbModoMarcacion":cbModoMarcacion
		}
		
	} else if (cambiodetipo == 1) {
		let nombre = document.getElementById("txtInputFiltro").value
		let cbfiltro = document.getElementById("cbFiltro").value
		let cbModoMarcacion = document.getElementById("cbModoMarcacion").value
//		let FechaDesde =document.getElementById("txtfechadesde").value
		let FechaDesde = ""
		//let FechaHasta =document.getElementById("txtfechahasta").value
		let FechaHasta = ""
		let Sedes = ""
		
		let cbEstado = document.getElementById("cbEstado").value
		json = {
			"busqueda": nombre,
			"cbfiltro": cbfiltro,
			"fechadesde": FechaDesde,
			"fechahasta": FechaHasta,
			"cbEstado": cbEstado,
			"sedes": Sedes,
			"cbModoMarcacion":cbModoMarcacion
		}
	} 
	else if (cambiodetipo == 4) {
		
		let nombre = ""
		let cbfiltro = document.getElementById("cbFiltro").value
		let cbModoMarcacion = document.getElementById("cbModoMarcacion").value
//		let FechaDesde =document.getElementById("txtfechadesde").value
		let FechaDesde = $('#txtfechadesde').val().split("/").reverse().join("-")
		//let FechaHasta =document.getElementById("txtfechahasta").value
		let FechaHasta = $('#txtfechahasta').val().split("/").reverse().join("-")
		let Sedes = "";
		
		let cbEstado = document.getElementById("cbEstado").value
		json = {
			"busqueda": nombre,
			"cbfiltro": cbfiltro,
			"fechadesde": FechaDesde,
			"fechahasta": FechaHasta,
			"cbEstado": cbEstado,
			"sedes": Sedes,
			"cbModoMarcacion":cbModoMarcacion
			
		}
	
		
		
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
			url: "../servlet/personalServlet?accion=reporteProgramacion",
			data:
				{
					json: JSON.stringify(json)

				}
		},
		"bSort": false,
		"bFilter": false,
		"serverSide": true,
		"processing": true,
		"aaSorting": [],
		"ordering": false,
		"bLengthChange": false,
		"bInfo": true,
		"paging": true,
		"iDisplayLength": 50,
		"columnDefs": [
			{targets: 0, orderable: false, width: "3%", className: "text-center"},
			{targets: 1, orderable: false, width: "8%", className: "text-center"},
			{targets: 2, orderable: false, width: "17%", className: "text-left"},
			{targets: 3, orderable: false, width: "7%", className: "text-left"},
			{targets: 4, orderable: false, width: "5%", className: "text-center"},

			{targets: 5, orderable: false, width: "10%", className: "text-center"},
			{targets: 6, orderable: false, width: "12%", className: "text-center"},
			{targets: 7, orderable: false, width: "12%", className: "text-center"},
			{targets: 8, orderable: false, width: "10%", className: "text-center"},
			{targets: 9, orderable: false, width: "15%", className: "text-left"}
		],
		"columns": [
			{"data": "1", "render": (data, type, row) => {
					
					if (data === null) {
						return "sin orden"
					} else {
						return data;
					}
				}
			}
			, {"data": "2", "render": (data, type, row) => {
					if (data === null) {
						return "sin dni"
					} else {
						return data.substr(2, 10);
					}
				}
			},
			{"data": "4", "render": (data, type, row) => {
					if (data === null) {
						return "sin nombre"
					} else {
						return data;
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
			},{"data": "11", "render": (data, type, row) => {
					if (data == 1) {
						return '<span class="label label-success">ACTIVO</span>'
					} else {
						return '<span class="label label-danger"> INACTIVO</span>';
					}
				}
			},
			{"data": "3", "render": (data, type, row) => {
					
						return data 
				}
			}, {"data": "6", "render": (data, type, row) => {
					if (data === null) {
						return "sin sede"
					}
					if (data === "") {
						return "sin sede"
					} else {
						return data;
					}
				}
			},
			{"data": "7", "render": (data, type, row) => {
					if (data == 1) {
						return '<span class="label label-primary">PROGRAMADO</span>';
					}
					if (data == null) {
						return '<span class="label label-danger">NO PROGRAMADO</span>'
					} else {
					return '<span class="label label-danger">NO PROGRAMADO</span>'
					}
				}
			}, {"data": "10", "render": (data, type, row) => {
					{
					if (data == "M")
							return '<img src="../img/administrativo.png" width="20px" height="20px" />'
						if (data == "N")
							return '<img src="../img/incognita.png" width="20px" height="20px" />'
						if (data == "?"){
						return '<img src="../img/incognita.png" width="20px" height="20px" />'

						}if (data == "H"){
						return '<img src="../img/huella.png" width="20px" height="20px" />'

						}

					}
				}
			},{"data": "9", "render": (data, type, row) => {
					if(data==null){
					return '<a  class="validarweb" style="font-size:14px;" href="listadoPersonal.jsp">Falta validar web</a>'
					}if(data==""){
						return '<a class="validarweb" style="font-size:14px;" "href="listadoPersonal.jsp">Falta validar web</a>'
					}else	{	
                return data
					}
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


$('#tbListadoPersonal tbody').on('click', '.validarweb', function () {
	var datos = $('#tbListadoPersonal').DataTable().row($(this).parents('tr')).data();
	codigo = datos[2].substr(2, 10);
localStorage.setItem("dni",codigo);
});










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
                this.fechaactual()
                this.comprobarlocalstorage()
    
	},fechaactual(){
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
				
	},comprobarlocalstorage(){	
		if(localStorage.getItem("dniGeneral")===null)
 {		ListarTrabajadores()
}else {
	 $("#divInputFiltro").html("<label>N° Documento </label> <span class=\"text-danger\">(*)</span>\n\
                                    <div id=\"divInputFiltroTxt\">\n\
                                        <input type=\"text\" id=\"txtInputFiltro\" name=\"txtInputFiltro\" placeholder=\"\"  minlength=\"8\"  maxlength=\"8\" onkeypress=\"solonumero()\"   value=\"\" class=\"form-control\" >\n\
                                    </div>");
			$("#cbFiltro").val(3);
			document.getElementById("txtInputFiltro").value=localStorage.getItem("dniGeneral")
			let dni=localStorage.getItem("dniGeneral")
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

				
	
		$("#cbModoMarcacion").val(data.data[0][5]);
                
		
		ListarTrabajadores()
		
			}});
			
			
			$("#cbEstado").val(1);
			
			localStorage.removeItem("dniGeneral");
	}
},	cambiadorvalidador() {
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
//            alert(txtDni)

		})
	},
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
			let f = new Date();
				let fechaactual = (f.getDate() + "/0" + (f.getMonth() + 1) + "/" + f.getFullYear())
				document.getElementById("txtfechadesde").value = fechaactual
				document.getElementById("txtfechahasta").value = fechaactual
				cargarformatofecha()
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




