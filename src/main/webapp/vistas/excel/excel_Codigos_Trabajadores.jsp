<%@page import="java.io.PrintWriter"%>
<%@page import="registro.personal.services.PersonaService"%>
<%@page import="org.json.JSONArray"%>
<%@page import="java.util.Calendar"%>
<%@page import="org.json.JSONObject"%>
 <%@page import="java.io.IOException"%>
 <%@page import="java.io.PrintWriter"%>
 <%@page import="javax.servlet.ServletException"%>
 <%@page import="javax.servlet.http.HttpServlet"%>
 <%@page import="java.io.IOException"%>
 <%@page import="javax.servlet.http.HttpServletRequest"%>
 <%@page import="javax.servlet.http.HttpServletResponse"%>
<%@page import=" org.json.JSONObject"%>
 <%@page import="registro.personal.services.PersonaService"%>



<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%

		response.setContentType("application/json");
		
		PersonaService srv = new PersonaService();
		String dibujar = request.getParameter("draw");
		String jsonString = request.getParameter("json");
		JSONObject json = new JSONObject(jsonString)
			.put("length",50 )
			.put("start",0 );
		int cantidadRegistros = 0;
		JSONObject jsonlistado = srv.reporteExcel_codigos(json);
		JSONObject jsonImprimir = new JSONObject();
		jsonImprimir.put("data", jsonlistado.get("data"));
		jsonImprimir.put("draw", dibujar);
		jsonImprimir.put("recordsFiltered", cantidadRegistros);
		jsonImprimir.put("recordsTotal", cantidadRegistros);
JSONArray data = jsonlistado.getJSONArray("data");
	String usuario=request.getParameter("usuario");

%>
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>Reporte</title>
		<style>
			.text-center {
				text-align: center
			}
			.header-tr {
				background-color: #1f4e78; 
				color:#FFF
			}
		</style>
	</head>
	<body>
		<%
			response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition", "attachment; filename=reporte.xls");
		%>
		<%

			String border = "style='border:solid 0.5pt #000000;vertical-align:middle;'";
			String centrado = "style='vertical-align:middle;' ";
			String borderColor = "style='border:solid 0.5pt #000000; vertical-align:middle; background-color:#B5E0F5;'";
			String borderColorTitulo = "style='border:solid 0.5pt #000000; vertical-align:middle; background-color:#006699; color:#FFFFFF;'";
			String estilo = "style='background-color:#B5E0F5; border:solid 0.5pt;'";
			String estilo3 = "style='background-color:#FFFFFF; border:solid 0.5pt;'";
			String estilo2 = "";

			Calendar cal1 = Calendar.getInstance();

			int dia = cal1.get(Calendar.DATE);
			int mes = cal1.get(Calendar.MONTH) + 1;
			int hora = cal1.get(Calendar.HOUR_OF_DAY);
			int minuto = cal1.get(Calendar.MINUTE);
			int segundo = cal1.get(Calendar.SECOND);
			String diaAc = "";
			String mesAc = "";
			String hrAc = "";
			String minAc = "";
			String secAc = "";

			int horaAc = 0;
			String perDia = "";

			if (dia < 10) {
				diaAc = "0" + dia;
			} else {
				diaAc = "" + dia;
			}

			if (mes < 10) {
				mesAc = "0" + mes;
			} else {
				mesAc = "" + mes;
			}

			if (minuto < 10) {
				minAc = "0" + minuto;
			} else {
				minAc = "" + minuto;
			}

			if (segundo < 10) {
				secAc = "0" + segundo;
			} else {
				secAc = "" + segundo;
			}

			if (hora < 12) {
				perDia = "am.";
				if (hora < 10 && hora > 0) {
					hrAc = "0" + hora;
				} else if (hora == 0) {
					hrAc = "12";
				} else {
					hrAc = "" + hora;
				}
			} else {
				if (hora == 12) {
					hrAc = "12";
				} else {
					horaAc = hora - 12;
					if (horaAc < 10) {
						hrAc = "0" + horaAc;
					} else {
						hrAc = "" + horaAc;
					}
				}
				perDia = "pm.";
			}
		%>
		<table align='center' border='0' cellpadding= '0' cellspacing= '0'>
