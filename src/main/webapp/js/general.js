/* global bootbox, Cookies */

const CONSTANTES = Object.freeze({
	PATH_GENERAL: 'http://app9.sacooliveros.edu.pe:8080/RegistroPersonalParaHuellas/',
	PATH_IP: 'http://172.16.2.91:8080/RegistroPersonalParaHuellas/',
	CODIGO_PROYECTO_PERSONAL: '30',
	PATH_SERVICIO_REST: 'http://app9.sacooliveros.edu.pe:8080/security-rest/api/'
})

let getYearFooter = (footer) => {
	var date = new Date();
	var year = date.getFullYear();
	$(footer).append(year);
};

getYearFooter('#footerDate');

const capitalizeWords = str => str.split(' ').map((word, i, arr) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')


function cerrar_cargando() {
    $.unblockUI();
}
function cargando() {
    $.blockUI({
        message: '<div class="thecube"> <div class="cube c1"></div> <div class="cube c2"></div> <div class="cube c4"></div> <div class="cube c3"></div> </div>',
        //timeout: 2000, //unblock after 2 seconds
        baseZ: 9000,
        overlayCSS: {
            backgroundColor: '#1b2024',
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            zindex: '9999',
            border: 0,
            color: '#fff',
            padding: 0,
            backgroundColor: 'transparent'
        }
    });
//     $("#txtInputFiltro").keypress(function (e) {
//        if (e.which == 13) {
//            return false;
//        }
//    });
}
function msnSuccess(message, action) {
	var final = action || function () {};
	bootbox.dialog({
		headerClass: "modal-bg-success",
		title: "<i class='ace-icon fa fa-tags white'></i> <span class='white'>Notificación</span>",
		size: "small",
		onEscape: true,
		message: message,
		buttons: {
			si: {
				label: "<i class='fa fa-check bigger-110'></i>&nbsp; Aceptar",
				className: "btn-notify",
				callback: function () {
					final();
				}
			}
		}
	});
}

function msnError(message, action) {
	var final = action || function () {};
	bootbox.dialog({
		headerClass: "red-bg",
		onEscape: true,
		title: "<i class='ace-icon fa fa-exclamation-circle white'></i> <span class='white'>Error</span>",
		size: "small",
		message: message,
		buttons: {
			si: {
				label: "<i class='fa fa-check bigger-110'></i>&nbsp; Aceptar",
				className: "btn-danger",
				callback: function () {
					final();
				}
			}, no: {
				label: "<i class='fa fa-eye bigger-110'></i>&nbsp; Ver Roles",
				className: "btn btn-warning",
				callback: function () {
					window.location = "rolesMantenimiento.jsp"
				}
			}
		}
	});
}

function mgsError(message, action) {
	var final = action || function () {};
	bootbox.dialog({
		headerClass: "red-bg",
		onEscape: true,
		title: "<i class='ace-icon fa fa-exclamation-circle white'></i> <span class='white'>Error</span>",
		size: "small",
		message: message,
		buttons: {
			si: {
				label: "<i class='fa fa-check bigger-110'></i>&nbsp; Aceptar",
				className: "btn-danger",
				callback: function () {
					final()
				}
			}
		}
	});
}

function msnConfirm(message, action) {
	bootbox.dialog({
		headerClass: "modal-bg-primary",
		onEscape: true,
		title: "<i class='ace-icon fa fa-check-circle white'></i> <span class='white'>Conformidad</span>",
		size: "small",
		message: message,
		buttons: {
			si: {
				label: "<i class='fa fa-check bigger-110'></i>&nbsp; Si",
				className: "btn-success",
				callback: function () {
					return action(true);
				}
			}, no: {
				label: "<i class='fa fa-times bigger-110'></i>&nbsp; No",
				className: "btn-danger",
				callback: function () {
					return action(false);
				}
			}
		}
	});
}

function getSession(json) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: "../UsuarioServlet?accion=getSession",
			dataType: 'json',
			data: {
				json: JSON.stringify(json)
			},
			success: function (data, textStatus, jqXHR) {
				resolve(data);
			}, error: function (jqXHR, textStatus, errorThrown) {
				reject(`Error de Petición`);
			}
		});
	});
}

function deleteAllCookies() {
	var cookies = document.cookie.split(";");

	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		var eqPos = cookie.indexOf("=");
		var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
}

function initTable(len) {
	var showChar = len || 25;
	var ellipsestext = "...";
	var moretext = " <i class='fa fa-plus text-success-700'></i> ";
	var lesstext = " <i class='fa fa-minus text-danger-700'></i> ";

	$('.more').each(function () {
		var content = $(this).html();
		if (content.length > showChar) {
			var c = content.substr(0, showChar);
			var h = content.substr(showChar, content.length - showChar);
			var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink text-size-large">' + moretext + '</a></span>';
			$(this).html(html);
		}
	});
	$(".morelink").click(function () {
		if ($(this).hasClass("less")) {
			$(this).removeClass("less");
			$(this).html(moretext);
		} else {
			$(this).addClass("less");
			$(this).html(lesstext);
		}
		$(this).parent().prev().toggle();
		$(this).prev().toggle();
		return false;
	});
}

