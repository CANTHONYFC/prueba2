package registro.personal.utilities;

import java.io.Serializable;
import org.json.JSONArray;
import org.json.JSONObject;

public class ResponseHelper implements Serializable {

  private JSONObject data;
  private boolean status;
  private String message;
	private JSONArray results;

  public ResponseHelper() {
  }

  public ResponseHelper(JSONObject data, boolean status, String message,JSONArray results) {
    this.data = data;
    this.status = status;
    this.message = message;
		this.results = results;
		
  }
	
	public JSONArray getResults() {
        return results;
    }

    public void setResults(JSONArray results) {
        this.results = results;
    }

  public JSONObject getData() {
    return data;
  }

  public boolean isStatus() {
    return status;
  }

  public String getMessage() {
    return message;
  }

  public void setData(JSONObject data) {
    this.data = data;
  }

  public void setStatus(boolean status) {
    this.status = status;
  }

  public void setMessage(String message) {
    this.message = message;
  }

}
