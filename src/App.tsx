import { useState } from 'react';
import { SignatureForm } from './components/SignatureForm';
import { SignaturePreview } from './components/SignaturePreview';
import type { SignatureData } from './types';
import { initialSignatureData } from './types';


function App() {
  const [signatureData, setSignatureData] = useState<SignatureData>({
    ...initialSignatureData,
    fullName: '',
    designation: '',
    email: '',
    phone: '',
    mobile: '',
    teams: '',
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleClear = () => {
    setSignatureData({
      ...initialSignatureData,
      fullName: '',
      designation: '',
      email: '',
      phone: '',
      mobile: '',
      teams: '',
      templateType: signatureData.templateType, // preserve the selected template
    });
  };

  const handleLoadDefaults = () => {
    setSignatureData(initialSignatureData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <img src={`${import.meta.env.BASE_URL}favicon.png`} alt="Phamax Logo" className="h-6 w-auto mr-3" />
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Phamax Signature Studio</h1>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-3">
        {/* Top: Form */}
        <section className="w-full">
          <SignatureForm 
            data={signatureData} 
            onChange={setSignatureData} 
            onClear={handleClear}
            onLoadDefaults={handleLoadDefaults}
          />
        </section>

        {/* Bottom: Preview */}
        <section className="w-full">
          <SignaturePreview 
            data={signatureData} 
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
