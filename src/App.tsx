import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { MobileMenu } from "./components/MobileMenu";
import { Footer } from "./components/Footer";
import { Preloader } from "./components/Preloader";

// Pages
import Home from "./pages/Home";
import NecessaryInfo from "./pages/NecessaryInfo";
import OurProducts from "./pages/OurProducts";
import Contact from "./pages/Contact";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Preload critical resources when app mounts
  useEffect(() => {
    const preloadResources = [
      // Main logo
      '/images/mainlogocreatok.png',
      // Screenshot images
      '/images/img1.avif',
      '/images/img2.avif',
      '/images/img5.avif',
      '/images/img6.avif',
      '/images/img7.avif',
      '/images/img8.avif',
      // Region logos - AVIF format
      '/images/usflagwhite1.avif',
      '/images/ukflagwhite1.avif',
      '/images/eulogo.avif',
      // Region logos - WebP fallback format
      '/images/usflagwhite1.webp',
      '/images/ukflagwhite1.webp',
      '/images/eulogo.webp',
    ];
    
    preloadResources.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  
  // Function to be called from Home component when loading is complete
  const handleAppLoaded = () => {
    setIsAppLoading(false);
  };
  
  // Function to update loading progress
  const updateLoadingProgress = (progress: number) => {
    setLoadingProgress(progress);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Preloader at the app level */}
        {isAppLoading && <Preloader progress={loadingProgress} />}
        
        {/* Main content with controlled visibility */}
        <div className={`transition-opacity duration-200 ${!isAppLoading ? 'opacity-100' : 'opacity-0'}`}>
          {/* Navbar */}
          <nav
            ref={navbarRef}
            className="relative top-0 z-40 p-4 bg-gradient-to-r bg-opacity-80 shadow-[0_0_15px_rgba(255,29,72,0.3)] border-b border-rose-400/30 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,220,255,0.5)]"
          >
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img
                  src="/images/mainlogocreatok.png"
                  alt="CREATOK Logo"
                  className="w-auto h-8"
                />
              </div>

              <ul className="hidden md:flex space-x-5">
                <li>
                  <a href="/" className="font-bold hover:text-gray-300">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/necessary-info"
                    className="font-bold hover:text-gray-300"
                  >
                    Necessary Info
                  </a>
                </li>
                <li>
                  <a
                    href="/our-products"
                    className="font-bold hover:text-gray-300"
                  >
                    Our Products
                  </a>
                </li>
                <li>
                  <a href="/contact" className="font-bold hover:text-gray-300">
                    Contact
                  </a>
                </li>
              </ul>

              <button
                className="md:hidden p-2 rounded-md hover:bg-rose-700 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </nav>

          <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

          {/* Page Content */}
          <Routes>
  <Route 
    path="/" 
    element={
      <Home 
        onAppLoaded={handleAppLoaded}
        onProgressUpdate={updateLoadingProgress}
        isAppLoading={isAppLoading}
      />
    } 
  />
  <Route 
    path="/necessary-info" 
    element={<NecessaryInfo onAppLoaded={handleAppLoaded} />} 
  />
  <Route 
    path="/our-products" 
    element={<OurProducts onAppLoaded={handleAppLoaded} />} 
  />
  <Route 
    path="/contact" 
    element={<Contact onAppLoaded={handleAppLoaded} />} 
  />
</Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}