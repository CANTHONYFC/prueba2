<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Registro de personal para huella</title>
<link rel="icon" type="image/png" sizes="32x32" href="../img/huella.png"> 
<link href="../plantilla/assets/css/icons/icomoon/styles.css" rel="stylesheet" type="text/css"/>
<link href="../plantilla/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>

<link href="../plantilla/assets/font-awesome/css/font-awesome.css" rel="stylesheet">


<!-- Toastr style -->
    <link href="../plantilla/assets/css/plugins/toastr/toastr.min.css" rel="stylesheet" type="text/css">
<link href="../plantilla/assets/css/animate.css" rel="stylesheet" type="text/css">
    <link href="../plantilla/assets/css/style.css" rel="stylesheet" type="text/css">

<link href="../plantilla/assets/css/plugins/jQueryUI/jquery-ui.css" rel="stylesheet" type="text/css"/>
<link href="../plantilla/assets/css/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css"/>
<link href="../plantilla/assets/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
<link href="../plantilla/assets/css/plugins/daterangepicker/daterangepicker-bs3.css" rel="stylesheet" type="text/css"/>

<link href="../plantilla/assets/css/plugins/jasny/jasny-bootstrap.min.css" rel="stylesheet" type="text/css"/>
<link href="../plantilla/assets/css/plugins/select2/select2.min.css" rel="stylesheet">


<link href="../plantilla/assets/css/plugins/switchery/switchery.min.css" rel="stylesheet" type="text/css"/>

<link href="../plantilla/assets/css/plugins/chosen/chosen.css" rel="stylesheet">

<link href="../plantilla/assets/css/plugins/bootstrap-multiselect/bootstrap-select.css" rel="stylesheet" type="text/css"/>

<!--Datatable-->
<link href="../plantilla/assets/css/plugins/iCheck/custom.css" rel="stylesheet">
<link href="../plantilla/assets/css/animate.css" rel="stylesheet">
<link href="../plantilla/assets/css/style.css" rel="stylesheet">
<link href="../plantilla/assets/css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" rel="stylesheet" >
<link href="../plantilla/assets/css/plugins/dataTables/datatables.min.css" rel="stylesheet">
<link href="../plantilla/assets/css/dialog.css" rel="stylesheet">


<link href="../plantilla/assets/css/plugins/ladda/ladda-themeless.min.css" rel="stylesheet" type="text/css"/>
<!--cargando-->
<link href="../plantilla/assets/css/success.css" rel="stylesheet" type="text/css"/>

<script src="../js/lib/cookies.js" type="text/javascript"></script>

<script>
	var sidebar = <%=(String) request.getSession().getAttribute("menu")%>;

	var nombreUsuario = "<%=(String) request.getSession().getAttribute("nombre")%>";

	var rolesUsuario = "<%=(String) request.getSession().getAttribute("roles")%>";
</script>