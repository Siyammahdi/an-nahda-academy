import React from 'react';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from './alert';

interface LoadingAlertProps {
  message?: string;
}

export const LoadingAlert: React.FC<LoadingAlertProps> = ({ 
  message = 'Loading, please wait...'
}) => {
  return (
    <Alert className="mb-4 border-blue-200 bg-blue-50 text-blue-800 animate-in fade-in duration-300">
      <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
      <AlertDescription className="flex-1 text-blue-800">{message}</AlertDescription>
    </Alert>
  );
};

export default LoadingAlert; 