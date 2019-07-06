/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import registro.personal.services.PersonaService;
import registro.personal.services.SedesService;

/**
 *
 * @author sistem16user
 */
public class SedesServlet extends HttpServlet {

	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		String accion = request.getParameter("accion");
		switch (accion) {
			case "listarSedes":
				listarSedes(response, request);
				break;
				case "listarAutorizados":
				listarAutorizados(response, request);
				break;
				case "listarCargos":
				listarCargos(response, request);
				break;
			default:
		}
	}

	private void listarSedes(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		SedesService srv = new SedesService();
		JSONObject rs = srv.listarSedes();
		out.println(rs);

	}
	private void listarAutorizados(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		SedesService srv = new SedesService();
		JSONObject rs = srv.listarAutorizados();
		out.println(rs);

	}
		private void listarCargos(HttpServletResponse response, HttpServletRequest request) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		SedesService srv = new SedesService();
		JSONObject rs = srv.listarCargos();
		out.println(rs);

	}
	


}
