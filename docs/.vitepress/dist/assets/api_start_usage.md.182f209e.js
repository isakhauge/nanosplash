import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.a8534450.js";const g=JSON.parse('{"title":"Usage","description":"","frontmatter":{},"headers":[],"relativePath":"api/start/usage.md","filePath":"api/start/usage.md"}'),p={name:"api/start/usage.md"},e=l(`<h1 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h1><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark has-highlighted-lines vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Fullscreen spinning wheel</span></span>
<span class="line highlighted"><span style="color:#E1E4E8;">ns.</span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Fullscreen spinning wheel with text</span></span>
<span class="line highlighted"><span style="color:#E1E4E8;">ns.</span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Loading&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Display inside an element</span></span>
<span class="line highlighted"><span style="color:#E1E4E8;">ns.</span><span style="color:#B392F0;">showInside</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#my-table&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;Fetching data&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Hide the first created loading screen (FIFO)</span></span>
<span class="line highlighted"><span style="color:#E1E4E8;">ns.</span><span style="color:#B392F0;">hide</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Hide loading screen inside an element</span></span>
<span class="line highlighted"><span style="color:#E1E4E8;">ns.</span><span style="color:#B392F0;">hideInside</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;#my-table&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Hide specific loading screen</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">id</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ns.</span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Loading&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line highlighted"><span style="color:#E1E4E8;">ns.</span><span style="color:#B392F0;">hideId</span><span style="color:#E1E4E8;">(id)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Hide all loading screens</span></span>
<span class="line highlighted"><span style="color:#E1E4E8;">ns.</span><span style="color:#B392F0;">hideAll</span><span style="color:#E1E4E8;">()</span></span></code></pre><pre class="shiki github-light has-highlighted-lines vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Fullscreen spinning wheel</span></span>
<span class="line highlighted"><span style="color:#24292E;">ns.</span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Fullscreen spinning wheel with text</span></span>
<span class="line highlighted"><span style="color:#24292E;">ns.</span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Loading&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Display inside an element</span></span>
<span class="line highlighted"><span style="color:#24292E;">ns.</span><span style="color:#6F42C1;">showInside</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#my-table&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;Fetching data&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Hide the first created loading screen (FIFO)</span></span>
<span class="line highlighted"><span style="color:#24292E;">ns.</span><span style="color:#6F42C1;">hide</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Hide loading screen inside an element</span></span>
<span class="line highlighted"><span style="color:#24292E;">ns.</span><span style="color:#6F42C1;">hideInside</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;#my-table&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Hide specific loading screen</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">id</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ns.</span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Loading&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line highlighted"><span style="color:#24292E;">ns.</span><span style="color:#6F42C1;">hideId</span><span style="color:#24292E;">(id)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Hide all loading screens</span></span>
<span class="line highlighted"><span style="color:#24292E;">ns.</span><span style="color:#6F42C1;">hideAll</span><span style="color:#24292E;">()</span></span></code></pre></div>`,2),o=[e];function c(t,i,r,y,E,h){return n(),a("div",null,o)}const F=s(p,[["render",c]]);export{g as __pageData,F as default};
