
$('[data-toggle="tooltip"]').tooltip();
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
	}}

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
		}}
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


function mensajeActualizarPregunta(obj, cb) {

	let json = {
		"cadenaCheck": obj.cadenaCheck,
		"codigoTrabajador": obj.codTrabajador,
		"cadenaUncheck": obj.cadenaUnCheck,
		"usuarioEncargado": obj.usuarioEncargado
	}
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../servlet/personalServlet?accion=programarSedesHuella",
			data: {
				json: JSON.stringify(json)
			},
			success: function (result) {
				ConfirmacionPopUpTablaListaSedes();
				return cb(result);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
		$(this).dialog("close");
	})
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

function editarTrabajador(codigoTrabajador)
{
	let codigo = codigoTrabajador
	let json = {
		"codigo": codigo
	}
	var listar = bootbox.dialog({
		headerClass: "blue-bg",
		title: "Actualizar Personal",
		tabindex: null,
		size: "large",
		message: `
		<div id="contgenerarcodigo">
<form id="formularioEditar" oncopy="return false" oncut="return false" onpaste="return false" novalidate="novalidate">
	             <div class="row">
	              <div style="margin-left:" class="col-sm-6">
              <div class="form-group">
								<label>Nombre: </label> <span style="color:red;">(*)</span>
							 <input type="text" id="txtNombre"  maxlength="100" name="txtNombre" onfocusout="nombrecompleto()"  placeholder="" class="form-control" ">
</div>
</div>			
<div class="col-sm-6">
<div class="form-group">
<label>Apellido Paterno: </label> <span style="color:red;">(*)</span>
<input type="text" id="txtApePaterno"  maxlength="100" name="txtApePaterno" onfocusout="nombrecompleto()"  placeholder="" class="form-control" ">
</div>
</div>
</div>
<div class="row">
<div class="col-sm-6">
<div class="form-group">
<label>Apellido Materno: </label> 
<span style="color:red;">(*)</span>
 <input type="text" id="txtApeMaterno"  class="form-control valid"   aria-required="true" aria-invalid="false">
</div>
</div>
			
<div class="col-sm-6">
<div class="form-group">
<label>Display: </label>
<input type="text" id="txtDisplay" name="txtDisplay" placeholder="" value="" class="form-control" disabled=""></div>
</div>
</div>	

<div class="row">
<div class="col-sm-6">
<div>
<label>Sedes: </label> 
<div class="" id="divSedes">
		<select   class="js-example-basic-multiple" name="sedefaltantes" id="sedefaltantes"  data-placement="top" minlength="1" multiple="multiple" style="width:100%;" tabindex="4"  />
										</select>
		<input type="checkbox" id="checkbox" >Seleccionar todas las sedes
</div>

</div>
</div>

<div class=\"row\">

<div class="col-sm-6">
<div style="width:96%">
<label>Cargo: </label>
 <span style="color:red;">(*)</span>
 	<select  style="width: 100%" class="js-example-basic-single" name="state"   tags="true"   data-placement="top" minlength="1"  id="txtCargo" required>
                                    </select>
</div>
</div></div>
<div class="col-sm-6" ><div class="form-group">
		</br>
<label>Sedes Programadas :</label>
			<div id="sedesprogramadas" ></div></div></div>
                        
                <div class="col-sm-6" ><div class="form-group">
		</br>
<label>Sedes No Programadas :</label>
			<div id="sedesnoprogramadas" ></div></div></div></div>
                        </form></div>
`,
		buttons: {
			grabar: {
				label: "<i  class='fa fa-check-square-o'></i>&nbsp;&nbspActualizar",
				className: "btn btn-m-m btn-success",
				callback: function () {

					actualizarEmpleadoo(codigo)
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
			url: "../servlet/personalServlet?accion=ObtenerDatosDeEmpleadosxSedes",
			dataType: 'JSON',
			success: function (data) {
                            console.log(data.data)
				var td = ""
				if (data == "") {
					td = `<H1>no contiene registros<H1>`
				} else
				{
					document.getElementById("txtNombre").value = data.data[0][1]
					document.getElementById("txtApePaterno").value = data.data[0][2]
					document.getElementById("txtApeMaterno").value = data.data[0][3]
					document.getElementById("txtDisplay").value = data.data[0][4]
	         var texto_de_option = data.data[0][5]					
					llenarsedesfaltantes(json)
					listarcargos(texto_de_option)
	$(".js-example-basic-single").select2({
			placeholder: data.data[0][5]
	});
$(".js-example-theme-single").select2({
  theme: "classic"
});
let tdnoprogramadas="";
						for (var i = 0; i < data.data.length; i++) {
							if (data.data[i][8] == 1) {
								if (i > i - 1)
								{	let sede = data.data[i][7] + ", "
									td += `<label style="font-weight: normal;font-size:12px" id='lblsede'> ${sede}    </label>`
								} else {
									let sede = "," + data.data[i][7]
									td += `<label style="font-weight: normal;font-size:12px" > ${sede}    </label>`
								}
							}
                 if (data.data[i][8] == 0) {
								if (i > i - 1)
								{
									let sede = data.data[i][7] + ", "
									tdnoprogramadas += `<label style="font-weight: normal;font-size:12px" id='lblsede'> ${sede}    </label>`
								} else {
									let sede = "," + data.data[i][7]
									tdnoprogramadas += `<label style="font-weight: normal;font-size:12px" > ${sede}    </label>`
								}
							}                                    
						}      
                                        $('#sedesnoprogramadas').html(tdnoprogramadas)
                                       $('#sedesprogramadas').html(td)
				}
			}});

	});
}
function listarcargos(texto_de_option){

return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: '../servlet/sedesServlet?accion=listarCargos',
				success: function (data, textStatus, jqXHR) {
					resolve(data)
					let printJson = ""
					
					printJson += "<option value=''>"+texto_de_option+"</option>";
					for (var i in data.data) {
					
						printJson += "<option value='" + data.data[i].id + "'>" + data.data[i].descripcion+"</option>";
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
}
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
function  generarcodigo(codigoTrabajador) {

	
	let codigo = codigoTrabajador
	let json = {
		"codigo": codigo
	}
	var listar = bootbox.dialog({
		headerClass: "blue-bg",
		title: "Generacion de Códigos",
		size: "medium",
		message: `<form id="formularioPersonal">
<div id="contgenerarcodigo" style="height:250px; margin-left:3%; width:100%;"   >
	<div	class="ibox-content">
		<div class="row"  style="margin-left:10px ;">
		<div class="row" Style="width :98%;">
                   <div class="col-sm-6">
		               <div class="form-group">
                  <label>Dni </label> 
									<div class="input-group">
                 <span class="input-group-btn" >
                 <button type="button" class="btn btn-sm btn-success">*</button></span>
                 <input id="txtdni" type="text" value=""  class="input-sm form-control" disabled>
                  </div></div></div>
                  <div class="col-sm-6">
                  <div class="form-group">
                  <label>Nombre: </label> 
                 <div class="input-group">
                 <span class="input-group-btn">
                 <button type="button" class="btn btn-sm btn-success">*</span></button></span>
                 <input id="txtnombre" type="text"  value=""   class="input-sm form-control" disabled> 
                 </div></div></div>
					</div>
					<div class="row" Style="width :98%;">
                   <div class="col-sm-6">
		               <div class="form-group">
                  <label>Generar Código </label> 
									<div class="input-group">
                 <span class="input-group-btn">
                 <button type="button" class="btn btn-sm btn-success" onclick="generarcod()">*</button></span>
                 <input id="codigogenerado" type="text" name="codigogenerado" value="" minlength="4" maslength="4" class="input-sm form-control" required>  
      
                  </div><div id="errorcodigo"></div></div></div>
					<div id="validadordecodigo"></div>
                  <div class="col-sm-6">
                  <div class="form-group">
                  <label>Motivo</label> <span style="color:red;">(*)</span>
                 <div id="contenedordemotivo" >
                 <span class="input-group-btn" >
                 </div></div></div>
					</div>
					<div class="row" Style="width :98%;">
					<div class="col-sm-12">
					<div id="contenedordetabla">
                  
					<div>
                 </div>
                 </div>
					</div>	
					<form>
	
		
`,
		buttons: {
			grabar: {
				label: "<i  class='fa fa-check-square-o'></i>&nbsp;&nbspActualizar",
				className: "btn btn-m-m btn-success",
				callback: function () {
					validarCodigos(codigo)
					
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

		var array = [];
		$.ajax({
			type: 'POST',
			data: {
				json: JSON.stringify(json)
			},
			url: "../servlet/personalServlet?accion=obtenerdatatrabajador",
			dataType: 'JSON',
			success: function (data) {
				
				var td = ""
				if (data == "") {
					td = `<td>no contiene registros</td>`
				} else
				{

					let codigogene = data.data[0][3]
					let codigo
					let dibujarcombo = ""
					

					if (codigogene != 0) {
						codigo = data.data[0][3]
					} else {
						codigo = ""
					}

					if (data.data[0][4] == null) {
						dibujarcombo = `<select class="form-control" id="estadoMot" name="estadoMot" onchange="dibujartextarea() ">
				         <option value="">SELECCIONÉ</option>
                 <option value="0">Nitidez De Huella</option>
                 <option value="1">Enfermedad En La Piel</option>
					       <option value="2">Otros</option>
                  </select>`
					} else if (data.data[0][4] == "")
					{
						dibujarcombo = `<select class="form-control" id="estadoMot" name="estadoMot" onchange="dibujartextarea() ">
				         <option value="">SELECCIONÉ</option>
                 <option value="3">Nitidez De Huella</option>
                 <option value="1">Enfermedad En La Piel</option>
					       <option value="2">Otros</option>
                  </select>`
					} else {
						dibujarcombo = `
									<div class="form-group row">
									<div class="col-sm-8">
										<textarea style="background-color:#eee;width:160%;" disabled rows="3" cols="3" class="form-control" id="labelmotivo" placeholder="" required>${data.data[0][4]}</textarea>
									</div>
								</div>`
					}
					document.getElementById("txtdni").value = data.data[0][1].substr(2, 10)
					document.getElementById("txtnombre").value = data.data[0][2]
					document.getElementById("codigogenerado").value = codigo
					$('#contenedordemotivo').html(dibujarcombo)
				}
			}});
	});


}

function validarCodigos(codigo) {

jQuery.validator.addMethod("lettersonly", function (value, element) {
		return this.optional(element) || /^[a-zAZ_áéíóúñ\s]+$/i.test(value);
	}, "");
	var validator = $("#formularioPersonal").validate({
		rules: {estadoMot: {
				required: true
			},codigogenerado: {
				required: true
			}
		}
	});
	var validador = validator.form()
	
	if (validador) {
	let Motivo = ""
	let codigogenerado = document.getElementById("codigogenerado").value
	let txtdni = document.getElementById("txtdni").value
	if (codigogenerado == "") {
		dialogo = bootbox.alert({
			headerClass: "modal-bg-success",
			title: "<i class='ace-icon fa fa-check-circle white'></i> <span class='white' >Conformidad</span>",
			size: "small",
			message: "Rellenar El Campo Codigo",
		});
	}else{
	if (txtdni == "") {
		alerta("Realize la programacion en las sedes correspondientes")
	} else {

		if ($('#estadoMot').length) {
			let estadoMot = document.getElementById("estadoMot").value
			if (estadoMot == 2) {

				Motivo = document.getElementById("Motivo").value
			} else {
				var select = document.getElementById("estadoMot"), //El <select>
					value = select.value, //El valor seleccionado
					text = select.options[select.selectedIndex].innerText;
				Motivo = text
			}
		} else {
			Motivo = document.getElementById('labelmotivo').value
		}
		if (Motivo == "SELECCIONÉ") {

			dialogo = bootbox.alert({
				headerClass: "modal-bg-success",
				title: "<i class='ace-icon fa fa-check-circle white'></i> <span class='white' >Conformidad</span>",
				size: "small",
				message: "Seleccionar Un Motivo",
			});
		} else {
			let nombredelusuario = setnombre()


			let json = {
				"codigogenerado": codigogenerado,
				"Motivo": Motivo,
				"codigo": codigo,
				"nombredelusuario": nombredelusuario
			}
			ActualizarMarcacion(json)

			alerta("Codigo Generado Satisfactoriamente")
		}
	}}
	ListarTrabajadores()
}else 
{
		$('#estadoMot').parent().append(document.getElementById('selSedes-error'))
		$('#errorcodigo').parent().append(document.getElementById('codigogenerado-error'))
   codigo = datos[2];
	generarcodigo(codigo);
}
}

function generarcod() {

	let codigogenerado = Math.round(Math.random() * (10000 - 999) + 1000);

	$("#codigogenerado").val(codigogenerado);


}




function 	ActualizarMarcacion(json) {
	return new Promise((resolve, reject) => {



		$.ajax({
			type: 'POST',
			url: "../servlet/personalServlet?accion=ActualizarMarcacion",
			data: {
				json: JSON.stringify(json)
			},
			success: function (result) {

				return cb(result);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});


		$(this).dialog("close");
	})
}

function modificarProgramaciones(codigoTrabajador) {
	let codigo = codigoTrabajador
	let json = {
		"codigo": codigo
	}
	var listar = bootbox.dialog({
		headerClass: "blue-bg",
		title: "Programar sedes",
		size: "small",
		message: `<form style=\"height:200px;\">
<table id=\"tbProgramar\"  class=\"table table-striped  table-hover table-fixed\" >
<thead>
<tr>
<th Style="text-align: center; width:10%;height:47px">N°</th>
<th Style="text-align: center;width:54%;height:47px">Sedes</th>
<th Style="text-align: center;width:35% ;height:47px"> Programar &nbsp;&nbsp;<input type="checkbox" style="background: #71AA4B; margin: 2px 0 0; " class="check-all"></input></th>
		
</tr>
		</thead>
		<label id="nombredeususario" style="margin-left:6%;font-size: 11px;"></label>
		<tbody style=\"width:100%;\" id="tbDetalleProg">
		</tbody>
		</table>
		</form>
`,
		buttons: {
			grabar: {
				label: "<i  class='fa fa-check-square-o'></i>&nbsp;&nbspActualizar",
				className: "btn btn-m-m btn-success",
				callback: function () {


					var cadenaCheck = "";
					var cadenaUnCheck = "";

					$('#tbProgramar :checkbox:checked').each(function () {

						if ($(this).attr('estado') == "false") {
							if (cadenaCheck != "") {
								cadenaCheck += "," + $(this).val();
							} else {
								cadenaCheck = $(this).val();
							}
						}


					});


					$('#tbProgramar :checkbox').each(function () {
						if (!($(this).is(':checked')) && $(this).attr('estado') == "true") {
							if (cadenaUnCheck != "") {
								cadenaUnCheck += "," + $(this).val();
							} else {
								cadenaUnCheck = $(this).val();
							}
						}

					});
					
let usuarioEncargado=setnombre()
					var obj = {
						cadenaCheck: cadenaCheck,
						cadenaUnCheck: cadenaUnCheck,
						codTrabajador: codigoTrabajador,
						usuarioEncargado:usuarioEncargado,
					}
                                      
					mensajeActualizarPregunta(obj, function (result) {
						//
					});
					alerta("Se actualizó fecha de programación , no olvide programar la huella en  DICÓN")
					
					
					
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
		var array = [];
		$.ajax({
			type: 'POST',
			data: {
				json: JSON.stringify(json)

			},
			url: "../servlet/personalServlet?accion=listarprogramaciones",
			dataType: 'JSON',
			success: function (data) {
				
				
				var td = ""
				if (data == "") {
					td = `<td>no contiene registros</td>`
				} else
				{
					for (var i = 0; i < data.data.length; i++) {
						var estado = data.data[i][6]

						var checked = estado == 0 ? '' : 'checked'
						var spanestado = ""
						var fechaprogramacion = ""
						var responsable=""
						var fecha = data.data[i][3]
						if (fecha == null) {
							fechaprogramacion = "Sin Fecha"
						} else {
							var fechaprogramacion = data.data[i][3];
						}

						spanestado = `<div style="height:5px;"  class="checkbox checkbox-success"> <input style="top:0px;text-align: center;position:relative ;margin-left:0px" id="cbox${i}" type="checkbox" value="${data.data[i][5]}"
                     name="check" class="settings" estado="${estado}" ${checked}><label for="checkbox3"></label></div>`;
						td += `<tr><td Style="text-align: center; width:10%;height:45px">${data.data[i][1]}</td>
									<td Style="text-align: center; width:54% ;height:45px">${data.data[i][2]}</td>
									<td Style="text-align:center; width:34% ;height:45px">` + spanestado + `</td></tr>`
					}

					$('#tbDetalleProg').html(td)
				
					 
					
				}
				
		document.getElementById("nombredeususario").innerHTML = data.data[0][8];
	

//				var option = "<tr>";
//				for (var i in data) {
////                  console.log(JSON.stringify( data[i][1]));
//					if (data[i][0] != 1) {
//						option += "<td >'" + data[i][0] + "'" + data[i][1] + "</td>";
//					}
//				}
//				option += "</tr> </table>  </form>"
//
//
//
//
//				$("#tbProgramarSedes").html(option);

			}});
	});


}


function abrirListaSedes(codigoTrabajador) {
    
	let codigo = codigoTrabajador
	let json = {
		"codigo": codigo

	}
	var listar = bootbox.dialog({
		headerClass: "blue-bg",
		title: "Detalle de Programaciones",
		size: "large",
		message: `<form style=\"height:150px;\">
		<div style="text-align:center">
		<label id="nombredeususario" style="font-size: 11px;"></label>
		<div>
<table id=\"tbProgramarSedes\" class=\"table table-striped    table-hover table-fixed \" >
<thead>
<tr style="border:1px solid">
<th Style="text-align: center; width:5%">N°</th>
<th Style="text-align: center;width:18%">Sedes</th>
<th Style="text-align: center;width:17%">Fecha Prog.</th>
<th Style="text-align: center;width:17%">Estado Dicón</th>
<th Style="text-align: center;width:27%">Responsable</th>
<th Style="text-align: center;width:16%">Acciones</th>
</tr>
		</thead>
		<tbody id="tbDetalleProg">
		</tbody>
		</table>
		</form>
`,
		buttons: {
			grabar: {
				label: "<i class='fa fa-check-square-o'></i>&nbsp; Aceptar",
				className: "btn btn-w-m btn-success",
				callback: function () {
				}
			}
		}
	});
	listar.init(function () {
     
		$.ajax({
			type: 'POST',
			data: {
				json: JSON.stringify(json)

			},
			url: "../servlet/personalServlet?accion=listarprogramaciones",
			dataType: 'JSON',
			success: function (data) {
                            
				var td = ""
			
				if (data == "") {
					td = `<td>no contiene registros</td>`
				} else
				{
					for (var i = 0; i < data.data.length; i++) {
						var estado = data.data[i][4]
						var spanestado = ""
						var fechaprogramacion = ""
						var fecha = data.data[i][3]
            var responsable=""
            var accion=""
						if (fecha == null) {
							fechaprogramacion = "Sin Fecha"
						} else {
							var fechaprogramacion = data.data[i][3];
						}
						if (estado == 1) {
							spanestado = '<span class="label label-success">PROGRAMADO</span>';
   accion=`<a  data-toggle="tooltip" data-placement="top"  title="bloqueado" ><i style='color: #AB892D;font-size:23px;' class="fa fa-minus-circle"></i></a>`;
         
						} else if (estado == 2) {
							spanestado = '<span class="label label-warning">MODIFICADO</span>';
accion=`<a  data-toggle="tooltip" data-placement="top"  title="bloqueado" ><i style='color: #AB892D;font-size:23px;' class="fa fa-minus-circle"></i></a>`;
						}  else if (estado == 4) {
							spanestado = '<span class="label label-warning">SIN ASIGNAR</span>';
accion=`<a  data-toggle="tooltip" data-placement="top"  title="bloqueado" ><i style='color: #AB892D;font-size:23px;' class="fa fa-minus-circle"></i></a>`;
						}else {
							spanestado = '<span class="label label-danger">PENDIENTE</span>';
     accion=`<a  data-toggle="tooltip" data-placement="top"  title="Eliminar" onclick="eliminarSede(${data.data[i][5]})"><i style='color: #DD2E2E;font-size:23px;' class="fa fa-trash-o"></i></a>`;
						}
						
if(data.data[i][7]==null)
{
    
							responsable = "Sin responsable"

						}else{
							responsable = data.data[i][7]

						}
                                             
						td += `<tr Style="margin-top:2px"><td Style="text-align: center; width:5%">${data.data[i][1]}</td>
									<td Style="text-align: center; width:17%">${data.data[i][2]}</td>
									<td Style="text-align: center; width:19%">` + fechaprogramacion + `</td>
									<td Style="text-align: center;width:18%">` + spanestado + `</td>
                  <td Style="text-align: center;width:28%">` + responsable + `</td>    
          <td Style="text-align: center;width:10%">` + accion + `</td> 
					        </tr>`
					}
					$('#tbDetalleProg').html(td)
				}
document.getElementById("nombredeususario").innerHTML = data.data[0][8];
			}});
	});  
       
}

function actualizartabladetalle(codigo)
{
    let json={"codigo":codigo}

		$.ajax({
			type: 'POST',
			data: {
				json: JSON.stringify(json)

			},
			url: "../servlet/personalServlet?accion=listarprogramaciones",
			dataType: 'JSON',
			success: function (data) {
				var td = ""
			
				if (data == "") {
					td = `<td>no contiene registros</td>`
				} else
				{
					for (var i = 0; i < data.data.length; i++) {
						var estado = data.data[i][4]
						var spanestado = ""
						var fechaprogramacion = ""
						var fecha = data.data[i][3]
            var responsable=""
            var accion=""
						if (fecha == null) {
							fechaprogramacion = "Sin Fecha"
						} else {
							var fechaprogramacion = data.data[i][3];
						}
						if (estado == 1) {
							spanestado = '<span class="label label-success">PROGRAMADO</span>';
   accion=`<a  data-toggle="tooltip" data-placement="top"  title="bloqueado" ><i style='color: #AB892D;font-size:23px;' class="fa fa-minus-circle"></i></a>`;
         
						} else if (estado == 2) {
							spanestado = '<span class="label label-warning">MODIFICADO</span>';
accion=`<a  data-toggle="tooltip" data-placement="top"  title="bloqueado" ><i style='color: #AB892D;font-size:23px;' class="fa fa-minus-circle"></i></a>`;
						} else {
							spanestado = '<span class="label label-danger">PENDIENTE</span>';
     accion=`<a  data-toggle="tooltip" data-placement="top"  title="Eliminar" onclick="eliminarSede(${data.data[i][5]})"><i style='color: #DD2E2E;font-size:23px;' class="fa fa-trash-o"></i></a>`;
						}
						
if(data.data[i][7]==null)
{
    
							responsable = "Sin responsable"

						}else{
							responsable = data.data[i][7]

						}
                                             
						td += `<tr><td Style="text-align: center; width:5%">${data.data[i][1]}</td>
									<td Style="text-align: center; width:17%">${data.data[i][2]}</td>
									<td Style="text-align: center; width:19%">` + fechaprogramacion + `</td>
									<td Style="text-align: center;width:18%">` + spanestado + `</td>
                  <td Style="text-align: center;width:28%">` + responsable + `</td>    
          <td Style="text-align: center;width:10%">` + accion + `</td> 
					        </tr>`
					}
					$('#tbDetalleProg').html(td)
				}
document.getElementById("nombredeususario").innerHTML = data.data[0][8];
			}});
	} 
       




   
function eliminarSede(codsede){

      let json = {
			"cods": codsede,
			"cod": codigo,
			
		}
 
		return new Promise((resolve, reject) => {
			$.ajax({
				type: 'POST',
				url: '../servlet/personalServlet?accion=EliminarSede',
				dataType: "json",
				data: {
					json: JSON.stringify(json)
				}, success: function (data, textStatus, jqXHR) {
					
                                resolve(data)
     actualizartabladetalle(codigo);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					reject('Error en la petición')
				}
			})
                         
		})
               
             
     
     
     
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
		//		let FechaDesde =document.getElementById("txtfechadesde").value
		let FechaDesde = ""
		//let FechaHasta =document.getElementById("txtfechahasta").value
		let FechaHasta = ""
		let Sedes = document.getElementById("selSedes").value
		let estadoPro = document.getElementById("estadoPro").value
		let cbEstado = document.getElementById("cbEstado").value
		json = {
			"busqueda": nombre,
			"cbfiltro": cbfiltro,
			"fechadesde": FechaDesde,
			"fechahasta": FechaHasta,
			"cbEstado": cbEstado,
			"sedes": Sedes,
			"estadoPro": estadoPro
		}
	} else if (cambiodetipo == 3) {
		let nombre = document.getElementById("txtInputFiltro").value
		let cbfiltro = document.getElementById("cbFiltro").value
//		let FechaDesde =document.getElementById("txtfechadesde").value
		let FechaDesde = ""
		//let FechaHasta =document.getElementById("txtfechahasta").value
		let FechaHasta = ""
		let Sedes = ""
		let estadoPro = document.getElementById("estadoPro").value
		let cbEstado = document.getElementById("cbEstado").value
		json = {
			"busqueda": nombre,
			"cbfiltro": cbfiltro,
			"fechadesde": FechaDesde,
			"fechahasta": FechaHasta,
			"cbEstado": cbEstado,
			"sedes": Sedes,
			"estadoPro": estadoPro
		}
	} else if (cambiodetipo == 1) {
		let nombre = document.getElementById("txtInputFiltro").value
		let cbfiltro = document.getElementById("cbFiltro").value
//		let FechaDesde =document.getElementById("txtfechadesde").value
		let FechaDesde = ""
		//let FechaHasta =document.getElementById("txtfechahasta").value
		let FechaHasta = ""
		let Sedes = ""
		let estadoPro = document.getElementById("estadoPro").value
		let cbEstado = document.getElementById("cbEstado").value
		json = {
			"busqueda": nombre,
			"cbfiltro": cbfiltro,
			"fechadesde": FechaDesde,
			"fechahasta": FechaHasta,
			"cbEstado": cbEstado,
			"sedes": Sedes,
			"estadoPro": estadoPro
		}
	} else if (cambiodetipo == 4) {
		let nombre = ""
		let cbfiltro = document.getElementById("cbFiltro").value
//		let FechaDesde =document.getElementById("txtfechadesde").value
		let FechaDesde = $('#txtfechadesde').val().split("/").reverse().join("-")
		//let FechaHasta =document.getElementById("txtfechahasta").value
		let FechaHasta = $('#txtfechahasta').val().split("/").reverse().join("-")
		let Sedes = "";
		let estadoPro = document.getElementById("estadoPro").value
		let cbEstado = document.getElementById("cbEstado").value
		json = {
			"busqueda": nombre,
			"cbfiltro": cbfiltro,
			"fechadesde": FechaDesde,
			"fechahasta": FechaHasta,
			"cbEstado": cbEstado,
			"sedes": Sedes,
			"estadoPro": estadoPro
		}
	} else {
		let nombre = ""
		let cbfiltro = document.getElementById("cbFiltro").value
//		let FechaDesde =document.getElementById("txtfechadesde").value
		let FechaDesde = ""
		//let FechaHasta =document.getElementById("txtfechahasta").value
		let FechaHasta = ""
		let Sedes = "";
		let estadoPro = document.getElementById("estadoPro").value
		let cbEstado = document.getElementById("cbEstado").value
		json = {
			"busqueda": nombre,
			"cbfiltro": cbfiltro,
			"fechadesde": FechaDesde,
			"fechahasta": FechaHasta,
			"cbEstado": cbEstado,
			"sedes": Sedes,
			"estadoPro": estadoPro
		}
	}
	$('#tbListadoPersonal').DataTable().destroy();
	$("#tbListadoPersonal").DataTable({
		"language": {
			"emptyTable": "No hay datos disponibles en la tabla.",
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
			url: "../servlet/personalServlet?accion=listarPersonal",
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
			{targets: 1, orderable: false, width: "9%", className: "text-center"},
			{targets: 2, orderable: false, width: "8%", className: "text-center"},
			{targets: 3, orderable: false, width: "17%", className: "text-left"},
			{targets: 4, orderable: false, width: "9%", className: "text-center"},

			{targets: 5, orderable: false, width: "9%", className: "text-center"},
			{targets: 6, orderable: false, width: "11%", className: "text-left"},
			{targets: 7, orderable: false, width: "9%", className: "text-center"},
			{targets: 8, orderable: false, width: "9%", className: "text-center"},
      {targets: 9, orderable: false, width: "11%", className: "text-left"}
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
						return "sin Documento"
					} else {
						return data;
					}
				}
			},
			{"data": "4", "render": (data, type, row) => {
					if (data === null) {
						return "sin numero de doc"
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
			},
			{"data": "6", "render": (data, type, row) => {
					if (data == 1) {
						return '<span class="label label-success">ACTIVO</span>'
					} else {
						return '<span class="label label-danger"> INACTIVO</span>';
					}
				}
			},{"data": "13", "render": (data, type, row) => {
					{
					
			return data;
				

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
			},
			{"data": "9", "render": (data, type, row) => {
					if (data === 1) {
					return '<span class="label label-primary">PROGRAMADO</span>';
					}if (data === 2) {
						return '<span style="background-color: #935b17;" class="label label-warning">EN PROCESO</span>'
					}
					if (data === null) {
						return '<span class="label label-danger">NO PROGRAMADO</span>'
					} else {
						return '<span class="label label-danger">NO PROGRAMADO</span>'
					}
				}
			}, {"data": "11", "render": (data, type, row) => {
					{
						if (data == "M")
							return '<img data-toggle="tooltip" data-placement="right" title="Codigo asignado" src="../img/administrativo.png" width="20px" height="20px" />'
						if (data == "?")
							return '<img data-toggle="tooltip" data-placement="right" title="Pendiente toma de huella" src="../img/incognita.png" width="20px" height="20px" />'
						else {
							return '<img  data-toggle="tooltip" data-placement="right" title="Marcacion por huella" src="../img/huella.png"   width="20px" height="25px" />';

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
			{"data": "6","render": (data, type, row) => {
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
					actions += ` <a class="cambiarEstadoInactivo" data-toggle="tooltip" data-placement="top" title="${estado}"><i style="${estiloojito}" class="fa fa-eye"></i></a>&nbsp;&nbsp;&nbsp;`
					actions += `<a class="listarprogramaciones" data-toggle="tooltip" data-placement="top" title="Detalle"><i style="color: #d48228;font-size:13px;" class="fa fa-calendar"></i></a>&nbsp;&nbsp;&nbsp;`
					actions += `<a class="programar" data-toggle="tooltip" data-placement="top" title="Programar"><i style="color: #1c84c6;font-size:13px;" class="fa fa-arrow-circle-up"></i></a>&nbsp;&nbsp;&nbsp;`
					actions += `<a class="generarCodigo" data-toggle="tooltip" data-placement="top" title="Generar Codigo"><i style="color: #ed5565;font-size:13px;" class="fa fa-male"></i></a>&nbsp;&nbsp;&nbsp;`
					actions += `<a class="editarTrabajador" data-toggle="tooltip" data-placement="top" title="Actualizar Personal"><i style="color: #49AC59;font-size:13px;" class="fa fa-paint-brush"></i></a>`
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



//termino y empezamos las accionesss
$('#tbListadoPersonal tbody').on('click', '.generarCodigo', function () {
	var datos = $('#tbListadoPersonal').DataTable().row($(this).parents('tr')).data();
         let huella=datos[11]
    if(huella=='?'){
        alerta("No se puede asignar un codigo.Por que el trabajador no cuenta con huella")
    }else
    {
	codigo = datos[2];
	generarcodigo(codigo);
	$('#codigogenerado').on('input', function () {
		this.value = this.value.replace(/[^0-9]/g, '');

	});
	$('#codigogenerado').on('input', function () {
		if (this.value.length > 4)
			this.value = this.value.slice(0, 4);
	});		
	validateNumber()
}

});
$('#tbListadoPersonal tbody').on('click', '.editarTrabajador', function () {
	var datos = $('#tbListadoPersonal').DataTable().row($(this).parents('tr')).data();
	codigo = datos[2];
	editarTrabajador(codigo);
	
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

	
	nombrecompleto()

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
	
    let huella=datos[11]
    if(huella=='?'){
        alerta("No se puede realizar una programacion .Por que el trabajador no cuenta con huella")
    }else
    {
    
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
}		
});
$('#tbListadoPersonal tbody').on('click', '.listarprogramaciones', function () {
	var datos = $('#tbListadoPersonal').DataTable().row($(this).parents('tr')).data();
	codigo = datos[2];
	let estadocambio = datos[6];
	abrirListaSedes(codigo)
});




function actualizarPersonal(json) {
    
   
	console.log("aqui esta el json"+json)
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: '../servlet/personalServlet?accion=actualizarPersonal',
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

function actualizarEmpleadoo(codigo)
{
var select = document.getElementById("txtCargo"), //El <select>
					value = select.value, //El valor seleccionado
					text = select.options[select.selectedIndex].innerText;
	let txtApePaterno = document.getElementById("txtApePaterno").value
	let txtApeMaterno = document.getElementById("txtApeMaterno").value
	let txtNombres = document.getElementById("txtNombre").value
	let txtDisplay = document.getElementById("txtDisplay").value
	let txtCargo = text
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
		"nombre_personal": txtNombres,
		"apellido_paterno": txtApePaterno,
		"apellido_materno": txtApeMaterno,
		"nombre_completo": txtDisplay,
		"profesion_personal": txtCargo,
		"sede_personal": sedes
	}
       
        console.log(json)
	actualizarPersonal(json)
		.then(data => {
		
			if (data.status) {
				alerta("Usuario Actualizado Exitosamente")
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
		headerClass: "modal-bg-success pulse  animated",
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




function dialog_animation(x) {
	$(".modal .modal-dialog").attr("class", "modal-dialog " + x + "  animated");
};



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




