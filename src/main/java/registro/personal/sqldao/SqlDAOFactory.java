/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.sqldao;

import io.github.cdimascio.dotenv.Dotenv;
import java.sql.Connection;
import java.sql.DriverManager;
import registro.personal.dao.DAOFactory;
import registro.personal.dao.PersonalDao;
import registro.personal.dao.PersonalSedesDao;
import registro.personal.dao.SedesDao;
import registro.personal.utilities.OsUtils;

/**
 *
 * @author sistem16user
 */
public class SqlDAOFactory extends DAOFactory {

	static {
		try {
			Class.forName("net.sourceforge.jtds.jdbc.Driver");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static Connection obtenerConexion(String base) {
		Dotenv dotenv = Dotenv
			.configure()
			.directory(OsUtils.getDotEnvPath("RegistroPersonalParaHuella"))
			.load();

		Connection connection = null;
		if (base.equals("Huellas")) {
			String host = dotenv.get("SQLSERVER_HUELLAS_DB_HOST");
			String port = dotenv.get("SQLSERVER_HUELLAS_DB_PORT");
			String databaseName = dotenv.get("SQLSERVER_HUELLAS_DB_NAME");
			String userSgbd = dotenv.get("SQLSERVER_HUELLAS_DB_USER");
			String passwordSgbd = dotenv.get("SQLSERVER_HUELLAS_DB_PASS");
			try {
				String url = "jdbc:jtds:sqlserver://" + host + ":" + port + ";databaseName=" + databaseName;
				connection = DriverManager.getConnection(url, userSgbd, passwordSgbd);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return connection;
	}

	@Override
	public PersonalDao getPersonalDAO() {
		  return new PersonalHuellasSqlDao();
	}
	

	@Override
	public PersonalSedesDao getPersonalSedesDao() {
		return new PersonalSedesSqlDao();
	}

	@Override
	public SedesDao getSedesDAO() {
		 return new SedesSqlDao();
	}

	@Override
	public PersonalDao ObtenerCargoWeb() {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public PersonalDao BuscarPersonal() {
  return new PersonalHuellasSqlDao();
	}
	
	
}


