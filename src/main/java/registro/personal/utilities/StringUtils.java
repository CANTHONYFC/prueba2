/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.utilities;

import java.util.Vector;

public class StringUtils {

	/**
	 * Divide una cadena según el caracter indicado y un número máximo de
	 * divisiones si así se desea.
	 *
	 * @param str
	 * @param sep
	 * @param maxNum
	 * @return
	 */
	public static String[] split(String str, char sep, int maxNum) {
		if (str == null || str.length() == 0) {
			/* [1] */
			return new String[0];
		}

		/* [2] */
		Vector results = maxNum == 0 ? new Vector() : new Vector(maxNum);

		StringBuilder buf = new StringBuilder();
		for (int i = 0; i < str.length(); i++) {
			/* [3] */
			char c = str.charAt(i);

			if (c == sep) {
				if (maxNum != 0) {
					/* [4] */
					if ((results.size() + 1) == maxNum) {
						for (; i < str.length(); i++) {
							buf.append(str.charAt(i));
						}
						break;
					}
				}

				results.addElement(buf.toString());
				buf.setLength(0);
			} else {
				buf.append(c);
			}
		}

		if (buf.length() > 0) {
			results.addElement(buf.toString());
		}

		return toStringArray(results);
		/* [5] */
	}

	/**
	 *
	 * @param strings
	 * @return
	 */
	public static String[] toStringArray(Vector strings) {
		String[] result = new String[strings.size()];
		for (int i = 0; i < strings.size(); i++) {
			result[i] = strings.elementAt(i).toString();
		}
		return result;
	}

	/**
	 * Separa un texto en varios según el caracter o cadena usada como
	 * delimitadora.
	 *
	 * @param strString
	 * @param strDelimiter
	 * @return
	 */
	public static String[] split(String strString, String strDelimiter) {
		int iOccurrences = 0;
		int iIndexOfInnerString = 0;
		int iIndexOfDelimiter = 0;
		int iCounter = 0;

		// Check for null input strings.
		if (strString == null) {
			throw new NullPointerException("Input string cannot be null.");
		}
		// Check for null or empty delimiter
		// strings.
		if (strDelimiter.length() <= 0 || strDelimiter == null) {
			throw new NullPointerException("Delimeter cannot be null or empty.");
		}

		// If strString begins with delimiter
		// then remove it in
		// order
		// to comply with the desired format.
		if (strString.startsWith(strDelimiter)) {
			strString = strString.substring(strDelimiter.length());
		}

		// If strString does not end with the
		// delimiter then add it
		// to the string in order to comply with
		// the desired format.
		if (!strString.endsWith(strDelimiter)) {
			strString += strDelimiter;
		}

		// Count occurrences of the delimiter in
		// the string.
		// Occurrences should be the same amount
		// of inner strings.
		while ((iIndexOfDelimiter = strString.indexOf(strDelimiter,
			iIndexOfInnerString)) != -1) {
			iOccurrences += 1;
			iIndexOfInnerString = iIndexOfDelimiter + strDelimiter.length();
		}

		// Declare the array with the correct
		// size.
		String[] strArray = new String[iOccurrences];

		// Reset the indices.
		iIndexOfInnerString = 0;
		iIndexOfDelimiter = 0;

		// Walk across the string again and this
		// time add the
		// strings to the array.
		while ((iIndexOfDelimiter = strString.indexOf(strDelimiter,
			iIndexOfInnerString)) != -1) {

			// Add string to
			// array.
			strArray[iCounter] = strString.substring(iIndexOfInnerString,
				iIndexOfDelimiter);

			// Increment the
			// index to the next
			// character after
			// the next
			// delimiter.
			iIndexOfInnerString = iIndexOfDelimiter + strDelimiter.length();

			// Inc the counter.
			iCounter += 1;
		}
		return strArray;
	}

