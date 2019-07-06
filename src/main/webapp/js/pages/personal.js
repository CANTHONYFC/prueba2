
var idSedes = []

//$('#txtNumDocumento').tooltip();
$('[data-toggle="tooltip"]').tooltip();

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
	,listarAutorizados()
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
	},listarCargos()
	{
		return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: '../servlet/sedesServlet?accion=listarCargos',
				success: function (data, textStatus, jqXHR) {
					resolve(data)
					let printJson = ""
					printJson += "<option value=''>SELECCIONÉ</option>";
					for (var i in data.data) {
					
						printJson += "<option value='" + data.data[i].id + "'>" + data.data[i].descripcion+"</option>";
					}
		
					$("#txtCargo").html(printJson);
					
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
	},
	listarSedes()
	{
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
//				for (var selector in config) {
//					$(selector).chosen(config[selector]);
//			}
				}
			})
		})
	}, fechaactual()
	{
		let f = new Date();
		let fechaactual = (f.getDate() + "" + (f.getMonth() + 1) + "/" + f.getFullYear())
		document.getElementById("txtfechadesde").value = fechaactual
	}
	,
	insertarPersonal(json) {
		
		return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: '../servlet/personalServlet?accion=insertarPersonal',
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
	},InsertarPersonalSinSede(json){
		
		return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: '../servlet/personalServlet?accion=InsertarPersonalSinSede',
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
		$('#txtNumDocumento').on('input', function () {
			this.value = this.value.replace(/[^0-9]/g, '');

		});
	}, validateLetter() {
		$('#txtApePaterno').on('input', function () {
			this.value = this.value.replace(/[^A-Za-z-ñÑ\s]/g, '');

		});

		$('#txtApeMaterno').on('input', function () {
			this.value = this.value.replace(/[^A-Za-z-ñÑ\s]/g, '');

		});
		$('#txtNombres').on('input', function () {
			this.value = this.value.replace(/[^A-Za-z\s]/g, '');

		});
		$('#txtCargo').on('input', function () {
			this.value = this.value.replace(/[^A-Za-z\s]/g, '');

		});
	}
}
var dni, cambio, tipoTrabajador, dniBuscar = "";
function solonumero() {
	$('#txtInputFiltro').on('input', function () {
		this.value = this.value.replace(/[^0-9]/g, '');
	});
}
function sololetra() {
	$('#txtInputFiltro').on('input', function () {
		this.value = this.value.replace(/[^a-z]/g, '');
	});
}
$("#checkbox").click(function(){
    if($("#checkbox").is(':checked') ){
        $("#selSedes > option").prop("selected","selected");
        $("#selSedes").trigger("change");
    }else{
        $("#selSedes > option").removeAttr("selected");
         $("#selSedes").trigger("change");
     }
});

function validarCampos() {
	jQuery.validator.addMethod("lettersonly", function (value, element) {
		return this.optional(element) || /^[a-zAZ_áéíóúñ\s]+$/i.test(value);
	}, "");
	var validator = $("#formularioPersonal").validate({
		rules: {txtNumDocumento: {
				required: true
			},
			txtApePaterno: {
				required: true,
				lettersonly: true
			}, txtApeMaterno: {
				required: true,
				lettersonly: true
			}, txtNombres: {
				required: true,
				lettersonly: true
			}, txtCargo: {
				required: true
			}, txtEstado: {
				required: true
			},cboAutorizado: {
				required: true
			}
		}
	});
	var validador = validator.form()
	var cboSede = $("#selSedes").val();
//		if (validador && $("#selSedes").val() != null) {   
	if (validador) {
            if ($("#selSedes").val() != null) { 
		DOMEvents.InsertarPersonal()
                bootbox.alert({

                headerClass: "modal-bg-success",
                        title: "<i class='ace-icon fa fa-tags white'></i> <span class='white' >Notificacion</span>",
                        size: "small",
                        message: "Usuario registrado exitosamente,programarlo en DICÓN y WEB de registro.",
                        buttons: {
                         
                           ok: {
                          label:"<i class='fa fa-check bigger-110' style='color:white'></i>&nbsp;<label style='color:white;font-size:11px;'>Aceptar</label>",
                           className: "btn-notify"
                            } ,
                        
                    },
                        callback: function (result){
                            var DNI = document.getElementById("txtNumDocumento").value;
                      
                         localStorage.setItem("dni", DNI);
                                window.location = "listadoPersonal.jsp";
                                Limpiar()  
                            }
                        
                }); }else {
                
                bootbox.confirm({
        headerClass: "modal-bg-primary",
                title: "<i class='ace-icon fa fa-check-circle white'></i> <span class='white' >Confirmacion</span>",
                size: "small",
                message: "Esta seguro de registrar un personal sin sede? ",
                buttons: {
                confirm: {
                className: "btn btn-success",
                        label: '<i class="fa fa-check"></i> Confirmar'
                },
                        cancel: {
                        className: "btn btn-danger",
                                label: '<i class="fa fa-times"></i> Cancelar'
                        }
                },
                callback: function (result) {
                if (result) {
                    DOMEvents.InsertarPersonalSinSede()
alerta("Usuario registrado exitosamente")
Limpiar()
               
                } else
                {
                $('#selSedes').select2('open');
                }
                }
        });
  }} else {
		$('#selSedes').parent().append(document.getElementById('selSedes-error'))
		$('#txtCargo').parent().append(document.getElementById('txtCargo-error'))
		$('#cboAutorizado').parent().append(document.getElementById('cboAutorizado-error'))}}

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

