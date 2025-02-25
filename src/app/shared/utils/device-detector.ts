import { DeviceDetectorService } from 'ngx-device-detector';
import { Injectable } from '@angular/core';
import { DetectDevice } from '@/app/shared/models/detect-device.model';

@Injectable({
   providedIn: 'root'
})
export class DeviceDetector {
   constructor(private deviceService: DeviceDetectorService) { }

   getDevice(): DetectDevice {
      const deviceInfo: any = this.deviceService.getDeviceInfo();

      return {
         platform: deviceInfo.deviceType,
         os: `${deviceInfo.os} Version ${deviceInfo.os_version}`,
         browser: `${deviceInfo.browser} Version ${deviceInfo.browser_version}`
      };
   }
}