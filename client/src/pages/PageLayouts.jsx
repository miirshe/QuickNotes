import { Outlet } from "react-router-dom"
import { Header, Sidebar } from "../App"
import { useState } from "react";
const PageLayouts = () => {
    const [showMenu, setShowMenu] = useState(true);
    return (
        <div className="w-full">
            <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
            <div className="w-full lg:w-[80%] mx-auto p-2 relative">
                <Header showMenu={showMenu} setShowMenu={setShowMenu} />
                <Outlet />
            </div>
        </div>
    )
}

export default PageLayouts