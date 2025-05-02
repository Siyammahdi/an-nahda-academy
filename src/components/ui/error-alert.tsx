import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Alert, AlertDescription } from './alert';

interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <Alert variant="destructive" className="mb-4 animate-in fade-in duration-300">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex-1">{message}</AlertDescription>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-auto flex h-4 w-4 items-center justify-center rounded-full hover:bg-destructive/20"
          aria-label="Dismiss error"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Alert>
  );
};

export default ErrorAlert; 