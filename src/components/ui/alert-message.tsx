import React from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { Alert, AlertDescription } from './alert';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertMessageProps {
  type: AlertType;
  message: string;
  onDismiss?: () => void;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({ type, message, onDismiss }) => {
  if (!message) return null;

  // Define styles based on alert type
  const styles = {
    success: {
      background: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      hover: 'hover:bg-green-100',
      icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
    },
    error: {
      background: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      hover: 'hover:bg-red-100',
      icon: <AlertCircle className="h-4 w-4 text-red-600" />,
    },
    info: {
      background: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      hover: 'hover:bg-blue-100',
      icon: <Info className="h-4 w-4 text-blue-600" />,
    },
    warning: {
      background: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      hover: 'hover:bg-yellow-100',
      icon: <AlertCircle className="h-4 w-4 text-yellow-600" />,
    },
  };

  const style = styles[type];

  return (
    <Alert 
      className={`mb-4 ${style.border} ${style.background} ${style.text} animate-in fade-in duration-300`}
    >
      {style.icon}
      <AlertDescription className={`flex-1 ${style.text}`}>{message}</AlertDescription>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className={`ml-auto flex h-4 w-4 items-center justify-center rounded-full ${style.hover}`}
          aria-label={`Dismiss ${type} alert`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Alert>
  );
};

export default AlertMessage; 