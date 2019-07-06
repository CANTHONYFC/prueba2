function CargarFecha() {
	$(function () {
		$('.datepicker').datepicker({
			dateFormat: 'dd/mm/yy',
			showButtonPanel: true,
			changeMonth: true,
			changeYear: true,
			minDate: '-4Y',
			maxDate: '+1Y',
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
	$('#txtfechaPago').val(fecha());
}

function  fecha() {
	var f = new Date();
	var dia = f.getDate();
	var mes = (f.getMonth() + 1);
	var fecha = "";

	if (dia < 10) {
		if (mes < 10) {
			fecha = "0" + f.getDate() + "/0" + (f.getMonth() + 1) + "/" + f.getFullYear();
			return fecha;
		} else {
			fecha = "0" + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
			return fecha;
		}
	} else {
		if (mes < 10) {
			fecha = f.getDate() + "/0" + (f.getMonth() + 1) + "/" + f.getFullYear();
			return fecha;
		} else {
			fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
			return fecha;
		}
	}

}
