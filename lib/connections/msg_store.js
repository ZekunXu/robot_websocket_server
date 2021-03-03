const axios = require("axios");
const GLOBAL_PARAM = require("../global_param.js");


exports.storeRobotStatusMsg = (data) => {

    if(data.selfStatus){
        var param = {
            "hardwareType": "wwRobot",
            "hardwareID": data.robotId,
            "msgType": "realtimeStatus",
            "param": {
                "realtimeStatus": data.selfStatus.realtimeStatus
            }
        }

        axios.post(
            GLOBAL_PARAM.MSG_URL + "hardwareMsg/save",
            param
        ).then((res)=>{
            console.log("存储了一条消息信息");
        }).catch((err)=>{
            console.log("存储消息信息失败");
        })
    }

}