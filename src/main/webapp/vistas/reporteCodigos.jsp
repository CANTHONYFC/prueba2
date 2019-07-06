
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<%@include file="templates/header.jsp" %>
<link href="../css/general.css" rel="stylesheet" type="text/css"/>
	<link href="../css/estilos_extras.css" rel="stylesheet" type="text/css"/>
        <style> #tbListadoPersonal_processing {
background-color:Transparent;
border-color:Transparent;
}
				.navbar-header {
     min-width: 10px; 
}
				
				</style>
        </head>
	<body>
		<%@include file="templates/header-body.jsp" %>
		<div class="row wrapper border-bottom blue-bg page-heading" style="background-color:#2c986f; ">
			<div class="col-lg-9" style="background-color:#2c986f; ">
				<ol class="breadcrumb" style="background-color:#2c986f;" >
					<li class="active">
						<a href="registroPersonal.jsp">
							<i class="fa fa-home"></i> Inicio
						</a>
					</li>
					<li class="active">
						<strong>Reporte Códigos</strong>
					</li>
				</ol>
			</div>
		</div>
		<!-----------------------fin sub titulo---------------->
<div class="wrapper wrapper-content animated fadeInRight">
	<form  id="formulariolistado"  class="animated" >
        <div class="row">
            <div class="col-lg-3"></div>
            <div class="col-lg-7">
                <div class="ibox float-e-margins shadow-material">
                    <div class="ibox-title">
                        <h5>Filtro de búsqueda</h5>
                        <div class="ibox-tools">
                            <span class="text-danger">(*)</span>: <em>Campos Obligatorios</em>
                        </div>
                    </div>
                  <div class="ibox-content">
                        <form id="formulario">
                            <div class="row">                                            
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <div class="form-group">
                                            <label>Filtro </label> <span class="text-danger">(*)</span> 
                                            <div id="divFiltro">
                                                <select class="form-control" id="cbFiltro" name="cbFiltro" >
                                                   <option value="3">N° DOCUMENTO</option> 
																									     <option  value="1">APELLIDOS</option>
																										<option  value="2">SEDES</option>
																										<option  value="4" selected="selected">FECHA</option>
																										<option value="0" >TODOS</option>
																									
                                                </select>
                                            </div>
                                        </div>
                                    </div>
															                   <div  class="col-lg-6 col-md-6 col-sm-6">
                                        <div class="form-group" id="divInputFiltro">
                                            
                                            <div id="divInputFiltroTxt">
																							
																							
																							<div class="col-lg-6 col-md-6 col-sm-6">
<div class="form-group" id="data_1">
<label>Fecha Inicio </label> <span class="text-danger">(*)</span>
                                     <i class="fa fa-calendar"></i>
                                        <input class="datepicker form-control" type="text" id="txtfechadesde">
                                    </div>
																		</div>
<div class="col-lg-6 col-md-6 col-sm-6">
<div class="form-group" id="data_2">
<label>Fecha Fin </label> <span class="text-danger">(*)</span>n
                                     <i class="fa fa-calendar"></i>
                                        <input class="datepicker form-control" type="text" id="txtfechahasta">
                                    </div>
																		</div>
																							
																							
																							
																							
                                            </div>

                                        </div>
                                
												  </div>
															<div class="col-lg-6 col-md-6 col-sm-6">
                                    <div  id="divInputFiltro">
                                        <label>Estado Programación Web</label> <span class="text-danger">(*)</span> 
                                        <div id="divCboEstado">
                                            <select class="form-control" id="cbEstado"  name="cbEstado" >
                                                <option  value="0">PENDIENTE</option>
                                                <option  value="1">PROGRAMADO</option>
                                                                                                     
                                            </select>
                                        </div>

                                    </div>
                                </div>
															
                             
															
																									     
															
															
																</form>
															
															
															
                                </div>
                            
									
								</div>

                     <div class="ibox-footer">
                            <div class="text-center">                                       
                                <button type="button" class="btn btn-success" onclick="javascript:validarcamposdefiltro();"><i class="fa fa-search"></i> Buscar</button> 
                                <button type="button" class="btn btn-warning" onclick="javascript:limpiartrabajadores();"><i class="fa fa-eraser"></i> Limpiar</button>
																
                            </div>

                        </div>
								
</div>
</div>
						
						<div class="col-lg-3"></div>
						</div>
	<div class="row">
            <div class="col-lg-12">
                <div class="ibox float-e-margins shadow-material">
                    <div class="ibox-title" >
                        <h5>Reporte de Codigos</h5>
                        <div class="ibox-tools">
													<button id="btnExportar" type="button" onclick="javascript:irReporte();" class="btn btn-w-m btn-primary" >Exportar <i class="fa fa-file-excel-o"></i></button> 
                        </div>
                    </div>
	<!--Ver Listado de Pendientes-->
								<div class="ibox-content" style="padding: 0px 0px 0px 0px !important;">
                        <div class="table-responsive">
										<table id="tbListadoPersonal" class="table table-striped table-bordered table-hover cell-border" >
											<thead>
												<tr>
													<th class="cabecera"  style="text-align: center" >N°</th>
													<th class="cabecera"  style="text-align: center" >DNI</th>
													<th class="cabecera"  style="text-align: center" >APELLIDOS Y NOMBRES</th>
													<th class="cabecera" style="text-align: center">CARGO</th>
													<th class="cabecera" style="text-align: center">ESTADO</th>
													<!--                                                            <th class="cabecera">Sedes</th>-->
													<th class="cabecera"  style="text-align: center">FECHA PROGRAMACIÓN CÓDIGO</th>
													<th class="cabecera"  style="text-align: center">SEDES</th>
													<th class="cabecera"  style="text-align: center">PROGRAMACIÓN WEB</th>
													<th class="cabecera"  style="text-align: center">CÓDIGO MARCACIÓN</th>
													<!--<th class="cabecera">F.Programación</th>-->
													<th class="cabecera all"  style="text-align: center"> USUARIO </th>
												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
                    </div>
                </div>
            </div>
        </div>            
    </div>  

	<%@include file="templates/footer-body.jsp"%>
        <script>$( document ).ready(function() {
       $('#formulariolistado').removeAttr('class').attr('class', '');
                var animation ='flipInX'
                $('#formulariolistado').addClass('animated');
                $('#formulariolistado').addClass(animation);
                return false;
});
</script>
	<script src="../plantilla/assets/js/plugins/validate/jquery.validate.min.js" type="text/javascript"></script>
<script src="../js/pages/ListadoCodigos.js"></script>
<script src="../js/pages/reporteExcel_Codigos.js"></script>

</body>
</html>