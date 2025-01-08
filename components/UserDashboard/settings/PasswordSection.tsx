import React, { useState } from 'react';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useChangePasswordMutation } from '@/src/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PasswordInputProps
{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
}

const PasswordInput = React.memo(({
  id,
  label,
  value,
  onChange,
  showPassword,
  onTogglePassword
}: PasswordInputProps) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="pr-10"
      />
      <button
        type="button"
        onClick={onTogglePassword}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  </div>
));

PasswordInput.displayName = 'PasswordInput';

export const PasswordSection: React.FC = () =>
{
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async (e: React.FormEvent) =>
  {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password)
    {
      toast.error('New passwords do not match');
      return;
    }

    try
    {
      const response = await changePassword({
        old_password: formData.old_password,
        new_password: formData.new_password
      }).unwrap();

      console.log(response);
      // Handle the success response
      const successMessage = response?.message || 'Password updated successfully';
      toast.success(successMessage);

      setFormData({
        old_password: '',
        new_password: '',
        confirm_password: ''
      });
    } catch (error: any)
    {
      // Handle the error response
      const errorMessage = error?.data?.message ||
        error?.data?.detail ||
        error?.data?.error ||
        'Failed to update password';
      toast.error(errorMessage);
    }
  };

  const handlePasswordChange = (field: keyof typeof formData) => (value: string) =>
  {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTogglePassword = (field: keyof typeof showPasswords) => () =>
  {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PasswordInput
        id="currentPassword"
        label="Current Password"
        value={formData.old_password}
        onChange={handlePasswordChange('old_password')}
        showPassword={showPasswords.old_password}
        onTogglePassword={handleTogglePassword('old_password')}
      />

      <PasswordInput
        id="newPassword"
        label="New Password"
        value={formData.new_password}
        onChange={handlePasswordChange('new_password')}
        showPassword={showPasswords.new_password}
        onTogglePassword={handleTogglePassword('new_password')}
      />

      <PasswordInput
        id="confirmPassword"
        label="Confirm New Password"
        value={formData.confirm_password}
        onChange={handlePasswordChange('confirm_password')}
        showPassword={showPasswords.confirm_password}
        onTogglePassword={handleTogglePassword('confirm_password')}
      />

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 
                 hover:from-blue-600 hover:via-indigo-600 hover:to-violet-600 text-white"
      >
        <Shield className="h-4 w-4 mr-2" />
        {isLoading ? 'Updating Password...' : 'Update Password'}
      </Button>
    </form>
  );
};