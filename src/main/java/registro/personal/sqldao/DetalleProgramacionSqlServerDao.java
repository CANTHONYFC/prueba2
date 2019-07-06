/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.sqldao;

import java.sql.Connection;
import org.json.JSONArray;
import org.json.JSONObject;
import registro.personal.dao.DetalleProgramacionDao;
import registro.personal.utilities.DAOHelper;

/**
 *
 * @author sistem16user
 */
public class DetalleProgramacionSqlServerDao implements DetalleProgramacionDao {

	@Override
	public JSONObject obtenerEstadoProgramacion(JSONObject obj) throws Exception {
		JSONObject response = new JSONObject();
		boolean status = true;
		JSONArray personalSeleccionado = null;
		try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
			String query = "{call PRO_OBTENER_LISTADO_PROGRAMACION_SEL(?)}";
			JSONArray params = new JSONArray()
				.put(obj.get("codTrabajador"));
			personalSeleccionado = DAOHelper.queryProcedure(cn, query, params);
			response.put("message", "Se listaron correctamente");
		} catch (Exception e) {
			e.printStackTrace();
			status = false;
			response.put("message", "Error en el proceso");
		}
		response.put("data", personalSeleccionado);
		response.put("status", status);
		return response;

	}

	@Override
	public JSONObject cambiarEstadoProgramacion(JSONObject obj) throws Exception {
		//		PRO_CAMBIAR_ESTADO_PROGRAMACION_UPDATE
		JSONObject response = new JSONObject();
		try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
			String query = "{call PRO_CAMBIAR_ESTADO_PROGRAMACION_UPDATE(?,?,?)}";
			JSONArray params = new JSONArray()
				.put(obj.getBoolean("estadoPro"))
				.put(obj.getInt("codTrabajador"))
				.put(obj.getInt("codEquipo"));
			response = DAOHelper.executeCS(cn, query, params);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}

	@Override
	public JSONObject cambiarEstadoProgramacionLista(JSONObject obj) throws Exception {
		return null;

	}

	@Override
	public JSONObject listarSedes(JSONObject json) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject opcionListarSedes(JSONObject json) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	public static void main(String[] args) throws Exception {

		DetalleProgramacionSqlServerDao srv = new DetalleProgramacionSqlServerDao();
		JSONObject json = new JSONObject();
		json.put("estadoPro", true);
		json.put("codTrabajador", 6);
		json.put("codEquipo", 3);
		srv.cambiarEstadoProgramacion(json);

	}
}
