var bandera = 0;

$("#top-search").keypress(function (e) {

    if (e.which == 13) {
			        var busqueda = $("#top-search").val();
        localStorage.setItem("busqueda", busqueda);
				window.location.href = 'BuscarPersonal.jsp'
	}
});
function mostrar() {

    var busqueda = localStorage.getItem("busqueda");
    if (busqueda != null) {
        cantidadBusqueda(busqueda);
        $("#txtbuscar").val(busqueda);
        $("#txtbuscar").focus();
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url: "../servlet/personalServlet?accion=buscarPersonal",
            data: "busqueda=" + busqueda,
            beforeSend: function () {
                cargando();
            },
            success: function (data) {
                var resultado = "";
                var style = "";
									  var style2 = "";
                if (data.data == "") {
                    resultado += "<h4> No se han encontrado resultados para tu búsqueda </h4>" +
                            "<br>Sugerencias :" +
                            "<li>Asegúrate de que todas las palabras estén escritas correctamente.</li>" +
                            "<li>Validad si dni esta correctamente escrito.</li>" +
                            "<div class='hr-line-dashed'></div>";
                    $("#resultadoBusqueda").html(resultado);
                } else {
                     
                    var dni = "";
										console.log(data.data)
                    for (var i in data.data) {
                        if (data.data[i][5] == 1) {
                            style = "style=\"color:#045FB4;\"";
                        } else {
                            style = "style=\"color:red;\"";
                        }
												
							if (data.data[i][5] == 1) {
                               style3 = "style=\"color:#39AB3C;\"";
                        } else {
                            style3 = "style=\"color:red;\"";
                        }
																
							
									if (data.data[i][5] == 1) {
                               ESTADO='ACTIVO'
                        } else {
                             ESTADO='INACTIVO'
                        }
							
							if (data.data[i][2] == 'ACTIVO') {
                            style2 = "style=\"color:#39AB3C;\"";
                        } else {
                            style2 = "style=\"color:red;\"";
                        }
                        resultado += "<h4 " + style + " id='valorDni'><b>DNI: " + data.data[i][1] + "  -  " + data.data[i][4]+" -("+data.data[i][3]+")"+ "</b></h4>";
                        resultado += " <div class='col-lg-4 col-md-9 col-sm-9' ><h4 " + style + " >WEB ADMINISTRATIVA :  <span "+style2+">"+data.data[i][2]+" <span> </h4></div>";
							          resultado += " <div class='col-lg-3 col-lg-9 col-sm-9' ><h4 " + style + " >WEB HUELLAS   :  <span "+style3+">"+ESTADO+" <span> </h4></div></div>";
							
                                localStorage.setItem("dni", data.data[i][1]);
                                dni = localStorage.getItem("dni");
                                resultado += "<br><br><div style= 'width:31%;'><p><a  onclick='javascript: redireccionlistarPersonal(\"" + dni + "\");' class='search-link' style='color:gray'><li>LISTADO PERSONAL</li></a></p>";
                                resultado += "<p><a  onclick='javascript: redirecionProgramacion(\"" + dni + "\");' class='search-link' style='color:gray'><li>PROGRAMACIÓN</li></a></p> </div>";
                                resultado += "<div class='hr-line-dashed'></div>";
                               
                        
                        "<div class='hr-line-dashed'></div>";
                    }
                    $("#resultadoBusqueda").html(resultado);
                }

            }, complete: function () {
                localStorage.removeItem("busqueda");
                localStorage.removeItem("dni");
                cerrar_cargando();
            }
        });
    }
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






function mostrarBoton() {
	
    var busqueda = $("#txtbuscar").val();
		if(busqueda==""){

		}else{
    cantidadBusqueda(busqueda);
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: "../servlet/personalServlet?accion=buscarPersonal",
        data: "busqueda=" + busqueda,
        beforeSend: function () {
            cargando();
        },
        success: function (data) {
          var resultado = "";
                var style = "";
								  var style2 = "";
									var  style3="";
									var ESTADO="";
                if (data.data == "") {
                    resultado += "<h4> No se han encontrado resultados para tu búsqueda </h4>" +
                            "<br>Sugerencias :" +
                            "<li>Asegúrate de que todas las palabras estén escritas correctamente.</li>" +
                            "<li>Validad si dni esta correctamente escrito.</li>" +
                            "<div class='hr-line-dashed'></div>";
                    $("#resultadoBusqueda").html(resultado);
                } else {
                    var dni = "";
										console.log(data.data)
                    for (var i in data.data) {
                        if (data.data[i][5] == 1) {
                            style = "style=\"color:#045FB4;\"";
                        } else {
                            style = "style=\"color:red;\"";
                        }
												
							if (data.data[i][5] == 1) {
                               style3 = "style=\"color:#39AB3C;\"";
                        } else {
                            style3 = "style=\"color:red;\"";
                        }
																
							
									if (data.data[i][5] == 1) {
                               ESTADO='ACTIVO'
                        } else {
                             ESTADO='INACTIVO'
                        }
							
							if (data.data[i][2] == 'ACTIVO') {
                            style2 = "style=\"color:#39AB3C;\"";
                        } else {
                            style2 = "style=\"color:red;\"";
                        }
                        resultado += "<h4 " + style + " id='valorDni'><b>DNI: " + data.data[i][1] + "  -  " + data.data[i][4]+" -("+data.data[i][3]+")"+ "</b></h4>";
                        resultado += " <div class='col-lg-4 col-md-9 col-sm-9' ><h4 " + style + " >WEB ADMINISTRATIVA :  <span "+style2+">"+data.data[i][2]+" <span> </h4></div>";
							          resultado += " <div class='col-lg-3 col-lg-9 col-sm-9' ><h4 " + style + " >WEB HUELLAS   :  <span "+style3+">"+ESTADO+" <span> </h4></div></div>";
							
                                localStorage.setItem("dni", data.data[i][1]);
                                dni = localStorage.getItem("dni");
                                resultado += "<br><br><div style= 'width:31%;'><p><a  onclick='javascript: redireccionlistarPersonal(\"" + dni + "\");' class='search-link' style='color:gray'><li>LISTADO PERSONAL</li></a></p>";
                                resultado += "<p><a  onclick='javascript: redirecionProgramacion(\"" + dni + "\");' class='search-link' style='color:gray'><li>PROGRAMACIÓN</li></a></p> </div>";
                                resultado += "<div class='hr-line-dashed'></div>";
                               
                        
                        "<div class='hr-line-dashed'></div>";
                    }
                    $("#resultadoBusqueda").html(resultado);
                }

        }, complete: function () {
            localStorage.removeItem("busqueda");
            localStorage.removeItem("dni");
            cerrar_cargando();
        }
    });}
}

function cantidadBusqueda(busqueda) {
	
    $.ajax({
        type: 'POST',
        url: "../servlet/personalServlet?accion=buscarPersonal",
        data: "busqueda=" + busqueda,
        beforeSend: function () {
        }, success: function (data) {
            if (data.data.length > 0) {
                console.log(data);
                var resultado = "";
                resultado += "<h5 id='cantidad'>Cerca de " + data.data[0][3] + " resultado(s) <i>'" + busqueda + "'</i></h5>";
                $("#cantidad").html(resultado);
            } else {
                var resultado = "";
                resultado += "<h5 id='cantidad'>Cerca de 0 resultado(s) </h5>";
                $("#cantidad").html(resultado);
            }

        }, complete: function () {

        }
    });
}


mostrar();


