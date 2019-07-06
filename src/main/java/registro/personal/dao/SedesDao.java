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
public interface SedesDao {
	public JSONObject listarSedes() throws Exception;

	public JSONObject listarAutorizados()throws Exception;

	public JSONObject listarCargos()throws Exception;
	
	
}
