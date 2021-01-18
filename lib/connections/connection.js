const axios = require("axios");
const GLOBAL_PARAM = require("../global_param.js");



exports.updateRobotStatus = (data) => {

	if(data.selfStatus){
		axios.post(
			GLOBAL_PARAM.BASE_URL + "robotInfo/update", 
			data).then((res)=>{
				console.log("更新了" +res.data.data.name +"的状态");
			}).catch((err)=>{
				console.log(err);
			});
	}else if (data.smoke){
		axios.post(
			GLOBAL_PARAM.BASE_URL + "robotInfo/smoke", 
			data).then((res)=>{
				console.log("更新了烟雾信息");
			}).catch((err)=>{
				console.log(err);
			});
	}else{
		console.log("没有存储");
	}
}

