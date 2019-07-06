/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.servlets;

import com.poqh.utilities.Functions;
import com.poqh.utilities.SecurityAlternative;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONObject;

/**
 *
 * @author sistem06user
 */
public class CustomSecurityServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String ruta = request.getServletPath();
        if (request.getMethod().equalsIgnoreCase("POST")) {
            switch (ruta) {
                case "/vistas/login":
                    login(request, response);
                    break;
                case "/vistas/interceptar":
                    interceptar(request, response);
                    break;
                case "/vistas/logout":
                    logout(request, response);
                    break;
                case "/vistas/redireccionarServlet":
                    redireccionar(request, response);
                    break;
                case "/servlet/authServlet":
                    auth(request, response);
                    break;
            }
        }
    }

    private void login(HttpServletRequest request, HttpServletResponse response) {
        SecurityAlternative security = new SecurityAlternative();
        security.login(request, response, new Functions.LoginFunction() {
            @Override
            public void call(JSONObject data, JSONObject dataPersonal, HttpSession session) throws Exception {
                session.setAttribute("codigoTrabajador", data.getString("codigoTrabajador"));
								session.setAttribute("dni", data.getString("dni"));
              
                
            }
        });
    }

    private void interceptar(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        SecurityAlternative security = new SecurityAlternative();
        security.interceptar(request, response);
    }

    private void logout(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException, IOException, ServletException {
        SecurityAlternative security = new SecurityAlternative();
        security.logout(request, response);
    }

    private void redireccionar(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        try {
        SecurityAlternative security = new SecurityAlternative();
        security.redireccionar(request, response, new Functions.LoginFunction() {
            @Override
            public void call(JSONObject data, JSONObject dataPersonal, HttpSession session) throws Exception {
                session.setAttribute("codigoTrabajador", data.getString("codigoTrabajador"));
								session.setAttribute("dni", data.getString("dni"));
            }
        });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
	

    private void auth(HttpServletRequest request, HttpServletResponse response) throws IOException {
        SecurityAlternative security = new SecurityAlternative();
        security.auth(request, response);
    }
    
}
