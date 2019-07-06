/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.sqldao;

import java.sql.Connection;
import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONObject;
import registro.personal.dao.PersonalSedesDao;
import registro.personal.utilities.DAOHelper;

/**
 *
 * @author sistem16user
 */
public class PersonalSedesSqlDao implements PersonalSedesDao {

	@Override
	public JSONObject insertarPersonalSedes(JSONObject obj) throws Exception {

		JSONObject response = new JSONObject();
		try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
			String query = "{call PRO_INGRESAR_TRABAJADORES_POR_EQUIPO_IN(?,?)}";
			JSONArray params = new JSONArray()
				.put(obj.getInt("CodTrabajador"))
				.put(obj.getInt("CodEquipo"));
			response = DAOHelper.executeCS(cn, query, params);
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("Inserto correctamente");
		return response;

	}

	public static void main(String[] args) throws Exception {

		String[] sedes = new String[4];
		sedes[0] = "0";
		sedes[1] = "1";
		sedes[2] = "2";
		sedes[3] = "3";
		JSONObject json = new JSONObject();
		json.put("CodTrabajador", 29);
		json.put("CodEquipo", 50);
		PersonalSedesSqlDao a = new PersonalSedesSqlDao();
		a.insertarPersonalSedes(json);
		
	}

}
