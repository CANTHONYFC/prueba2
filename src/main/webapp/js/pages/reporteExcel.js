
$('#btnExportar').click(function () {

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
	}else if (cambiodetipo == 3) {
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
	} else if (cambiodetipo == 4) {
		
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
	let usuario=setnombre();

				

	window.location = "excel/excel_reemplazos.jsp?json="+JSON.stringify(json)+ "&usuario=" + usuario;
//json=" + nombre + "&cbfiltro=" + cbfiltro + "&fechadesde=" + FechaDesde + "&fechahasta=" + FechaHasta+"&cbEstado=" + cbEstado+"&sedes=" +Sedes+"&cbModoMarcacion=" + cbModoMarcacion
	



});
function setnombre() {

			return window.nombreUsuario;
	}