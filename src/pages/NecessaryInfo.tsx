import { NecessaryInfoSection } from "../components/NecessaryInfoSection";
import { useEffect } from "react";
interface NecessaryInfoProps {
  onAppLoaded?: () => void;
}

export default function NecessaryInfo({ onAppLoaded = () => {} }: NecessaryInfoProps) {
  useEffect(() => {
    // Simulate loading if needed
    const timer = setTimeout(() => {
      onAppLoaded();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [onAppLoaded]);
  
  return <NecessaryInfoSection />;
}
