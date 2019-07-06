/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.servlets;

import static com.sun.corba.se.spi.presentation.rmi.StubAdapter.request;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import static javax.ws.rs.client.Entity.json;
import org.json.JSONArray;
import org.json.JSONObject;
import registro.personal.services.PersonaService;
import registro.personal.services.SedesService;

/**
 *
 * @author sistem16user
 */
public class PersonalServlet extends HttpServlet {

	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		response.setContentType("text/html");
		String accion = request.getParameter("accion");
		switch (accion) {
			case "validarPersonal":
				validarPersonal(response, request);
				break;
			case "listarCodigos":
				listarCodigos(response, request);
				break;
			case "listarPersonal":
				listarPersonal(response, request);
				break;
			case "listarPersonalSinSede":
				listarPersonalSinSede(response, request);
				break;
			case "insertarPersonalSede":
				insertarPersonalSede(response, request);
				break;
			case "InsertarPersonalSinSede":
				InsertarPersonalSinSede(response, request);
				break;
			case "listarprogramaciones":
				listarprogramaciones(response, request);
				break;
			case "reporteProgramacion":
				reporteProgramacion(response, request);
				break;
			case "actualizarEstado":
				actualizarEstado(response, request);
				break;
			case "programarSedesHuella":
				programarSedesHuella(response, request);
				break;
			case "obtenerdatatrabajador":
				obtenerdatatrabajador(response, request);
				break;
			case "ObtenerDatosDeEmpleadosxSedes":
				ObtenerDatosDeEmpleadosxSedes(response, request);
				break;
			case "ObtenerDataTrabajadorSinSede":
				ObtenerDataTrabajadorSinSede(response, request);
				break;
			case "ActualizarMarcacion":
				ActualizarMarcacion(response, request);
				break;
			case "listarsedesfaltantes":
				listarsedesfaltantes(response, request);
				break;
			case "ObtenerfiltroXdni":
				ObtenerfiltroXdni(response, request);
				break;
			case "actualizarPersonal":
				actualizarPersonal(response, request);
				break;
			case "actualizarPersonalSinSede":
				actualizarPersonalSinSede(response, request);
				break;
			case "listarGeneral":
				listarGeneral(response, request);
				break;
			case "EliminarSede":
				EliminarSede(response, request);
				break;
			case "buscarPersonal":
				buscarPersonal(response, request);
				break;
			case "insertarPersonal":
				insertarPersonal(response, request);

			default:
		}
	}

	private void validarPersonal(HttpServletResponse response, HttpServletRequest request) throws IOException {

		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String jsonString = request.getParameter("jsonPersonal");
		JSONObject json = new JSONObject(jsonString);
		JSONObject rs = srv.validarPersonal(json);
		out.println(rs);

	}

	private void buscarPersonal(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String dibujar = request.getParameter("draw");
		String jsonString = request.getParameter("json");
		String busqueda = request.getParameter("busqueda").trim();
		JSONObject jsonlistado = srv.BuscarTipoPersonal(busqueda);
		JSONObject jsonImprimir = new JSONObject();
		
		jsonImprimir.put("data", jsonlistado.get("data"));
		jsonImprimir.put("draw", dibujar);
		out.println(jsonImprimir);
	}

	private void reporteProgramacion(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String dibujar = request.getParameter("draw");
		String jsonString = request.getParameter("json");

		JSONObject json = new JSONObject(jsonString)
			.put("length", Integer.parseInt(request.getParameter("length")))
			.put("start", Integer.parseInt(request.getParameter("start")));

		int cantidadRegistros = 0;
		JSONObject jsonlistado = srv.reporteProgramacion(json);
		JSONObject jsonImprimir = new JSONObject();

		cantidadRegistros = jsonlistado.getInt("cantidad");

		jsonImprimir.put("data", jsonlistado.get("data"));
		jsonImprimir.put("draw", dibujar);
		jsonImprimir.put("recordsFiltered", cantidadRegistros);
		jsonImprimir.put("recordsTotal", cantidadRegistros);
		out.println(jsonImprimir);
	}

	private void listarGeneral(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String dibujar = request.getParameter("draw");
		String jsonString = request.getParameter("json");

		JSONObject json = new JSONObject(jsonString)
			.put("length", Integer.parseInt(request.getParameter("length")))
			.put("start", Integer.parseInt(request.getParameter("start")));

		int cantidadRegistros = 0;

		JSONObject jsonlistado = srv.listarGeneral(json);
		JSONObject jsonImprimir = new JSONObject();

		cantidadRegistros = jsonlistado.getInt("cantidad");

		jsonImprimir.put("data", jsonlistado.get("data"));
		jsonImprimir.put("draw", dibujar);
		jsonImprimir.put("recordsFiltered", cantidadRegistros);
		jsonImprimir.put("recordsTotal", cantidadRegistros);
		out.println(jsonImprimir);
	}

	private void listarPersonalSinSede(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String dibujar = request.getParameter("draw");
		String jsonString = request.getParameter("json");

		JSONObject json = new JSONObject(jsonString)
			.put("length", Integer.parseInt(request.getParameter("length")))
			.put("start", Integer.parseInt(request.getParameter("start")));

		int cantidadRegistros = 0;

		JSONObject jsonlistado = srv.listarPersonalSinSede(json);
		JSONObject jsonImprimir = new JSONObject();

		cantidadRegistros = jsonlistado.getInt("cantidad");

		jsonImprimir.put("data", jsonlistado.get("data"));
		jsonImprimir.put("draw", dibujar);
		jsonImprimir.put("recordsFiltered", cantidadRegistros);
		jsonImprimir.put("recordsTotal", cantidadRegistros);
		out.println(jsonImprimir);
	}

	private void listarPersonal(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		try (PrintWriter out = response.getWriter()) {

			PersonaService srv = new PersonaService();
			String dibujar = request.getParameter("draw");
			String jsonString = request.getParameter("json");

			JSONObject json = new JSONObject(jsonString)
				.put("length", Integer.parseInt(request.getParameter("length")))
				.put("start", Integer.parseInt(request.getParameter("start")));

			int cantidadRegistros = 0;
			JSONObject jsonlistado = srv.listarPersonal(json);
			JSONObject jsonImprimir = new JSONObject();

			cantidadRegistros = jsonlistado.getInt("cantidad");
			
			jsonImprimir.put("data", jsonlistado.get("data"));
			jsonImprimir.put("draw", dibujar);
			jsonImprimir.put("recordsFiltered", cantidadRegistros);
			jsonImprimir.put("recordsTotal", cantidadRegistros);
			out.println(jsonImprimir);
		}
	}

	private void listarprogramaciones(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String dibujar = request.getParameter("draw");
		String jsonString = request.getParameter("json");

		JSONObject json = new JSONObject(jsonString);

		int cantidadRegistros = 0;

		JSONObject jsonlistado = srv.listarprogramaciones(json);
		JSONObject jsonImprimir = new JSONObject();

		jsonImprimir.put("data", jsonlistado.get("data"));
		jsonImprimir.put("draw", dibujar);
		jsonImprimir.put("recordsFiltered", cantidadRegistros);
		jsonImprimir.put("recordsTotal", cantidadRegistros);
		out.println(jsonImprimir);
	}

	private void listarCodigos(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		try (PrintWriter out = response.getWriter()) {

			PersonaService srv = new PersonaService();
			String dibujar = request.getParameter("draw");
			String jsonString = request.getParameter("json");

			JSONObject json = new JSONObject(jsonString)
				.put("length", Integer.parseInt(request.getParameter("length")))
				.put("start", Integer.parseInt(request.getParameter("start")));

			int cantidadRegistros = 0;
			JSONObject jsonlistado = srv.listarCodigos(json);
			JSONObject jsonImprimir = new JSONObject();

			cantidadRegistros = jsonlistado.getInt("cantidad");

			jsonImprimir.put("data", jsonlistado.get("data"));
			jsonImprimir.put("draw", dibujar);
			jsonImprimir.put("recordsFiltered", cantidadRegistros);
			jsonImprimir.put("recordsTotal", cantidadRegistros);
			out.println(jsonImprimir);
		}

	}

	private void listarsedesfaltantes(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String dibujar = request.getParameter("draw");
		String jsonString = request.getParameter("json");

		JSONObject json = new JSONObject(jsonString);

		int cantidadRegistros = 0;

		JSONObject jsonlistado = srv.listarsedesfaltantes(json);
		JSONObject jsonImprimir = new JSONObject();

		jsonImprimir.put("data", jsonlistado.get("data"));
		jsonImprimir.put("draw", dibujar);
		jsonImprimir.put("recordsFiltered", cantidadRegistros);
		jsonImprimir.put("recordsTotal", cantidadRegistros);
		out.println(jsonImprimir);
	}

	public void ActualizarMarcacion(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String jsonString = request.getParameter("json");
		JSONObject json = new JSONObject(jsonString);

		JSONObject rs = srv.actualizarMarcacion(json);
		out.print(rs);
	}

	private void obtenerdatatrabajador(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String dibujar = request.getParameter("draw");
		String jsonString = request.getParameter("json");

		JSONObject json = new JSONObject(jsonString);

		int cantidadRegistros = 0;

		JSONObject jsonlistado = srv.datatrabajadores(json);
		JSONObject jsonImprimir = new JSONObject();

		jsonImprimir.put("data", jsonlistado.get("data"));
		jsonImprimir.put("draw", dibujar);
		out.println(jsonImprimir);
	}

	private void ObtenerDataTrabajadorSinSede(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String dibujar = request.getParameter("draw");
		String jsonString = request.getParameter("json");

		JSONObject json = new JSONObject(jsonString);

		int cantidadRegistros = 0;

		JSONObject jsonlistado = srv.ObtenerDataTrabajadorSinSede(json);
		JSONObject jsonImprimir = new JSONObject();

		jsonImprimir.put("data", jsonlistado.get("data"));
		jsonImprimir.put("draw", dibujar);
		out.println(jsonImprimir);
	}

	private void ObtenerfiltroXdni(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String dibujar = request.getParameter("draw");
		String jsonString = request.getParameter("json");

		JSONObject json = new JSONObject(jsonString);

		int cantidadRegistros = 0;

		JSONObject jsonlistado = srv.ObtenerfiltroXdni(json);
		JSONObject jsonImprimir = new JSONObject();
		jsonImprimir.put("data", jsonlistado.get("data"));
		jsonImprimir.put("draw", dibujar);
		out.println(jsonImprimir);
	}

	private void ObtenerDatosDeEmpleadosxSedes(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String dibujar = request.getParameter("draw");
		String jsonString = request.getParameter("json");

		JSONObject json = new JSONObject(jsonString);

		int cantidadRegistros = 0;
		JSONObject jsonlistado = srv.ObtenerEmpleadosxSedes(json);
		JSONObject jsonImprimir = new JSONObject();
		jsonImprimir.put("data", jsonlistado.get("data"));
		jsonImprimir.put("draw", dibujar);
		out.println(jsonImprimir);
	}

	public void insertarPersonal(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();

		String jsonString = request.getParameter("json");
		JSONObject json = new JSONObject(jsonString);
		String dni = json.get("dni_personal").toString();
		String cargoWebAdministrativa = "";

		cargoWebAdministrativa = srv.ObtenerCargoWeb(dni);
		json.put("cargoWebAdministrativa", cargoWebAdministrativa);
		JSONObject rs = srv.insertarPersona(json);
		out.print(rs);
	}

	public void InsertarPersonalSinSede(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String jsonString = request.getParameter("json");
		JSONObject json = new JSONObject(jsonString);

		JSONObject rs = srv.InsertarPersonalSinSede(json);
		out.print(rs);
	}

	public void EliminarSede(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String jsonString = request.getParameter("json");
		JSONObject json = new JSONObject(jsonString);

		JSONObject rs = srv.EliminarSede(json);
		out.print(rs);
	}

	private void programarSedesHuella(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String jsonString = request.getParameter("json");
		JSONObject json = new JSONObject(jsonString);
		JSONObject rs = srv.cambiarEstadoProgramacionLista(json);

	}

	public void actualizarEstado(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String jsonString = request.getParameter("json");
		JSONObject json = new JSONObject(jsonString);

		JSONObject rs = srv.procesoactualizarEstado(json);
		out.print(rs);
	}

	public void insertarPersonalSede(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String jsonString = request.getParameter("json");
		JSONObject json = new JSONObject(jsonString);
		JSONObject rs = srv.insertarPersonaSedes(json);
		out.print(rs);
	}

	public void actualizarPersonal(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String jsonString = request.getParameter("json");
		JSONObject json = new JSONObject(jsonString);

		JSONObject rs = srv.actualizarPersonal(json);
		out.print(rs);
	}

	public void actualizarPersonalSinSede(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		PersonaService srv = new PersonaService();
		String jsonString = request.getParameter("json");
		JSONObject json = new JSONObject(jsonString);

		JSONObject rs = srv.actualizarPersonalSinSede(json);
		out.print(rs);
	}
}
