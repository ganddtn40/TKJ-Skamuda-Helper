export interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const SNIPPET_DATA: Snippet[] = [
  {
    id: 'wifi_basic',
    title: 'Koneksi Wi-Fi Dasar',
    description: 'Menghubungkan ESP8266/ESP32 ke jaringan Wi-Fi lokal.',
    code: `#include <ESP8266WiFi.h> // ESP32: #include <WiFi.h>

const char* ssid = "NAMA_WIFI";
const char* password = "PASSWORD_WIFI";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("WiFi Connected!");
  Serial.println(WiFi.localIP());
}

void loop() {}`,
  },
  {
    id: 'mqtt_pub',
    title: 'MQTT Publish (Ubidots/Adafruit)',
    description: 'Mengirim data (misal: suhu) ke broker MQTT.',
    code: `#include <PubSubClient.h>

WiFiClient espClient;
PubSubClient client(espClient);

void loop() {
  if (!client.connected()) reconnect();
  
  String payload = "{\\"temperature\\": 25.5}";
  client.publish("v1.6/devices/esp32/suhu", payload.c_str());
  delay(5000);
}`,
  },
  {
    id: 'http_get',
    title: 'HTTP GET Request',
    description: 'Mengambil data dari API eksternal (OpenWeather, dll).',
    code: `#include <ESP8266HTTPClient.h>

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin("http://api.example.com/data");
    int httpCode = http.GET();
    
    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println(payload);
    }
    http.end();
  }
  delay(10000);
}`,
  },
];
