const axios = require("axios");
const GLOBAL_PARAM = require("../global_param.js");


exports.storeRobotStatusMsg = (data) => {

    if(data.selfStatus){
        var param = {
            "hardwareType": "wwRobot",
            "hardwareID": data.robotId,
            "msgType": "realtimeStatusReport",
            "param": {
                "realtimeStatus": data.selfStatus.realtimeStatus
            }
        }
    }else if(data.smoke){
        var param = {
            "hardwareType": "wwRobot",
            "hardwareID": data.robotId,
            "msgType": "smokeReport",
            "param": {
                "smoke": {
                    "currentSmoke": data.smoke.currentSmoke,
                    "timestamp": data.smoke.gatherTime,
                    "coordinate": data.smoke.coordinate
                }
            }
        }
    }else if(data.temperature){
        var param = {
            "hardwareType": "wwRobot",
            "hardwareID": data.robotId,
            "msgType": "temperatureReport",
            "param": {
                "temperature": {
                    "temperature": data.temperature.currentTemperature,
                    "timestamp": data.temperature.gatherTime,
                    "coordinate": data.temperature.coordinate
                }
            }
        }
    }else if(data.humidity){
        var param = {
            "hardwareType": "wwRobot",
            "hardwareID": data.robotId,
            "msgType": "humidityReport",
            "param": {
                "humidity": {
                    "humidity": data.humidity.currentHumidity,
                    "timestamp": data.humidity.gatherTime,
                    "coordinate": data.humidity.coordinate
                }
            }
        }
    }

    axios.post(
        GLOBAL_PARAM.MSG_URL + "hardwareMsg/save",
        param
    ).then((res)=>{
        console.log("存储了一条状态消息");
    }).catch((err)=>{
        console.log("存储状态消息失败");
    })
}


exports.storeRobotOnlineOfflineStatus = (data) => {

    var param = {
        "hardwareType": "wwRobot",
        "hardwareID": data.param.robotId,
        "msgType": "onlineOfflineReport",
        "param": {
            "status": data.function == "loginMainServer" ? "online" : "offline"
        }
    }

    axios.post(
        GLOBAL_PARAM.MSG_URL + "hardwareMsg/save",
        param
    ).then((res)=>{
        console.log("存储了一条上下线消息");
    }).catch((err)=>{
        console.log("存储上下线消息失败")
    })

}

exports.storeMissionResultReport = (data) => {
}

exports.storeVehicleReport = (data) => {

    const param = {
        "hardwareType": "wwRobot",
        "hardwareID": data.param.robotId,
        "msgType": "vehicleReport",
        "param": {
            vehicleInfo: "车牌号：" + data.param.plate,
        }
    }

    axios.post(
        GLOBAL_PARAM.MSG_URL + "hardwareMsg/save",
        param
    )
    .then((res)=>{
        console.log("存储了一条车辆信息");
    })
    .catch((err)=>{
        console.log("存储车辆信息失败");
    })
}

exports.storeFaceRecognitionReport = (data) => {

    switch(data.param.type){
        case 1:
            var type = 2;
            break;
        case 2:
            var type = 0;
            break;
        case 3:
            var type = 1;
            break;
    }

    const param = {
        "hardwareType": "wwRobot",
        "hardwareID": data.param.robotId,
        "msgType": "faceRecognitionReport",
        "param": {
            "FaceReport": {
                "url": data.param.picture,
                "personId": data.param.name,
                "blackList": type
            }
        }
    }

    axios.post(
        GLOBAL_PARAM.MSG_URL + "hardwareMsg/save",
        param
    )
    .then((res)=>{
        console.log("存储了一条人脸识别信息");
    })
    .catch((err)=>{console.log("存储人脸识别信息失败")})
}