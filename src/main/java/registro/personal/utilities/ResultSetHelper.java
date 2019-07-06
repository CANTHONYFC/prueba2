/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.utilities;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import javax.servlet.http.HttpServletRequest;
import org.json.JSONArray;
import org.json.JSONObject;

public class ResultSetHelper {

	public static final Object[][] ResultSetToArray(ResultSet rs) {
		Object obj[][] = null;

		try {
			rs.last();

			ResultSetMetaData rsmd = rs.getMetaData();

			int numCols = rsmd.getColumnCount();
			int numFils = rs.getRow();

			obj = new Object[numFils][numCols];
			int j = 0;

			rs.beforeFirst();

			while (rs.next()) {
				for (int i = 0; i < numCols; i++) {
					obj[j][i] = rs.getObject(i + 1);
				}
				j++;
			}

		} catch (SQLException e) {
			e.printStackTrace();
			return obj;
		}

		return obj;
	}

	public static final JSONObject requiredData(JSONObject data, List<Object> required, List<Object> urlParameters) {
		return null;
	}

	public static final JSONObject requiredData(JSONObject data, List<Object> requiredData) {
		String message = "Datos requeridos no encontrados";
		boolean status = false;
		Collection<Object> validationList = new ArrayList<>();
		for (Object object : requiredData) {
			String key = object.toString();
			if (!data.has(key)) {
				validationList.add(key);
			}
		}

		if (validationList.isEmpty()) {
			message = "Validación exitosa";
			status = true;
		}

		return new JSONObject().put("data", validationList)
			.put("message", message)
			.put("status", status);
	}

	public static final JSONObject getParameters(HttpServletRequest request) {
		JSONObject parameters = new JSONObject();
		Enumeration<String> parameterNames = request.getParameterNames();

		while (parameterNames.hasMoreElements()) {
			String paramNameString = parameterNames.nextElement();
			Object[] paramValues = request.getParameterValues(paramNameString);
			for (Object paramValue : paramValues) {
				parameters.putOnce(paramNameString, paramValue);
			}
		}
		return StringUtils.isNullOrEmpty(parameters.toString()) ? new JSONObject() : parameters;
	}

	public static final List<String[]> getColumnNamesWithType(ResultSet rs) throws SQLException {
		ResultSetMetaData rsmd = rs.getMetaData();
		int columnCount = rsmd.getColumnCount();

		List<String[]> columnNames = new ArrayList<>();
		for (int i = 1; i <= columnCount; i++) {
			String[] column = new String[2];
			switch (rsmd.getColumnType(i)) {
				case 4:
					column[0] = "int";
					break;
				case 12:
					column[0] = "varchar";
					break;
				case -1:
					column[0] = "text";
					break;
				case 93:
					column[0] = "timestamp";
					break;
			}
			column[1] = rsmd.getColumnName(i);
			columnNames.add(column);
		}

		return columnNames;
	}

	/**
	 * Return all column names as a list of strings
	 *
	 * @param rs
	 * @return list of column name strings
	 * @throws SQLException if the query fails
	 */
	public static final List<String> getColumnNames(ResultSet rs) throws SQLException {
		ResultSetMetaData rsmd = rs.getMetaData();
		int columnCount = rsmd.getColumnCount();
		List<String> columnNames = new ArrayList<>();
		for (int i = 1; i <= columnCount; i++) {
			// rsmd.getColumnType
			columnNames.add(rsmd.getColumnName(i));
		}
		return columnNames;
	}

	public static final List<String> getColumnLabels(ResultSet rs) throws SQLException {
		ResultSetMetaData rsmd = rs.getMetaData();
		int columnCount = rsmd.getColumnCount();
		List<String> columnNames = new ArrayList<>();
		for (int i = 1; i <= columnCount; i++) {
			// rsmd.getColumnType
			columnNames.add(rsmd.getColumnLabel(i));
		}
		return columnNames;
	}

	public static final List<Object[]> getColumnValues(ResultSet rs) throws SQLException {
		ResultSetMetaData rsmd = rs.getMetaData();
		int columnCount = rsmd.getColumnCount();

		ArrayList<Object[]> columnValues = new ArrayList<>();
		while (rs.next()) {
			Object[] values = new Object[columnCount];
			for (int i = 1; i <= rsmd.getColumnCount(); i++) {
				values[i - 1] = (rs.getObject(i) == null) ? "" : rs.getObject(i);
			}
			columnValues.add(values);
		}

		return columnValues;
	}

