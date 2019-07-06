/*Envio de datos al servidor*/
$('#txtUsuario').focus();
const httpRequest = {
    login(params) {
        return ajaxRequestSendBody({
            url: '../vistas/login',
            type: 'POST',
            headers: {
                "Accept": 'application/json'
            },
            body: params
        });
    }
};

// domevents
const DOMEvents = {
    init() {
        this.signIn();
    },
    signIn() {

        document.querySelector('#signIn').addEventListener('click', (e) => {
            let validator = $('#login').validate({
                rules: {
                    txtUsuario: {required: true, maxlength: 50},
                    txtClave: {required: true, maxlength: 50}
                },
                messages: {
                    txtUsuario: {
                        required: 'completar el campo usuario.'
                    },
                    txtClave: {
                        required: 'ingresar contraseña.'
                    }
                }
            });
            let estado = validator.form();
            if (estado) {
                unload();
                let params = {
                    usuario: document.querySelector('#txtUsuario').value.trim(),
                    pass: document.querySelector('#txtClave').value,
                    codigoProyecto: CONSTANTES.CODIGO_PROYECTO_PERSONAL
                };
                httpRequest.login(params)
                        .then(data => {
                            unload();
                            if (data.status) {
                                window.location.href = "../vistas/main.jsp";
                            } else {
                                $('#txtClave').val("");
                                $('#txtClave').focus();
                                customSwal.alert('¡Error!', "Usuario o contraseña incorrecto.", 'error');
                            }
                        })
                        .catch(err => console.log(err));
            }
        });
    }

};

DOMEvents.init();

$(window).bind('keypress', function (e) {
    if (e.charCode === 13 || e.keyCode === 13) {
        $('#signIn').click();
    }
});
