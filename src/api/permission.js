import http from '@/lib/http'

export default {
    // 获取权限
    getPermission() {
        return {
            "status": true,
            "code": 200,
            "message": "",
            "debugMessage": "",
            "data": {
                "todayCarCount": 4,
                "totalCarSpaceCount": 100,
                "remainderCarCount": 88,
                "useRatio": 0.12,
                "carWeekFlowRate": 12.43
            },
            "time": "2019-05-31 11:20:49"
        }
    }
}