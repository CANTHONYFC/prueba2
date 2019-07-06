package registro.personal.mysqldao;

import io.github.cdimascio.dotenv.Dotenv;
import java.sql.Connection;
import java.sql.DriverManager;
import registro.personal.dao.DAOFactory;
import registro.personal.dao.PersonalDao;
import registro.personal.dao.PersonalSedesDao;
import registro.personal.dao.SedesDao;

import registro.personal.utilities.OsUtils;



public class MySqlDAOFactory extends DAOFactory {

	static {
		try {
			Class.forName("com.mysql.jdbc.Driver");
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

		if (base.equals("administrativo")) {
			String host = dotenv.get("MYSQL_ADMINISTRATIVO_DB_HOST");
			String port = dotenv.get("MYSQL_ADMINISTRATIVO_DB_PORT");
			String databaseName = dotenv.get("MYSQL_ADMINISTRATIVO_DB_NAME");
			String userSgbd = dotenv.get("MYSQL_ADMINISTRATIVO_DB_USER");
			String passwordSgbd = dotenv.get("MYSQL_ADMINISTRATIVO_DB_PASS");
			try {
				connection = DriverManager.getConnection(
					"jdbc:mysql://" + host + ":" + port + "/" + databaseName + "?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC&useSSL=false&noAccessToProcedureBodies=true",
					userSgbd,
					passwordSgbd);

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		if (base.equals("docente")) {
			String host = dotenv.get("MYSQL_DOCENTES_DB_HOST");
			String port = dotenv.get("MYSQL_DOCENTES_DB_PORT");
			String databaseName = dotenv.get("MYSQL_DOCENTES_DB_NAME");
			String userSgbd = dotenv.get("MYSQL_DOCENTES_DB_USER");
			String passwordSgbd = dotenv.get("MYSQL_DOCENTES_DB_PASS");
			try {
				connection = DriverManager.getConnection(
					"jdbc:mysql://" + host + ":" + port + "/" + databaseName + "?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC&useSSL=false&noAccessToProcedureBodies=true",
					userSgbd,
					passwordSgbd);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return connection;
	}

	@Override
	public PersonalDao getPersonalDAO() {
		return new PersonalWebMysqlDao();
	}

	@Override
	public SedesDao getSedesDAO() {
	throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public PersonalSedesDao getPersonalSedesDao() {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public PersonalDao ObtenerCargoWeb() {
		return new PersonalWebMysqlDao();
	}

	@Override
	public PersonalDao BuscarPersonal() {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}



}



