
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<%@include file="templates/header.jsp" %>
		<link href="../css/general.css" rel="stylesheet" type="text/css"/>
		<link href="../css/estilos_extras.css" rel="stylesheet" type="text/css"/>
		<style>
			
			
			.navbar-header {
     min-width: 10px; 
}

		</style>
	</head>
	<body>
		<%@include file="templates/header-body.jsp" %>
		<div class="row wrapper border-bottom blue-bg page-heading" style="background-color:#2c986f; ; ">
			<div class="col-lg-9" style="background-color:#2c986f; ; ">
				<ol class="breadcrumb" style="background-color:#2c986f; ; ">
					<li class="active">
						<a href="registroPersonal.jsp">
							<i class="fa fa-home"></i> Inicio
						</a>
					</li>

					<li class="active">
						<strong>Registro Personal</strong>
					</li>
				</ol>
			</div>
		</div>
		<!-----------------------fin sub titulo---------------->
		<!------------------------Encabezado---------------->
		<div class="wrapper wrapper-content animated fadeInRight">
			<form id="formularioPersonal" class="animated">
			<div class="row">
				<div class="col-lg-1"></div>
				<div class="col-lg-10">
					<div class="ibox float-e-margins shadow-material">
						<div class="ibox-title">
							<h5>Registro del Personal </h5>
							<div class="ibox-tools">
								<span class="text-danger">(*)</span> Campos Obligatorios
							</div>
						</div>
						<div class="ibox-content">
							 <form id="formulario">
								<div class="row">
									<div class="col-lg-3 col-md-3 col-sm-3"><!------------------------Label de N°Documento---------------->
										<div class="form-group">
											<label>N°Documento </label> <span class="text-danger">(*)</span> 
											<div id="divNumDocumento">                                                                                                         <!-- soloNumeros(event)  -->
												<input type="text" id="txtNumDocumento" name="txtNumDocumento" placeholder="" value="" class="form-control"  minlength="8" maxlength="8" data-placement="top" data-toggle="tooltip" >
											</div>
										</div>
									</div><!-----------------------Fin Label de N°Documento---------------->
									<div class="col-lg-3 col-md-3 col-sm-3"><!------------------------Label de Apellido Paterno---------------->
										<div class="form-group">
											<label>Apellido Paterno</label> <span class="text-danger">(*)</span> 
											<input type="text" id="txtApePaterno" name="txtApePaterno" maxlength="100"  class="form-control"  data-toggle="tooltip" >
										</div>
									</div><!------------------------Fin  Label de Apellido Paterno---------------->
									<div class="col-lg-3 col-md-3 col-sm-3">
										<div class="form-group">
											<label>Apellido Materno</label> <span class="text-danger">(*)</span> 
											<input type="text" id="txtApeMaterno" name="txtApeMaterno" maxlength="100" class="form-control" data-toggle="tooltip" >
										</div>
									</div>


									<div class="col-lg-3 col-md-3 col-sm-3"><!------------------------Label de Nombres---------------->
										<div class="form-group">
											<label>Nombres</label> <span class="text-danger">(*)</span> 
											<input type="text" placeholder="" maxlength="100" id="txtNombres" name="txtNombres"  class="form-control" data-toggle="tooltip" >
										</div>    
									</div><!------------------------Fin Label de Nombres---------------->
								</div>
								<div  class="row">
									<div class="col-lg-3 col-md-3 col-sm-3"><!--------Label de Display---------------->
										<div class="form-group">
											<label>Display</label> <span class="text-danger"></span> 
											<div id="divDisplay">
												<input type="text" id="txtDisplay" name="txtDisplay"  value="" class="form-control" disabled="">
											</div>
										</div>
									</div><!-----------------------Fin Label de Display----------------> 
									<!------------------------combo de Sedes---------------->

									<div class="col-lg-3 col-md-3 col-sm-3">
										<label>Sede </label> <span class="text-danger">(*)</span> 
										<select   class="js-example-basic-multiple"  name="selSedes" id="selSedes"  data-placement="top" minlength="1" multiple="multiple" style="width:100%;" tabindex="4"  />
										</select>
										<input type="checkbox" id="checkbox" >Seleccionar todas las sedes
										

                                                        
									</div>
									<!------------------------Fin de Combo Sedes---------------->   
						 
									<div class="col-lg-3 col-md-3 col-sm-3"><!--------Label de Cargo---------------->
										<div class="form-group">
											<label>Personal Autorizado</label> <span class="text-danger">(*)</span> 
											<div id="divresponsable">
												<select class="js-example-basic-multiple" style="width: 100%" name="account"   id="cboAutorizado" required>
														
                                    </select>
											</div>
										</div>
									</div>
								
								</div>
							</form>
						</div>
						<div class="ibox-footer">
							<div class="text-center">
								<button type="button" id="btnRegistrar"  class="btn btn-primary" onclick="validarCampos()"><i class="fa fa-save"></i> Registrar Personal</button>
							
								<button type="button" class="btn btn-warning" onclick="Limpiar()"><i class="fa fa-eraser"></i> Limpiar</button>
							</div> 
							
						</div>	
					</div>
				</div>
				<div class="col-lg-1"></div>
			</div>
		</div>
		
   
		
		 
		<%@include file="templates/footer-body.jsp"%>
		<script src="../js/pages/personal.js"></script>

		<script src="../plantilla/assets/js/plugins/validate/jquery.validate.min.js" type="text/javascript"></script>
     	</body>
</html>
