const axios = require("axios");
const GLOBAL_PARAM = require("../global_param.js");



exports.updateRobotStatus = (data) => {

	if (data.selfStatus) {
		axios.post(
			GLOBAL_PARAM.BASE_URL + "robotInfo/update",
			data).then((res) => {
				console.log("更新了" + res.data.data.name + "的状态");
			}).catch((err) => {
				console.log(err);
			});
	} else if (data.smoke) {
		axios.post(
			GLOBAL_PARAM.BASE_URL + "robotInfo/smoke",
			data).then((res) => {
				console.log("更新了烟雾信息");
			}).catch((err) => {
				console.log(err);
			});
	} else if (data.temperature) {

		const param = {
			area: "ifs",
			temperature: {
				temperature: data.temperature.currentTemperature,
				timestamp: data.temperature.gatherTime,
				reportHardwareId: data.robotId
			}
		}

		axios.post(
			GLOBAL_PARAM.BASE_URL + "environment/update/temperature",
			param
		).then((res)=>{
			console.log("更新了温度信息");
		}).catch((err)=>{
			console.log(err);
		});
	} else if (data.humidity) {
		const param = {
			area: "ifs",
			humidity: {
				humidity: data.humidity.currentHumidity,
				timestamp: data.humidity.gatherTime,
				reportHardwareId: data.robotId
			}
		}

		axios.post(
			GLOBAL_PARAM.BASE_URL + "environment/update/humidity",
			param
		).then((res)=>{
			console.log("更新了湿度信息");
		}).catch((err)=>{
			console.log(err);
		});		
	} else {
		console.log(data);
	}
}


exports.updateRobotOnlineOfflineStatus = (data) => {

	if (data.function == "loginMainServer") {
		var param = { status: "online", hardwareID: data.param.robotId };
		axios.post(
			GLOBAL_PARAM.BASE_URL + "robotInfo/status",
			param
		).then((res) => {
			console.log(res.data.data.name + "上线了");
		}).catch((err) => {
			console.log(err);
		});

	} else if (data.function == "robotOffline") {
		var param = { status: "offline", hardwareID: data.param.robotId };
		axios.post(
			GLOBAL_PARAM.BASE_URL + "robotInfo/status",
			param
		).then((res) => {
			console.log(res.data.data.name + "下线了");
		}).catch((err) => {
			console.log(err);
		})
	} else {
		console.log("开关机数据上报失败");
	}
}


exports.savePersonImage = (data) => {

	const url = GLOBAL_PARAM.BASE_URL + "img/save";

	switch(data.function){
		case "personReport":
			var param = {
				imgType: "personImg",
				img: data.param.url,
				reportHardwareId: data.param.robotId,
				timestamp: data.param.timestamp
			};
			break;
		case "faceReport":
			var param = {
				imgType: "faceImg",
				img: data.param.picture,
				reportHardwareId: data.param.robotId,
				timestamp: data.param.timestamp
			}

	}

	axios.post(url, param)
		.then((res)=>{
			console.log("存储了"+param.imgType+"图片");
		})
		.catch((err)=>{
			console.log("存储"+param.imgType+"失败。err: "+err);
		})
	
}

