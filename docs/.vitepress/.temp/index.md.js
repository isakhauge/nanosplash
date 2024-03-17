import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"Nanosplash","text":"","tagline":"The tiny loading screen for web artisans","actions":[{"theme":"brand","text":"Get started","link":"/api/start/install.md"},{"theme":"alt","text":"Playground","link":"/api/start/playground.md"},{"theme":"alt","text":"API Documentation","link":"/api/doc/show.md"}]},"features":[{"title":"✨ Tiny","details":"Less than 2KB minified and gzipped.","link":"/api/start/features#small-bundle-size"},{"title":"✌️ 2 Function API","details":"Start using Nanosplash in seconds.","link":"/api/start/features#simple-api"},{"title":"🪴 Spawning","details":"Spawn a splash element anywhere in your DOM.","link":"/api/start/features#spawning"},{"title":"🚀 Node recycling","details":"Nanosplash will recycle existing elements.","link":"/api/start/features#element-recycling"}]},"headers":[],"relativePath":"index.md","filePath":"index.md"}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
