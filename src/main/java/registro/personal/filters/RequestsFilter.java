/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.filters;

import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import org.json.JSONArray;
import org.json.JSONObject;
import registro.personal.config.RequestPath;
import registro.personal.utilities.GeneralMethods;
import registro.personal.utilities.HttpRequest;

/**
 *
 * @author Percy Oliver Quispe Huarcaya
 */
public class RequestsFilter implements Filter {

	private FilterConfig filterConfig = null;

	public RequestsFilter() {
	}

	private void doBeforeProcessing(ServletRequest req, ServletResponse resp, FilterChain chain)
		throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) resp;
		String uri = request.getRequestURI();
		if (uri.endsWith("vistas/index.jsp") || uri.endsWith("vistas/")) {
			if (request.getSession().getAttribute("codigo") != null) {
				response.sendRedirect("main.jsp");
				return;
			}
			chain.doFilter(req, resp);
		} else {
			if (request.getSession().getAttribute("codigo") != null) {
				if (uri.endsWith(".jsp")) {
					HttpSession session = request.getSession();
					HttpRequest httpRequest = new HttpRequest();
					JSONObject valid = null;
					String respuesta = "";
					String auth = "";
					try {
						if (session.getAttribute("Authorization") != null) {
							auth = (String) session.getAttribute("Authorization");
						} else {
							setError(response);
						}
						respuesta = httpRequest.getRespuesta(RequestPath.VERIFICAR_LOGIN, HttpRequest.POST, new JSONObject("{}"), auth);
						valid = new JSONObject(respuesta);
						if (valid.getBoolean("status")) {
							JSONObject menu = new JSONObject(valid.getString("menu"));//Obtiene el menu
							List<Object> vistas = new ArrayList<>();
							JSONObject rolvista = valid.getJSONObject("rolvista");
							JSONArray urls = rolvista.getJSONArray("vistas");
							for (int i = 0; i < urls.length(); i++) {
								vistas.add(urls.get(i));
							}
							vistas.add("main.jsp");
							String ruta = request.getRequestURI();
							int indice = GeneralMethods.obtenerIndex(ruta);
							String rutaJsp = ruta.substring(indice, ruta.length());
							boolean acceso = vistas.contains(rutaJsp);
							
							if (rutaJsp.contains("excel_")) {
								acceso = true;
							} else {
								vistas.add("main.jsp");
								vistas.add("BuscarPersonal.jsp");
								acceso = vistas.contains(rutaJsp);
							}
							
							if (!acceso) {
								request.getSession().setAttribute("error", "no tiene acceso a la vista solicitada");//Esta session se elimina en el jsp (para que no ocupe memoria)
								request.getRequestDispatcher("/vistas/templates/error.jsp").forward(request, response);
								return;
							}
							session.setAttribute("menu", menu.toString());
						} else {
							deleteCredenciales(response, request);
							request.getSession().setAttribute("error", "no tiene credenciales validas");
							request.getRequestDispatcher("/vistas/templates/error.jsp").forward(request, response);
							return;
						}
					} catch (Exception ex) {
						request.getSession().setAttribute("error", ex.getMessage());
						request.getRequestDispatcher("/vistas/templates/error.jsp").forward(request, response);
						return;
					}
				}
				chain.doFilter(request, response);
			} else {
				deleteCredenciales(response, request);
				response.sendRedirect("../vistas/index.jsp");
			}
		}
	}

	private void deleteCredenciales(HttpServletResponse response, HttpServletRequest request) {
		request.getSession().invalidate();
		Cookie cookieAuth = new Cookie("Authorization", "");
		cookieAuth.setMaxAge(0);
		response.addCookie(cookieAuth);
	}

	private void sendError(HttpServletResponse response) throws IOException {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.sendError(401);
	}

	public void setError(HttpServletResponse response) throws IOException {
		Response.ResponseBuilder builder = null;
		sendError(response);
		builder = Response.status(Response.Status.UNAUTHORIZED).entity(response);
		throw new WebApplicationException(builder.build());
	}

	private void doAfterProcessing(ServletRequest request, ServletResponse response)
		throws IOException, ServletException {

		// Write code here to process the request and/or response after
		// the rest of the filter chain is invoked.
		// For example, a logging filter might log the attributes on the
		// request object after the request has been processed. 
		/*
	for (Enumeration en = request.getAttributeNames(); en.hasMoreElements(); ) {
	    String name = (String)en.nextElement();
	    Object value = request.getAttribute(name);
	    log("attribute: " + name + "=" + value.toString());

	}
		 */
		// For example, a filter might append something to the response.
		/*
	PrintWriter respOut = new PrintWriter(response.getWriter());
	respOut.println("<P><B>This has been appended by an intrusive filter.</B>");
		 */
	}

	/**
	 *
	 * @param request The servlet request we are processing
	 * @param response The servlet response we are creating
	 * @param chain The filter chain we are processing
	 *
	 * @exception IOException if an input/output error occurs
	 * @exception ServletException if a servlet error occurs
	 */
	public void doFilter(ServletRequest request, ServletResponse response,
		FilterChain chain)
		throws IOException, ServletException {

		doBeforeProcessing(request, response, chain);

//            chain.doFilter(request, response);
		doAfterProcessing(request, response);

	}

	/**
	 * Return the filter configuration object for this filter.
	 */
	public FilterConfig getFilterConfig() {
		return (this.filterConfig);
	}

	/**
	 * Set the filter configuration object for this filter.
	 *
	 * @param filterConfig The filter configuration object
	 */
	public void setFilterConfig(FilterConfig filterConfig) {
		this.filterConfig = filterConfig;
	}

	/**
	 * Destroy method for this filter
	 */
	public void destroy() {
	}

	/**
	 * Init method for this filter
	 */
	public void init(FilterConfig filterConfig) {
		this.filterConfig = filterConfig;
		if (filterConfig != null) {
		}
	}

	/**
	 * Return a String representation of this object.
	 */
	@Override
	public String toString() {
		if (filterConfig == null) {
			return ("RequestsFilter()");
		}
		StringBuffer sb = new StringBuffer("RequestsFilter(");
		sb.append(filterConfig);
		sb.append(")");
		return (sb.toString());
	}

	private void sendProcessingError(Throwable t, ServletResponse response) {
		String stackTrace = getStackTrace(t);

		if (stackTrace != null && !stackTrace.equals("")) {
			try {
				response.setContentType("text/html");
				PrintStream ps = new PrintStream(response.getOutputStream());
				PrintWriter pw = new PrintWriter(ps);
				pw.print("<html>\n<head>\n<title>Error</title>\n</head>\n<body>\n"); //NOI18N

				// PENDING! Localize this for next official release
				pw.print("<h1>The resource did not process correctly</h1>\n<pre>\n");
				pw.print(stackTrace);
				pw.print("</pre></body>\n</html>"); //NOI18N
				pw.close();
				ps.close();
				response.getOutputStream().close();
			} catch (Exception ex) {
			}
		} else {
			try {
				PrintStream ps = new PrintStream(response.getOutputStream());
				t.printStackTrace(ps);
				ps.close();
				response.getOutputStream().close();
			} catch (Exception ex) {
			}
		}
	}

	public static String getStackTrace(Throwable t) {
		String stackTrace = null;
		try {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			t.printStackTrace(pw);
			pw.close();
			sw.close();
			stackTrace = sw.getBuffer().toString();
		} catch (Exception ex) {
		}
		return stackTrace;
	}

	public void log(String msg) {
		filterConfig.getServletContext().log(msg);
	}

}
