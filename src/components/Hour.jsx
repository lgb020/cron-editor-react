/**
 * 功能：周期-小时
 * 作者：宋鑫鑫
 * 日期：2019.11.04
 */
import React, { PureComponent } from "react";
import { Radio, InputNumber, message, List, Checkbox, Select } from "antd";
const { Group } = Radio;
export default class Hour extends PureComponent {
    constructor(props) {
        super(props);
        this.formatHourOptions();
    }

    // formatHourOptions() {
    // 	this.hourOptions = [];
    // 	for (let x = 0; x < 24; x++) {
    // 		this.hourOptions.push({
    // 			label: x < 10 ? `0${x}` : x,
    // 			value: `${x}`
    // 		});
    // 	}
    // }

    formatHourOptions() {
        this.hourOptions = [];
        for (let x = 0; x < 24; x++) {
            const label = x < 10 ? `0${x}` : x;
            const value = `${x}`;
            const ele = (
                <Select.Option value={value} key={`${label}-${x}`}>
                    {label}
                </Select.Option>
            );
            this.hourOptions.push(ele);
        }
    }

    changeParams(type, value) {
        const state = { ...this.props.hour };
        state[type] = value;
        this.props.onChange(state);
    }

    changeType = e => {
        const state = { ...this.props.hour };
        // if (e.target.value === "some") {
        //     state.some = ["1"];
        // }
        state.type = e.target.value;
        this.props.onChange(state);
    };

    render() {
        const {
            hour: { type, start, end, begin, some, beginEvery }
        } = this.props;
        return (
            <div>
                <Group value={type} onChange={this.changeType}>
                    <List size="small" bordered>
                        <List.Item>
                            <Radio value="*">每小时</Radio>
                        </List.Item>
                        <List.Item style={{ marginBottom: 5 }}>
                            <Radio value="period">周期</Radio>从{" "}
                            <InputNumber
                                min={0}
                                max={23}
                                defaultValue={0}
                                style={{ width: 80 }}
                                placeholder="时"
                                size="small"
                                value={start}
                                onChange={value => {
                                    this.changeParams("start", value);
                                }}
                                disabled={type !== "period"}
                            />
                            到
                            <InputNumber
                                min={2}
                                max={23}
                                defaultValue={2}
                                style={{ width: 80 }}
                                placeholder="时"
                                value={end}
                                size="small"
                                onChange={value => {
                                    this.changeParams("end", value);
                                }}
                                disabled={type !== "period"}
                            />
                            &nbsp;小时&nbsp;
                        </List.Item>
                        <List.Item>
                            <Radio value="beginInterval"></Radio>
                            从第
                            <InputNumber
                                min={0}
                                max={23}
                                defaultValue={0}
                                placeholder="时"
                                size="small"
                                value={begin}
                                onChange={value => {
                                    this.changeParams("begin", value);
                                }}
                                disabled={type !== "beginInterval"}
                            />
                            时开始， 每
                            <InputNumber
                                min={1}
                                max={23}
                                defaultValue={1}
                                placeholder="小时"
                                size="small"
                                value={beginEvery}
                                onChange={value => {
                                    this.changeParams("beginEvery", value);
                                }}
                                disabled={type !== "beginInterval"}
                            />
                            时执行一次
                        </List.Item>
                        <List.Item>
                            <Radio value="some">具体小时数（可多选）</Radio>
                            <Select
                                style={{ width: "auto" }}
                                defaultValue={1}
                                mode="multiple"
                                placeholder="分钟数"
                                size="small"
                                value={some}
                                showArrow
                                onChange={value => {
                                    if (value.length < 1) {
                                        return message.warn("至少选择一项");
                                    }
                                    this.changeParams("some", value);
                                }}
                                disabled={type !== "some"}
                            >
                                {this.hourOptions}
                            </Select>
                            {/* <Checkbox.Group
                                value={some}
                                onChange={value => {
                                    if (value.length < 1) {
                                        return message.warn("至少选择一项");
                                    }
                                    this.changeParams("some", value);
                                }}
                                options={this.hourOptions}
                                disabled={type !== "some"}
                            /> */}
                        </List.Item>
                    </List>
                </Group>
            </div>
        );
    }
}
