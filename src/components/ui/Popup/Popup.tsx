import { Style } from 'util'
import styles from './Popup.module.scss'
import { CSSProperties, FC, useEffect, useState } from 'react'

interface IPopupProps {
  Content: FC
  Tooltip: FC
  constentStyles?: CSSProperties
  tooltipStyles?: CSSProperties
}

const Popup: FC<IPopupProps> = ({
  Content,
  Tooltip,
  constentStyles,
  tooltipStyles,
}) => {
  // костыль, чтоб не было ошибки из-за массовых запросах из tooltip компонента
  const [tooltipIsVisible, setTooltipIsVisible] = useState(false)
  const onMouseOver = () => {
    // console.log('onMouseOver');
    setTooltipIsVisible(true)
  }

  useEffect(() => {
    console.log('Popup')
  }, [])

  return (
    <div className={styles.wrapper} style={constentStyles}>
      <div onMouseOver={onMouseOver}>
        <Content />
      </div>

      {tooltipIsVisible && (
        <div className={styles.tooltip} style={tooltipStyles}>
          <Tooltip />
        </div>
      )}
    </div>
  )
}

export default Popup
