const mqtt = require('mqtt');
const stats = require("stats-lite");
const round = require('round-to');
//var timeInterval = 20 * 60 * 1000; // 10 minutes
// var timeInterval = 10 * 1000; // 10 sec

var ThingSpeakClient = require('thingspeakclient');

var client1 = new ThingSpeakClient();

const channelId = 167475;

function callBackThingspeak(err, resp) {
	if (!err && resp > 0) {
		console.log('Successfully. response was: ' + resp);
	} else {
		//console.log(err);
		console.log("Error on connection!");
	}
}

client1.attachChannel(channelId, {
	writeKey: '5XB2I9UBNJFD32Q8'
//}, callBackThingspeak);
});

var clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8);
const options = {
	  port: 1883,
	  keepalive: 10,
	  clientId: clientId,
	  protocolId: 'MQTT',
	  protocolVersion: 4,
	  clean: true,
	  reconnectPeriod: 1000,
	  connectTimeout: 30 * 1000,
	  will: {
		    topic: 'WillMsg',
		    payload: 'Connection Closed abnormally..!',
		    qos: 0,
		    retain: false
		 
	},
	  username: 'tester',
	  password: 'tester',
	  rejectUnauthorized: false
};

var mqtt_client = mqtt.connect('mqtt://wondrous-lifeguard.cloudmqtt.com', options)

mqtt_client.on('message', function (mytopic, message) {
	console.log(message.toString());
	var obj = JSON.parse(message.toString());
	if (obj.hasOwnProperty('BME280_Temperature')) {
		client1.updateChannel(channelId, {field1: obj.BME280_Temperature});
	}
	if (obj.hasOwnProperty('BME280_RH')) {
		client1.updateChannel(channelId, {field2: obj.BME280_RH});
	}
	if (obj.hasOwnProperty('PPFD')) {
		client1.updateChannel(channelId, {field4: obj.PPFD});
	}
})

//const intervalObj = setInterval(() => {
//	console.log(1);
//	//client1.updateChannel(167475, client1);
//	console.log(2);
//}, timeInterval);


mqtt_client.subscribe("sensorLab");

