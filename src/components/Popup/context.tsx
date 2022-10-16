import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import CommonContext from 'states/commonContext'
import Device from 'utils/device'

import Tour from '@/assets/img/tour.png'

export const PopupContext = createContext<{
  shown: boolean
  setShown: Function
}>({
  shown: false,
  setShown: () => {}
})

export const PopupProvider = ({ children }: any) => {
  const [shown, setShown] = useState(false)
  const value = useMemo(
    () => ({
      shown,
      setShown
    }),
    [shown]
  )

  const cancel = () => {
    setShown(false)
  }

  const confirm = () => {
    if (Device.isAndroid()) {
      console.log('context android')
      window.location.href =
        'https://dir-prod.projectdavinci.com/server/0.0/androidv2.json?type=download'
      setShown(false)
    } else if (Device.isIOS()) {
      console.log('context ios')
      window.location.href =
        'https://testflight.apple.com/join/64FkMTIl'
      setShown(false)
    } else {
      console.log('context else')
      window.location.href =
        'https://dir-prod.projectdavinci.com/server/0.0/androidv2.json?type=download'
      setShown(false)
    }
  }

  return (
    <PopupContext.Provider value={value}>
      {children}
      <div
        className={`qp-modal ${
          value.shown ? 'qp-modal-showing' : ''
        }`}
      >
        {Device.isApplets() ? (
          <div className="qp-modal-tour">
            <img src={Tour} alt="Tour" />
          </div>
        ) : null}

        <div className="qp-modal-box">
          {!Device.isApplets() ? (
            <div className="qp-modal-confirm">
              <div className="qp-modal-title">
                是否下载应用
              </div>
              <div className="qp-modal-btns">
                <div
                  className="qp-modal-btn"
                  onClick={cancel}
                >
                  取消
                </div>
                <span>|</span>
                <div
                  className="qp-modal-btn confirm-btn"
                  onClick={confirm}
                >
                  继续
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </PopupContext.Provider>
  )
}

export const usePopup = () => useContext(PopupContext)
