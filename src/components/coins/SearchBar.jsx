import { useEffect, useRef } from 'react'
import { IconSearch } from '../ui/Icons'

export default function SearchBar({ value, onChange }) {
  const inputRef = useRef()
  useEffect(() => { inputRef.current?.focus() }, [])

  return (
    <div className="search-bar">
      <IconSearch size={16} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search coins"
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
    </div>
  )
}
