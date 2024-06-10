import Link from 'next/link';
import './components.css';

const HeaderElement = () => {
    return(
        <header className="bg-[#002F34] h-20 fixed top-0 w-full px-[121px] flex items-center justify-between">

        <Link href="/" className="css-1kpgv52"><span className="css-o7mc1q"></span><span className="css-13xlyet"></span><span className="css-9vxyyg"></span></Link>

        <Link href="/pages/createProduct" className='color-[#002F34] border-white border-[6px] hover:bg-[#002F34] hover:text-white text-xl font-bold bg-[#FFFFFF] px-[22px] py-[10px] rounded-[5px]'> Создать Объявление </Link>

        </header>
    )
}

export default HeaderElement;