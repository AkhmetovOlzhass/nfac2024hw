import { Kanit } from 'next/font/google';

const kanitFont = Kanit({
  weight: '500',
  style: 'normal',
  subsets: ['latin']
});

export default function Header() {
    return (
      <h3 className={`font-medium text-lg py-6 ${kanitFont.className}`}>medium alike</h3>
    );
}
  