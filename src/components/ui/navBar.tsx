import NotifsIcon from "@/assets/icons/notification.svg";
import UserPlaceholderIcon from "@/assets/icons/user.svg";
import useUserStore from "@/store/user-store";

const NavBar = () => {
  const { user } = useUserStore();
  return (
    <nav className="flex justify-end items-center border-b-2 border-[#D5D5D5] h-[60px] gap-6 px-24">
      <img
        src={NotifsIcon}
        alt="notifsIcon.svg"
        className="w-[22px] h-[22px]"
      />
      <p className="text-[14px] font-semibold">{user?.name}</p>
      <img
        src={UserPlaceholderIcon}
        alt="user.svg"
        className="w-[36px] h-[36px] rounded-full bg-[#D5D5D5] text-blue-500"
      />
    </nav>
  );
};

export default NavBar;
