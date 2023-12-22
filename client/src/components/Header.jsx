import { useGetUserQuery } from "../context/redux/slices/UserSlices"
import { MdClose, MdOutlineMenu } from "react-icons/md";
const Header = ({showMenu , setShowMenu}) => {
  const { data: user = {} } = useGetUserQuery();
  console.log(user);
  return (
    <div className="w-[90%] lg:w-[70%] mx-auto p-2 lg:p-4">
      <div className="w-full flex flex-row justify-between items-center gap-3">
        <h1><span className="text-lg font-medium">Hi</span> , <span className="text-base tracking-wider font-normal">{user?.user?.username}</span></h1>
        {
          showMenu ? <MdOutlineMenu onClick={() => setShowMenu(!showMenu)} size={20} className="lg:hidden block cursor-pointer"/>
          : <MdClose onClick={() => setShowMenu(!showMenu)} size={20} className="lg:hidden block cursor-pointer"/>
        }
      </div>
    </div>
  )
}

export default Header