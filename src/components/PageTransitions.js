import { useLocation, useNavigate } from "react-router-dom"
import { animated, useTransition } from "react-spring"

export default function PageTransitions({ children }) {
  const location = useLocation()
  const navigate = useNavigate()

  const transitions = useTransition(location, {
    key: location.pathname,
    from: { opacity: 0, transform: "translate3d(100%, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(-50%, 0, 0)" },
  })

  return (
    <div style={{ position: "relative", height: "100%" }}>
      {transitions((style, item) => (
        <animated.div
          style={{
            ...style,
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </animated.div>
      ))}
    </div>
  )
}
