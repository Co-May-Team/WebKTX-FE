export default function Motion({ children, ...props }) {
  return (
    // <motion.div
    //   initial={{ width: 0 }}
    //   animate={{
    //     width: "100%",
    //   }}
    //   exit={{
    //     x: window.innerWidth,
    //     transition: { duration: 0.25 },
    //   }}
    //   {...props}
    // >
    <div {...props}>{children}</div>
    // </motion.div>
  )
}
