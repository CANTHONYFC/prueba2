/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.sqldao;

import java.sql.Connection;
import org.json.JSONArray;
import org.json.JSONObject;
import registro.personal.dao.SedesDao;
import registro.personal.utilities.DAOHelper;

/**
 *
 * @author sistem16user
 */
public class SedesSqlDao implements SedesDao {

	@Override
	public JSONObject listarSedes() throws Exception {
		JSONObject response = new JSONObject();
		boolean status = true;
		JSONArray listado = null;
		try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
			String query = "{call PRO_LISTAR_SEDES_SELE}";
			listado = DAOHelper.queryProcedure(cn, query, false);
			response.put("message", "Se listaron correctamente");
		} catch (Exception e) {
			e.printStackTrace();
			status = false;
			response.put("message", "Error en el proceso");
		}
		response.put("data", listado);
		response.put("status", status);
		return response;
	}
	@Override
	public JSONObject listarAutorizados() throws Exception {
		JSONObject response = new JSONObject();
		boolean status = true;
		JSONArray listado = null;
		try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
			String query = "{call PRO_LISTAR_PERSONAL_AUTORIZADO}";
			listado = DAOHelper.queryProcedure(cn, query, false);
			response.put("message", "Se listaron correctamente");
		} catch (Exception e) {
			e.printStackTrace();
			status = false;
			response.put("message", "Error en el proceso");
		}
		response.put("data", listado);
		response.put("status", status);
		return response;
	}	
	@Override
	public JSONObject listarCargos() throws Exception {
		JSONObject response = new JSONObject();
		boolean status = true;
		JSONArray listado = null;
		try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
			String query = "{call PRO_LISTAR_PERSONAL_AUTORIZADO}";
			listado = DAOHelper.queryProcedure(cn, query, false);
			response.put("message", "Se listaron correctamente");
		} catch (Exception e) {
			e.printStackTrace();
			status = false;
			response.put("message", "Error en el proceso");
		}
		response.put("data", listado);
		response.put("status", status);
		return response;
	}	
	public static void main(String[] args) throws Exception {

		SedesSqlDao a = new SedesSqlDao();
	}

	

}
