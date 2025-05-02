import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { Alert, AlertDescription } from './alert';

interface SuccessAlertProps {
  message: string;
  onDismiss?: () => void;
}

export const SuccessAlert: React.FC<SuccessAlertProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <Alert className="mb-4 border-green-200 bg-green-50 text-green-800 animate-in fade-in duration-300">
      <CheckCircle2 className="h-4 w-4 text-green-600" />
      <AlertDescription className="flex-1 text-green-800">{message}</AlertDescription>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-auto flex h-4 w-4 items-center justify-center rounded-full hover:bg-green-100"
          aria-label="Dismiss success"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Alert>
  );
};

export default SuccessAlert; 