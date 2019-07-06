<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Registro de personal para huellas| SACO OLIVEROS</title>
        <link rel="icon" type="image/png" sizes="32x32" href="../img/huella.png"> 
        <link href="../plantilla/assets/css/bootstrap.min.css" rel="stylesheet">
        <link href="../plantilla/assets/font-awesome/css/font-awesome.css" rel="stylesheet">

        <link href="../plantilla/assets/css/animate.css" rel="stylesheet">
        <link href="../plantilla/assets/css/style.css" rel="stylesheet">
        <link href="../plantilla/assets/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">


    </head>

		<style>
/*			body{
background: url(../img/fondo.jpg) no-repeat center center fixed;
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
}
	*/
body {
   width: 100%;
   height: 100%;
   position: absolute;
   overflow: hidden;
   background: url(../img/fondo.jpg);
	 -webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
   background-size: cover;    
}		
			
		</style>
<body >

        <div class="middle-box text-center loginscreen animated fadeInDown">
            <div>
                <div>

                    <h1 class="logo-name">SO</h1>

                </div>
                <h3 style="color:#FFFFFF;">REGISTRO PERSONAL PARA HUELLAS</h3>
                <!--<p>Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app views.
                <!--Continually expanded and constantly improved Inspinia Admin Them (IN+)-->

                <h4 style="color:#E5E5E5;">Inicio de sesión</h4>
                <form class="m-t" role="form" action="#" id="login">
                    <div class="form-group">                        
                        <input id="txtUsuario" name="txtUsuario" type="text" value="" class="form-control" placeholder="Usuario" required="">
                    </div>
                    <div class="form-group">
                        <input id="txtClave" name="txtClave" type="password" value="" class="form-control" placeholder="Contraseña" required="">
                    </div>                  
                    <button type="submit" id="signIn" class="btn btn-success block full-width m-b">Ingresar</button>
                    <div id='MensajeErrorLogin' class="alert alert-danger m-b text-danger" style="display: none;"><b>Usuario y/o contraseña inválidos.</b></div>                    
                </form>
                <p>
                    <i class="fa fa-internet-explorer" aria-hidden="true" style="color:white"></i>
                    <i class="fa fa-firefox" aria-hidden="true" style="color:white"></i>
                    <!--<i class="fa fa-edge" aria-hidden="true" style="color:white"></i>-->
                    <i class="fa fa-chrome" aria-hidden="true" style="color:white"></i>
                    <i class="fa fa-opera" aria-hidden="true" style="color:white"></i>
                    <i class="fa fa-windows" aria-hidden="true" style="color:white"></i>
                    <i class="fa fa-android" aria-hidden="true" style="color:white"></i>
                    <i class="fa fa-apple" aria-hidden="true" style="color:white"></i>
                    <i class="fa fa-css3" aria-hidden="true" style="color:white"></i>
                    <i class="fa fa-html5" aria-hidden="true" style="color:white"></i>
                </p>
                 <p  id="footerDate" style="color:#E5E5E5;">Área de TIC &copy; </p>
            </div>
        </div>

    </body>

    <!-- Mainly scripts -->
    <script src="../plantilla/assets/js/jquery-2.1.1.js"></script>
    <script src="../plantilla/assets/js/plugins/validate/jquery.validate.min.js" type="text/javascript"></script>
    <script src="../plantilla/assets/js/blockui.min.js" type="text/javascript"></script>
    <script src="../plantilla/assets/js/plugins/sweetalert/sweetalert.min.js" type="text/javascript"></script>
    <script src="../js/general.js" type="text/javascript"></script>
    <script src="../js/lib/jquery-validation-config.js" type="text/javascript"></script>

    <script src="../js/lib/cookies.js" type="text/javascript"></script>
    <script src="../js/pages/index.js" type="text/javascript"></script>
    <script>
        ((window) => {
            window.history.replaceState({}, '', 'index.jsp');
        })(window);
    </script>

</html>


