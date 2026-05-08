import StatusBar from './StatusBar'
import TabBar from './TabBar'

export default function AppShell({ children, scrollRef, scrollStyle }) {
  return (
    <div className="app">
      <StatusBar />
      <div className="scroll-area" ref={scrollRef} style={scrollStyle}>
        {children}
      </div>
      <TabBar />
    </div>
  )
}
