import { useState } from "react";
import { Hero } from "@/components/Hero";
import { PhotoUpload } from "@/components/PhotoUpload";
import { PhotoEditor } from "@/components/PhotoEditor";
import { Pricing } from "@/components/Pricing";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

  const handleGetStarted = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePhotoSelected = (file: File) => {
    setSelectedPhoto(file);
  };

  const handleBack = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={handleGetStarted} />
      
      <div id="upload-section">
        {selectedPhoto ? (
          <PhotoEditor photo={selectedPhoto} onBack={handleBack} />
        ) : (
          <PhotoUpload onPhotoSelected={handlePhotoSelected} />
        )}
      </div>
      
      <Pricing />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
