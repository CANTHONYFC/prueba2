
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
 #tbListadoPersonal_processing {
background-color:Transparent;
border-color:Transparent;
}
.navbar-header {
     min-width: 10px; 
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
		<div class="row wrapper border-bottom blue-bg page-heading" style="background-color:#2c986f ; ">
			<div class="col-lg-9" style="background-color:#2c986f ; ">
				<ol class="breadcrumb"  style="background-color:#2c986f ; ">
					<li class="active">
						<a href="registroPersonal.jsp">
							<i class="fa fa-home"></i> Inicio
						</a>
					</li>
					<li class="active">
						<strong>Listado Personal</strong>
					</li>
				</ol>
			</div>
		</div>
		<!-----------------------fin sub titulo---------------->
<div >
	
        <div class="row">
            <div class="col-lg-3"></div>
            <div class="col-lg-7">
                <div class="ibox float-e-margins shadow-material"> 
								
</div>
</div>
						
						<div class="col-lg-3"></div>
						</div>
	<div class="row">
            <div class="col-lg-12">
                <div class="ibox float-e-margins shadow-material">
                    <div class="ibox-title" >
                        <h5>Listado de Trabajadores</h5>
                        
                    </div>
	<!--Ver Listado de Pendientes-->
								<div class="ibox-content" style="padding: 0px 0px 0px 0px !important;">
                        <div class="table-responsive">
										<table id="tbListadoPersonal" class="table table-striped table-bordered table-hover cell-border" >
											<thead>
												<tr>
													<th class="cabecera"  style="text-align: center" >N°</th>
													<th class="cabecera"  style="text-align: center" >FECHA REGISTRO</th>
													<th class="cabecera"  style="text-align: center" >DNI</th>
													<th class="cabecera" style="text-align: center">APELLIDOS Y NOMBRES</th>
													<!--                                                            <th class="cabecera">Sedes</th>-->
													<th class="cabecera"  style="text-align: center">ESTADO</th>
													<th class="cabecera"  style="text-align: center">CARGO</th>
													<th class="cabecera"  style="text-align: center">USUARIO AUTORIZADO</th>
													<th class="cabecera"  style="text-align: center">MODO MARCACIÓN</th>
                                                                                                        <th class="cabecera"  style="text-align: center">RESPONSABLE</th>
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
<script src="../js/pages/listarPendientesSede.js"></script>

    
   
 
</body>
</html>