/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.sqldao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import org.json.JSONArray;
import org.json.JSONObject;
import registro.personal.dao.PersonalDao;
import registro.personal.utilities.DAOHelper;

/**
 *
 * @author sistem16user
 */
public class PersonalHuellasSqlDao implements PersonalDao {

    @Override
    public JSONObject validarPersonal(JSONObject obj) {
        JSONObject response = new JSONObject();
        boolean status = true;
        JSONArray personalSeleccionado = null;
        try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
            String query = "{call PRO_VALIDAR_SEL(?)}";
            JSONArray params = new JSONArray()
                    .put("00" + obj.get("dniPersonal"));

            personalSeleccionado = DAOHelper.queryProcedure(cn, query, params);
						JSONObject objeto=null;
						String valorCodigo="";
 if (personalSeleccionado.length() != 0) {
                objeto = personalSeleccionado.getJSONObject(0);
								  valorCodigo = objeto.getString("EstadoDB");
            } else {
                System.out.println("no ay registros disponibles");
            }
            response.put("message", valorCodigo);
        } catch (Exception e) {
            e.printStackTrace();
            status = false;
            response.put("message", "Error en el proceso");
        }
        response.put("data", personalSeleccionado);
        response.put("status", status);
        return response;

    }

    public static void main(String[] args) throws Exception {

    }

    @Override
    public JSONObject listarGeneral(JSONObject obj) throws SQLException, Exception {
        JSONObject response = new JSONObject();
        boolean status = true;
        int cantidad = 0;
        JSONArray lista;
        try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
            String query = "{call PRO_LISTAR_GENERAL (?,?,?,?,?)}";
            
            JSONArray params = new JSONArray().put(obj.get("start"))
                    .put(obj.get("length"))
                    .put(obj.get("busqueda"))
                    .put(obj.get("cbfiltro"))
                    .put(obj.get("cboAutorizado"));

            lista = DAOHelper.queryProcedure(cn, query, true, params);

            response.put("data", lista);
        
            if (lista.length() != 0) {
                cantidad = lista.getJSONObject(0).getInt("9");
            } else {
                System.out.println("no ay registros disponibles");
            }

            response.put("message", "Se listaron correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            status = false;
            response.put("message", "Error en el proceso");

        }

        response.put("cantidad", cantidad);
        response.put("status", status);
        return response;
    }

    
     @Override
    public JSONObject listarPersonalSinSede(JSONObject obj) throws SQLException, Exception {
        JSONObject response = new JSONObject();
        boolean status = true;
        int cantidad = 0;
        JSONArray lista;
        try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
            String query = "{call PRO_LISTAR_TRABAJADORES_SIN_SEDE(?,?)}";
           
            JSONArray params = new JSONArray().put(obj.get("start"))
                    .put(obj.get("length"));

            lista = DAOHelper.queryProcedure(cn, query, true, params);

            response.put("data", lista);

            if (lista.length() != 0) {
                cantidad = lista.getJSONObject(0).getInt("10");
            } else {
                System.out.println("no ay registros disponibles");
            }

            response.put("message", "Se listaron correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            status = false;
            response.put("message", "Error en el proceso");

        }

        response.put("cantidad", cantidad);
        response.put("status", status);
        return response;
    }

    
		@Override
    public JSONObject listarPersonal(JSONObject obj, JSONObject listadoPersonalWeb)throws SQLException, Exception {
        JSONObject response = new JSONObject();
				
			
        boolean status = true;
        int cantidad = 0;
        JSONArray lista;

				
        try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
					 
            String query = "{call PRO_LISTAR_TRABAJADOR_SELE (?,?,?,?,?,?,?,?,?)}";
           
            JSONArray params = new JSONArray().put(obj.get("start"))
                    .put(obj.get("length"))
                    .put(obj.get("busqueda"))
                    .put(obj.get("cbfiltro"))
                    .put(obj.get("fechadesde"))
                    .put(obj.get("fechahasta"))
                    .put(obj.get("cbEstado"))
                    .put(obj.get("sedes"))
                    .put(obj.get("estadoPro"));

            lista = DAOHelper.queryProcedure(cn, query, true, params);

            response.put("data", lista);

            if (lista.length() != 0) {
                cantidad = lista.getJSONObject(0).getInt("10");
            } else {
                System.out.println("no ay registros disponibles");
            }

            response.put("message", "Se listaron correctamente");
       
         } catch (Exception e) {
            e.printStackTrace();
            status = false;
            response.put("message", "Error en el proceso");

				
				    }
				
				
				
				

        response.put("cantidad", cantidad);
        response.put("status", status);
        return response;
    }

		
		@Override
   public JSONObject BuscarPersonal(String busqueda)throws SQLException, Exception {
        JSONObject response = new JSONObject();
        boolean status = true;
        int cantidad = 0;
        JSONArray lista;
        try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
            String query = "{call PRO_BUSCAR_PERSONAL (?)}";
            JSONArray params = new JSONArray()
							.put(busqueda);
            lista = DAOHelper.queryProcedure(cn, query, true, params);
            response.put("data", lista);
            response.put("message", "Se listaron correctamente");
           } catch (Exception e) {
            e.printStackTrace();
            status = false;
            response.put("message", "Error en el proceso");
				    }
        response.put("status", status);
        return response;
    }
		
		
		
    @Override
    public JSONObject reporteProgramacion(JSONObject obj) throws SQLException, Exception {
        JSONObject response = new JSONObject();
        boolean status = true;
        int cantidad = 0;
        JSONArray lista;
        try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
            String query = "{call PRO_REPORTE_PROGRAMACION (?,?,?,?,?,?,?,?,?)}";
            
            JSONArray params = new JSONArray().put(obj.get("start"))
                    .put(obj.get("length"))
                    .put(obj.get("busqueda"))
                    .put(obj.get("cbfiltro"))
                    .put(obj.get("fechadesde"))
                    .put(obj.get("fechahasta"))
                    .put(obj.get("sedes"))
                    .put(obj.get("cbModoMarcacion"))
                    .put(obj.get("cbEstado"));

            lista = DAOHelper.queryProcedure(cn, query, true, params);

            response.put("data", lista);

            if (lista.length() != 0) {
                cantidad = lista.getJSONObject(0).getInt("8");
            } else {
                System.out.println("no ay registros disponibles");
            }

            response.put("message", "Se listaron correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            status = false;
            response.put("message", "Error en el proceso");

        }

        response.put("cantidad", cantidad);
        response.put("status", status);
        return response;
    }
		
		
	
		
		
		

    @Override
    public JSONObject listarCodigos(JSONObject obj) throws SQLException, Exception {
        JSONObject response = new JSONObject();
        boolean status = true;
        int cantidad = 0;
        JSONArray lista;
        try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
            String query = "{call PRO_LISTAR_TRABAJADORES_CODIGOS (?,?,?,?,?,?,?,?)}";
        
            JSONArray params = new JSONArray().put(obj.get("start"))
                    .put(obj.get("length"))
                    .put(obj.get("busqueda"))
                    .put(obj.get("cbfiltro"))
                    .put(obj.get("fechadesde"))
                    .put(obj.get("fechahasta"))
                    .put(obj.get("sedes"))
                    .put(obj.get("cbEstado"));

            lista = DAOHelper.queryProcedure(cn, query, true, params);

            response.put("data", lista);

            if (lista.length() != 0) {
                cantidad = lista.getJSONObject(0).getInt("8");
            } else {
                System.out.println("no ay registros disponibles");
            }

            response.put("message", "Se listaron correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            status = false;
            response.put("message", e.getMessage());

        }

        response.put("cantidad", cantidad);
        response.put("status", status);
       
        return response;
    }

    @Override
    public JSONObject reporteExcel(JSONObject obj) throws SQLException, Exception {
        JSONObject response = new JSONObject();
        boolean status = true;
        int cantidad = 0;
        JSONArray lista;
        try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
            String query = "{call PRO_REPORTE_EXCEL (?,?,?,?,?,?,?,?,?)}";
           
            JSONArray params = new JSONArray().put(obj.get("start"))
                    .put(obj.get("length"))
                    .put(obj.get("busqueda"))
                    .put(obj.get("cbfiltro"))
                    .put(obj.get("fechadesde"))
                    .put(obj.get("fechahasta"))
                    .put(obj.get("sedes"))
                    .put(obj.get("cbModoMarcacion"))
                    .put(obj.get("cbEstado"));

            lista = DAOHelper.queryProcedure(cn, query, true, params);

            response.put("data", lista);

            if (lista.length() != 0) {
                cantidad = lista.getJSONObject(0).getInt("8");
            } else {
                System.out.println("no ay registros disponibles");
            }
            response.put("message", "Se listaron correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            status = false;
            response.put("message", "Error en el proceso");

        }

        response.put("cantidad", cantidad);
        response.put("status", status);
        return response;
    }

    @Override
    public JSONObject reporteExcel_General(JSONObject obj) throws SQLException, Exception {
       
        JSONObject response = new JSONObject();
        boolean status = true;
        int cantidad = 0;
        JSONArray lista;
        try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
            String query = "{call PRO_REPORTE_EXCEL_GENERAL(?,?,?)}";
            JSONArray params = new JSONArray().put(obj.get("busqueda"))
                    .put(obj.get("cbfiltro"))
                    .put(obj.get("cboAutorizado"));

            lista = DAOHelper.queryProcedure(cn, query, true, params);

            response.put("data", lista);

            if (lista.length() != 0) {
                cantidad = lista.getJSONObject(0).getInt("8");
            } else {
                System.out.println("no ay registros disponibles");
            }

            response.put("message", "Se listaron correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            status = false;
            response.put("message", "Error en el proceso");

        }

        response.put("cantidad", cantidad);
        response.put("status", status);
        return response;
    }

    @Override
    public JSONObject reporteExcel_codigos(JSONObject obj) throws SQLException, Exception {
        JSONObject response = new JSONObject();
        boolean status = true;
        int cantidad = 0;
        JSONArray lista;
        try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
            String query = "{call PRO_REPORTE_CODIGOS_TRABAJADORES(?,?,?,?,?,?,?,?)}";
             JSONArray params = new JSONArray().put(obj.get("start"))
                    .put(obj.get("length"))
                    .put(obj.get("busqueda"))
                    .put(obj.get("cbfiltro"))
                    .put(obj.get("fechadesde"))
                    .put(obj.get("fechahasta"))
                    .put(obj.get("sedes"))
                    .put(obj.get("cbEstado"));

            lista = DAOHelper.queryProcedure(cn, query, true, params);

            response.put("data", lista);

            if (lista.length() != 0) {
                cantidad = lista.getJSONObject(0).getInt("8");
            } else {
                System.out.println("no ay registros disponibles");
            }

            response.put("message", "Se listaron correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            status = false;
            response.put("message", "Error en el proceso");

        }

        response.put("cantidad", cantidad);
        response.put("status", status);
        return response;
    }

    @Override
    public JSONObject listarsedesfaltantes(JSONObject obj) throws SQLException, Exception {
        JSONObject response = new JSONObject();
        boolean status = true;

        JSONArray lista;
        try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
            String query = "{call PRO_LISTAR_SEDES_FALTANTES (?)}";
              JSONArray params = new JSONArray()
                    .put(obj.get("codigo"));

            lista = DAOHelper.queryProcedure(cn, query, true, params);
            
            response.put("data", lista);

            response.put("message", "Se listaron correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            status = false;
            response.put("message", "Error en el proceso");

        }

        response.put("status", status);
        return response;
    }

    @Override
    public JSONObject listarProgramaciones(JSONObject obj) throws SQLException, Exception {
        JSONObject response = new JSONObject();
        boolean status = true;

        JSONArray lista;
        try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
            String query = "{call PRO_LISTAR_PROGRAMACIONES (?)}";
          
            JSONArray params = new JSONArray()
                    .put(obj.get("codigo"));

            lista = DAOHelper.queryProcedure(cn, query, true, params);
            response.put("data", lista);

            response.put("message", "Se listaron correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            status = false;
            response.put("message", "Error en el proceso");

        }

        response.put("status", status);
        return response;
    }

    @Override
    public JSONObject datatrabajadores(JSONObject obj) throws SQLException, Exception {
        JSONObject response = new JSONObject();
        boolean status = true;

        JSONArray lista;
        try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
            String query = "{call PRO_OBTENER_DATOS_TRABAJADOR (?)}";
            
            JSONArray params = new JSONArray()
                    .put(obj.get("codigo"));

            lista = DAOHelper.queryProcedure(cn, query, true, params);
   
            response.put("data", lista);

            response.put("message", "Se listaron correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            status = false;
            response.put("message", "Error en el proceso");

        }

        response.put("status", status);
        return response;
    }

    
     @Override
    public JSONObject  ObtenerDataTrabajadorSinSede(JSONObject obj) throws SQLException, Exception {
        JSONObject response = new JSONObject();
        boolean status = true;

        JSONArray lista;
        try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
            String query = "{call PRO_OBTENER_DATA_TRABAJADOR_SIN_SEDE (?)}";
            
            JSONArray params = new JSONArray()
                    .put(obj.get("codigo"));

            lista = DAOHelper.queryProcedure(cn, query, true, params);
          
            response.put("data", lista);

            response.put("message", "Se listaron correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            status = false;
            response.put("message", "Error en el proceso");

        }

        response.put("status", status);
        return response;
    }
    
    
   
    
    
    
    
    
    
    @Override
    public JSONObject ObtenerfiltroXdni(JSONObject obj) throws SQLException, Exception {
        JSONObject response = new JSONObject();
        boolean status = true;

        JSONArray lista;
        try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
            String query = "{call PRO_OBTENER_FILTROS_PERSONAL (?)}";
             JSONArray params = new JSONArray()
                    .put(obj.get("dni"));

            lista = DAOHelper.queryProcedure(cn, query, true, params);
          
            response.put("data", lista);

            response.put("message", "Se listaron correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            status = false;
            response.put("message", "Error en el proceso");

        }

        response.put("status", status);
        return response;
    }

    @Override
    public JSONObject ObtenerDatosDeEmpleadosxSedes(JSONObject obj) throws SQLException, Exception {
        JSONObject response = new JSONObject();
        boolean status = true;

        JSONArray lista;
        try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
            String query = "{call PRO_OBTENER_PERSONAL (?)}";
           JSONArray params = new JSONArray()
                    .put(obj.get("codigo"));
          
            lista = DAOHelper.queryProcedure(cn, query, true, params);
         
            response.put("data", lista);

            response.put("message", "Se listaron correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            status = false;
            response.put("message", "Error en el proceso");

        }

        response.put("status", status);
        return response;
    }

    @Override
    public JSONObject actualizarEstado(JSONObject obj) throws SQLException, Exception {

        Connection cn = null;
        JSONObject response = new JSONObject();
        try {

            cn = SqlDAOFactory.obtenerConexion("Huellas");
            cn.setAutoCommit(false);
            String query = "{call PRO_ACTUALIZAR_ESTADO_TRABAJADOR(?,?)}";
            JSONArray params = new JSONArray()
                    .put(obj.getInt("codigo"))
                    .put(obj.getInt("estado"));
            response = DAOHelper.executeCS(cn, query, params);

            cn.commit();
//					.put(obj.getString("sede_personal"));

        } catch (Exception e) {
            e.printStackTrace();
            if (cn != null) {
                cn.rollback();
            }
        }
        return response;
    }

    @Override
    public JSONObject actualizarMarcacion(JSONObject obj) throws SQLException, Exception {

        Connection cn = null;
        JSONObject response = new JSONObject();
        try {

            cn = SqlDAOFactory.obtenerConexion("Huellas");
            cn.setAutoCommit(false);
            String query = "{call PRO_ACTUALIZAR_MARCACION(?,?,?,?)}";
             JSONArray params = new JSONArray()
                    .put(obj.getInt("codigo"))
                    .put(obj.getInt("codigogenerado"))
                    .put(obj.getString("Motivo"))
                    .put(obj.getString("nombredelusuario"));
            response = DAOHelper.executeCS(cn, query, params);
            cn.commit();
//					.put(obj.getString("sede_personal"));
        } catch (Exception e) {
            e.printStackTrace();
            if (cn != null) {
                cn.rollback();
            }
        }
        return response;
    }

    @Override

    public JSONObject insertarPersonal(JSONObject obj) throws Exception {
		        Connection cn = null;
        JSONObject response = new JSONObject();
        try {

            cn = SqlDAOFactory.obtenerConexion("Huellas");
            cn.setAutoCommit(false);
            String query = "{call PRO_INGRESAR_PERSONAL_IN(?,?,?,?,?,?,?,?,?,?,?)}";
           JSONObject IDSedes = obj.getJSONObject("sede_personal");
            if (IDSedes.getJSONArray("sedes").length() > 0) {

                for (int i = 0; i < IDSedes.getJSONArray("sedes").length(); i++) {

                    String codsedes = IDSedes.getJSONArray("sedes").getString(i);
                    JSONArray params = new JSONArray()
                            .put("00" + obj.getString("dni_personal"))
                            .put(obj.getString("nombre_personal"))
                            .put(obj.getString("apellido_paterno"))
                            .put(obj.getString("apellido_materno"))
                            .put(obj.getInt("estado_personal"))
                            .put(obj.getString("cargoWebAdministrativa"))
                            .put(obj.getString("nombre_completo"))
                            .put(obj.getString("fecha_registro"))
                            .put(codsedes)
                            .put(obj.getString("usuarioEncargado"))
                            .put(obj.getInt("cboAutorizado"));
               
                    response = DAOHelper.executeCS(cn, query, params);

                }
                cn.commit();
//					.put(obj.getString("sede_personal"));
            }

        } catch (Exception e) {
            e.printStackTrace();
            if (cn != null) {
                cn.rollback();
            }
        }
        return response;

    }
 @Override

    public JSONObject InsertarPersonalSinSede(JSONObject obj) throws Exception {
        Connection cn = null;
        JSONObject response = new JSONObject();
        try {

            cn = SqlDAOFactory.obtenerConexion("Huellas");
            cn.setAutoCommit(false);
            String query = "{call PRO_INGRESAR_PERSONAL_SIN_SEDE(?,?,?,?,?,?,?,?,?,?)}";
          
                        JSONArray params = new JSONArray()
                            .put("00" + obj.getString("dni_personal"))
                            .put(obj.getString("nombre_personal"))
                            .put(obj.getString("apellido_paterno"))
                            .put(obj.getString("apellido_materno"))
                            .put(obj.getInt("estado_personal"))
                            .put("")
                            .put(obj.getString("nombre_completo"))
                            .put(obj.getString("fecha_registro"))
                            .put(obj.getString("usuarioEncargado"))
                            .put(obj.getInt("cboAutorizado"));
                  
                   
                    response = DAOHelper.executeCS(cn, query, params);

               
                cn.commit();
//					.put(obj.getString("sede_personal"));
            

        } catch (Exception e) {
            e.printStackTrace();
            if (cn != null) {
                cn.rollback();
            }
        }
        return response;

    }
    
            
            
            

    @Override

    public JSONObject EliminarSede(JSONObject obj) throws Exception {

        Connection cn = null;
        JSONObject response = new JSONObject();
      
        try {

            cn = SqlDAOFactory.obtenerConexion("Huellas");
            cn.setAutoCommit(false);
            String query = "{call PRO_ELIMINAR_SEDE_PROGRAMACION(?,?)}";
            JSONArray params = new JSONArray()
                    .put(obj.getInt("cods"))
                    .put(obj.getInt("cod"));

            response = DAOHelper.executeCS(cn, query, params);

            cn.commit();
//					.put(obj.getString("sede_personal"));

        } catch (Exception e) {
            e.printStackTrace();
            if (cn != null) {
                cn.rollback();
            }
        }
        return response;

    }

    @Override

    public JSONObject actualizarPersonal(JSONObject obj) throws Exception {

        Connection cn = null;
        JSONObject response = new JSONObject();
        try {

            cn = SqlDAOFactory.obtenerConexion("Huellas");
            cn.setAutoCommit(false);
            String query = "{call PRO_ACTUALIZAR_PERSONAL(?,?,?,?,?,?,?)}";
           JSONObject IDSedes = obj.getJSONObject("sede_personal");

            if (IDSedes.getJSONArray("sedes").length() >= 0) {
                if (IDSedes.getJSONArray("sedes").length() == 0) {

                    JSONArray params = new JSONArray()
                            .put(obj.getInt("codigo"))
                            .put(obj.getString("nombre_personal"))
                            .put(obj.getString("apellido_paterno"))
                            .put(obj.getString("apellido_materno"))
                            .put(obj.getString("nombre_completo"))
                            .put(obj.getString("profesion_personal"))
                            .put(0);
                      response = DAOHelper.executeCS(cn, query, params);
                } else {
                    for (int i = 0; i < IDSedes.getJSONArray("sedes").length(); i++) {

                        String codsedes = IDSedes.getJSONArray("sedes").getString(i);
                        JSONArray params = new JSONArray()
                                .put(obj.getInt("codigo"))
                                .put(obj.getString("nombre_personal"))
                                .put(obj.getString("apellido_paterno"))
                                .put(obj.getString("apellido_materno"))
                                .put(obj.getString("nombre_completo"))
                                .put(obj.getString("profesion_personal"))
                                .put(codsedes);
                      
                      
                        response = DAOHelper.executeCS(cn, query, params);
                    }

                }
                cn.commit();
//					.put(obj.getString("sede_personal"));
            }

        } catch (Exception e) {
            e.printStackTrace();
            if (cn != null) {
                cn.rollback();
            }
        }
        System.out.println("Inserto correctamente");
        return response;

    }
 
    @Override

    public JSONObject actualizarPersonalSinSede(JSONObject obj) throws Exception {

        Connection cn = null;
        JSONObject response = new JSONObject();
        try {

            cn = SqlDAOFactory.obtenerConexion("Huellas");
            cn.setAutoCommit(false);
            String query = "{call PRO_ACTUALIZAR_PERSONAL_SIN_SEDE(?,?)}";
                 JSONObject IDSedes = obj.getJSONObject("sede_personal");

            if (IDSedes.getJSONArray("sedes").length() >= 0) {
                if (IDSedes.getJSONArray("sedes").length() == 0) {

                    JSONArray params = new JSONArray()
                            .put(obj.getInt("codigo"))
                            .put(0);
                   
                    response = DAOHelper.executeCS(cn, query, params);
                } else {
                    for (int i = 0; i < IDSedes.getJSONArray("sedes").length(); i++) {

                        String codsedes = IDSedes.getJSONArray("sedes").getString(i);
                        JSONArray params = new JSONArray()
                                .put(obj.getInt("codigo"))
                                .put(codsedes);
                           response = DAOHelper.executeCS(cn, query, params);
                    }

                }
                cn.commit();
//					.put(obj.getString("sede_personal"));
            }

        } catch (Exception e) {
            e.printStackTrace();
            if (cn != null) {
                cn.rollback();
            }
        }
        System.out.println("Inserto correctamente");
        return response;

    }
    
  

    @Override
    public JSONObject cambiarEstadoProgramacionLista(JSONObject obj) throws Exception {
        int resultado = -1;
        int flagCheck = 1;
        int flagUnCheck = 1;
        String cadenaCheck = obj.get("cadenaCheck").toString();
        String cadenaUnCheck = obj.get("cadenaUncheck").toString();
        String codTrabajador = obj.get("codigoTrabajador").toString();
        String UsuarioEncargado = obj.get("usuarioEncargado").toString();
        String[] splitCheck = null;
        String[] splitUnCheck = null;
          if (cadenaCheck != null && !cadenaCheck.isEmpty()) {
            splitCheck = cadenaCheck.split(",");
        }

        if (cadenaUnCheck != null && !cadenaUnCheck.isEmpty()) {
            splitUnCheck = cadenaUnCheck.split(",");
        }

        String base = "Huellas";

        Connection connection = SqlDAOFactory.obtenerConexion("Huellas");
        try {
            connection.setAutoCommit(false);
            String query = "{call PRO_ACTUALIZAR_ESTADO_PROGRAMACION(?,?,?,?)}";
            PreparedStatement ps;

            if (splitCheck != null && splitCheck.length > 0) {
                for (String codSede : splitCheck) {
                    ps = connection.prepareCall(query);
                    ps.setBoolean(1, true);
                    ps.setString(2, codTrabajador);
                    ps.setString(3, codSede);
                    ps.setString(4, UsuarioEncargado);
                    flagCheck &= ps.executeUpdate();
                }
            }

            if (splitUnCheck != null && splitUnCheck.length > 0) {
                for (String codSede : splitUnCheck) {
                    ps = connection.prepareCall(query);
                    ps.setBoolean(1, false);
                    ps.setString(2, codTrabajador);
                    ps.setString(3, codSede);
                    ps.setString(4, UsuarioEncargado);
                    flagUnCheck &= ps.executeUpdate();
                }
            }

            if ((flagCheck & flagUnCheck) == 1) {
                resultado = 1;
            } else {
                resultado = 0;
            }

            connection.commit();
        } catch (Exception e) {
            try {
                connection.rollback();
            } catch (Exception ex) {
                throw ex;
            }
            throw e;
        }
        return null;

    }

    @Override
    public JSONObject insertarPersonalSedes(JSONObject obj) throws Exception {

        JSONObject response = new JSONObject();
        try (Connection cn = SqlDAOFactory.obtenerConexion("Huellas")) {
            String query = "{call PRO_INGRESAR_TRABAJADORES_POR_EQUIPO_IN(?,?)}";
                    JSONArray params = new JSONArray()
                    .put("00" + obj.getString("dni_personal"))
                    .put(obj.getString("sede_personal"));
            response = DAOHelper.executeCS(cn, query, params);

        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("Inserto correctamente");
        return response;

    }

	@Override
	public String ObtenerCargoWeb(String dni) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public JSONObject listadoPersonalWeb(JSONObject obj) throws Exception {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}



}
