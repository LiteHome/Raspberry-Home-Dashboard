export default {
	getAllDevices () {
		return get_all_devices.data.map((row) => {
			return {"设备 Tag":row.device_tag, 
							"设备信息":row.device_information, 
							"设备名称":(row.device_name == null ? "未命名" : row.device_name), 
							"设备状态":(row.status == "OFFLINE" ? "离线" : "在线"), 
							"设备健康检查频率":row.health_check_rate + "s", "device_uuid":row.device_uuid}
		})
	},
	setDeviceName (deviceName, deviceUuid) {
		// 梳理异步流程
		return device_list.setVisibility(false)
			.then(() => {set_devices_name.run({"device_name":deviceName, "device_uuid":deviceUuid}).then(() => {get_all_devices.run()})})
			.then(() => device_list.setVisibility(true))
	}
}