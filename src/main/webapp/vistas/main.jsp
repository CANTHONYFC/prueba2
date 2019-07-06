<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <%@include file="templates/header.jsp" %>
         <!--template-core-->
        <!--css-->
        <!--css-->
    </head>
    <body>
        <%@include file="templates/header-body.jsp" %>
        <div class="row wrapper border-bottom blue-bg page-heading" style="background-color:#3D832D ; ">
            <div class="col-lg-9" style="background-color:#3D832D ; ">
                <ol class="breadcrumb" style="background-color:#3D832D ; ">
                    <li class="active">
                        <a href="registroPersonal.jsp"><i class="fa fa-home" ></i> Inicio</a>
                    </li>
                </ol>
            </div>
        </div>
        <%@include file="templates/footer-body.jsp"%>
     <script>
            ((window) => {
                window.history.replaceState({}, '', 'main.jsp');
            })(window);
						window.location.assign("registroPersonal.jsp")
        </script>
				<script src="../js/configuracion/redirecciones.js" type="text/javascript"></script>
				<script type="text/javascript">
					$( document ).ready(function() {
    mostrarBoton();
});
				</script>
    </body>
</html>
