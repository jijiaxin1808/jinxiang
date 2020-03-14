import React from "react";
import { Spin } from "antd";
const Loading = ()=> {
	return (
		<Spin size='large'
		style={{
		minHeight: 600,
		background: "#fff"
		}}/>
	)
}// React.lazy的Loading
export default Loading;