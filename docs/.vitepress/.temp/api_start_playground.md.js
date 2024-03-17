import { ssrRenderAttrs, ssrRenderSlot, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { useSSRContext, mergeProps, ref, withCtx, createTextVNode, createVNode } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import { C as Card } from "./Card.Ce4dbGEn.js";
const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card-grid" }, _attrs))} data-v-60c78c10>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/vue/CardGrid.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const CardGrid = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-60c78c10"]]);
const v = '@keyframes nsRotate{to{transform:rotate(360deg)}}@keyframes nsDash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}@keyframes nsFade{0%{opacity:0}to{opacity:1}}@keyframes nsAscend{0%{opacity:0;transform:translateY(13px)}to{opacity:1;transform:translateY(0)}}:root{--ns-top: 0px}.ns,body.nsh,body.nsh:before,.nsh:before{width:100%;height:100%}.ns,.nsh:before{bottom:0;right:0}.ns{display:flex;justify-content:center;align-items:center}.nsh{--color: DarkSlateGray;--size: 20px;--relSize: calc(var(--size) * .9);--font: "Helvetica", "Arial", sans-serif;--weight: 400;--bg: rgba(255, 255, 255, .9);--zIdx: 999999999;--blur: blur(5px)}.nsh{position:relative;z-index:var(--zIdx)}.nsh:before{position:absolute;background-color:var(--bg);content:"";backdrop-filter:var(--blur);-webkit-backdrop-filter:var(--blur);z-index:calc(var(--zIdx) + 1);border-radius:inherit}body.nsh,body.nsh:before{position:fixed;top:var(--ns-top);left:0}.ns{position:absolute;z-index:calc(var(--zIdx) + 2);animation:nsFade 2s;gap:var(--relSize)}.nst{color:var(--color);font-size:var(--size);font-family:var(--font);font-weight:var(--weight);max-width:80dvw;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;text-shadow:0 0 .06rem rgba(47,79,79,.25);filter:drop-shadow(0 0 .07rem rgba(0,0,0,.25));animation:nsAscend .5s}.nss{display:block;width:var(--relSize);height:var(--relSize);animation:nsAscend .5s}.nss>svg{animation:nsRotate 2s linear infinite;position:relative;width:inherit;height:inherit;stroke-width:8}.nss .path{stroke:var(--color);stroke-linecap:round;animation:nsDash 1.5s ease-in-out infinite}', y = "3.1.0", m = "nscss", i = () => document.body, a = (e) => /* @__PURE__ */ ((t) => ({
  all: t,
  first: (s) => t(s)[0] ?? null
}))((t) => Array.from(e.querySelectorAll(t))), l = (e) => a(document).all(e), d = (e) => a(document).first(e), f = () => l(".ns"), b = (e) => e instanceof Element ? e : d(e), r = (e, ...t) => {
  const s = document.createElement("div");
  return e && s.classList.add(e), s.append(...t), s;
}, h = (e) => {
  const t = r();
  return t.innerHTML = e, t.firstChild;
}, u = () => {
  const t = h('<svg viewBox="0 0 50 50"><circle class=path cx=25 cy=25 r=20 fill=none /></svg>'), s = r("ns", r("nst"), r("nss", t));
  return s.nsId = Date.now(), s;
}, w = () => f().sort((e, t) => e.nsId - t.nsId)[0] ?? null, g = (e, t) => {
  const n = a(e).first(".nst");
  if (!t)
    return n == null ? void 0 : n.remove();
  const o = r("nst", t);
  n ? n.replaceWith(o) : e.insertBefore(o, e.firstChild);
}, k = (e, t) => {
  const s = t.firstElementChild;
  s && t.insertBefore(e, s), t.append(e), t.classList.add("nsh");
}, x = (e, t) => {
  const s = t ? b(t) : i;
  let n;
  const o = a(s ?? i()).first("& > .ns");
  o ? n = o : (n = u(), k(n, s)), g(n, e ?? "");
  const p = window.scrollY + "px";
  return i().style.setProperty("--ns-top", p), n.nsId;
}, c = (e) => {
  var t;
  (t = e == null ? void 0 : e.parentElement) == null || t.classList.remove("nsh"), e == null || e.remove();
}, S = (e) => f().find((t) => t.nsId === e) ?? null, z = (e) => {
  e === "*" ? l(".ns").forEach(c) : c(typeof e == "number" ? S(e) : w());
}, I = () => {
  var e;
  (e = d("#nscss")) == null || e.remove(), i().append(h(`<style id=${m}>${v}</style>`));
}, A = () => !!new Promise(I) && (window.ns = {
  show: x,
  hide: z,
  version: y
});
const _sfc_main$2 = {
  __name: "Exe",
  __ssrInlineRender: true,
  setup(__props) {
    A();
    const Commands = {
      ShowInsideA: 'ns.show("Loading A", "#a")',
      ShowInsideB: 'ns.show("Loading B", "#b")',
      ShowInsideC: 'ns.show("Loading C", "#c")',
      ShowInsideD: 'ns.show("Loading D", "#d")',
      ShowInsideWrapper: 'ns.show("Loading Wrapper", "#wrapper")',
      ShowFullScreen: 'ns.show("Loading window")',
      Progress: "Progressive Demo",
      Hide: "ns.hide()",
      HideAll: 'ns.hide("*")'
    };
    ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-ac48b0fa><select class="select" data-v-ac48b0fa><option value="" selected disabled data-v-ac48b0fa>Click and select</option><!--[-->`);
      ssrRenderList(Commands, (command, i2) => {
        _push(`<option${ssrRenderAttr("value", command)} data-v-ac48b0fa>${ssrInterpolate(command)}</option>`);
      });
      _push(`<!--]--></select><div class="exe" data-v-ac48b0fa>Run</div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/vue/Exe.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Exe = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-ac48b0fa"]]);
const _sfc_main$1 = {
  __name: "PlayGround",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "playground" }, _attrs))} data-v-3c3007cd>`);
      _push(ssrRenderComponent(CardGrid, { id: "wrapper" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Card, { id: "a" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam `);
                } else {
                  return [
                    createTextVNode(" Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(Card, { id: "b" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam `);
                } else {
                  return [
                    createTextVNode(" Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(Card, { id: "c" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam `);
                } else {
                  return [
                    createTextVNode(" Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(Card, { id: "d" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam `);
                } else {
                  return [
                    createTextVNode(" Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(Card, { id: "a" }, {
                default: withCtx(() => [
                  createTextVNode(" Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam ")
                ]),
                _: 1
              }),
              createVNode(Card, { id: "b" }, {
                default: withCtx(() => [
                  createTextVNode(" Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam ")
                ]),
                _: 1
              }),
              createVNode(Card, { id: "c" }, {
                default: withCtx(() => [
                  createTextVNode(" Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam ")
                ]),
                _: 1
              }),
              createVNode(Card, { id: "d" }, {
                default: withCtx(() => [
                  createTextVNode(" Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Exe, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/vue/PlayGround.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PlayGround = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3c3007cd"]]);
const __pageData = JSON.parse('{"title":"Playground","description":"","frontmatter":{},"headers":[],"relativePath":"api/start/playground.md","filePath":"api/start/playground.md"}');
const __default__ = { name: "api/start/playground.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="playground" tabindex="-1">Playground <a class="header-anchor" href="#playground" aria-label="Permalink to &quot;Playground&quot;">​</a></h1><p>Here you can play around with Nanosplash and see how it works.</p>`);
      _push(ssrRenderComponent(PlayGround, null, null, _parent));
      _push(`<p>Select a method from the dropdown menu above and click &quot;Run&quot; to see it in action.</p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("api/start/playground.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
