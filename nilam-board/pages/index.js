import Image from 'next/image';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout/layout';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  return (
    <main className="bg-white">
      <h1>Home</h1>
    </main>
  );
};

export default Home;
