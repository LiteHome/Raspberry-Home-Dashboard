export default {
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

		await device_list.setVisibility(false)
		try{
			await set_devices_name.run({"device_name":deviceName, "device_uuid":deviceUuid})
		}catch(error){
			await device_list.setVisibility(true)
			showAlert("无法更新设备名称")
			return
		}

		try{
			await get_all_devices.run()
		}catch(error){
			await device_list.setVisibility(true)
			showAlert("无法获取最新设备列表")
			return
		}

		await device_list.setVisibility(true)
		showAlert("完成更新")
	}
}