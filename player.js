// sb3-to-pwa で作った PWA の再生部分。設定は index.html の <script id="config"> (JSON) から読む。
(async () => {
  const CONFIG = JSON.parse(document.getElementById('config').textContent);
  const start = document.getElementById('start');
  const label = document.getElementById('start-label');
  const showError = (e) => { const el = document.getElementById('error'); el.textContent = '読み込めませんでした: ' + e; el.hidden = false; };
  start.hidden = false;
  try {
    const scaffolding = new Scaffolding.Scaffolding();
    scaffolding.width = CONFIG.width;
    scaffolding.height = CONFIG.height;
    scaffolding.resizeMode = 'preserve-ratio';
    scaffolding.setup();
    scaffolding.appendTo(document.getElementById('project'));
    const vm = scaffolding.vm;
    vm.setFramerate(CONFIG.framerate);
    vm.setTurboMode(CONFIG.turbo);
    vm.setInterpolation(CONFIG.interpolation);
    vm.setRuntimeOptions(CONFIG.runtimeOptions);
    if (CONFIG.hq) scaffolding.renderer.setUseHighQualityRender(true);
    // クラウド変数はこの端末の中だけに保存する
    scaffolding.addCloudProvider(new Scaffolding.Cloud.LocalStorageProvider('sb3-pwa:' + CONFIG.id));
    const res = await fetch('project.sb3');
    if (!res.ok) throw new Error('project.sb3 (' + res.status + ')');
    await scaffolding.loadProject(await res.arrayBuffer());
    label.textContent = 'タップしてはじめる';
    // iPhone は、画面をさわったあとでないと音が出ない。最初のタップで音を有効にしてから旗を押す
    start.addEventListener('click', () => {
      start.hidden = true;
      if (scaffolding.audioEngine && scaffolding.audioEngine.audioContext.state !== 'running') {
        scaffolding.audioEngine.audioContext.resume();
      }
      scaffolding.start();
    }, { once: true });
  } catch (e) {
    showError(e && e.message || e);
  }
})();
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
}
