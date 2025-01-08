import React from 'react';
import { Switch } from "@/components/ui/switch";
import toast from 'react-hot-toast';

interface NotificationSettingProps {
  title: string;
  description: string;
  defaultChecked?: boolean;
  onToggle?: (enabled: boolean) => void;
}

const NotificationSetting: React.FC<NotificationSettingProps> = ({ 
  title, 
  description, 
  defaultChecked = false,
  onToggle 
}) => {
  const [enabled, setEnabled] = React.useState(defaultChecked);

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    onToggle?.(checked);
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <Switch 
        checked={enabled} 
        onCheckedChange={handleToggle}
        className="ml-4"
      />
    </div>
  );
};

export const NotificationSection: React.FC = () => {
  const handleNotificationToggle = async (type: string, enabled: boolean) => {
    try {
      // Here you would typically make an API call to update the notification preferences
      toast.success(`${type} notifications ${enabled ? 'enabled' : 'disabled'}`);
    } catch (error) {
      toast.error(`Failed to update ${type.toLowerCase()} notification settings`);
    }
  };

  return (
    <div className="space-y-4">
      <NotificationSetting
        title="Analysis Completion"
        description="Get notified when your document analysis is complete"
        defaultChecked={true}
        onToggle={(enabled) => handleNotificationToggle('Analysis', enabled)}
      />
      <NotificationSetting
        title="Credit Balance Alerts"
        description="Receive alerts when your credit balance is low"
        defaultChecked={true}
        onToggle={(enabled) => handleNotificationToggle('Balance', enabled)}
      />
      <NotificationSetting
        title="Special Offers"
        description="Stay updated with special offers and promotions"
        defaultChecked={false}
        onToggle={(enabled) => handleNotificationToggle('Offers', enabled)}
      />
      <NotificationSetting
        title="Newsletter"
        description="Receive monthly newsletter with tips and updates"
        defaultChecked={false}
        onToggle={(enabled) => handleNotificationToggle('Newsletter', enabled)}
      />
    </div>
  );
};

export default NotificationSection;