	public static final JSONArray getValuesInJsonArray(ResultSet rs) throws SQLException {
		JSONArray array = new JSONArray();
		List<String> columnNames = getColumnLabels(rs);
		List<Object[]> columnValues = getColumnValues(rs);
		// go through records
		for (Object[] columnValue : columnValues) {
			JSONObject obj = new JSONObject();
			int meterColumn = 0;
			// set column name
			for (Object value : columnValue) {
				String columName = columnNames.get(meterColumn);
				obj.put(columName, value);
				meterColumn++;
			}
			array.put(obj);
		}
		return array;
	}

	public static final JSONObject getValuesInJsonObject(ResultSet rs) throws SQLException {
		JSONObject jsonobject = new JSONObject();
		JSONArray array = new JSONArray();
		List<String[]> columnNames = getColumnNamesWithType(rs);
		List<Object[]> columnValues = getColumnValues(rs);

		JSONObject obj = new JSONObject();
		// go through records
		for (Object[] columnValue : columnValues) {
			int meterColumn = 0;
			// set column name
			for (Object value : columnValue) {
				String columName = columnNames.get(meterColumn)[1];
				obj.put(columName, value);
				meterColumn++;
			}
			array.put(obj);
		}

		return jsonobject;
	}

	/**
	 * Helper method that converts a ResultSet into a list of maps, one per row
	 *
	 * @param rs ResultSet
	 * @return list of maps, one per row, with column name as the key
	 * @throws SQLException if the connection fails
	 */
	public static final List toList(ResultSet rs) throws SQLException {
		List wantedColumnNames = getColumnNames(rs);

		return toList(rs, wantedColumnNames);
	}

	/**
	 * Helper method that maps a ResultSet into a list of maps, one per row
	 *
	 * @param rs
	 * @param wantedColumnNames
	 * @param query ResultSet
	 * @param list of columns names to include in the result map
	 * @return list of maps, one per column row, with column names as keys
	 * @throws SQLException if the connection fails
	 */
	public static final List toList(ResultSet rs, List wantedColumnNames) throws SQLException {
		List rows = new ArrayList();

		int numWantedColumns = wantedColumnNames.size();
		while (rs.next()) {
			Map row = new TreeMap();

			for (int i = 0; i < numWantedColumns; ++i) {
				String columnName = (String) wantedColumnNames.get(i);
				Object value = rs.getObject(columnName);
				row.put(columnName, value);
			}

			rows.add(row);
		}

		return rows;
	}

	/**
	 * Return all column names as a list of strings
	 *
	 * @param rs
	 * @param database query result set
	 * @return list of column name strings
	 * @throws SQLException if the query fails
	 */
//  public static final List getColumnNames(ResultSet rs) throws SQLException {
//    List columnNames = new ArrayList();
//    ResultSetMetaData meta = rs.getMetaData();
//    int numColumns = meta.getColumnCount();
//    for (int i = 1; i <= numColumns; ++i) {
//      columnNames.add(meta.getColumnName(i));
//    }
//
//    return columnNames;
//  }
	/**
	 * Closing methods are to close Statements, ResulSet and Connections in this
	 * order please call these methods inside a catch finally block
	 *
	 * @param cnn
	 */
	public static void closeConnection(final Connection cnn) {
		if (cnn != null) {
			try {
				cnn.close();
			} catch (SQLException ex) {
				//log errors
			}
		}
	}

	/**
	 * Closing a Statement
	 *
	 * @param stmt
	 */
	public static void closeStatement(final Statement stmt) {
		if (stmt != null) {
			try {
				stmt.close();
			} catch (SQLException ex) {
				//log errors
			}
		}

	}

	/**
	 * Closing a ResultSet
	 *
	 * @param rs
	 */
	public static void closeResultSet(final ResultSet rs) {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException ex) {
				// log errors
			}
		}
	}

	/**
	 * Comprueba que una cadena sea nula o vacía.
	 *
	 * @param cadena
	 * @return
	 */
	private static boolean isNullOrEmpty(String cadena) {
		boolean nullOrEmpty = false;

		if (cadena == null) {
			nullOrEmpty = true;
		} else if (cadena.length() == 0) {
			nullOrEmpty = true;
		}

		return nullOrEmpty;
	}

}
