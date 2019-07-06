/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.services;

import static com.sun.org.apache.xalan.internal.xsltc.compiler.util.Type.Int;
import org.json.JSONArray;
import org.json.JSONObject;
import registro.personal.dao.DAOFactory;
import registro.personal.dao.PersonalDao;


/**
 *
 * @author sistem16user
 */
public class PersonaService {

	DAOFactory factoryMysql = DAOFactory.getDAOFactory(DAOFactory.MYSQL);
	PersonalDao daoPersonaWebMysql = factoryMysql.getPersonalDAO();
	DAOFactory factory = DAOFactory.getDAOFactory(DAOFactory.SQLSERVER);
	PersonalDao daoPersona = factory.getPersonalDAO();
	

	public JSONObject validarPersonal(JSONObject obj) {
		
		JSONObject retorno = null;
		try {

			retorno = daoPersona.validarPersonal(obj);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}

	public JSONObject listarPersonal(JSONObject obj) {
		JSONObject retorno = null;
		try {

//daoPersonaWebMysql.listadoPersonalWeb(obj).getJSONArray("data")
			retorno = daoPersona.listarPersonal(obj,obj);
	
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}
	
	
	
	
        public JSONObject listarPersonalSinSede(JSONObject obj) {
		JSONObject retorno = null;
		try {

			retorno = daoPersona.listarPersonalSinSede(obj);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}
	
	

	public JSONObject insertarPersona(JSONObject param) {
		JSONObject obj = null;
		try {
			obj = daoPersona.insertarPersonal(param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}
       
         public JSONObject InsertarPersonalSinSede(JSONObject obj) {
	JSONObject retorno = null;
		try {

			retorno = daoPersona.InsertarPersonalSinSede(obj);
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}
        
        
        
        
          public JSONObject EliminarSede(JSONObject param) {
		JSONObject obj = null;
		try {
			obj = daoPersona.EliminarSede(param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}
        

	public static void main(String[] args) {

		JSONObject obj = new JSONObject();
		obj.put("dniPersonal", "76226628");
		PersonaService a = new PersonaService();

		//		JSONObject objJ = new JSONObject();
//		PersonalSqlDao uper = new PersonalSqlDao();
//		objJ.put("dniPersonal", "76226628");
//		uper.validarPersonal(objJ);

	}

	
        
        
        public JSONObject insertarPersonaSedes(JSONObject param) {
		JSONObject obj = null;
		try {
			obj = daoPersona.insertarPersonalSedes(param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj; //To change body of generated methods, choose Tools | Templates.
	}
        
        

	public JSONObject procesoactualizarEstado(JSONObject param) {
		
		JSONObject obj = null;
		try {
			obj = daoPersona.actualizarEstado(param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
		//To change body of generated methods, choose Tools | Templates.
	}

	public JSONObject listarprogramaciones(JSONObject obj) {
		JSONObject retorno = null;
		try {
			retorno = daoPersona.listarProgramaciones(obj);
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno; //To change body of generated methods, choose Tools | Templates.
	}

	   
public JSONObject listarCodigos(JSONObject obj) {
		JSONObject retorno = null;
		try {

			retorno = daoPersona.listarCodigos(obj);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno; //To change body of generated methods, choose Tools | Templates.
	}

	public JSONObject cambiarEstadoProgramacionLista(JSONObject json) {
		JSONObject obj = null;
		try {
			obj = daoPersona.cambiarEstadoProgramacionLista(json);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;//To change body of generated methods, choose Tools | Templates.
	}

public JSONObject datatrabajadores(JSONObject obj) {
		JSONObject retorno = null;
		try {

			retorno = daoPersona.datatrabajadores(obj);
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}
public JSONObject ObtenerDataTrabajadorSinSede(JSONObject obj) {
		JSONObject retorno = null;
		try {
//			System.out.println(obj);
			retorno = daoPersona.ObtenerDataTrabajadorSinSede(obj);
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}



public JSONObject actualizarMarcacion(JSONObject param) {
		
		JSONObject obj = null;
		try {
			obj = daoPersona.actualizarMarcacion(param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
		//To change body of generated methods, choose Tools | Templates.
	}
	public JSONObject ObtenerEmpleadosxSedes(JSONObject obj) {
		JSONObject retorno = null;
		try {
//			System.out.println(obj);
			retorno = daoPersona.ObtenerDatosDeEmpleadosxSedes(obj);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}

	public JSONObject listarsedesfaltantes(JSONObject json) {
	JSONObject retorno = null;
		try {
//			System.out.println(obj);
			retorno = daoPersona.listarsedesfaltantes(json);
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}
//actualizamos data del empleado como de sedes



	
	public JSONObject actualizarPersonal(JSONObject json) {
	JSONObject retorno = null;
		try {
//			System.out.println(obj);
			retorno = daoPersona.actualizarPersonal(json);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}
        public JSONObject actualizarPersonalSinSede(JSONObject json) {
	JSONObject retorno = null;
		try {
//			System.out.println(obj);
			retorno = daoPersona.actualizarPersonalSinSede(json);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}

	
	
	public JSONObject reporteProgramacion(JSONObject obj) {
		JSONObject retorno = null;
		try {
//			System.out.println(obj);
			retorno = daoPersona.reporteProgramacion(obj);
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}
	
	
	public JSONObject reporteExcel(JSONObject obj) {
		JSONObject retorno = null;
		try {
//			System.out.println(obj);
			retorno = daoPersona.reporteExcel(obj);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}
	
	
	public JSONObject reporteExcel_codigos(JSONObject obj) {
		JSONObject retorno = null;
		try {
//			System.out.println(obj);
			retorno = daoPersona.reporteExcel_codigos(obj);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}
        
        
        public JSONObject reporteExcel_General(JSONObject obj) {
		JSONObject retorno = null;
		try {
//			System.out.println(obj);
			retorno = daoPersona.reporteExcel_General(obj);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}
	
	

	public JSONObject ObtenerfiltroXdni(JSONObject obj) {
	JSONObject retorno = null;
		try {
//			System.out.println(obj);
			retorno = daoPersona.ObtenerfiltroXdni(obj);
	
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	
	}

	
	public JSONObject  listarGeneral(JSONObject obj) {
		JSONObject retorno = null;
		try {
//			System.out.println(obj);
			retorno = daoPersona.listarGeneral(obj);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}

	public String  ObtenerCargoWeb(String dni) {
	String retorno = null;
		try {
//			System.out.println(obj);
			retorno = daoPersonaWebMysql.ObtenerCargoWeb(dni);
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}

		
	public JSONObject  BuscarTipoPersonal(String busqueda) {
		JSONObject retorno = null;
		try {
//			System.out.println(obj);
			retorno = daoPersona.BuscarPersonal(busqueda);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retorno;
	}
	
	


	
	

  

}
