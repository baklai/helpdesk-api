import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ping, { pingResponse } from 'pingman';
import inspectorVBS from 'src/common/utils/inspector.util';
import { QueryDto } from './dto/query-systool.dto';

@Injectable()
export class SystoolsService {
  constructor(private readonly configService: ConfigService) {}

  async commandPing({ host }: QueryDto): Promise<pingResponse> {
    return await ping(host, { timeout: 3 });
  }

  scriptInspector(protocol: string, host: string): Buffer {
    const apiInspector = `${protocol}://${host}/api/v1/inspectors`;
    const publicToken = this.configService.get('HDPublicToken');
    const vbs = inspectorVBS(apiInspector, publicToken);
    return Buffer.from(vbs);
  }

  linkPing({ host }: QueryDto): Buffer {
    const ping =
      ': PING ' +
      host +
      '\n' +
      'cmd.exe /c "title PING ' +
      host +
      ' & color 2 & mode con:cols=120 lines=30 & ping ' +
      host +
      ' -t"' +
      '\n';

    return Buffer.from(ping);
  }

  linkRDP({ host }: QueryDto): Buffer {
    const rdp =
      'screen mode id:i:2\n' +
      'use multimon:i:0\n' +
      'desktopwidth:i:800\n' +
      'desktopheight:i:600\n' +
      'session bpp:i:32\n' +
      'winposstr:s:0,3,0,0,800,600\n' +
      'compression:i:1\n' +
      'keyboardhook:i:2\n' +
      'audiocapturemode:i:0\n' +
      'videoplaybackmode:i:1\n' +
      'connection type:i:7\n' +
      'networkautodetect:i:1\n' +
      'bandwidthautodetect:i:1\n' +
      'displayconnectionbar:i:1\n' +
      'enableworkspacereconnect:i:0\n' +
      'disable wallpaper:i:0\n' +
      'allow font smoothing:i:0\n' +
      'allow desktop composition:i:0\n' +
      'disable full window drag:i:1\n' +
      'disable menu anims:i:1\n' +
      'disable themes:i:0\n' +
      'disable cursor setting:i:0\n' +
      'bitmapcachepersistenable:i:1\n' +
      'audiomode:i:0\n' +
      'redirectprinters:i:1\n' +
      'redirectcomports:i:0\n' +
      'redirectsmartcards:i:1\n' +
      'redirectclipboard:i:1\n' +
      'redirectposdevices:i:0\n' +
      'autoreconnection enabled:i:1\n' +
      'authentication level:i:2\n' +
      'prompt for credentials:i:0\n' +
      'negotiate security layer:i:1\n' +
      'remoteapplicationmode:i:0\n' +
      'alternate shell:s:\n' +
      'shell working directory:s:\n' +
      'gatewayhostname:s:\n' +
      'gatewayusagemethod:i:4\n' +
      'gatewaycredentialssource:i:4\n' +
      'gatewayprofileusagemethod:i:0\n' +
      'promptcredentialonce:i:0\n' +
      'gatewaybrokeringtype:i:0\n' +
      'use redirection server name:i:0\n' +
      'rdgiskdcproxy:i:0\n' +
      'kdcproxyname:s:\n' +
      `full address:s:${host}`;

    return Buffer.from(rdp);
  }

  linkVNC({ host }: QueryDto): Buffer {
    const vnc = `
      [connection]
      index=
      host=${host}
      port=5900
      proxyhost=
      proxyport=5900
      password=
      [options]
      use_encoding_0=1
      use_encoding_1=1
      use_encoding_2=1
      use_encoding_3=0
      use_encoding_4=1
      use_encoding_5=1
      use_encoding_6=1
      use_encoding_7=1
      use_encoding_8=1
      use_encoding_9=1
      use_encoding_10=1
      use_encoding_11=0
      use_encoding_12=0
      use_encoding_13=0
      use_encoding_14=0
      use_encoding_15=0
      use_encoding_16=1
      use_encoding_17=1
      preferred_encoding=16
      restricted=0
      viewonly=0
      nostatus=0
      nohotkeys=0
      showtoolbar=1
      AutoScaling=1
      fullscreen=0
      directx=0
      autoDetect=1
      8bit=0
      shared=1
      swapmouse=0
      belldeiconify=0
      emulate3=1
      JapKeyboard=1
      emulate3timeout=100
      emulate3fuzz=4
      disableclipboard=0
      localcursor=1
      Scaling=0
      scale_num=1
      scale_den=1
      cursorshape=1
      noremotecursor=0
      compresslevel=6
      quality=6
      ServerScale=1
      Reconnect=3
      EnableCache=1
      QuickOption=8
      UseDSMPlugin=0
      UseProxy=0
      sponsor=0
      selectedscreen=1
      DSMPlugin=NoPlugin
      AutoReconnect=3
      ExitCheck=0
      FileTransferTimeout=30
      KeepAliveInterval=5
      SocketKeepAliveTimeout=10000
      ThrottleMouse=0
      AutoAcceptIncoming=0
      AutoAcceptNoDSM=0
      RequireEncryption=0
      PreemptiveUpdates=0`;

    return Buffer.from(vnc);
  }
}
