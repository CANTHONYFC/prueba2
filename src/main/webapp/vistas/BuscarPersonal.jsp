<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html  lang="es-PE">
    <head>
        <%@include file="templates/header.jsp" %>
        <style>
            .resaltar{background-color:#FF0;}
        </style> 
    </head>

    <body>
        <%@include file="templates/header-body.jsp" %>
        <div class="row wrapper border-bottom blue-bg page-heading">
            <div class="col-lg-9">
                <ol class="breadcrumb">
                    <li class="active">
                        <a href="registroPersonal.jsp">
                            <i class="fa fa-home"></i> Inicio
                        </a>
                    </li>
                    <li>
                        Buscar Personal
                    </li>
                    <li class="active">
                        <strong>Búsqueda</strong>
                    </li>
                </ol>
            </div>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-lg-2"></div>
                <div class="col-lg-8">
                    <div class="ibox float-e-margins shadow-material">
                        <div class="ibox-title">
                            <h5 id="cantidad">Cerca de 0 resultado(s) </h5>
                            <div class="ibox-tools">
                                <span class="text-danger">(*)</span>: <em>Campos Obligatorios</em>
                            </div>
                        </div>
                        <div class="ibox-content">
                            <form id="formBusqueda">
                                <div class="row">                                           
                                    <div class="col-lg-1 col-md-1 col-sm-1"></div>
                                    <div class="col-lg-10 col-md-10 col-sm-10">
                                        <div class="input-group">
                                            <input id="txtbuscar" type="text" placeholder="Buscar Personal ..." name="search" class="form-control input-lg" >
                                            <div class="input-group-btn">
                                                <button class="btn btn-lg btn-success" type="button" onclick="javascript:mostrarBoton();"><i class="fa fa-search"></i> Buscar</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-1 col-md-1 col-sm-1"></div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="search-result" id="resultadoBusqueda">

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2"></div>
            </div>           
        </div>     
        <%@include file="templates/footer-body.jsp"%>
        <script src="../js/configuracion/redirecciones.js" type="text/javascript"></script>
				<script type="text/javascript">
					
					$( document ).ready(function() {
    mostrarBoton();
});
					
					
				</script>
    </body>
</html>
