export default {
	sec:60,
	unit:1000,
	timerName: "httpQuery",

	getAllDevices: () => {
		return get_all_devices.data.map((row) => {
			return {
				"设备 Tag":row.device_tag, 
				"设备信息":row.device_information, 
				"设备名称":(row.device_name == null ? "未命名" : row.device_name), 
				"设备状态":(row.status == "OFFLINE" ? "离线" : "在线"), 
				"设备健康检查频率":row.health_check_rate + "s", "device_uuid":row.device_uuid,
				"设备 id":row.id
			}
		})
	},
	setDeviceName: async (deviceName, deviceUuid) => {
		// 尝试获取锁
		if(!device_list.isVisible){
			showAlert("列表正在更新, 请稍后再试")
			return 1
		}
		// 抢占锁
		await device_list.setVisibility(false)
		// 发送请求, 失败则必须释放锁
		try{
			await set_devices_name.run({"device_name":deviceName, "device_uuid":deviceUuid})
			showAlert("完成修改")
		}catch(error){
			showAlert("无法更新设备名称")
			await device_list.setVisibility(true)
			return 1
		}

		// 数据库修改后更新界面
		try{
			await get_all_devices.run()
			showAlert("刷新界面")
		}catch(error){
			showAlert("无法获取最新设备列表")
		}finally{
			await device_list.setVisibility(true)
		}
	},
	intervalAction: () => {
		this.refreshTable()
		this.refreshText()
	},
	refreshTable:async () => {
		// 尝试获取锁
		if(!device_list.isVisible){
			showAlert("正在提交信息到数据库,取消刷新界面")
			return 1
		}
		// 抢占锁
		await device_list.setVisibility(false)
		try{
			await get_all_devices.run()
			showAlert("完成更新")
		}catch(error){
			showAlert("无法获取最新设备列表")
		}finally{
			// 释放锁
			await device_list.setVisibility(true)
		}
	},
	refreshText: () => {
		// 展示控制板, 传感器, 网关的数量
		get_all_boards.run().then(() => {boards_amount.setText(String(get_all_boards.data.length))}).catch(() => boards_amount.setText("0"))
		get_all_gateways.run().then(() => {gateways_amount.setText(String(get_all_gateways.data.length))}).catch(() => gateways_amount.setText("0"))
		get_all_sensors.run().then(() => {sensors_amount.setText(String(get_all_sensors.data.length))}).catch(() => sensors_amount.setText("0"))
	},
	startTimer: () => {
		this.stopTimer()
		setInterval(this.intervalAction, this.sec * this.unit, this.timerName)
		showAlert("开始拉取信息, 目前间隔是 " + this.sec + "s")
	},
	stopTimer: () => {
		try{
			clearInterval(this.timerName)
			showAlert("停止定时器")
		}catch(error){

		}finally{
			return 1
		}
	}
}