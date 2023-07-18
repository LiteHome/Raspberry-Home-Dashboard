export default {
	sec:1000,
	interval:15,

	startTimer: () => {
		setInterval(this.httpQuery, this.interval * this.sec, "HttpQuery")
		showAlert("开始拉取信息, 目前间隔是 " + this.interval + "s")
	},
	httpQuery: () => {
			get_all_boards.run().then(() => {boards_amount.setText(String(get_all_boards.data.length))}).catch(() => boards_amount.setText("0"))
			get_all_gateways.run().then(() => {gateways_amount.setText(String(get_all_gateways.data.length))}).catch(() => gateways_amount.setText("0"))
			get_all_sensors.run().then(() => {sensors_amount.setText(String(get_all_sensors.data.length))}).catch(() => sensors_amount.setText("0"))
	}
}