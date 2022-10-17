import React, { useState } from 'react'

import Invite from 'pages/Modal/invite'
import Button from 'components/Button'
import useModal from 'components/Popup/useModal'
import './index.scss'

function Home() {
  const { isOpen, openModal, closeModal, Modal } =
    useModal()

  return (
    <div className="home">
      <div className="nav">BROCCOLI & CO.</div>
      <div className="container">
        <div className="slogan">
          <span>A better way </span>
          <span>to enjoy every day.</span>
        </div>

        <div className="desc">
          Be the first to know when we launch.
        </div>
        <div>
          <Button
            type="button"
            size="sm"
            onClick={openModal}
          >
            Request an invite
          </Button>
        </div>
      </div>
      <div className="footer">
        <span>Made with ♥ in Melbourne. </span>
        <span>
          © 2016 Broccoli & Co. All rights reserved.
        </span>
      </div>
      {isOpen && (
        <Modal>
          <Invite />
        </Modal>
      )}
    </div>
  )
}

export default Home
