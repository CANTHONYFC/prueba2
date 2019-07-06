
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<%@include file="templates/header.jsp" %>
<link href="../css/general.css" rel="stylesheet" type="text/css"/>
	<link href="../css/estilos_extras.css" rel="stylesheet" type="text/css"/>
        
        <style>
     .table-fixed thead,
.table-fixed tfoot{
  width: 100%;
  

}
.navbar-header {
     min-width: 10px; 
}
 #tbListadoPersonal_processing {
background-color:Transparent;
border-color:Transparent;
}
.table-fixed tbody {
  height: 120px;
  overflow-y:auto;
 
  width: 100%;
}


.table-fixed ::-webkit-scrollbar { 
  /* solo oculta su visualizacion */
  display: none;
}



.table-fixed thead,
.table-fixed tbody,
.table-fixed tfoot,
.table-fixed tr,
.table-fixed td,
.table-fixed th {
  display: block;

}


.table-fixed tbody td,
.table-fixed thead > tr> th,
.table-fixed tfoot > tr> td{
  float: left;
  border-bottom-width: 0;
}    
            
        </style>
	</head>
	<body>
		<%@include file="templates/header-body.jsp" %>
		<div class="row wrapper border-bottom blue-bg page-heading" style="background-color:#2c986f; ">
			<div class="col-lg-9" style="background-color:#2c986f; ">
				<ol class="breadcrumb" style="background-color:#2c986f; ">
					<li class="active">
						<a href="registroPersonal.jsp">
							<i class="fa fa-home"></i> Inicio
						</a>
					</li>
					<li class="active">
						<strong>Listado General</strong>
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
                    <div class="ibox-title" class="animated">
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
                                                    <option  value="2">PERSONAL QUE AUTORIZO</option>
                                                    <option  selected="selected" value="0">TODOS</option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>
															                   <div  class="col-lg-6 col-md-6 col-sm-6">
                                        <div class="form-group" id="divInputFiltro">
                                            <label>Todos</label> 
                                            <div id="divInputFiltroTxt">
																							<input  disabled="" type="text" id="txtInputFiltro" name="txtNombres" placeholder="" value="" onchange="" class="form-control">
                                            </div>

                                        </div>
                                    </div>
												  
															<div class="col-lg-6 col-md-6 col-sm-6">
                                    
                                </div>
															
															<div class="col-lg-6 col-md-6 col-sm-6">
                                 
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
                        <h5>Listado General</h5>
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
													<th class="cabecera" style="text-align: center">APELLIDOS Y NOMBRES</th>
													
													<th class="cabecera"  style="text-align: center">ESTADO</th>
													<th class="cabecera"  style="text-align: center">CARGO</th>
													<th class="cabecera"  style="text-align: center">USUARIO REGISTRO</th>
                                                                                                        <th class="cabecera"  style="text-align: center" >FECHA REGISTRO</th>
													
                                                                                                        <th class="cabecera"  style="text-align: center">USUARIO AUTORIZADO</th>
                                                                                                        <th class="cabecera"  style="text-align: center">MODO MARCACION</th>
													<!--<th class="cabecera">F.Programación</th>-->
													<th class="cabecera all"  style="text-align: center">  ACCIÓN </th>
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
	<script src="../plantilla/assets/js/plugins/validate/jquery.validate.min.js" type="text/javascript"></script>
<script src="../js/pages/ListadoGeneral.js"></script>
<script src="../js/pages/reporte_excel_general.js"></script>


    
   
 
</body>
</html>