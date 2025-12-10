export default {
  async load() {
    // TizenBrew injects the module.json fields; it uses `this.url`
    // Do not call other APIs or reference window.open; keep minimal.
    window.location.href = this.url;
  }
};
