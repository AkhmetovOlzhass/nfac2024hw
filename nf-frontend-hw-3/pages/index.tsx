import { Kanit } from 'next/font/google';
import BlogList from "../app/components/blogList/blogList";
import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '@/app/context/ThemeContext';



const kanitFont = Kanit({
  weight: '500',
  style: 'normal',
  subsets: ['latin']
});

function Home() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useContext(ThemeContext) must be inside a ThemeProvider with a value");
  }
  const {theme, toggleTheme } = context;

  return (
      <div>
        <div className={`flex justify-between items-center`} >
          <h1 className={`py-16 text-5xl ${kanitFont.className}`}>Hello, world!</h1>
          <div className='flex gap-4'>
            <Link href={'/add'} className='bg-slate-700 rounded-2xl p-2 text-slate-100'>Add post</Link> 
            <button onClick={() => toggleTheme()}>toggle mod</button>
          </div>
        </div>

        <BlogList/>
      </div>

  );
}

export default Home;