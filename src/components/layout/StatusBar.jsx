import { IconSignal, IconWifi, IconBattery } from '../ui/Icons'

export default function StatusBar() {
  const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })

  return (
    <div className="status-bar">
      <span className="status-bar__time">{time}</span>
      <div className="status-bar__icons">
        <IconSignal />
        <IconWifi />
        <IconBattery />
      </div>
    </div>
  )
}
