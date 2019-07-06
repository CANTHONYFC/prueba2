
$('#btnExportar').click(function () {
   let cambiodetipo = document.getElementById("cbFiltro").value
	let json = ""
	if (cambiodetipo == 2) {
		
		let nombre = ""
		let cbfiltro = document.getElementById("cbFiltro").value
		let cboAutorizado = document.getElementById("cboAutorizado").value
		json = {
			"busqueda": nombre,
			"cbfiltro": cbfiltro,
			"cboAutorizado": cboAutorizado}
	} else if (cambiodetipo == 3) {

		let nombre = document.getElementById("txtInputFiltro").value
		let cbfiltro = document.getElementById("cbFiltro").value
		let cboAutorizado = ""
		//let cboAutorizado = document.getElementById("cboAutorizado").value
		json = {
			"busqueda": nombre,
			"cbfiltro": cbfiltro,
			"cboAutorizado": cboAutorizado}
	} else if (cambiodetipo == 1) {

		let nombre = document.getElementById("txtInputFiltro").value
		let cbfiltro = document.getElementById("cbFiltro").value
		let cboAutorizado = ""
		//let cboAutorizado = document.getElementById("cboAutorizado").value
		json = {
			"busqueda": nombre,
			"cbfiltro": cbfiltro,
			"cboAutorizado": cboAutorizado}
	} else
	{

		let nombre = ""
		let cbfiltro = document.getElementById("cbFiltro").value
		let cboAutorizado = ""
		//let cboAutorizado = document.getElementById("cboAutorizado").value
		json = {
			"busqueda": nombre,
			"cbfiltro": cbfiltro,
			"cboAutorizado": cboAutorizado}
	}
	let usuario = setnombre();

				

	window.location = "excel/excel_General.jsp?json="+JSON.stringify(json)+ "&usuario=" + usuario;
//json=" + nombre + "&cbfiltro=" + cbfiltro + "&fechadesde=" + FechaDesde + "&fechahasta=" + FechaHasta+"&cbEstado=" + cbEstado+"&sedes=" +Sedes+"&cbModoMarcacion=" + cbModoMarcacion
	



});
function setnombre() {

			return window.nombreUsuario;
	}