function cargarformatofecha()
{
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
function setnombre() {

			return window.nombreUsuario;
	}
	function stopRKey(evt) {
var evt = (evt) ? evt : ((event) ? event : null);
var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
if ((evt.keyCode == 13) && (node.type=="text")) {return false;}
}
document.onkeypress = stopRKey;
function Limpiar()
{
	document.getElementById("txtNumDocumento").value = ""
	document.getElementById("txtApePaterno").value = ""
	document.getElementById("txtApeMaterno").value = ""
	document.getElementById("txtNombres").value = ""
	
	document.getElementById("txtDisplay").value = ""
	$('#selSedes').val(''); // codigo para limpiar un select 2
		$('#cboAutorizado').val('');

	$('#selSedes').trigger('change');

	$('#cboAutorizado').trigger('change');
	
}
const DOMEvents = {
	init() {
		this.validarDni()
		this.cargarSelect()
		this.capturarIdSede()
		this.nombreCompleto()
		this.textoMayusculasApePaterno()
		this.textoMayusculasApeMaterno()
		this.textoMayusculasNombres()
		this.textoMayusculasCargo()
		
	}
	,capturarIdSede() {
		$('#selSedes').on('change', function () {
			idSedes = $(this).val();
			
		});
	}
	, validarDni() {
		$("#txtNumDocumento").focusout(() => {
		let txtDni = document.getElementById("txtNumDocumento").value
		if (txtDni == "") {
		} else {
		let jSon = {
					"dniPersonal": txtDni
		}
		if (txtDni.length <= 0 && txtDni.length > 7 && txtDni.length < 9) {
					
		} else {
				httpRequest.validarPersonal(jSon)
					.then(data => {
					if (data.status) {
				let estado = data.message
								
						if (data.data.length > 0) {
						if (estado == 0) {
					bootbox.confirm({
						 headerClass: "modal-bg-primary",
					title: "<i class='ace-icon fa fa-check-circle white'></i> <span class='white' >Confirmacion</span>",
						size: "small",
					message: "Usuario ya registrado e inactivo \n\
	           ¿Desea activar al usuario?",
					buttons: {
						confirm: {
									className: "btn btn-primary",
								label: '<i class="fa fa-check"></i> Confirmar'
						},
							cancel: {
							className: "btn btn-default",
								label: '<i class="fa fa-times"></i> Cancelar'
							}
						},
					callback: function (result) {
				if (result) {
													
					var DNI = document.getElementById("txtNumDocumento").value;
							/*Guardando los datos en el LocalStorage*/
							localStorage.setItem("dni", DNI);
				window.location= "listadoPersonal.jsp";
						Limpiar()
					} else
				{
													Limpiar()
								}
						}
					});
				}else
				{
					bootbox.confirm({
                    headerClass: "modal-bg-primary",
											title: "<i class='ace-icon fa fa-check-circle white'></i> <span class='white' >Confirmacion</span>",
											size: "small",
										message: "Usuario ya registrado y  Activo\n\
                             ¿Desea Asignarle una Programacion",
											buttons: {
													confirm: {
															className: "btn-success",
													label: '<i class="fa fa-check"></i> Confirmar'
												},
												cancel: {
													className: "btn btn-danger",
													label: '<i class="fa fa-times"></i> Cancelar'
												}
										
											},
											callback: function (result) {
												if (result) {
													var DNI = document.getElementById("txtNumDocumento").value;
													/*Guardando los datos en el LocalStorage*/
													localStorage.setItem("dni", DNI);
                             Limpiar()
													window.location= "listadoPersonal.jsp";
													
												} else
												{	Limpiar()
												}
											}
										})
									}	
								} else {
								}
							} else {
							}
						})
				}
			}
		}
		);
	},
	textoMayusculasApePaterno() {
		$("#txtApePaterno").focusout(() => {
			let txtApePaterno = document.getElementById("txtApePaterno").value
//			toUpperCase
			let apellido_mayusculas = txtApePaterno.toUpperCase()
			$("#txtApePaterno").val(apellido_mayusculas)
		})
	},
	textoMayusculasApeMaterno() {
		$("#txtApeMaterno").focusout(() => {
			let txtApeMaterno = document.getElementById("txtApeMaterno").value
			let apellido_mayusculas = txtApeMaterno.toUpperCase()
			$("#txtApeMaterno").val(apellido_mayusculas)
			let txtDni = document.getElementById("txtNumDocumento").value
			
		})
	},
	textoMayusculasNombres() {
		$("#txtNombres").focusout(() => {
			let txtNombres = document.getElementById("txtNombres").value
			let nombre_mayusculas = txtNombres.toUpperCase()
			$("#txtNombres").val(nombre_mayusculas)
		})
	},
	textoMayusculasCargo() {
		$("#txtCargo").focusout(() => {
			let txtCargo = document.getElementById("txtCargo").value
			let cargo_mayusculas = txtCargo.toUpperCase()
			$("#txtCargo").val(cargo_mayusculas)
		})},
	validarSoloNumeros() {
		$("#txtNumDocumento").keypress((e) => {
			return funciones.soloNumeros(event);
		});
	},
	EstadoEvento() {
	},
	nombreCompleto() {
		$("#txtNombres").focusout(() => {
			let txtApePaterno = document.getElementById("txtApePaterno").value
			let nombres = document.getElementById("txtNombres").value
			let txtDisplay = document.getElementById("txtDisplay").value
			let nombreMayuscula
			nombreMayuscula = nombres.toUpperCase()
			let primeraLetra = nombreMayuscula.charAt(0)
			$("#txtDisplay").val(primeraLetra + "." + txtApePaterno)
		})
	},cargarSelect() {
		$("#selSedes").select2()
	},InsertarPersonalSinSede() {
		let txtNumDocumento = document.getElementById("txtNumDocumento").value
		let txtApePaterno = document.getElementById("txtApePaterno").value
		let txtApeMaterno = document.getElementById("txtApeMaterno").value
		let txtNombres = document.getElementById("txtNombres").value
		let txtDisplay = document.getElementById("txtDisplay").value
		let cboAutorizado = document.getElementById("cboAutorizado").value
		let usuarioEncargado=setnombre()
		let estado = 1;
		let horaActual = new Date();

		let json = {
			"dni_personal": txtNumDocumento,
			"nombre_personal": txtNombres,
			"apellido_paterno": txtApePaterno,
			"apellido_materno": txtApeMaterno,
			"estado_personal": estado,
			"nombre_completo": txtDisplay,
			"fecha_registro": horaActual,
			 "usuarioEncargado": usuarioEncargado,
			 "cboAutorizado":cboAutorizado
		}
		httpRequest.InsertarPersonalSinSede(json)
			.then(data => {
				
				if (data.status) {
//					
//						
				} else {
				
				}})
	},
	InsertarPersonal() {

		let txtNumDocumento = document.getElementById("txtNumDocumento").value
		let txtApePaterno = document.getElementById("txtApePaterno").value
		let txtApeMaterno = document.getElementById("txtApeMaterno").value
		let txtNombres = document.getElementById("txtNombres").value
		let txtDisplay = document.getElementById("txtDisplay").value
	
		
		let cboAutorizado = document.getElementById("cboAutorizado").value
		let usuarioEncargado=setnombre()
		let sedes = {
			sedes: $("#selSedes").val()
		}
		let estado = 1;
		let horaActual = new Date();

		let json = {
			"dni_personal": txtNumDocumento,
			"nombre_personal": txtNombres,
			"apellido_paterno": txtApePaterno,
			"apellido_materno": txtApeMaterno,
			"estado_personal": estado,
			"nombre_completo": txtDisplay,
			"fecha_registro": horaActual,
			"sede_personal": sedes,
			 "usuarioEncargado": usuarioEncargado,
			 "cboAutorizado":cboAutorizado
		}
		httpRequest.insertarPersonal(json)
			.then(data => {
				
				if (data.status) {
//						document.getElementById("formAlumno").reset()
					//    $('#modal').modal('hide')
//						helpers.cargarTableEstudiante()
				} else {
								
				}})
	}, InsertarPersonas() {
		$("#btnRegistrar").click(() => {
			validarCampos();
		})}
}

init = () => {
	
	httpRequest.listarSedes();
	
			httpRequest.listarAutorizados();
	DOMEvents.init();
	SetElements.init();

}


init()




