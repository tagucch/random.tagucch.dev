import { useLayoutEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Select, { StylesConfig } from 'react-select'

const SingleSelect = ({
  options,
  defaultValue,
  onChange
}: {
  options: { label: string, value: string }[]
  defaultValue: { label: string, value: string }
  onChange: (selectedOption: { label: string, value: string }) => void
}) => {
  const { theme, resolvedTheme } = useTheme()
  const [isLightMode, setIsLightMode] = useState(true)
  useLayoutEffect(() => {
    // シークレットモードだとsystemがundefinedになる
    const currentTheme = theme ?? resolvedTheme
    const isLightMode = currentTheme === 'light'
    setIsLightMode(isLightMode)
  })
  const customStyles: StylesConfig = {
    control: (styles) => {
      if (isLightMode) return styles
      return { ...styles, backgroundColor: '#657380' }
    },
    singleValue: (styles) => {
      if (isLightMode) return styles
      return { ...styles, color: '#e5e4e6' }
    },
    option: (styles, { isFocused, isSelected }) => {
      const getBackgroundColor = () => {
        if (isLightMode) {
          if (isSelected) {
            return '#426579'
          } else if (isFocused) {
            return '#d1d5db'
          } else {
            return undefined
          }
        } else {
          if (isSelected) {
            return '#e5e4e6'
          } else if (isFocused) {
            return '#9ca3af'
          } else {
            return '#657380'
          }
        }
      }
      const getColor = () => {
        if (isLightMode) {
          return isSelected ? '#e5e4e6' : '#1a2533'
        } else {
          return isSelected ? '#1a2533' : '#e5e4e6'
        }
      }
      const backgroundColor = getBackgroundColor()
      const color = getColor()
      return { ...styles, backgroundColor, color }
    }
  }

  return (
    <Select
      options={options}
      defaultValue={defaultValue}
      onChange={onChange}
      styles={customStyles}
      className="w-4/5 md:w-1/2 max-w-full mx-auto mb-8"
    />
  )
}

export default SingleSelect