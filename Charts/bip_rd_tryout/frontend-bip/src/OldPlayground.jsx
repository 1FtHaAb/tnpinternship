import { useState } from 'react';
import LibrarySelector from './components/old/LibrarySelector';
import Dashboard from './components/old/Dashboard';

export default function OldPlayground() {
  const [selectedLibrary, setSelectedLibrary] = useState(null);

  if (!selectedLibrary) {
    return <LibrarySelector onSelect={setSelectedLibrary} />;
  }

  return <Dashboard library={selectedLibrary} onBack={() => setSelectedLibrary(null)} />;
}