/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package registro.personal.utilities;

import java.io.File;
import java.util.Locale;

/**
 *
 * @author sistem08user
 */
public final class OsUtils {

    /**
     * types of Operating Systems
     */
    public enum OSType {
        Windows, MacOS, Linux, Other
    };

    // cached result of OS detection
    protected static String detectedOS;

    /**
     * detect the operating system from the os.name System property and cache
     * the result
     *
     * @return - the operating system detected
     */
    public static String getOperatingSysstemType() {
        if (detectedOS == null) {
            String OS = System.getProperty("os.name", "generic").toLowerCase(Locale.ENGLISH);
            if ((OS.contains("mac")) || (OS.contains("darwin"))) {
                detectedOS = "MacOS";
            } else if (OS.contains("win")) {
                detectedOS = "Windows";
            } else if (OS.contains("nux")) {
                detectedOS = "Linux";
            } else {
                detectedOS = "Other";
            }
        }
        return detectedOS;
    }

    public static String getPathOfVouchersDependingOS() {
        String path = "";
        String detectedOs = OsUtils.getOperatingSysstemType();
        switch (detectedOs) {
            case "MacOS":
                path = "";
                break;
            case "Windows":
                path = "C:/AppServ/www/comprobantes";
                break;
            case "Linux":
                path = "/var/www/html/comprobantes";
                break;
        }
        return path;
    }

    public static String getJSONDependingOS() {
        String path = "";
        String detectedOs = OsUtils.getOperatingSysstemType();
        switch (detectedOs) {
            case "MacOS":
                path = "";
                break;
            case "Windows":
                path = "C:/AppServ/www/comprobantes-log";
                break;
            case "Linux":
                path = "/var/www/html/comprobantes-log";
                break;
        }
        return path;
    }

    public static String getDotEnvPath(String projectName) {
        String path = "";
        String detectedOs = OsUtils.getOperatingSysstemType();
        switch (detectedOs) {
            case "MacOS":
                path = "";
                break;
            case "Windows":
                char[] alphabet = "abcdefghijklmnopqrstuvwxyz".toCharArray();
                for (char letter : alphabet) {
                    path = letter + ":/dotenv/" + projectName;
                    File directory = new File(path);
                    if (directory.exists()) {
                        break;
                    }
                }
                break;
            case "Linux":
                path = "/opt/dotenv/comprobantes";
                break;
        }
        return path;
    }
}
