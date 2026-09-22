import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import Organization from './components/Organization';
import ImportanceOfData from './components/ImportanceOfData';
import Curiosities from './components/Curiosities';
import RegistrationForm from './components/RegistrationForm';
import LogoFooter from './components/LogoFooter';
import MathBackground from './components/MathBackground';
import Speakers from './components/Speakers';

function MainSite() {
  return (
    <>
      <Hero />
      <Schedule />
      <Organization />
      <RegistrationForm />
      <LogoFooter />
    </>
  );
}

function CuriositiesSite() {
  return (
    <>
      <ImportanceOfData />
      <Curiosities />
      <LogoFooter />
    </>
  );
}

function SpeakersSite() {
  return (
    <>
      <Speakers />
      <LogoFooter />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen text-editorial-dark font-sans selection:bg-editorial-accent/20">
        <MathBackground />
        <Navbar />
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/curiosidades" element={<CuriositiesSite />} />
          <Route path="/oradores" element={<SpeakersSite />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

