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

        axios.post(
            GLOBAL_PARAM.MSG_URL + "hardwareMsg/save",
            param
        ).then((res)=>{
            console.log("存储了一条状态消息");
        }).catch((err)=>{
            console.log("存储状态消息失败");
        })
    }
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