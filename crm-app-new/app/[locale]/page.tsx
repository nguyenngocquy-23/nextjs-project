// import {useTranslations} from 'next-intl';

// export default function Home() {
//   const t = useTranslations('HomePage');
//   return (
//    <h1 className='text-red-500 text-3xl text-center mt-11 font-semibold font-mono'>{t('title')}</h1>
//   );
// }
import {redirect} from 'next/navigation';

export default function HomePage() {
  redirect('/dashboard');
}