<tr>
				<td height='9' align='center' colspan='10' <%=centrado%> ><h2>Reporte de programación de huellas del personal</h2></td>
			</tr>			
			<tr>
			<td colspan="5" ><b>Usuario: </b><%=usuario%></td>
				<td colspan="5" align="right">SACO OLIVEROS - SISTEMAS</td>
			</tr>
			<tr>
				<td colspan="4"><b>REGISTROS:</b> <%=data.length()%></td>
				<td colspan="6" align="right"><b>ACTUALIZACI&Oacute;N: </b> <%=diaAc + "/" + mesAc + "/" + cal1.get(Calendar.YEAR) + " " + hrAc + ":" + minAc + ":" + secAc + " " + perDia%></td>
			</tr>
			<tr> 
				<td width='50' <%=borderColorTitulo%> align='center'>N°</td>
				<td width='120' <%=borderColorTitulo%> align='center'>DNI</td>
				<td width='380' <%=borderColorTitulo%> align='center'>APELLIDOS Y NOMBRES</td>
				<td width='200' <%=borderColorTitulo%> align='center'>CARGO</td>
				<td width='200' <%=borderColorTitulo%> align='center'>ESTADO</td>
				<td width='200' <%=borderColorTitulo%> align='center'>FECHA PROGRAMACIÓN CÓDIGO</td>
				<td width='200' <%=borderColorTitulo%> align='center'>SEDES</td>
				<td width='200' <%=borderColorTitulo%> align='center'>PROGRAMACIÓN WEB</td>
				<td width='200' <%=borderColorTitulo%> align='center'>CÓDIGO</td>
				<td width='300' <%=borderColorTitulo%> align='center'>USUARIO</td>
		
					</tr>
			<%
				int cont = 1;
			for(int i = 0; i<data.length();i++){
				JSONObject obj = data.getJSONObject(i);
				
					if (cont % 2 == 0) {
						estilo2 = borderColor;

					} else {
						estilo2 = border;

					}
					String DNI= "";
					String APELLIDOS="";
					String CARGO="";
					String FECHA="";
					String SEDE="";
					String PROGRAMACIONDICON="";
					String MODO="";
					String USUARIO="";
				
					if (obj.get("2").toString()=="null") {
						DNI="SIN DNI";

					} else {
						DNI=obj.getString("2");

					}
					if (obj.get("4").toString()=="null") {
						APELLIDOS="SIN APELLIDOS";} else {
						APELLIDOS=obj.getString("4");}
					
					if (obj.get("5").toString()=="null") {
						CARGO="SIN CARGO";} else {
					CARGO=obj.getString("5");}
						if (obj.get("5")==null) {
						CARGO="SIN CARGO";} else {
					CARGO=obj.getString("5");}

if (obj.get("3").toString().toString()=="null") {
						FECHA="SIN FECHA";} else {
FECHA=obj.getString("3");
}
	if (obj.get("6").toString()=="null") {
						SEDE="SIN SEDE";} else {
					SEDE=obj.getString("6");}

	
	String validarprogramacion=obj.get("7").toString();
						if (validarprogramacion.equals("1")) {
						PROGRAMACIONDICON="PROGRAMADO";
					}else{
						PROGRAMACIONDICON="NO PROGRAMADO";
					}

	 	
String VALIDARHUELLA=obj.get("10").toString();
						
	if(VALIDARHUELLA.equals("NULL"))
		{
			MODO="SIN CÓDIGO";
	}else{
			MODO=obj.get("10").toString();
	}

String VALIDARESTADO=obj.get("11").toString();
if(VALIDARESTADO.equals("1"))
		{
			VALIDARESTADO="ACTIVO";
	}	else
		{
			VALIDARESTADO="INACTIVO";
	}
					
		if (obj.get("9").toString()=="null") {
						USUARIO="SIN RESPONSABLE";} else {
					USUARIO=obj.getString("9");
		}


			%>
			<tr> 
				<td  <%=estilo2%> align='center'><%=cont%> </td>
				<td  <%=estilo2%> align='center' style='mso-number-format:"\@";'><%=DNI%> </td>
				<td  <%=estilo2%> align='left' ><%=APELLIDOS%></td>
				<td  <%=estilo2%> align='center' ><%=CARGO%></td>
				<td  <%=estilo2%> align='center' ><%=VALIDARESTADO%></td>
				<td  <%=estilo2%> align='center' ><%=FECHA%></td>
				<td  <%=estilo2%> align='left' ><%=SEDE%></td>
				<td  <%=estilo2%> align='center' ><%=PROGRAMACIONDICON%></td>
				<td  <%=estilo2%> align='center' ><%=MODO%></td>
		<td  <%=estilo2%> align='left' ><%=USUARIO%></td>
			</tr>
			<%
					cont++;
				}
				if (cont == 1) {
			%>		
			<tr>
				<td <%=estilo3%> colspan='10' align='center'>NO HAY DATOS DISPONIBLES EN ESTA TABLA.</td>
			</tr>
			<%
				}
			%>     

		</table>

	</body>
</html>
