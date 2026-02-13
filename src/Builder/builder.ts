type Env = "browser" | "node";
function isStyledValue(val: any): val is { value: any, style?: any } {
  return val && typeof val === 'object' && 'value' in val;
}
class Builder {
  private static _env: Env = "browser";
  private static htmlBuffer: string = "";
  private static cssBuffer: string = "";
  private static data: any = {};
  private static defaults: any = {};
  static env(env: Env) {
    this._env = env;
  }
  static setData(data: any) {
    this.data = data;
  }
  static setDefaults(defaults: any) {
    this.defaults = defaults;
  }
  static html(content: string) {
    this.htmlBuffer += content;
  }
  static css(content: string) {
    this.cssBuffer += content;
  }
  static async loadFile(path: string) {
    if (this._env === "browser") {
      try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load file: ${path}`);
        const text = await response.text();
        if (path.endsWith(".css")) {
          this.cssBuffer += text;
        } else {
          this.htmlBuffer += text;
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.warn("Node environment loadFile is not implemented in this build.");
    }
  }
  static getValue(path: string): any {
    const val = path.split('.').reduce((obj, key) => obj?.[key], this.data);
    const isValueEmpty = (val === undefined || val === null) ||
      (isStyledValue(val) && (val.value === "" || val.value === null)) ||
      (typeof val === 'string' && val === "");
    if (isValueEmpty) {
      const defaultVal = path.split('.').reduce((obj, key) => obj?.[key], this.defaults);
      if (defaultVal) {
        if (isStyledValue(val)) {
          return { ...val, value: defaultVal };
        }
        return defaultVal;
      }
    }
    return val;
  }
  static compile(): string {
    let fullContent = "";
    if (this.cssBuffer) {
      fullContent += `<style>${this.cssBuffer}</style>`;
    }
    fullContent += this.htmlBuffer;
    return fullContent.replace(/%([\w\.]+)%/g, (match, key) => {
      const val = this.getValue(key);
      if (val === undefined || val === null) return "";
      if (isStyledValue(val)) {
        const style = val.style || {};
        const styleStr = Object.entries(style).map(([k, v]) => {
          const kebabKey = k.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
          return `${kebabKey}: ${v}`;
        }).join('; ');
        return `<span style="${styleStr}">${val.value}</span>`;
      }
      return String(val);
    });
  }
  static clear() {
    this.htmlBuffer = "";
    this.cssBuffer = "";
    this.defaults = {};
  }
}
export default Builder;