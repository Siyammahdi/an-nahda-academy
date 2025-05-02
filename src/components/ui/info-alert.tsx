import React from 'react';
import { Info, X } from 'lucide-react';
import { Alert, AlertDescription } from './alert';

interface InfoAlertProps {
  message: string;
  onDismiss?: () => void;
}

export const InfoAlert: React.FC<InfoAlertProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <Alert className="mb-4 border-blue-200 bg-blue-50 text-blue-800 animate-in fade-in duration-300">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="flex-1 text-blue-800">{message}</AlertDescription>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-auto flex h-4 w-4 items-center justify-center rounded-full hover:bg-blue-100"
          aria-label="Dismiss info"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Alert>
  );
};

export default InfoAlert; 