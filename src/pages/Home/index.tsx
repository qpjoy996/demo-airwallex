import React from 'react'
import Button from 'components/Button'
import './index.scss'

function Home() {
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
        <Button
          type="button"
          size="sm"
          onClick={() => alert(1)}
        >
          Request an invite
        </Button>
      </div>
      <div className="footer">
        <span>Made with ♥ in Melbourne. </span>
        <span>
          © 2016 Broccoli & Co. All rights reserved.
        </span>
      </div>
    </div>
  )
}

export default Home