	/**
	 * Reemplaza en un texto la primera aparición del patrón por el texto de
	 * reemplazo.
	 *
	 * @param source
	 * @param pattern
	 * @param replacement
	 * @return
	 */
	public static String replace(String source, String pattern, String replacement) {

		// If source is null then Stop
		// and return empty String.
		if (source == null) {
			return "";
		}

		StringBuilder sb = new StringBuilder();
		// Intialize Index to -1
		// to check against it later
		int idx = -1;
		// Intialize pattern Index
		int patIdx = 0;
		// Search source from 0 to first occurrence of pattern
		// Set Idx equal to index at which pattern is found.
		idx = source.indexOf(pattern, patIdx);
		// If Pattern is found, idx will not be -1 anymore.
		if (idx != -1) {
			// append all the string in source till the pattern starts.
			sb.append(source.substring(patIdx, idx));
			// append replacement of the pattern.
			sb.append(replacement);
			// Increase the value of patIdx
			// till the end of the pattern
			patIdx = idx + pattern.length();
			// Append remaining string to the String Buffer.
			sb.append(source.substring(patIdx));
		}
		// Return StringBuffer as a String

		if (sb.length() == 0) {
			return source;
		} else {
			return sb.toString();
		}
	}

	/**
	 * Igual que con el método replace pero con todas las apariciones del patrón.
	 *
	 * @param source
	 * @param pattern
	 * @param replacement
	 * @return
	 */
	public static String replaceAll(String source, String pattern,
		String replacement) {

		// If source is null then Stop
		// and retutn empty String.
		if (source == null) {
			return "";
		}

		StringBuilder sb = new StringBuilder();
		// Intialize Index to -1
		// to check agaist it later
		int idx = -1;
		// Search source from 0 to first occurrence of pattern
		// Set Idx equal to index at which pattern is found.

		String workingSource = source;

		// Iterate for the Pattern till idx is not be -1.
		while ((idx = workingSource.indexOf(pattern)) != -1) {
			// append all the string in source till the pattern starts.
			sb.append(workingSource.substring(0, idx));
			// append replacement of the pattern.
			sb.append(replacement);
			// Append remaining string to the String Buffer.
			sb.append(workingSource.substring(idx + pattern.length()));

			// Store the updated String and check again.
			workingSource = sb.toString();

			// Reset the StringBuffer.
			sb.delete(0, sb.length());
		}

		return workingSource;
	}

	/**
	 * Comprueba que una cadena sea nula o vacía.
	 *
	 * @param cadena
	 * @return
	 */
	public static boolean isNullOrEmpty(String cadena) {
		boolean nullOrEmpty = false;

		if (cadena == null) {
			nullOrEmpty = true;
		} else if (cadena.length() == 0) {
			nullOrEmpty = true;
		}

		return nullOrEmpty;
	}

	public static boolean isNullOrEmpty(Boolean bool) {
		boolean nullOrEmpty = false;

		if (bool == null) {
			nullOrEmpty = true;
		}

		return nullOrEmpty;
	}

	/**
	 * Reduce el tamaño de una cadena mayor al tamaño indicado. En ese caso se
	 * indicará que esta es más larga acortando y añadiendo 3 puntos seguidos.
	 *
	 * @param cadena - Cadena a comprobar.
	 * @param size - Tamaño máximo.
	 * @return Cadena original o cortada.
	 */
	public static String truncateString(String cadena, int size) {
		String truncatedString = cadena;

		if (truncatedString != null && truncatedString.length() > size) {
			truncatedString = cadena.substring(0, size - 4);
			truncatedString += "...";
		}

		return truncatedString;
	}

	/**
	 * Reduce el tamaño de una cadena mayor al tamaño indicado. En ese caso se
	 * indicará que esta es más larga acortando y añadiendo 3 puntos seguidos.
	 * Además añadiremos al final de la cadena truncada la información indicada.
	 *
	 * @param cadena
	 * @param size
	 * @param info
	 * @return
	 */
	public static String truncateStringWithInfo(String cadena, int size, String info) {
		return truncateString(cadena, size) + info;
	}
}
