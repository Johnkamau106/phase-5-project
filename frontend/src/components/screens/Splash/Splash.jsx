import React from 'react';
import '../../SplashFooter.css';
import SplashNavBar from '../../SplashNavBar';
import SplashHeroSection from '../../splashHeroSection';
import SplashAboutSection from '../../SplashAboutSection';
import SplashOrphanages from '../../SplashOrphanages';
import SplashFooter from '../../SplashFooter';
import './Splash.css';

const Splash = () => {
  return (
    <div className="splash-page">
      <SplashNavBar />
      <SplashHeroSection />
      <SplashOrphanages />
      <SplashAboutSection />
      <SplashFooter />
    </div>
  );
};

export default Splash;
