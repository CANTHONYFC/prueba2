/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.services;

import org.json.JSONObject;
import registro.personal.dao.DAOFactory;
import registro.personal.dao.PersonalDao;
import registro.personal.dao.PersonalSedesDao;

/**
 *
 * @author sistem16user
 */
public class PersonalSedesService {

	DAOFactory factory = DAOFactory.getDAOFactory(DAOFactory.SQLSERVER);
	PersonalSedesDao daoPersonaSede = factory.getPersonalSedesDao();
	
	
		public JSONObject insertarPersonalSedes(JSONObject obj) {
		JSONObject retorno = null;
		try {

			retorno = daoPersonaSede.insertarPersonalSedes(obj);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}

}
