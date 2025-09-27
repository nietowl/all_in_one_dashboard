import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification, clearNotifications } from '../../store/slices/uiSlice';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Trash2 } from 'lucide-react';

const NotificationCenter = () => {
  const notifications = useSelector(state => state.ui.notifications);
  const dispatch = useDispatch();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getColorClasses = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const handleRemove = (id) => {
    dispatch(removeNotification(id));
  };

  const handleClearAll = () => {
    dispatch(clearNotifications());
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-96 max-w-sm">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          Notifications ({notifications.length})
        </span>
        {notifications.length > 1 && (
          <button
            onClick={handleClearAll}
            className="flex items-center text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Clear all
          </button>
        )}
      </div>

      {/* Notifications */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`rounded-lg border p-4 shadow-sm transition-all duration-300 ease-in-out ${getColorClasses(notification.type)}`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="ml-3 flex-1">
                <h4 className="text-sm font-medium">
                  {notification.title}
                </h4>
                {notification.message && (
                  <p className="mt-1 text-sm opacity-90">
                    {notification.message}
                  </p>
                )}
                {notification.timestamp && (
                  <p className="mt-1 text-xs opacity-70">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleRemove(notification.id)}
                className="flex-shrink-0 ml-3 p-1 hover:bg-black/10 rounded transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCenter;