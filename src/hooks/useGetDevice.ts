import { useEffect, useState } from 'react';

interface DeviceInfo {
  deviceId: string;
  userAgent: string;
  platform: string;
  language: string;
  screenResolution: string;
}

export const useGetDevice = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    deviceId: '',
    userAgent: '',
    platform: '',
    language: '',
    screenResolution: '',
  });

  useEffect(() => {
    // Generate a unique device ID using various browser properties
    const generateDeviceId = (): string => {
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      const language = navigator.language;
      const screenResolution = `${window.screen.width}x${window.screen.height}`;
      
      // Create a hash of the device characteristics
      const deviceString = `${userAgent}${platform}${language}${screenResolution}`;
      let hash = 0;
      
      for (let i = 0; i < deviceString.length; i++) {
        const char = deviceString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      
      return Math.abs(hash).toString(16);
    };

    setDeviceInfo({
      deviceId: generateDeviceId(),
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
    });
  }, []);

  return deviceInfo;
};
