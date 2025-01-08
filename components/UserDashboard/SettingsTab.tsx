// import React, { useState } from 'react';
// import { 
//   User, 
//   Bell, 
//   Shield, 
//   CreditCard, 
//   Mail, 
//   Lock, 
//   Globe, 
//   Moon,
//   LogOut
// } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface SettingsSectionProps {
//   icon: React.ElementType;
//   title: string;
//   children: React.ReactNode;
// }

// interface NotificationSettingProps {
//   title: string;
//   description: string;
//   defaultChecked?: boolean;
//   onToggle?: (enabled: boolean) => void;
// }

// interface UserProfile {
//   fullName: string;
//   email: string;
//   phone: string;
//   timezone: string;
// }

// interface BillingMonth {
//   month: string;
//   year: string;
//   amount: string;
// }

// const SettingsSection: React.FC<SettingsSectionProps> = ({ icon: Icon, title, children }) => (
//   <Card className="mb-8">
//     <CardHeader className="flex flex-row items-center space-y-0">
//       <Icon className="h-5 w-5 mr-2 text-indigo-600" />
//       <CardTitle>{title}</CardTitle>
//     </CardHeader>
//     <CardContent>{children}</CardContent>
//   </Card>
// );

// const NotificationSetting: React.FC<NotificationSettingProps> = ({ 
//   title, 
//   description, 
//   defaultChecked = false,
//   onToggle 
// }) => {
//   const [enabled, setEnabled] = useState(defaultChecked);

//   const handleToggle = (checked: boolean) => {
//     setEnabled(checked);
//     onToggle?.(checked);
//   };

//   return (
//     <div className="flex items-center justify-between py-3">
//       <div>
//         <h4 className="font-medium">{title}</h4>
//         <p className="text-sm text-gray-500">{description}</p>
//       </div>
//       <Switch 
//         checked={enabled} 
//         onCheckedChange={handleToggle}
//         className="ml-4"
//       />
//     </div>
//   );
// };

// export const SettingsTab: React.FC = () => {
//   const [darkMode, setDarkMode] = useState<boolean>(false);
//   const [profile, setProfile] = useState<UserProfile>({
//     fullName: "John Doe",
//     email: "john@example.com",
//     phone: "+1234567890",
//     timezone: "UTC-5"
//   });

//   const billingMonths: BillingMonth[] = [
//     { month: 'June', year: '2024', amount: '$50.00' },
//     { month: 'May', year: '2024', amount: '$45.00' },
//     { month: 'April', year: '2024', amount: '$55.00' }
//   ];

//   const handleProfileUpdate = (event: React.FormEvent) => {
//     event.preventDefault();
//     console.log('Profile updated:', profile);
//   };

//   const handleNotificationToggle = (setting: string, enabled: boolean) => {
//     console.log(`${setting} notifications ${enabled ? 'enabled' : 'disabled'}`);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Profile Settings */}
//       <SettingsSection icon={User} title="Profile Settings">
//         <form onSubmit={handleProfileUpdate}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name</Label>
//               <Input 
//                 id="name" 
//                 value={profile.fullName}
//                 onChange={(e) => setProfile({...profile, fullName: e.target.value})}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email">Email Address</Label>
//               <div className="flex items-center space-x-2">
//                 <Input 
//                   id="email" 
//                   type="email" 
//                   value={profile.email}
//                   onChange={(e) => setProfile({...profile, email: e.target.value})}
//                 />
//                 <Button size="sm" variant="outline">
//                   <Mail className="h-4 w-4 mr-2" />
//                   Verify
//                 </Button>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="phone">Phone Number</Label>
//               <Input 
//                 id="phone" 
//                 type="tel" 
//                 value={profile.phone}
//                 onChange={(e) => setProfile({...profile, phone: e.target.value})}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="timezone">Timezone</Label>
//               <Select 
//                 value={profile.timezone}
//                 onValueChange={(value) => setProfile({...profile, timezone: value})}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select timezone" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="UTC-5">UTC-5 (Eastern Time)</SelectItem>
//                   <SelectItem value="UTC-8">UTC-8 (Pacific Time)</SelectItem>
//                   <SelectItem value="UTC+1">UTC+1 (Central European Time)</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <Button type="submit" className="mt-4">
//             <Globe className="h-4 w-4 mr-2" />
//             Save Changes
//           </Button>
//         </form>
//       </SettingsSection>

//       {/* Notification Preferences */}
//       <SettingsSection icon={Bell} title="Notification Settings">
//         <div className="space-y-4">
//           <NotificationSetting
//             title="Analysis Completion"
//             description="Get notified when your document analysis is complete"
//             defaultChecked={true}
//             onToggle={(enabled) => handleNotificationToggle('Analysis', enabled)}
//           />
//           <NotificationSetting
//             title="Credit Balance Alerts"
//             description="Receive alerts when your credit balance is low"
//             defaultChecked={true}
//             onToggle={(enabled) => handleNotificationToggle('Balance', enabled)}
//           />
//           <NotificationSetting
//             title="Special Offers"
//             description="Stay updated with special offers and promotions"
//             defaultChecked={false}
//             onToggle={(enabled) => handleNotificationToggle('Offers', enabled)}
//           />
//           <NotificationSetting
//             title="Newsletter"
//             description="Receive monthly newsletter with tips and updates"
//             defaultChecked={false}
//             onToggle={(enabled) => handleNotificationToggle('Newsletter', enabled)}
//           />
//         </div>
//       </SettingsSection>

