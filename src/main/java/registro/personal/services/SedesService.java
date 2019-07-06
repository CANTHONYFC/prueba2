/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.services;

import org.json.JSONObject;
import registro.personal.dao.DAOFactory;
import registro.personal.dao.SedesDao;

/**
 *
 * @author sistem16user
 */
public class SedesService {

	DAOFactory factorySql = DAOFactory.getDAOFactory(DAOFactory.SQLSERVER);
	SedesDao daoSede = factorySql.getSedesDAO();
//	DAOFactory factory = DAOFactory.getDAOFactory(DAOFactory.SQL);
//	SedesDao daoSede = factory.getSedesDao();

	public JSONObject listarSedes() {
		JSONObject retorno = null;
		try {
			retorno = daoSede.listarSedes();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}
	public static void main(String[] args) {
		SedesService a = new SedesService();
	
	}

	public JSONObject listarAutorizados() {
			JSONObject retorno = null;
		try {
			retorno = daoSede.listarAutorizados();
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}

	public JSONObject listarCargos() {
			JSONObject retorno = null;
		try {
			retorno = daoSede.listarCargos();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}
}
