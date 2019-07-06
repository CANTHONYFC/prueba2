/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.dao;

import org.json.JSONObject;

/**
 *
 * @author sistem16user
 */
public interface DetalleProgramacionDao {

	public JSONObject obtenerEstadoProgramacion(JSONObject obj) throws Exception;

	public JSONObject cambiarEstadoProgramacion(JSONObject obj) throws Exception;

	public JSONObject cambiarEstadoProgramacionLista(JSONObject obj) throws Exception;

	public JSONObject listarSedes(JSONObject obj) throws Exception;

	public JSONObject opcionListarSedes(JSONObject obj) throws Exception;

}
