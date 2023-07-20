export default {
	sec:1000,
	interval:60,
	timerName:"timer",
	sensor1Id:-1,
	
	temperature:"0",
	humidity:"0",

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
	refreshTemperatureGauge: () => {
		
	},
	refreshGauge: (number) => {


		return 
	},
	// todo: 选择传感器后更新数据
	test: (data) => {
		return {
			"type": "thermometer",
			"dataSource": {
				"chart": {
					"theme": "fusion",
					"lowerLimit": "0",
					"upperLimit": "40",
					"numberSuffix": "°C",
					"decimals": "1",
					"showValue": "1",
					
					// hover
					"showhovereffect": "0",
					
          //Tick Marks auto adjustment 
          "adjustTM": "0",

          //Configuring Tick Positions
          "ticksOnRight": "0",
          "tickMarkDistance": "5",
          "tickValueDistance": "2",

					// Major Tick Marks
          "majorTMNumber": "5",
          "majorTMHeight": "12",

          //Minor Tick Marks
          "minorTMNumber": "4",
          "minorTMHeight": "7",

          //Tick value step          
          "tickValueStep": "1",

					//Customizing gauge fill
					"gaugeFillColor": "#008ee4",
					"gaugeFillAlpha": "70",
					
				},
				"value":this.temperature
			}
		}
	},
	test1: () => {
		this.temperature = "9"
	}
}