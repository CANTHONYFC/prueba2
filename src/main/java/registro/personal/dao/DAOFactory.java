/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.dao;

import registro.personal.mysqldao.MySqlDAOFactory;
import registro.personal.sqldao.SqlDAOFactory;

/**
 *
 * @author sistem16user
 */
public abstract class DAOFactory {
	

    public static final int MYSQL = 1;
    public static final int ORACLE = 2;
    public static final int DB2 = 3;
    public static final int SQLSERVER = 4;
    public static final int XML = 5;

    public static DAOFactory getDAOFactory(int whichFactory) {
        switch (whichFactory) {
            case MYSQL:
                return new MySqlDAOFactory();
            case SQLSERVER:
                return new SqlDAOFactory();
            default:
                return null;
        }
    }
		
	public abstract PersonalDao getPersonalDAO();
	public abstract SedesDao getSedesDAO();
	public abstract PersonalSedesDao getPersonalSedesDao();
	public  abstract  PersonalDao ObtenerCargoWeb();
	public  abstract  PersonalDao  BuscarPersonal();
	
}
