// defines pins numbers
const int trigPin = 2;  //D4
const int echoPin = 0;  //D3
const int trigPin1 = 14;  //D5
const int echoPin1 = 12;  //D6
#include <ESP8266WiFi.h>
WiFiClient client;
const char* ssid     = "ASUS";//THE SSID FOR WIFI YOU CONNECT OR HOTSPOT OF MOBILE 
const char* password = "asdfghjk";//PASSWORD FOR THE WIFI TO BE STORED HERE
const char* host = "https://api.thingspeak.com/update?api_key=KJ10N8SF53PL0KIE&field1=0";//THE WEBSITE NAME OF YOUR SERVER
const char* server = "api.thingspeak.com";
// defines variables
long duration;
int distance;
long duration1;
int distance1;

String apiKey = "KJ10N8SF53PL0KIE";

void setup() {
pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
pinMode(echoPin, INPUT);
pinMode(trigPin1, OUTPUT); // Sets the trigPin as an Output
pinMode(echoPin1, INPUT);// Sets the echoPin as an Input
Serial.begin(9600); // Starts the serial communication
// We start by connecting to a WiFi network
  WiFi.disconnect();
  delay(10);
  WiFi.begin(ssid, password);
  Serial.println("connecting to network");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  Serial.print("Connecting to ");
  Serial.println(ssid);
    Serial.println(".");
  }
  Serial.println("connected");
  Serial.println("");
  Serial.print("NodeMcu connected to wifi...");
  Serial.println(ssid);
  Serial.println();
  Serial.println(WiFi.localIP());
  //Serial.println(WiFi.localIP());
}

void loop() {
// Clears the trigPin
digitalWrite(trigPin, LOW);
//delayMicroseconds(2);
digitalWrite(trigPin1, LOW);
delayMicroseconds(2);


// Sets the trigPin on HIGH state for 10 micro seconds
digitalWrite(trigPin, HIGH);

delayMicroseconds(10);
digitalWrite(trigPin, LOW);
// Reads the echoPin, returns the sound wave travel time in microseconds
duration = pulseIn(echoPin, HIGH);
// Calculating the distance
distance= duration*0.034/2;

digitalWrite(trigPin1, HIGH);
delayMicroseconds(10);
digitalWrite(trigPin1, LOW);
duration1 = pulseIn(echoPin1, HIGH);
distance1= duration1*0.034/2;
// Prints the distance on the Serial Monitor
//Serial.print("Distance1: \n");
//Serial.println(distance1);
delay(1010);
 if (client.connect(server,80))
  {  
 String tsData = apiKey;
           tsData +="&field1=";
           tsData += String(distance)+ "&field2=";
           tsData += String(distance1);
 
     client.print("POST /update HTTP/1.1\n");
     client.print("Host: api.thingspeak.com\n");
     client.print("Connection: close\n");
     client.print("X-THINGSPEAKAPIKEY: "+apiKey+"\n");
     client.print("Content-Type: application/x-www-form-urlencoded\n");
     client.print("Content-Length: ");
     client.print(tsData.length());
     client.print("\n\n");  // the 2 carriage returns indicate closing of Header fields & starting of data
     client.print(tsData);
     Serial.println("\n");
     Serial.print("distance : ");
     Serial.print(distance);
     Serial.println("\n");
     Serial.print("distance1 : ");
     Serial.print(distance1);

  }
}