//       {/* Security Settings */}
//       <SettingsSection icon={Shield} title="Security Settings">
//         <div className="space-y-6">
//           <div>
//             <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
//             <p className="text-sm text-gray-500 mb-2">
//               Add an extra layer of security to your account
//             </p>
//             <Button variant="outline">
//               <Lock className="h-4 w-4 mr-2" />
//               Enable 2FA
//             </Button>
//           </div>

//           <div>
//             <h4 className="font-medium mb-2">Change Password</h4>
//             <div className="space-y-3">
//               <div className="space-y-2">
//                 <Label htmlFor="currentPassword">Current Password</Label>
//                 <Input id="currentPassword" type="password" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="newPassword">New Password</Label>
//                 <Input id="newPassword" type="password" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="confirmPassword">Confirm New Password</Label>
//                 <Input id="confirmPassword" type="password" />
//               </div>
//               <Button>
//                 <Shield className="h-4 w-4 mr-2" />
//                 Update Password
//               </Button>
//             </div>
//           </div>

//           <div>
//             <h4 className="font-medium mb-2">Active Sessions</h4>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="font-medium">Current Session</p>
//                   <p className="text-sm text-gray-500">Last active: Just now</p>
//                 </div>
//                 <Button variant="destructive" size="sm">
//                   <LogOut className="h-4 w-4 mr-2" />
//                   End Session
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </SettingsSection>

//       {/* Billing Settings */}
//       <SettingsSection icon={CreditCard} title="Billing Settings">
//         <div className="space-y-4">
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <h4 className="font-medium mb-2">Payment Method</h4>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <CreditCard className="h-6 w-6 mr-2" />
//                 <span>•••• •••• •••• 4242</span>
//               </div>
//               <Button variant="outline" size="sm">Update</Button>
//             </div>
//           </div>

//           <div>
//             <h4 className="font-medium mb-2">Billing History</h4>
//             <div className="space-y-2">
//               {billingMonths.map((bill, i) => (
//                 <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                   <div className="flex items-center">
//                     <span>{bill.month} {bill.year}</span>
//                     <span className="ml-4 text-gray-500">{bill.amount}</span>
//                   </div>
//                   <Button variant="ghost" size="sm">Download</Button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </SettingsSection>

//       {/* Appearance Settings */}
//       <SettingsSection icon={Moon} title="Appearance">
//         <div className="flex items-center justify-between">
//           <div>
//             <h4 className="font-medium">Dark Mode</h4>
//             <p className="text-sm text-gray-500">Toggle dark mode theme</p>
//           </div>
//           <Switch 
//             checked={darkMode} 
//             onCheckedChange={setDarkMode}
//           />
//         </div>
//       </SettingsSection>
//     </div>
//   );
// };


// SettingsTab.tsx
import React from 'react';
import { User, Shield, Bell, Moon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import toast from 'react-hot-toast';
import { useGetMeQuery } from '@/src/redux/features/auth/authApi';
import { UserProfile } from '@/types/auth';
import { ProfileSection } from './settings/ProfileSection';
import { PasswordSection } from './settings/PasswordSection';
import NotificationSection from './settings/NotificationSection';

interface SettingsSectionProps
{
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ icon: Icon, title, children }) => (
  <Card className="mb-8">
    <CardHeader className="flex flex-row items-center space-y-0">
      <Icon className="h-5 w-5 mr-2 text-indigo-600" />
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export const SettingsTab: React.FC = () =>
{
  const { data: userData, isLoading } = useGetMeQuery();
  const [darkMode, setDarkMode] = React.useState(false);

  const handleProfileUpdate = async (updatedFields: Partial<UserProfile>) =>
  {
    try
    {
      // Add API call to update profile
      console.log('Updating profile:', updatedFields);
      toast.success('Profile updated successfully');
    } catch (error)
    {
      toast.error('Failed to update profile');
    }
  };

  if (isLoading)
  {
    return <div>Loading...</div>;
  }

  if (!userData?.user)
  {
    return <div>Error loading user data</div>;
  }

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <SettingsSection icon={User} title="Profile Settings">
        <ProfileSection
          user={userData.user}
          onUpdateProfile={handleProfileUpdate}
        />
      </SettingsSection>

      {/* Security Settings */}
      <SettingsSection icon={Shield} title="Security Settings">
        <PasswordSection />
      </SettingsSection>

      {/* Notification Settings */}
      <SettingsSection icon={Bell} title="Notification Settings">
        <NotificationSection />
      </SettingsSection>

      {/* Appearance Settings */}
      <SettingsSection icon={Moon} title="Appearance">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Dark Mode</h4>
            <p className="text-sm text-gray-500">Toggle dark mode theme</p>
          </div>
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
        </div>
      </SettingsSection>
    </div>
  );
};

export default SettingsTab;