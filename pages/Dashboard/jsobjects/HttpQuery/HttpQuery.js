export default {
	sec:1000,
	interval:60,
	timerName:"timer",
	sensor1Id:-1,

	startTimer: () => {
		setInterval(this.intervalAction, this.interval * this.sec, this.timerName)
		showAlert("开始拉取信息, 目前间隔是 " + this.interval + "s")
	},
	intervalAction: () => {
		this.refreshText()
		get_all_online_device.run()
		
	},
	refreshText: () => {
		// 展示控制板, 传感器, 网关的数量
		get_all_boards.run().then(() => {boards_amount.setText(String(get_all_boards.data.length))}).catch(() => boards_amount.setText("0"))
		get_all_gateways.run().then(() => {gateways_amount.setText(String(get_all_gateways.data.length))}).catch(() => gateways_amount.setText("0"))
		get_all_sensors.run().then(() => {sensors_amount.setText(String(get_all_sensors.data.length))}).catch(() => sensors_amount.setText("0"))
	},
	showAllOnlineDevice: () => {
		return get_all_online_device.data.filter((row) => {
			if(isNaN(row.device_name)){
				return true
			}
		}).map((row) => {
			return {
				"label":row.device_name,
				"value":row.id
			}
		})
	},
	// todo: 选择传感器后更新数据
	test: () => {
		return get_latest_data_by_id.run({"id":50})
	}
}