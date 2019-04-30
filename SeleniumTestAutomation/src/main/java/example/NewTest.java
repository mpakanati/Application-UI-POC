package example;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.Assert;		
import org.testng.annotations.Test;	
import example.ObjectRepo;

public class NewTest {		
		ObjectRepo objRepo=new ObjectRepo();
		@Test				
		public void testEasy() {
			WebDriver driver= getDriver();
			driver.get("http://d343hqfd67ohbf.cloudfront.net/");  
			String title = driver.getTitle();				 
			Assert.assertTrue(title.contains("Fleet")); 
			driver.quit();
		}	
		
		@Test
		public void testEasy2(){
			WebDriver driver= getDriver();
			driver.get("http://d343hqfd67ohbf.cloudfront.net/");
			driver.findElement(objRepo.getObj("dashboard")).click();
			Assert.assertTrue(driver.findElement(objRepo.getObj("segmentAnalysis")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("hours")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("summary")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("fuel")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("subscriptions")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("location")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("weather")).isDisplayed());
			driver.quit();
		}
		
		@Test
		public void testEasy3(){
			WebDriver driver= getDriver();
			driver.get("http://d343hqfd67ohbf.cloudfront.net/");
			Assert.assertTrue(driver.findElement(objRepo.getObj("dashboard")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("sites")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("defaultUser")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("user")).isDisplayed());
			driver.quit();
		}
		
		@Test
		public void testEasy4(){
			WebDriver driver= getDriver();
			driver.get("http://d343hqfd67ohbf.cloudfront.net/");
			driver.findElement(objRepo.getObj("dashboard")).click();
			Assert.assertTrue(driver.findElement(objRepo.getObj("segmentAnalysis")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("hours")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("summary")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("fuel")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("subscriptions")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("location")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("weather")).isDisplayed());
			driver.quit();
		}
		
		@Test
		public void testEasy5(){
			WebDriver driver= getDriver();
			driver.get("http://d343hqfd67ohbf.cloudfront.net/");
			driver.findElement(objRepo.getObj("dashboard")).click();
			Assert.assertTrue(driver.findElement(objRepo.getObj("segmentAnalysis")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("hours")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("summary")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("fuel")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("subscriptions")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("location")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("weather")).isDisplayed());
			driver.quit();
		}
		
		@Test
		public void testEasy6(){
			WebDriver driver= getDriver();
			driver.get("http://d343hqfd67ohbf.cloudfront.net/");
			driver.findElement(objRepo.getObj("dashboard")).click();
			Assert.assertTrue(driver.findElement(objRepo.getObj("segmentAnalysis")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("hours")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("summary")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("fuel")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("subscriptions")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("location")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("weather")).isDisplayed());
			driver.quit();
		}
		
		@Test
		public void testEasy7(){
			WebDriver driver= getDriver();
			driver.get("http://d343hqfd67ohbf.cloudfront.net/");
			driver.findElement(objRepo.getObj("dashboard")).click();
			Assert.assertTrue(driver.findElement(objRepo.getObj("segmentAnalysis")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("hours")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("summary")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("fuel")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("subscriptions")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("location")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("weather")).isDisplayed());
			driver.quit();
		}
		
		@Test
		public void testEasy8(){
			WebDriver driver= getDriver();
			driver.get("http://d343hqfd67ohbf.cloudfront.net/");
			driver.findElement(objRepo.getObj("dashboard")).click();
			Assert.assertTrue(driver.findElement(objRepo.getObj("segmentAnalysis")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("hours")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("summary")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("fuel")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("subscriptions")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("location")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("weather")).isDisplayed());
			driver.quit();
		}
		
		@Test
		public void testEasy9(){
			WebDriver driver= getDriver();
			driver.get("http://d343hqfd67ohbf.cloudfront.net/");
			driver.findElement(objRepo.getObj("dashboard")).click();
			Assert.assertTrue(driver.findElement(objRepo.getObj("segmentAnalysis")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("hours")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("summary")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("fuel")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("subscriptions")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("location")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("weather")).isDisplayed());
			driver.quit();
		}
		
		@Test
		public void testEasy10(){
			WebDriver driver= getDriver();
			driver.get("http://d343hqfd67ohbf.cloudfront.net/");
			driver.findElement(objRepo.getObj("dashboard")).click();
			Assert.assertTrue(driver.findElement(objRepo.getObj("segmentAnalysis")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("hours")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("summary")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("fuel")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("subscriptions")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("location")).isDisplayed());
			Assert.assertTrue(driver.findElement(objRepo.getObj("weather")).isDisplayed());
			driver.quit();
		}
		
		public WebDriver getDriver(){
			System.setProperty("webdriver.chrome.driver",".\\chromedriver.exe");
			ChromeOptions options = new ChromeOptions();
            options.addArguments("headless");
            options.addArguments("window-size=1200x600");
            WebDriver driver = new ChromeDriver(options);
			return driver;
			
		}

}
