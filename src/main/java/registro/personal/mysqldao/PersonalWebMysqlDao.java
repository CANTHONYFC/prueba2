/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.mysqldao;

import registro.personal.sqldao.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.json.JSONArray;
import org.json.JSONObject;
import registro.personal.dao.PersonalDao;
import registro.personal.utilities.DAOHelper;

/**
 *
 * @author sistem16user
 */
public class PersonalWebMysqlDao implements PersonalDao {

	@Override
	public JSONObject validarPersonal(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}


	@Override
	public JSONObject listarPersonalSinSede(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject insertarPersonal(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject insertarPersonalSedes(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject actualizarEstado(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject listarProgramaciones(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject cambiarEstadoProgramacionLista(JSONObject json) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject datatrabajadores(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject ObtenerDataTrabajadorSinSede(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject actualizarMarcacion(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject ObtenerDatosDeEmpleadosxSedes(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject listarsedesfaltantes(JSONObject json) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject actualizarPersonal(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject actualizarPersonalSinSede(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject reporteProgramacion(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject ObtenerfiltroXdni(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject reporteExcel(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject listarCodigos(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject reporteExcel_codigos(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject listarGeneral(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject EliminarSede(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject reporteExcel_General(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject InsertarPersonalSinSede(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}
	
@Override
	public  String ObtenerCargoWeb(String dni) throws Exception{
		
		String cargo="";
		JSONObject response = new JSONObject();
		JSONArray lista;
				StringBuilder builder = new StringBuilder();
		String nombreBase = "administrativo";
		Connection cnx = MySqlDAOFactory.obtenerConexion(nombreBase);
		if (cnx == null) {
		} else {
			String query = "{ call PRO_OBTENER_CARGO_PARA_HUELLAS(?) }";
 JSONArray params = new JSONArray()
                      .put(dni);
                           lista = DAOHelper.queryProcedure(cnx, query, true, params);

            response.put("data", lista);
						if(lista.length()==0){
								cargo=" ";
						}else {
								cargo=lista.getJSONObject(0).getString("1");
						}
				
	
			cnx.close();
		}
		return cargo;
	}
    @Override
    public JSONObject listadoPersonalWeb(JSONObject obj) throws SQLException, Exception {
        JSONObject response = new JSONObject();
        return response;
    }

	@Override
	public JSONObject listarPersonal(JSONObject obj, JSONObject listadoPersonalWeb) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject BuscarPersonal(String busqueda) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	



}
