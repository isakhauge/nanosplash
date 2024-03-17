import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Features","description":"","frontmatter":{},"headers":[],"relativePath":"api/start/features.md","filePath":"api/start/features.md"}');
const _sfc_main = { name: "api/start/features.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="features" tabindex="-1">Features <a class="header-anchor" href="#features" aria-label="Permalink to &quot;Features&quot;">​</a></h1><h2 id="small-bundle-size" tabindex="-1">Small bundle size <a class="header-anchor" href="#small-bundle-size" aria-label="Permalink to &quot;Small bundle size&quot;">​</a></h2><p>The Nanosplash bundle is less than 2KB minified and gzipped and will not add any significant weight to your application what so ever. Go to <a href="https://bundlephobia.com/package/nanosplash" target="_blank" rel="noreferrer">Bundlephobia</a> to see for yourself.</p><h2 id="simple-2-function-api" tabindex="-1">Simple, 2 Function API <a class="header-anchor" href="#simple-2-function-api" aria-label="Permalink to &quot;Simple, 2 Function API&quot;">​</a></h2><p>Nanosplash was written from the ground up with simplicity in mind. The API is very simple and easy to use, and you can easily get started in seconds. Just install the package and start using <code>ns.show</code> and <code>ns.hide</code>. Go to <a href="/nanosplash/api/start/install.html">Getting started</a> to see how.</p><h2 id="spawning" tabindex="-1">Spawning <a class="header-anchor" href="#spawning" aria-label="Permalink to &quot;Spawning&quot;">​</a></h2><p>With Nanosplash you can spawn a splash element anywhere in your DOM. You can even spawn multiple splash elements if you want to. Go to the <a href="/nanosplash/api/doc/show.html#show-inside">API Documentation</a> to see how.</p><h2 id="node-recycling" tabindex="-1">Node recycling <a class="header-anchor" href="#node-recycling" aria-label="Permalink to &quot;Node recycling&quot;">​</a></h2><p>Instead of creating new elements all the time and exhausting DOM manipulations, we recycle and repurpose obsolete splash elements instead. For each time a splash element is created, we check for existing splash elements inside the parent element and use them instead of creating new ones.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("api/start/features.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const features = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  features as default
};
