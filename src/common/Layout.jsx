import React from "react";


const Layout = ({ children}) => {
  return (
    <>
    <div className="bg-pattern bg-center bg-repeat">
        <main>{children}</main>
      </div>
    </>
  );
};


export default Layout;
