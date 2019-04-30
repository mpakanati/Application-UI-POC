package example;

import java.util.HashMap;
import java.util.Map;
import org.openqa.selenium.By;

public class ObjectRepo {

	public By getObj(String ObjName){
		Map<String, By> OR = new HashMap<>();
		OR.put("segmentAnalysis",By.xpath("//div//span[contains(.,'Segment Analysis')]"));
		OR.put("hours",By.xpath("//div//span[contains(.,'Hours')]"));
		OR.put("summary",By.xpath("//div//span[contains(.,'Summary')]"));
		OR.put("fuel",By.xpath("//div//span[contains(.,'Fuel')]"));
		OR.put("subscriptions",By.xpath("//div//span[contains(.,'Subscriptions')]"));
		OR.put("location",By.xpath("//div//span[contains(.,'Location')]"));
		OR.put("weather",By.xpath("//div//span[contains(.,'Weather')]"));
		OR.put("dashboard",By.xpath("//div//li//a[(text()='Dashboard')]"));
		OR.put("sites",By.xpath("//div//li//a[(text()='Site')]"));
		OR.put("defaultUser",By.xpath("//div//li//a[(text()='Default User')]"));
		OR.put("user",By.xpath("//div//li//a[(text()='User')]"));
		return OR.get(ObjName);
		
	}
}
