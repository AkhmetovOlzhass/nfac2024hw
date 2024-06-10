import { useAuth } from "../context/AuthContext";
import Image from 'next/image';
import logoutImage from '../assets/img/logout.svg'

const LogoutBtn = () => {

    const { logout } = useAuth();
    return (
        <div className="w-6 cursor-pointer" onClick={() => logout()}>
            <Image
              src={logoutImage}
              alt="logout"
              width={24}
              height={24}
              layout="responsive"
            />
        </div>
    )
}

export default LogoutBtn;