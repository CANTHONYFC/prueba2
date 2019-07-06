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

/**
 *
 * @author Felipe Escala
 */
public class AuthServlet extends HttpServlet {

	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
		String authorization = (String)request.getSession().getAttribute("Authorization");
		JSONObject auth = new JSONObject();
		auth.put("Authorization",authorization);
		auth.put("status", true);
		PrintWriter pw = response.getWriter();
		pw.print(auth);
	}

	
}
