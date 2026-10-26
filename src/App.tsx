import { RouterProvider, useRouter } from '@/router/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import FindTutorPage from '@/pages/FindTutorPage';
import BecomeTutorPage from '@/pages/BecomeTutorPage';

function Pages() {
  const { route } = useRouter();
  return (
    <>
      {route === 'home' && <HomePage />}
      {route === 'find-tutor' && <FindTutorPage />}
      {route === 'become-tutor' && <BecomeTutorPage />}
    </>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <Pages />
        </main>
        <Footer />
      </div>
    </RouterProvider>
  );
}
