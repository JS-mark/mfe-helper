import { useJSBridge, SYSTEM_ENV } from "@/plugins/Bridge";
import { SettingSpace } from "@/store";

export const env = window.utools ? SYSTEM_ENV.UTOOLS : SYSTEM_ENV.TAURI;

export const { useBridge } = useJSBridge();

/**
 * 获取系统信息
 * @returns
 */
export const getSystemInfo = () => {
  return {
    ua: window.navigator.userAgent,
  };
};

/**
 * 打开文件
 * @param file
 */
export const openFile = (file?: string) => {
  if (!file) return;
  if (env === SYSTEM_ENV.UTOOLS) {
    useBridge((bridge) => {
      bridge.shellShowItemInFolder(file);
    });
  }

  if (env === SYSTEM_ENV.TAURI) {
    useBridge<SYSTEM_ENV.TAURI>((bridge) => {
      bridge("openFile", {
        file,
      });
    });
  }
};

/**
 * 打开文件夹
 * @param file
 */
export const openDirectory = (file?: string) => {
  return new Promise((resolve) => {
    if (env === SYSTEM_ENV.UTOOLS) {
      useBridge((bridge) => {
        const paths = bridge.showOpenDialog({
          title: "选择储存数据文件夹",
          defaultPath: file || bridge.getPath("home"),
          properties: ["openDirectory"],
        });
        resolve(paths && paths[0]);
      });
    }

    if (env === SYSTEM_ENV.TAURI) {
      useBridge<SYSTEM_ENV.TAURI>((bridge) => {
        bridge("openDirectory", {
          file,
        }).then((res) => {
          resolve(res);
        });
      });
    }
  });
};

/**
 * 获取用户信息
 * @param file
 */
export const getUserInfo = (): Promise<SettingSpace.User> => {
  return new Promise((resolve) => {
    if (env === SYSTEM_ENV.UTOOLS) {
      useBridge((bridge) => {
        const user = bridge.getUser();
        resolve({
          ua: window.navigator.userAgent,
          home: bridge.getPath("home"),
          user: user as SettingSpace.User["user"],
        });
      });
    }

    if (env === SYSTEM_ENV.TAURI) {
      useBridge<SYSTEM_ENV.TAURI>((bridge) => {
        bridge("getUserInfo").then((res: any) => {
          resolve({
            ua: window.navigator.userAgent,
            user: res.user,
            home: res.home,
          });
        });
      });
    }
  });
};
/**
 * 获取类型
 * @param o
 * @returns type
 */
export const getType = (o: unknown): string => {
  const s: string = Object.prototype.toString.call(o);
  const s_ = s.match(/\[object (.*)\]/) as RegExpMatchArray;
  return s_[1].toLowerCase();
};
