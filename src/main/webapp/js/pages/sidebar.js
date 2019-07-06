
const httpRequestt = {
	getproyectos() {
		return ajaxRequestSendBody({
			url: CONSTANTES.PATH_SERVICIO_REST + 'proyecto/listarProyectoUsuario',
			type: 'POST',
			headers: {
				"Content-type": 'application/json',
				"Accept": 'application/json',
				"Authorization": Cookies.get('Authorization')
			}

		})
	},
	getAuth() {
		return ajaxRequestSendBody({
			url: '../servlet/authServlet',
			type: 'POST'
		})
	}
}

let redirectPost = (url, data) => {
	
	var form = document.createElement('form');
//	form.setAttribute("target", "_blank");
	document.body.appendChild(form);
	form.method = 'POST';
	form.action = url;
	for (var name in data) {
		var input = document.createElement('input');
		input.type = 'hidden';
		input.name = name;
		input.value = data[name];
		form.appendChild(input);
	}
	form.submit();
}


let getUrl = (pathname, caracter) => {
	let position = 0;
	for (let i = pathname.length - 1; i > 0; i--) {
		if (pathname[i] === caracter) {
			position = i;
			break;
		}
	}
	return position;
};

const EventosClick = {
	init() {
		this.redireccionar()
	},
	redireccionar() {
		$('#proyectos').on('click', '.redireccionar', (e) => {
			let thisElement = $(e.target);
			//block();//Bloquear acciones spinner
//        Invocar promesa (opcional)   
			httpRequestt.getAuth()
				.then((result) => {
					if (result.status) {
						let url = thisElement.data("url");
						let cp = thisElement.data("cp");
						let servlet = '/vistas/redireccionarServlet';
						if (url.endsWith('/')) {
							servlet = 'vistas/redireccionarServlet';
						}
						redirectPost(
							url + servlet,
							{cp: cp, t: result.Authorization}
						)
					} else {
						alert("No hay una session activa.")
						//$.unblockUI();//quitar el bloqueo de pantalla
					}

				})
				.catch((exception) => {
					console.log("Error : " + exception);
					//$.unblockUI();//quitar el bloqueo de pantalla
				})
		})
	}
}
const link = i => `window.location = '${i}'`;

const DOMSideBar = {
	init() {
		this.setMenu();
		this.setUsuario();
	},
	setMenu() {
		
		let location = window.location;
		let position = getUrl(location.pathname, "/");
		let path = location.pathname.substring(position + 1);//obtiene el nombre de la vista jsp para activar la clase .active
		let menu = document.getElementById("side-menu");
		let c = window.sidebar;//obtiene el menu
		let contenido = c.menu;
		let html = "";
		let active = "";
		let mod = -1;
		let cate = -1;
//donde estan  el codigo de proyectos? lleva a eso//DEJA ESE DEBUGGER
//        debugger
		/* Recorrer titulos */

		for (var i in contenido) {
			let titulo = contenido[i].titulo;
			html += `<li  class="landing_link" ><a><i class="fa ${titulo.ico}"></i><span class="nav-label">${titulo.nombre}</span></a></li>`;
			let modulo = titulo.modulo;
			for (var j in modulo) {
				if (path === modulo[j].url) {
					active = 'active';
				} else {
					active = '';
				}
				if (modulo[j].tipo === "2") {
					html += `<li id="mod${j}" class="${active}"><a href="${modulo[j].url}"><i class="fa ${modulo[j].ico}"></i><span class="nav-label">${modulo[j].nombre}</span><span class="fa arrow"></span></a><ul class="nav nav-second-level collapse">`;
					var categoria = modulo[j].categoria;
					for (var k in categoria) {
						if (path === categoria[k].url) {
							mod = j;
							active = 'active';
						} else {
							active = '';
						}
						if (categoria[k].tipo === "2") {
							html += `<li id="cat${k}" class="${active}"><a href="${categoria[k].url}">${categoria[k].nombre}<span class='fa arrow'></span></a><ul class='nav nav-third-level'>`;
							let subcategoria = categoria[k].subCategoria;
							for (var l in subcategoria) {
								if (path === subcategoria[l].url) {
									mod = j;
									cate = k;
									active = 'active';
								} else {
									active = '';
								}
								html += `<li class="${active}"><a href="${subcategoria[l].url}">${subcategoria[l].nombre}</a></li>`;
							}
							html += `</ul></li>`;
						} else {
							html += `<li class="${active}"><a href="${categoria[k].url}">${categoria[k].nombre}</a></li>`;
						}
					}
					html += `</ul></li>`;
				} else {
					html += `<li class="${active}"><a href="${modulo[j].url}"><i class="fa ${modulo[j].ico}"></i><span class="nav-label">${modulo[j].nombre}</span></a></li>`;
				}
			}
		}
		$('.ta-avatar').attr('avatar', window.nombreUsuario.charAt(0));
		generarLetraCircular();
		menu.innerHTML += html;
		$("#mod" + mod).addClass('active');
		$("#cat" + cate).addClass('active');
		$('#side-menu').metisMenu();
	},
	setUsuario() {
		document.querySelector("#usuario-nombre").innerHTML = window.nombreUsuario;
		document.querySelector("#usuario-rol").innerHTML = window.rolesUsuario;
	}
}
function setnombre() {

			return window.nombreUsuario;
	}
let DOMNav = {
	init() {
		this.setProyecto();
	},
	setProyecto() {
		httpRequestt.getproyectos()
			.then(data => {
				if (data.status) {
					let html = '';
					let proyectos = data.proyectos;
					if (proyectos.length != 1) {
						html += `<a class="dropdown-toggle count-info" href="#" data-toggle="dropdown" id="" aria-expanded="false">
                                        <i class="fa fa-th" style="color: #3D832D "></i> <span class="label label-success" id=""></span>
                                    </a>
                                    <ul class="dropdown-menu">`;
						let divider = `<li class="divider"></li>`;
						for (let i in proyectos) {
							let url = proyectos[i].url;//produccion
							let cp = proyectos[i].codigoProyecto;//produccion+
							let servlet = '/vistas/redireccionarServlet&cp=';
							if (cp === CONSTANTES.CODIGO_PROYECTO_POLICIA) {
								continue;
							}
							if (url.endsWith('/')) {
								servlet = 'vistas/redireccionarServlet&cp=';
							}
							html += '<li><a data-url="' + url + '" data-cp="' + cp + '" href="javascript:void(0)" class="redireccionar" > '//<img src="assets/images/flags/de.png" alt="">
								+ proyectos[i].nombre + '</a></li>'
							html += divider;
						}
						html = html.substring(0, html.length - divider.length);
						html += `</ul>`;
						document.getElementById("proyectos").innerHTML = html;
					}
				} else {
					msnError("Ocurrió un error al cargar los proyectos")
				}
			})
			.catch(err => console.log(err))
	}
}

DOMSideBar.init();
DOMNav.init();
EventosClick.init();
