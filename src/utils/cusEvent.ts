import { EventType } from 'types__g/common/aircityPlay/AirCityPlayInterface'

/**
 * 事件处理
 * @param e
 */
export function onEventExe(e: EventType) {
    console.log(e)
    if (e.eventtype === 'LeftMouseButtonClick') {
    }
}