const ajaxRequestSendBody = obj => {
	let body = JSON.stringify(obj.body);
	return new Promise((resolve, reject) => {
		$.ajax({
			url: obj.url,
			type: obj.type,
			headers: obj.headers,
			data: {body: body},
			beforeSend: (xhr, settings) => {
			}, success: (response, textStatus, jqXHR) => {
				resolve(response)
			}, error: (jqXHR, textStatus, errorThrown) => {
				reject({
					status: jqXHR.status,
					throw: errorThrown || {},
					jqXHR: jqXHR,
					request: obj
				})
			}
		})
	})
}

let logOut = () => {
	$('.logOut').click(function () {
		var form = document.createElement('form');
		document.body.appendChild(form);
		form.method = 'POST';
		form.action = '../vistas/logout';
		form.submit();
//		window.location.href = '../vistas/logout';
	})
	
}

var elementLoader = {
	iniciarLoader: function (id) {
		$("#" + id).parent().block({
			message: '<i class="icon-spinner9 spinner position-left"></i>',
			overlayCSS: {
				backgroundColor: '#fff',
				opacity: 0.8,
				cursor: 'wait'
			},
			css: {
				border: 0,
				padding: 0,
				backgroundColor: 'transparent'
			}
		});
	},
	terminarLoader: function (id) {
		$("#" + id).parent().unblock();
	}
};

function load() {
	$.blockUI({
		message: '<div class="thecube"> <div class="cube c1"></div> <div class="cube c2"></div> <div class="cube c4"></div> <div class="cube c3"></div> </div>',
		baseZ: 9000,
		overlayCSS: {
			backgroundColor: '#1b2024',
			opacity: 0.8,
			cursor: 'wait'
		},
		css: {
			zindex: '9999',
			border: 0,
			color: '#fff',
			padding: 0,
			backgroundColor: 'transparent'
		}
	});
}

function unload() {
	$.unblockUI();
}

var loader = {
	iniciarLoader() {
		$.blockUI({
			message: '<div class="thecube"> <div class="cube c1"></div> <div class="cube c2"></div> <div class="cube c4"></div> <div class="cube c3"></div> </div>',
			//timeout: 2000, //unblock after 2 seconds
			baseZ: 9000,
			overlayCSS: {
				backgroundColor: '#1b2024',
				opacity: 0.8,
				cursor: 'wait'
			},
			css: {
				zindex: '9999',
				border: 0,
				color: '#fff',
				padding: 0,
				backgroundColor: 'transparent'
			}
		});
	},
	terminarLoader() {
		$.unblockUI();
	}
};

$(window).resize(() => {
	const width = $(window).width();
	if (width < 1589 && width > 1199) {
		$('.col-centered').each((i, obj) => {
			if ($(this).hasClass('col-lg-4')) {
				$(this).removeClass('col-lg-4')
				$(this).addClass('col-lg-6')
			} else if ($(this).hasClass('col-lg-8')) {
				$(this).removeClass('col-lg-8')
				$(this).addClass('col-lg-10')
			}
		});
	} else {
		$('.col-centered').each((i, obj) => {
			if ($(this).hasClass('col-lg-6')) {
				$(this).removeClass('col-lg-6')
				$(this).addClass('col-lg-4')
			} else if ($(this).hasClass('col-lg-10')) {
				$(this).removeClass('col-lg-10')
				$(this).addClass('col-lg-8')
			}
		});
	}
});

function changeMargin() {
	$('.except').css('margin-left', '-15px');
	$('.except').css('margin - right', '-15px');
}

function soloNumeros(input) {
	$('#' + input).on('keypress keyup blur', function (e) {
		$(this).val($(this).val().replace(/[^\d].+/, ""));
		if ((e.which < 48 || e.which > 57)) {
			e.preventDefault();
		}
	});
}

function soloLetras(input) {
	$('#' + input).on('keypress keyup blur', function (e) {
		var regex = new RegExp(/^[a-zA-Z\s]*$/);
		var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		if (regex.test(str)) {
			return true;
		}
		e.preventDefault();
		return false;
	});
}

function soloAlfanumerico(input) {
	$('#' + input).on('keypress keyup blur', function (e) {
		var regex = new RegExp("^[a-zA-Z0-9]+$");
		var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		if (regex.test(str)) {
			return true;
		}
		e.preventDefault();
		return false;
	});
}

function submitKey(source, target) {
	$('#' + source + '').on('keypress ', function (event) {
		if (event.keyCode === 13) {
			$('' + target + '').click();
		}
	});
}

let jsonToQueryParam = (obj) => {
	let esc = encodeURIComponent
	let query = Object.keys(obj).map(k => esc(k) + '=' + esc(obj[k])).join('&')
	return query
}

let fetchSo = (url, object) => {
	return new Promise(
		(resolve, reject) => {
		let header = {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
		let requestInfo = {
			method: 'post',
			headers: header,
			body: JSON.stringify({json: object})
		}
		fetch(url, requestInfo)
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				if (res.status) {
					resolve(res)
				} else {
					reject(res)
				}
			})
			.catch((error) => {
				reject(error)
			})
	}
	)
}

let customSwal = {
	alert(title, text, type) {
		let colors = {
			success: '#66BB6A',
			error: '#EF5350',
			warning: '#FF7043'
		}
		let btnColor = colors[type]
		return new Promise((resolve, reject) => {
			swal({
				title: title,
				text: text,
				confirmButtonColor: btnColor,
				type: type
			}, (isConfirm) => {
				resolve()
			})
		})
	}
}

logOut()