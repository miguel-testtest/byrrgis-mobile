import { useState } from 'react'
import StatusBar from './StatusBar'
import TabBar from './TabBar'
import TopBar from './TopBar'
import ProfileSheet from './ProfileSheet'
import GlobalSearchOverlay from './GlobalSearchOverlay'

const MOCK_USER = { name: 'Cuenta 1', avatarColor: '#2D6A61', initial: 'M' }

export default function AppShell({ children, scrollRef, scrollStyle }) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)

  return (
    <div className="app">
      <div className="app-header">
        <StatusBar />
        <TopBar
          user={MOCK_USER}
          onProfilePress={() => setProfileOpen(true)}
          onSearchPress={() => setSearchOpen(true)}
        />
      </div>
      <div className="scroll-area" ref={scrollRef} style={scrollStyle}>
        {children}
      </div>
      <TabBar />
      {profileOpen && <ProfileSheet user={MOCK_USER} onClose={() => setProfileOpen(false)} />}
      <GlobalSearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
