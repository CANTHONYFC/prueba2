/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.utilities;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Scanner;
import javax.servlet.http.HttpServletRequest;
import org.json.JSONException;

import org.json.JSONObject;

/**
 *
 * @author sistem08user
 */
public class CustomHttpServletRequest {

	public static String getBody(HttpServletRequest req) throws IOException {
		String body = "";
		if ("POST".equalsIgnoreCase(req.getMethod())) {
			try {
				StringBuilder sb = new StringBuilder();
				BufferedReader bufferedReader = null;

				bufferedReader = req.getReader(); // swallow silently -- can't get body, won't
				char[] charBuffer = new char[128];
				int bytesRead;
				while ((bytesRead = bufferedReader.read(charBuffer)) != -1) {
					sb.append(charBuffer, 0, bytesRead);
				}
				if (bufferedReader != null) {
					bufferedReader.close(); // swallow silently -- can't get body, won't
				}
				body = sb.toString();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return body;
	}

	public static JSONObject getBodyJsonObject(HttpServletRequest request) throws IOException {
		String body = "";
		JSONObject respuesta = new JSONObject();
		if ("POST".equalsIgnoreCase(request.getMethod())) {
			try {
				StringBuilder sb = new StringBuilder();
				BufferedReader bufferedReader = null;

				bufferedReader = request.getReader(); // swallow silently -- can't get body, won't
				char[] charBuffer = new char[128];
				int bytesRead;
				while ((bytesRead = bufferedReader.read(charBuffer)) != -1) {
					sb.append(charBuffer, 0, bytesRead);
				}
				if (bufferedReader != null) {
					bufferedReader.close(); // swallow silently -- can't get body, won't
				}
				body = sb.toString();
				if (body.length() > 0) {
					respuesta = new JSONObject(body);
				};
			} catch (IOException | JSONException e) {
				e.printStackTrace();
			}
		}
		return respuesta;
	}

	static String extractPostRequestBody(HttpServletRequest request) {
		if ("POST".equalsIgnoreCase(request.getMethod())) {
			Scanner s = null;
			try {
				s = new Scanner(request.getInputStream(), "UTF-8").useDelimiter("\\A");
			} catch (IOException e) {
				e.printStackTrace();
			}
			return s.hasNext() ? s.next() : "";
		}
		return "";
	}
}
