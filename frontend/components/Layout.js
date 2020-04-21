
const Layout = ({ children }) => {
    return (
        <>
          <p className="text-danger">Header</p>
            {children}
          <p>Footer</p>     
        </>
    )
}

export default Layout
