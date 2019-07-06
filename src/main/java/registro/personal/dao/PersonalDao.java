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
public interface PersonalDao {

	public JSONObject validarPersonal(JSONObject obj) throws Exception;

	public JSONObject listarPersonalSinSede(JSONObject obj) throws Exception;

	public JSONObject insertarPersonal(JSONObject obj) throws Exception;

	public JSONObject insertarPersonalSedes(JSONObject obj) throws Exception;

	public JSONObject actualizarEstado(JSONObject obj) throws Exception;

	public JSONObject listarProgramaciones(JSONObject obj) throws Exception;

	public JSONObject cambiarEstadoProgramacionLista(JSONObject json) throws Exception;

	public JSONObject datatrabajadores(JSONObject obj) throws Exception;

	public JSONObject ObtenerDataTrabajadorSinSede(JSONObject obj) throws Exception;

	public JSONObject actualizarMarcacion(JSONObject obj) throws Exception;

	public JSONObject ObtenerDatosDeEmpleadosxSedes(JSONObject obj) throws Exception;

	public JSONObject listarsedesfaltantes(JSONObject json) throws Exception;

	public JSONObject actualizarPersonal(JSONObject obj) throws Exception;

	public JSONObject actualizarPersonalSinSede(JSONObject obj) throws Exception;

	public JSONObject reporteProgramacion(JSONObject obj) throws Exception;

	public JSONObject ObtenerfiltroXdni(JSONObject obj) throws Exception;

	public JSONObject reporteExcel(JSONObject obj) throws Exception;

	public JSONObject listarCodigos(JSONObject obj) throws Exception;

	public JSONObject reporteExcel_codigos(JSONObject obj) throws Exception;

	public JSONObject listarGeneral(JSONObject obj) throws Exception;

	public JSONObject EliminarSede(JSONObject obj) throws Exception;

	public JSONObject reporteExcel_General(JSONObject obj) throws Exception;

	public JSONObject InsertarPersonalSinSede(JSONObject obj) throws Exception;

	public String ObtenerCargoWeb(String dni) throws Exception;

	public JSONObject listadoPersonalWeb(JSONObject obj) throws Exception;

	public JSONObject listarPersonal(JSONObject obj, JSONObject listadoPersonalWeb) throws Exception;

	public JSONObject BuscarPersonal(String busqueda) throws Exception;

}
