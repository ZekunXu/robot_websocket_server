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

	} else if (data.humidity) {
		
	}
	
	
	else {
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


exports.savePersionImageAndMsg = (data) => {
	
}

