import { API, DynamicPlatformPlugin, Logger, PlatformAccessory } from "homebridge";

const PLUGIN = "homebridge-ui-vladilen4ik";
const PLATFORM = "UiVladilen4ik";

interface Config { name?: string; debugMessage?: string; enabled?: boolean; }

export = (api: API) => api.registerPlatform(PLUGIN, PLATFORM, UiDebugPlatform);

class UiDebugPlatform implements DynamicPlatformPlugin {
  private accessory?: PlatformAccessory;
  constructor(private readonly log: Logger, private readonly config: Config, private readonly api: API) {
    api.on("didFinishLaunching", () => this.start());
  }
  configureAccessory(accessory: PlatformAccessory): void { this.accessory = accessory; }
  private start(): void {
    const name = this.config.name || "UI Debug";
    this.log.debug(`[${name}] ${this.config.debugMessage || "Hello from Homebridge UI"}`);
    if (!this.config.enabled) { this.log.debug(`[${name}] accessory disabled in settings`); return; }
    if (!this.accessory) {
      this.accessory = new this.api.platformAccessory(name, this.api.hap.uuid.generate(`${PLUGIN}:${name}`));
      this.api.registerPlatformAccessories(PLUGIN, PLATFORM, [this.accessory]);
    }
    const service = this.accessory.getService(this.api.hap.Service.Switch) || this.accessory.addService(this.api.hap.Service.Switch, name);
    service.getCharacteristic(this.api.hap.Characteristic.On).onSet(value => this.log.debug(`[${name}] switch is now ${value ? "on" : "off"}: ${this.config.debugMessage || "no message configured"}`));
  }
}
