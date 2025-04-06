import './BackgroundWrapper.css'

function BackgroundWrapper({ children }) {
  return (
    <div className="background-wrapper">
      {children}
    </div>
  )
}

export default BackgroundWrapper 