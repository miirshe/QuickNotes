import { Link } from "react-router-dom"
import { GoHome } from "react-icons/go";
import { FaRegNoteSticky } from "react-icons/fa6";
import { MdClose, MdIncompleteCircle, MdPending } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
const Sidebar = ({showMenu , setShowMenu}) => {
  return (
    <div className={`w-full lg:w-[20%] fixed left-0 top-0 bottom-0 z-20 shadow bg-[#004C42] ${showMenu ? 'hidden lg:flex' : 'block'}`}>
      <div className="w-full p-4 space-y-4">
        <div className="w-full flex flex-row justify-between items-center gap-3">
          <Link to='/' className="font-bold tracking-widest text-2xl">
            <span className="text-white">Quick </span>
            <span className=" text-[#D9F47B]"> Notes</span>
          </Link>
          <MdClose onClick={() => setShowMenu(!showMenu)} size={20} className="lg:hidden block text-white cursor-pointer"/>
        </div>
        <div className="w-full mt-4 space-y-3">
          <h1 className="text-white tracking-widest font-extralight">Main</h1>
          <div className="w-full grid grid-cols-1 justify-start items-center gap-3" onClick={() => setShowMenu(!showMenu)}>
            <Link to='/' className="w-full flex flex-row justify-start items-center gap-3 mt-5 text-white">
              <GoHome className="inline" size={20} />
              <span>Home</span>
            </Link>
            <Link to='/notes' className="w-full flex flex-row justify-start items-center gap-3 mt-5 text-white">
              <FaRegNoteSticky className="inline" size={20} />
              <span>Notes</span>
            </Link>
            <Link to='/completed-notes' className="w-full flex flex-row justify-start items-center gap-3 mt-5 text-white">
              <MdIncompleteCircle className="inline" size={20} />
              <span>Completed</span>
            </Link>
            <Link to='/pending-notes' className="w-full flex flex-row justify-start items-center gap-3 mt-5 text-white">
              <MdPending className="inline" size={20} />
              <span>Pending</span>
            </Link>
            <hr className="w-full mt-3"/>
            <button className="w-full flex flex-row justify-start items-center gap-3 mt-5 text-white">
              <RiLogoutCircleRLine className="inline" size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar