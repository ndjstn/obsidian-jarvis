/*
Obsidian Jarvis AI Assistant
A comprehensive AI assistant with planning, vision, and task management
*/

var ge=Object.create;var N=Object.defineProperty;var fe=Object.getOwnPropertyDescriptor;var ye=Object.getOwnPropertyNames;var ve=Object.getPrototypeOf,be=Object.prototype.hasOwnProperty;var we=(o,e)=>()=>(e||o((e={exports:{}}).exports,e),e.exports),xe=(o,e)=>{for(var t in e)N(o,t,{get:e[t],enumerable:!0})},ae=(o,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of ye(e))!be.call(o,n)&&n!==t&&N(o,n,{get:()=>e[n],enumerable:!(s=fe(e,n))||s.enumerable});return o};var U=(o,e,t)=>(t=o!=null?ge(ve(o)):{},ae(e||!o||!o.__esModule?N(t,"default",{value:o,enumerable:!0}):t,o)),Se=o=>ae(N({},"__esModule",{value:!0}),o);var W=we((_,re)=>{(function(o,e){typeof _=="object"&&typeof re!="undefined"?e(_):typeof define=="function"&&define.amd?define(["exports"],e):e(o.WHATWGFetch={})})(_,function(o){"use strict";var e=typeof globalThis!="undefined"&&globalThis||typeof self!="undefined"&&self||typeof global!="undefined"&&global||{},t={searchParams:"URLSearchParams"in e,iterable:"Symbol"in e&&"iterator"in Symbol,blob:"FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(r){return!1}}(),formData:"FormData"in e,arrayBuffer:"ArrayBuffer"in e};function s(r){return r&&DataView.prototype.isPrototypeOf(r)}if(t.arrayBuffer)var n=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],a=ArrayBuffer.isView||function(r){return r&&n.indexOf(Object.prototype.toString.call(r))>-1};function i(r){if(typeof r!="string"&&(r=String(r)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(r)||r==="")throw new TypeError('Invalid character in header field name: "'+r+'"');return r.toLowerCase()}function l(r){return typeof r!="string"&&(r=String(r)),r}function u(r){var c={next:function(){var h=r.shift();return{done:h===void 0,value:h}}};return t.iterable&&(c[Symbol.iterator]=function(){return c}),c}function d(r){this.map={},r instanceof d?r.forEach(function(c,h){this.append(h,c)},this):Array.isArray(r)?r.forEach(function(c){if(c.length!=2)throw new TypeError("Headers constructor: expected name/value pair to be length 2, found"+c.length);this.append(c[0],c[1])},this):r&&Object.getOwnPropertyNames(r).forEach(function(c){this.append(c,r[c])},this)}d.prototype.append=function(r,c){r=i(r),c=l(c);var h=this.map[r];this.map[r]=h?h+", "+c:c},d.prototype.delete=function(r){delete this.map[i(r)]},d.prototype.get=function(r){return r=i(r),this.has(r)?this.map[r]:null},d.prototype.has=function(r){return this.map.hasOwnProperty(i(r))},d.prototype.set=function(r,c){this.map[i(r)]=l(c)},d.prototype.forEach=function(r,c){for(var h in this.map)this.map.hasOwnProperty(h)&&r.call(c,this.map[h],h,this)},d.prototype.keys=function(){var r=[];return this.forEach(function(c,h){r.push(h)}),u(r)},d.prototype.values=function(){var r=[];return this.forEach(function(c){r.push(c)}),u(r)},d.prototype.entries=function(){var r=[];return this.forEach(function(c,h){r.push([h,c])}),u(r)},t.iterable&&(d.prototype[Symbol.iterator]=d.prototype.entries);function f(r){if(!r._noBody){if(r.bodyUsed)return Promise.reject(new TypeError("Already read"));r.bodyUsed=!0}}function v(r){return new Promise(function(c,h){r.onload=function(){c(r.result)},r.onerror=function(){h(r.error)}})}function k(r){var c=new FileReader,h=v(c);return c.readAsArrayBuffer(r),h}function T(r){var c=new FileReader,h=v(c),g=/charset=([A-Za-z0-9_-]+)/.exec(r.type),y=g?g[1]:"utf-8";return c.readAsText(r,y),h}function D(r){for(var c=new Uint8Array(r),h=new Array(c.length),g=0;g<c.length;g++)h[g]=String.fromCharCode(c[g]);return h.join("")}function C(r){if(r.slice)return r.slice(0);var c=new Uint8Array(r.byteLength);return c.set(new Uint8Array(r)),c.buffer}function I(){return this.bodyUsed=!1,this._initBody=function(r){this.bodyUsed=this.bodyUsed,this._bodyInit=r,r?typeof r=="string"?this._bodyText=r:t.blob&&Blob.prototype.isPrototypeOf(r)?this._bodyBlob=r:t.formData&&FormData.prototype.isPrototypeOf(r)?this._bodyFormData=r:t.searchParams&&URLSearchParams.prototype.isPrototypeOf(r)?this._bodyText=r.toString():t.arrayBuffer&&t.blob&&s(r)?(this._bodyArrayBuffer=C(r.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):t.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(r)||a(r))?this._bodyArrayBuffer=C(r):this._bodyText=r=Object.prototype.toString.call(r):(this._noBody=!0,this._bodyText=""),this.headers.get("content-type")||(typeof r=="string"?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):t.searchParams&&URLSearchParams.prototype.isPrototypeOf(r)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},t.blob&&(this.blob=function(){var r=f(this);if(r)return r;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))}),this.arrayBuffer=function(){if(this._bodyArrayBuffer){var r=f(this);return r||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer))}else{if(t.blob)return this.blob().then(k);throw new Error("could not read as ArrayBuffer")}},this.text=function(){var r=f(this);if(r)return r;if(this._bodyBlob)return T(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(D(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},t.formData&&(this.formData=function(){return this.text().then(he)}),this.json=function(){return this.text().then(JSON.parse)},this}var de=["CONNECT","DELETE","GET","HEAD","OPTIONS","PATCH","POST","PUT","TRACE"];function ue(r){var c=r.toUpperCase();return de.indexOf(c)>-1?c:r}function P(r,c){if(!(this instanceof P))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');c=c||{};var h=c.body;if(r instanceof P){if(r.bodyUsed)throw new TypeError("Already read");this.url=r.url,this.credentials=r.credentials,c.headers||(this.headers=new d(r.headers)),this.method=r.method,this.mode=r.mode,this.signal=r.signal,!h&&r._bodyInit!=null&&(h=r._bodyInit,r.bodyUsed=!0)}else this.url=String(r);if(this.credentials=c.credentials||this.credentials||"same-origin",(c.headers||!this.headers)&&(this.headers=new d(c.headers)),this.method=ue(c.method||this.method||"GET"),this.mode=c.mode||this.mode||null,this.signal=c.signal||this.signal||function(){if("AbortController"in e){var m=new AbortController;return m.signal}}(),this.referrer=null,(this.method==="GET"||this.method==="HEAD")&&h)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(h),(this.method==="GET"||this.method==="HEAD")&&(c.cache==="no-store"||c.cache==="no-cache")){var g=/([?&])_=[^&]*/;if(g.test(this.url))this.url=this.url.replace(g,"$1_="+new Date().getTime());else{var y=/\?/;this.url+=(y.test(this.url)?"&":"?")+"_="+new Date().getTime()}}}P.prototype.clone=function(){return new P(this,{body:this._bodyInit})};function he(r){var c=new FormData;return r.trim().split("&").forEach(function(h){if(h){var g=h.split("="),y=g.shift().replace(/\+/g," "),m=g.join("=").replace(/\+/g," ");c.append(decodeURIComponent(y),decodeURIComponent(m))}}),c}function pe(r){var c=new d,h=r.replace(/\r?\n[\t ]+/g," ");return h.split("\r").map(function(g){return g.indexOf(`
`)===0?g.substr(1,g.length):g}).forEach(function(g){var y=g.split(":"),m=y.shift().trim();if(m){var R=y.join(":").trim();try{c.append(m,R)}catch(J){console.warn("Response "+J.message)}}}),c}I.call(P.prototype);function S(r,c){if(!(this instanceof S))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');if(c||(c={}),this.type="default",this.status=c.status===void 0?200:c.status,this.status<200||this.status>599)throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");this.ok=this.status>=200&&this.status<300,this.statusText=c.statusText===void 0?"":""+c.statusText,this.headers=new d(c.headers),this.url=c.url||"",this._initBody(r)}I.call(S.prototype),S.prototype.clone=function(){return new S(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new d(this.headers),url:this.url})},S.error=function(){var r=new S(null,{status:200,statusText:""});return r.ok=!1,r.status=0,r.type="error",r};var me=[301,302,303,307,308];S.redirect=function(r,c){if(me.indexOf(c)===-1)throw new RangeError("Invalid status code");return new S(null,{status:c,headers:{location:r}})},o.DOMException=e.DOMException;try{new o.DOMException}catch(r){o.DOMException=function(c,h){this.message=c,this.name=h;var g=Error(c);this.stack=g.stack},o.DOMException.prototype=Object.create(Error.prototype),o.DOMException.prototype.constructor=o.DOMException}function H(r,c){return new Promise(function(h,g){var y=new P(r,c);if(y.signal&&y.signal.aborted)return g(new o.DOMException("Aborted","AbortError"));var m=new XMLHttpRequest;function R(){m.abort()}m.onload=function(){var b={statusText:m.statusText,headers:pe(m.getAllResponseHeaders()||"")};y.url.indexOf("file://")===0&&(m.status<200||m.status>599)?b.status=200:b.status=m.status,b.url="responseURL"in m?m.responseURL:b.headers.get("X-Request-URL");var E="response"in m?m.response:m.responseText;setTimeout(function(){h(new S(E,b))},0)},m.onerror=function(){setTimeout(function(){g(new TypeError("Network request failed"))},0)},m.ontimeout=function(){setTimeout(function(){g(new TypeError("Network request timed out"))},0)},m.onabort=function(){setTimeout(function(){g(new o.DOMException("Aborted","AbortError"))},0)};function J(b){try{return b===""&&e.location.href?e.location.href:b}catch(E){return b}}if(m.open(y.method,J(y.url),!0),y.credentials==="include"?m.withCredentials=!0:y.credentials==="omit"&&(m.withCredentials=!1),"responseType"in m&&(t.blob?m.responseType="blob":t.arrayBuffer&&(m.responseType="arraybuffer")),c&&typeof c.headers=="object"&&!(c.headers instanceof d||e.Headers&&c.headers instanceof e.Headers)){var ne=[];Object.getOwnPropertyNames(c.headers).forEach(function(b){ne.push(i(b)),m.setRequestHeader(b,l(c.headers[b]))}),y.headers.forEach(function(b,E){ne.indexOf(E)===-1&&m.setRequestHeader(E,b)})}else y.headers.forEach(function(b,E){m.setRequestHeader(E,b)});y.signal&&(y.signal.addEventListener("abort",R),m.onreadystatechange=function(){m.readyState===4&&y.signal.removeEventListener("abort",R)}),m.send(typeof y._bodyInit=="undefined"?null:y._bodyInit)})}H.polyfill=!0,e.fetch||(e.fetch=H,e.Headers=d,e.Request=P,e.Response=S),o.Headers=d,o.Request=P,o.Response=S,o.fetch=H,Object.defineProperty(o,"__esModule",{value:!0})})});var Ie={};xe(Ie,{default:()=>V});module.exports=Se(Ie);var p=require("obsidian");var w=require("obsidian"),j="jarvis-view";async function ke(o,e){try{await navigator.clipboard.writeText(o);let t=e.innerHTML;e.innerHTML="",(0,w.setIcon)(e,"check"),e.addClass("jarvis-copy-success"),new w.Notice("Copied to clipboard!"),setTimeout(()=>{e.innerHTML="",(0,w.setIcon)(e,"copy"),e.removeClass("jarvis-copy-success")},1500)}catch(t){new w.Notice("Failed to copy")}}var L=class extends w.ItemView{constructor(t,s){super(t);this.conversation=[];this.isProcessing=!1;this.plugin=s}getViewType(){return j}getDisplayText(){return"Jarvis AI"}getIcon(){return"bot"}async onOpen(){let t=this.containerEl.children[1];t.empty(),t.addClass("jarvis-container");let s=t.createDiv({cls:"jarvis-header"});s.createEl("h4",{text:"Jarvis AI Assistant"});let n=s.createDiv({cls:"jarvis-mode-container"});this.modeSelect=n.createEl("select",{cls:"jarvis-mode-select"}),this.modeSelect.createEl("option",{value:"chat",text:"Chat"}),this.modeSelect.createEl("option",{value:"plan",text:"Plan"}),this.modeSelect.createEl("option",{value:"summarize",text:"Summarize"}),this.modeSelect.createEl("option",{value:"task",text:"Task"}),this.modeSelect.createEl("option",{value:"vision",text:"Vision"}),this.modeSelect.createEl("option",{value:"pageassist",text:"Page Assist"}),this.modeSelect.createEl("option",{value:"rag",text:"RAG Search"});let a=t.createDiv({cls:"jarvis-action-bar"});a.createEl("button",{cls:"jarvis-action-btn",text:"Clear"}).addEventListener("click",()=>this.clearConversation()),a.createEl("button",{cls:"jarvis-action-btn",text:"Add Context"}).addEventListener("click",()=>this.addCurrentNoteContext()),a.createEl("button",{cls:"jarvis-action-btn",text:"Export"}).addEventListener("click",()=>this.exportConversation()),this.chatContainer=t.createDiv({cls:"jarvis-chat-container"}),this.addSystemMessage(`Hello! I'm Jarvis, your AI assistant. How can I help you today?

**Modes:**
- **Chat**: General conversation
- **Plan**: Break down goals into tasks
- **Summarize**: Summarize notes or text
- **Task**: Create TaskWarrior tasks
- **Vision**: Analyze images
- **Page Assist**: Analyze web pages (enter URL + question)
- **RAG Search**: Semantic search over your vault`),this.inputContainer=t.createDiv({cls:"jarvis-input-container"}),this.inputField=this.inputContainer.createEl("textarea",{cls:"jarvis-input-field",attr:{placeholder:"Ask Jarvis anything...",rows:"3"}}),this.inputField.addEventListener("keydown",v=>{v.key==="Enter"&&!v.shiftKey&&(v.preventDefault(),this.sendMessage())});let d=this.inputContainer.createDiv({cls:"jarvis-button-container"}),f=d.createEl("button",{cls:"jarvis-image-btn"});(0,w.setIcon)(f,"image"),f.addEventListener("click",()=>this.uploadImage()),this.sendButton=d.createEl("button",{cls:"jarvis-send-btn",text:"Send"}),this.sendButton.addEventListener("click",()=>this.sendMessage()),this.addStyles()}addStyles(){let t=document.createElement("style");t.textContent=`
      .jarvis-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 10px;
      }

      .jarvis-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--background-modifier-border);
      }

      .jarvis-header h4 {
        margin: 0;
      }

      .jarvis-mode-select {
        padding: 4px 8px;
        border-radius: 4px;
        background: var(--background-secondary);
        border: 1px solid var(--background-modifier-border);
      }

      .jarvis-action-bar {
        display: flex;
        gap: 8px;
        margin-bottom: 10px;
      }

      .jarvis-action-btn {
        padding: 4px 8px;
        font-size: 12px;
        border-radius: 4px;
        background: var(--background-secondary);
        border: 1px solid var(--background-modifier-border);
        cursor: pointer;
      }

      .jarvis-action-btn:hover {
        background: var(--background-modifier-hover);
      }

      .jarvis-chat-container {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
        background: var(--background-primary);
        border-radius: 8px;
        margin-bottom: 10px;
      }

      .jarvis-message {
        margin-bottom: 12px;
        padding: 10px;
        border-radius: 8px;
        max-width: 90%;
      }

      .jarvis-message-user {
        background: var(--interactive-accent);
        color: var(--text-on-accent);
        margin-left: auto;
      }

      .jarvis-message-assistant {
        background: var(--background-secondary);
      }

      .jarvis-message-system {
        background: var(--background-modifier-border);
        font-style: italic;
        text-align: center;
        max-width: 100%;
      }

      .jarvis-message-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
      }

      .jarvis-message-role {
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
        opacity: 0.8;
      }

      .jarvis-copy-btn {
        padding: 4px;
        background: transparent;
        border: none;
        cursor: pointer;
        opacity: 0.5;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }

      .jarvis-copy-btn:hover {
        opacity: 1;
        background: var(--background-modifier-hover);
      }

      .jarvis-copy-btn.jarvis-copy-success {
        color: var(--color-green);
        opacity: 1;
      }

      .jarvis-message-content {
        line-height: 1.5;
      }

      .jarvis-message-time {
        font-size: 10px;
        opacity: 0.7;
        margin-top: 4px;
      }

      .jarvis-input-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .jarvis-input-field {
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid var(--background-modifier-border);
        background: var(--background-primary);
        resize: vertical;
        font-family: inherit;
      }

      .jarvis-input-field:focus {
        outline: none;
        border-color: var(--interactive-accent);
      }

      .jarvis-button-container {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
      }

      .jarvis-send-btn {
        padding: 8px 16px;
        border-radius: 4px;
        background: var(--interactive-accent);
        color: var(--text-on-accent);
        border: none;
        cursor: pointer;
        font-weight: 500;
      }

      .jarvis-send-btn:hover {
        opacity: 0.9;
      }

      .jarvis-send-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .jarvis-image-btn {
        padding: 8px;
        border-radius: 4px;
        background: var(--background-secondary);
        border: 1px solid var(--background-modifier-border);
        cursor: pointer;
      }

      .jarvis-loading {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .jarvis-loading::after {
        content: '';
        width: 12px;
        height: 12px;
        border: 2px solid var(--text-muted);
        border-top-color: transparent;
        border-radius: 50%;
        animation: jarvis-spin 1s linear infinite;
      }

      @keyframes jarvis-spin {
        to { transform: rotate(360deg); }
      }
    `,document.head.appendChild(t)}addSystemMessage(t){let s=this.chatContainer.createDiv({cls:"jarvis-message jarvis-message-system"});w.MarkdownRenderer.renderMarkdown(t,s,"",this.plugin)}addMessage(t,s){let n={role:t,content:s,timestamp:new Date};this.conversation.push(n);let a=this.chatContainer.createDiv({cls:`jarvis-message jarvis-message-${t}`}),i=a.createDiv({cls:"jarvis-message-header"});i.createSpan({cls:"jarvis-message-role"}).setText(t==="user"?"You":"Jarvis");let u=i.createEl("button",{cls:"jarvis-copy-btn"});(0,w.setIcon)(u,"copy"),u.setAttribute("aria-label","Copy message"),u.addEventListener("click",()=>ke(s,u));let d=a.createDiv({cls:"jarvis-message-content"});t==="assistant"?w.MarkdownRenderer.renderMarkdown(s,d,"",this.plugin):d.createDiv({text:s}),a.createDiv({cls:"jarvis-message-time"}).setText(n.timestamp.toLocaleTimeString()),this.chatContainer.scrollTop=this.chatContainer.scrollHeight}createLoadingMessage(){let t=this.chatContainer.createDiv({cls:"jarvis-message jarvis-message-assistant jarvis-loading"});return t.setText("Thinking..."),this.chatContainer.scrollTop=this.chatContainer.scrollHeight,t}async sendMessage(){let t=this.inputField.value.trim();if(!t||this.isProcessing)return;this.isProcessing=!0,this.sendButton.disabled=!0,this.inputField.value="",this.addMessage("user",t);let s=this.createLoadingMessage();try{let n=this.modeSelect.value,a;switch(n){case"plan":a=await this.plugin.ollama.decomposePlan(t);break;case"summarize":a=await this.plugin.ollama.summarize(t,"bullets");break;case"task":a=`**TaskWarrior Command:**
\`\`\`
${await this.plugin.ollama.generateTaskWarriorCommand(t)}
\`\`\`

Copy and run this command to create the task.`;break;case"pageassist":a=await this.handlePageAssist(t);break;case"rag":a=await this.handleRAGSearch(t);break;default:let l=this.buildConversationHistory();l.push({role:"user",content:t}),a=await this.plugin.ollama.chat(l)}s.remove(),this.addMessage("assistant",a)}catch(n){s.remove(),this.addMessage("assistant",`Error: ${n.message}`),console.error("Jarvis error:",n)}finally{this.isProcessing=!1,this.sendButton.disabled=!1,this.inputField.focus()}}buildConversationHistory(){let s=[{role:"system",content:`You are Jarvis, an AI assistant integrated into Obsidian. You help with:
- Answering questions about notes and knowledge
- Planning and task management
- Summarizing content
- Suggesting connections between ideas
- General knowledge assistance

Be concise, helpful, and format responses with Markdown when appropriate.`}],n=this.conversation.slice(-10);for(let a of n)s.push({role:a.role,content:a.content});return s}async addCurrentNoteContext(){let t=await this.plugin.vault.getActiveNoteContent();if(t){let s=t.length>2e3?t.substring(0,2e3)+"...":t;this.inputField.value=`Context from current note:

${s}

Question: `,this.inputField.focus()}else this.addSystemMessage("No active note to add as context.")}async uploadImage(){if(!this.plugin.settings.enableVision){this.addSystemMessage("Vision mode is disabled in settings.");return}let t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async s=>{var i;let n=(i=s.target.files)==null?void 0:i[0];if(!n)return;let a=new FileReader;a.onload=async()=>{let l=a.result.split(",")[1];this.isProcessing=!0,this.sendButton.disabled=!0,this.addMessage("user",`[Uploaded image: ${n.name}]`);let u=this.createLoadingMessage();try{let d=this.inputField.value.trim()||"Describe this image in detail.";this.inputField.value="";let f=await this.plugin.ollama.analyzeImage(l,d);u.remove(),this.addMessage("assistant",f)}catch(d){u.remove(),this.addMessage("assistant",`Vision error: ${d.message}`)}finally{this.isProcessing=!1,this.sendButton.disabled=!1}},a.readAsDataURL(n)},t.click()}async handlePageAssist(t){let s=t.match(/(https?:\/\/[^\s]+)/);if(!s)return"**Page Assist Usage:**\n\nPlease include a URL in your message. Examples:\n- `https://example.com What is this about?`\n- `summarize https://article.com`\n- `https://docs.com What does it say about X?`";let n=s[1],a=t.replace(n,"").trim();if(!this.plugin.pageAssist)return"\u274C Page Assist service not initialized. Please restart the plugin.";try{if(!a||a.toLowerCase().includes("summarize")){let i=await this.plugin.pageAssist.summarizePage(n,"bullets");return`## Page Summary

**URL:** ${n}

${i}`}else{let i=await this.plugin.pageAssist.askAboutPage(n,a);return`## Answer

**URL:** ${n}
**Question:** ${a}

${i}`}}catch(i){return`\u274C Failed to analyze page: ${i.message}`}}async handleRAGSearch(t){if(!this.plugin.embedding)return"\u274C RAG service not initialized. Please restart the plugin.";let s=t.toLowerCase();if(s.includes("index")||s.includes("reindex")){this.addSystemMessage("\u{1F504} Indexing vault... This may take a while.");try{return`\u2705 Indexed ${await this.plugin.embedding.indexVault((a,i)=>{})} notes successfully!

You can now search your vault semantically.`}catch(n){return`\u274C Indexing failed: ${n.message}`}}if(s==="stats"||s==="status"){let n=this.plugin.embedding.getIndexStats();return n.totalDocuments===0?`\u{1F4CA} **RAG Index Status**

No notes indexed yet.

Type \`index\` to build the index.`:`\u{1F4CA} **RAG Index Statistics**

- **Indexed notes:** ${n.totalDocuments}
- **Embedding dimensions:** ${n.averageEmbeddingSize.toFixed(0)}

Type \`index\` to refresh the index.`}try{let n=await this.plugin.embedding.search(t,5,.3);if(n.length===0)return"\u274C No relevant notes found.\n\nTry different keywords or type `index` to rebuild the index.";let a=`## Search Results for "${t}"

`;for(let l of n){let u=Math.round(l.score*100);a+=`### [[${l.document.metadata.title}]] (${u}%)
`,a+=`> ${l.snippet}

`}let i=await this.plugin.embedding.getContextForQuery(t,2e3);if(i){a+=`---

## AI Answer

`;let l=await this.plugin.ollama.chat([{role:"system",content:"Answer the question based on the provided notes. Be concise and reference notes using [[Note Name]] format."},{role:"user",content:`${i}

Question: ${t}`}]);a+=l}return a}catch(n){return`\u274C Search failed: ${n.message}`}}clearConversation(){this.conversation=[],this.chatContainer.empty(),this.addSystemMessage("Conversation cleared. How can I help you?")}async exportConversation(){if(this.conversation.length===0){this.addSystemMessage("No conversation to export.");return}let t=new Date().toISOString().split("T")[0],s=`# Jarvis Conversation - ${t}

`;for(let a of this.conversation){let i=a.timestamp.toLocaleTimeString();s+=`## ${a.role==="user"?"You":"Jarvis"} (${i})

${a.content}

---

`}let n=`0-Inbox/jarvis-conversation-${t}.md`;await this.plugin.vault.createNote(n,s),this.addSystemMessage(`Conversation exported to: ${n}`)}async onClose(){}};var $=U(require("fs"),1),ee=require("path");var _e=U(W(),1),oe="11434",ce=`http://127.0.0.1:${oe}`,Pe="0.5.18",Te=Object.defineProperty,Ce=(o,e,t)=>e in o?Te(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,q=(o,e,t)=>(Ce(o,typeof e!="symbol"?e+"":e,t),t),Y=class o extends Error{constructor(e,t){super(e),this.error=e,this.status_code=t,this.name="ResponseError",Error.captureStackTrace&&Error.captureStackTrace(this,o)}},Q=class{constructor(e,t,s){q(this,"abortController"),q(this,"itr"),q(this,"doneCallback"),this.abortController=e,this.itr=t,this.doneCallback=s}abort(){this.abortController.abort()}async*[Symbol.asyncIterator](){for await(let e of this.itr){if("error"in e)throw new Error(e.error);if(yield e,e.done||e.status==="success"){this.doneCallback();return}}throw new Error("Did not receive done or success response in stream.")}},K=async o=>{var s;if(o.ok)return;let e=`Error ${o.status}: ${o.statusText}`,t=null;if((s=o.headers.get("content-type"))!=null&&s.includes("application/json"))try{t=await o.json(),e=t.error||e}catch(n){console.log("Failed to parse error response as JSON")}else try{console.log("Getting text from response"),e=await o.text()||e}catch(n){console.log("Failed to get text from error response")}throw new Y(e,o.status)};function Ee(){var o;if(typeof window!="undefined"&&window.navigator){let e=navigator;return"userAgentData"in e&&((o=e.userAgentData)!=null&&o.platform)?`${e.userAgentData.platform.toLowerCase()} Browser/${navigator.userAgent};`:navigator.platform?`${navigator.platform.toLowerCase()} Browser/${navigator.userAgent};`:`unknown Browser/${navigator.userAgent};`}else if(typeof process!="undefined")return`${process.arch} ${process.platform} Node.js/${process.version}`;return""}function Ae(o){if(o instanceof Headers){let e={};return o.forEach((t,s)=>{e[s]=t}),e}else return Array.isArray(o)?Object.fromEntries(o):o||{}}var X=async(o,e,t={})=>{let s={"Content-Type":"application/json",Accept:"application/json","User-Agent":`ollama-js/${Pe} (${Ee()})`};t.headers=Ae(t.headers);let n=Object.fromEntries(Object.entries(t.headers).filter(([a])=>!Object.keys(s).some(i=>i.toLowerCase()===a.toLowerCase())));return t.headers={...s,...n},o(e,t)},ie=async(o,e,t)=>{let s=await X(o,e,{headers:t==null?void 0:t.headers});return await K(s),s},A=async(o,e,t,s)=>{let a=(l=>l!==null&&typeof l=="object"&&!Array.isArray(l))(t)?JSON.stringify(t):t,i=await X(o,e,{method:"POST",body:a,signal:s==null?void 0:s.signal,headers:s==null?void 0:s.headers});return await K(i),i},je=async(o,e,t,s)=>{let n=await X(o,e,{method:"DELETE",body:JSON.stringify(t),headers:s==null?void 0:s.headers});return await K(n),n},$e=async function*(o){var n;let e=new TextDecoder("utf-8"),t="",s=o.getReader();for(;;){let{done:a,value:i}=await s.read();if(a)break;t+=e.decode(i);let l=t.split(`
`);t=(n=l.pop())!=null?n:"";for(let u of l)try{yield JSON.parse(u)}catch(d){console.warn("invalid json: ",u)}}for(let a of t.split(`
`).filter(i=>i!==""))try{yield JSON.parse(a)}catch(i){console.warn("invalid json: ",a)}},Be=o=>{if(!o)return ce;let e=o.includes("://");o.startsWith(":")&&(o=`http://127.0.0.1${o}`,e=!0),e||(o=`http://${o}`);let t=new URL(o),s=t.port;s||(e?s=t.protocol==="https:"?"443":"80":s=oe);let n="";t.username&&(n=t.username,t.password&&(n+=`:${t.password}`),n+="@");let a=`${t.protocol}//${n}${t.hostname}:${s}${t.pathname}`;return a.endsWith("/")&&(a=a.slice(0,-1)),a},Oe=Object.defineProperty,Me=(o,e,t)=>e in o?Oe(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,G=(o,e,t)=>(Me(o,typeof e!="symbol"?e+"":e,t),t),Z=class{constructor(e){var t,s;G(this,"config"),G(this,"fetch"),G(this,"ongoingStreamedRequests",[]),this.config={host:"",headers:e==null?void 0:e.headers},e!=null&&e.proxy||(this.config.host=Be((t=e==null?void 0:e.host)!=null?t:ce)),this.fetch=(s=e==null?void 0:e.fetch)!=null?s:fetch}abort(){for(let e of this.ongoingStreamedRequests)e.abort();this.ongoingStreamedRequests.length=0}async processStreamableRequest(e,t){var a;t.stream=(a=t.stream)!=null?a:!1;let s=`${this.config.host}/api/${e}`;if(t.stream){let i=new AbortController,l=await A(this.fetch,s,t,{signal:i.signal,headers:this.config.headers});if(!l.body)throw new Error("Missing body");let u=$e(l.body),d=new Q(i,u,()=>{let f=this.ongoingStreamedRequests.indexOf(d);f>-1&&this.ongoingStreamedRequests.splice(f,1)});return this.ongoingStreamedRequests.push(d),d}return await(await A(this.fetch,s,t,{headers:this.config.headers})).json()}async encodeImage(e){if(typeof e!="string"){let t=new Uint8Array(e),s="",n=t.byteLength;for(let a=0;a<n;a++)s+=String.fromCharCode(t[a]);return btoa(s)}return e}async generate(e){return e.images&&(e.images=await Promise.all(e.images.map(this.encodeImage.bind(this)))),this.processStreamableRequest("generate",e)}async chat(e){if(e.messages)for(let t of e.messages)t.images&&(t.images=await Promise.all(t.images.map(this.encodeImage.bind(this))));return this.processStreamableRequest("chat",e)}async create(e){return this.processStreamableRequest("create",{...e})}async pull(e){return this.processStreamableRequest("pull",{name:e.model,stream:e.stream,insecure:e.insecure})}async push(e){return this.processStreamableRequest("push",{name:e.model,stream:e.stream,insecure:e.insecure})}async delete(e){return await je(this.fetch,`${this.config.host}/api/delete`,{name:e.model},{headers:this.config.headers}),{status:"success"}}async copy(e){return await A(this.fetch,`${this.config.host}/api/copy`,{...e},{headers:this.config.headers}),{status:"success"}}async list(){return await(await ie(this.fetch,`${this.config.host}/api/tags`,{headers:this.config.headers})).json()}async show(e){return await(await A(this.fetch,`${this.config.host}/api/show`,{...e},{headers:this.config.headers})).json()}async embed(e){return await(await A(this.fetch,`${this.config.host}/api/embed`,{...e},{headers:this.config.headers})).json()}async embeddings(e){return await(await A(this.fetch,`${this.config.host}/api/embeddings`,{...e},{headers:this.config.headers})).json()}async ps(){return await(await ie(this.fetch,`${this.config.host}/api/ps`,{headers:this.config.headers})).json()}},Ve=new Z;var Ue=U(W(),1),B=class extends Z{async encodeImage(e){if(typeof e!="string")return Buffer.from(e).toString("base64");try{if($.default.existsSync(e)){let t=await $.promises.readFile((0,ee.resolve)(e));return Buffer.from(t).toString("base64")}}catch(t){}return e}async fileExists(e){try{return await $.promises.access(e),!0}catch(t){return!1}}async create(e){if(e.from&&await this.fileExists((0,ee.resolve)(e.from)))throw Error("Creating with a local path is not currently supported from ollama-js");return e.stream?super.create(e):super.create(e)}},We=new B;var O=class{constructor(e){this.settings=e,this.client=new B({host:e.ollamaEndpoint})}async checkConnection(){try{return await this.client.list(),!0}catch(e){return console.error("Ollama connection failed:",e),!1}}async listModels(){try{return(await this.client.list()).models.map(t=>t.name)}catch(e){return console.error("Failed to list models:",e),[]}}async chat(e,t){try{return t?await this.streamChat(e,t):(await this.client.chat({model:this.settings.textModel,messages:e.map(n=>({role:n.role,content:n.content})),options:{temperature:this.settings.temperature}})).message.content}catch(s){throw console.error("Chat failed:",s),s}}async streamChat(e,t){let s="",n=await this.client.chat({model:this.settings.textModel,messages:e.map(a=>({role:a.role,content:a.content})),stream:!0,options:{temperature:this.settings.temperature}});for await(let a of n){let i=a.message.content;s+=i,t(i)}return s}async analyzeImage(e,t,s){if(!this.settings.enableVision)throw new Error("Vision is disabled in settings");try{return s?await this.streamVision(e,t,s):(await this.client.chat({model:this.settings.visionModel,messages:[{role:"user",content:t,images:[e]}],options:{temperature:this.settings.temperature}})).message.content}catch(n){throw console.error("Vision analysis failed:",n),n}}async streamVision(e,t,s){let n="",a=await this.client.chat({model:this.settings.visionModel,messages:[{role:"user",content:t,images:[e]}],stream:!0,options:{temperature:this.settings.temperature}});for await(let i of a){let l=i.message.content;n+=l,s(l)}return n}async embed(e){try{return(await this.client.embed({model:this.settings.embeddingModel,input:e})).embeddings[0]}catch(t){throw console.error("Embedding failed:",t),t}}async embedBatch(e){try{return(await this.client.embed({model:this.settings.embeddingModel,input:e})).embeddings}catch(t){throw console.error("Batch embedding failed:",t),t}}async decomposePlan(e){if(!this.settings.enablePlanning)throw new Error("Planning is disabled in settings");return this.chat([{role:"system",content:`You are a planning assistant. Given a goal, break it down into actionable tasks.
Output format:
## Goal Analysis
Brief analysis of the goal

## Tasks
- [ ] Task 1 (estimated time)
- [ ] Task 2 (estimated time)
...

## Dependencies
Note any task dependencies

## Notes
Any additional considerations`},{role:"user",content:`Create a plan for: ${e}`}])}async summarize(e,t="bullets"){let s={brief:"Provide a 2-3 sentence summary.",detailed:"Provide a comprehensive summary with key points and context.",bullets:"Summarize in 3-5 bullet points."};return this.chat([{role:"system",content:`You are a summarization assistant. ${s[t]}`},{role:"user",content:e}])}async suggestTags(e){return(await this.chat([{role:"system",content:"Suggest 3-5 lowercase tags for the following content. Output only comma-separated tags, nothing else."},{role:"user",content:e}])).toLowerCase().split(",").map(s=>s.trim().replace(/[^a-z0-9_-]/g,"")).filter(s=>s.length>0).slice(0,5)}async suggestLinks(e,t){let s=t.slice(0,50).join(`
`);return(await this.chat([{role:"system",content:"You are a knowledge management assistant. Given content and a list of existing notes, suggest which notes might be relevant to link to. Output only note names, one per line."},{role:"user",content:`Content:
${e}

Existing notes:
${s}`}])).split(`
`).map(a=>a.trim()).filter(a=>t.includes(a))}async generateTaskWarriorCommand(e){if(!this.settings.enableTaskWarrior)throw new Error("TaskWarrior integration is disabled in settings");return(await this.chat([{role:"system",content:`Convert natural language to TaskWarrior command. Output only the task add command, nothing else.
Examples:
"remind me to call mom tomorrow" -> task add "Call mom" due:tomorrow
"high priority fix the bug in auth by friday" -> task add "Fix the bug in auth" priority:H due:friday
"work on report for project alpha" -> task add "Work on report" project:alpha`},{role:"user",content:e}])).trim()}};var x=require("obsidian"),z=class{constructor(e){this.app=e}getAllNotes(){return this.app.vault.getMarkdownFiles()}getNoteNames(){return this.getAllNotes().map(e=>e.basename)}getNotesInFolder(e){let t=this.app.vault.getAbstractFileByPath(e);if(!t||!(t instanceof x.TFolder))return[];let s=[];return this.collectNotesRecursive(t,s),s}collectNotesRecursive(e,t){for(let s of e.children)s instanceof x.TFile&&s.extension==="md"?t.push(s):s instanceof x.TFolder&&this.collectNotesRecursive(s,t)}async readNote(e){return this.app.vault.read(e)}async readNoteByPath(e){let t=this.app.vault.getAbstractFileByPath(e);return t instanceof x.TFile?this.app.vault.read(t):null}getActiveNote(){return this.app.workspace.getActiveFile()}async getActiveNoteContent(){let e=this.getActiveNote();return e?this.readNote(e):null}async createNote(e,t){let s=e.substring(0,e.lastIndexOf("/"));s&&await this.ensureFolderExists(s);let n=await this.app.vault.create(e,t);return new x.Notice(`Created note: ${n.basename}`),n}async updateNote(e,t){await this.app.vault.modify(e,t)}async appendToNote(e,t){let s=await this.readNote(e);await this.updateNote(e,s+`
`+t)}async ensureFolderExists(e){this.app.vault.getAbstractFileByPath(e)||await this.app.vault.createFolder(e)}async getNoteMetadata(e){var a;let t=this.app.metadataCache.getFileCache(e),s=(t==null?void 0:t.frontmatter)||{},n=((a=t==null?void 0:t.tags)==null?void 0:a.map(i=>i.tag))||[];return s.tags&&(Array.isArray(s.tags)?n.push(...s.tags.map(i=>`#${i}`)):typeof s.tags=="string"&&n.push(`#${s.tags}`)),{path:e.path,name:e.name,basename:e.basename,extension:e.extension,created:e.stat.ctime,modified:e.stat.mtime,size:e.stat.size,tags:[...new Set(n)],frontmatter:s}}async searchNotes(e){let t=[],s=this.getAllNotes(),n=e.toLowerCase();for(let a of s){let i=await this.readNote(a),l=i.toLowerCase();if(l.includes(n)){let d=i.split(`
`).filter(k=>k.toLowerCase().includes(n)).slice(0,3),v=(l.match(new RegExp(n,"g"))||[]).length/i.length*1e3;t.push({file:a,matches:d,score:v})}}return t.sort((a,i)=>i.score-a.score)}getRecentNotes(e=10){return this.getAllNotes().sort((t,s)=>s.stat.mtime-t.stat.mtime).slice(0,e)}getNotesByTag(e){var n;let t=e.startsWith("#")?e:`#${e}`,s=[];for(let a of this.getAllNotes()){let i=this.app.metadataCache.getFileCache(a),l=((n=i==null?void 0:i.tags)==null?void 0:n.map(d=>d.tag))||[],u=i==null?void 0:i.frontmatter;u!=null&&u.tags&&(Array.isArray(u.tags)?l.push(...u.tags.map(d=>`#${d}`)):typeof u.tags=="string"&&l.push(`#${u.tags}`)),l.includes(t)&&s.push(a)}return s}getBacklinks(e){let t=[],s=this.app.metadataCache.resolvedLinks;for(let[n,a]of Object.entries(s))if(a[e.path]){let i=this.app.vault.getAbstractFileByPath(n);i instanceof x.TFile&&t.push(i)}return t}getOutgoingLinks(e){let t=[],s=this.app.metadataCache.resolvedLinks[e.path];if(s)for(let n of Object.keys(s)){let a=this.app.vault.getAbstractFileByPath(n);a instanceof x.TFile&&t.push(a)}return t}async createDailyNote(){let e=new Date,t=e.toISOString().split("T")[0],s=`0-Inbox/${t}.md`,n=this.app.vault.getAbstractFileByPath(s);if(n instanceof x.TFile)return n;let a=`# ${t}

## Tasks
- [ ]

## Notes


## Journal


---
Created by Jarvis at ${e.toLocaleTimeString()}
`;return this.createNote(s,a)}async quickCapture(e,t=[]){let n=`0-Inbox/capture-${new Date().toISOString().replace(/[:.]/g,"-")}.md`,a=t.length>0?`
tags: [${t.join(", ")}]`:"",i=`---
created: ${new Date().toISOString()}${a}
---

${e}
`;return this.createNote(n,i)}getAllTags(){var t;let e=new Set;for(let s of this.getAllNotes()){let n=this.app.metadataCache.getFileCache(s);(t=n==null?void 0:n.tags)==null||t.forEach(i=>e.add(i.tag));let a=n==null?void 0:n.frontmatter;a!=null&&a.tags&&(Array.isArray(a.tags)?a.tags.forEach(i=>e.add(`#${i}`)):typeof a.tags=="string"&&e.add(`#${a.tags}`))}return[...e].sort()}getVaultStats(){let e=this.getAllNotes(),t=this.getAllTags(),s=0,n=this.app.metadataCache.resolvedLinks;for(let a of Object.values(n))s+=Object.keys(a).length;return{totalNotes:e.length,totalTags:t.length,totalLinks:s}}async readFile(e){let t=this.app.vault.getAbstractFileByPath(e);return t instanceof x.TFile?this.app.vault.read(t):null}async writeFile(e,t){let s=this.app.vault.getAbstractFileByPath(e);if(s instanceof x.TFile)await this.app.vault.modify(s,t);else{let n=e.substring(0,e.lastIndexOf("/"));n&&await this.ensureFolderExists(n),await this.app.vault.create(e,t)}}getAllMarkdownFiles(){return this.getAllNotes().map(e=>e.path)}};var Fe={chunkSize:500,chunkOverlap:50,minChunkSize:100},M=class{constructor(e,t,s){this.index=new Map;this.isIndexing=!1;this.ollama=e,this.vault=t,this.app=s,this.indexPath=".jarvis/embeddings.json"}async initialize(){await this.loadIndex()}async loadIndex(){try{let e=await this.vault.readFile(this.indexPath);if(e){let t=JSON.parse(e);this.index=new Map(Object.entries(t)),console.log(`Loaded ${this.index.size} embeddings from index`)}}catch(e){console.log("No existing embedding index found, starting fresh"),this.index=new Map}}async saveIndex(){let e=Object.fromEntries(this.index);await this.vault.writeFile(this.indexPath,JSON.stringify(e,null,2))}async indexNote(e,t=!1){try{let s=await this.vault.readFile(e);if(!s||s.trim().length===0)return!1;let n=this.app.vault.getAbstractFileByPath(e);if(!n||!("stat"in n))return!1;let a=this.index.get(e),i=n.stat.mtime;if(!t&&a&&a.timestamp>=i)return!1;let l=this.extractMetadata(e,s),u=this.chunkContent(s),d=this.prepareEmbeddingText(l.title,s,l.tags),f=await this.ollama.embed(d),v={id:this.generateId(e),path:e,content:s.substring(0,5e3),embedding:f,metadata:l,timestamp:i};return this.index.set(e,v),!0}catch(s){return console.error(`Failed to index ${e}:`,s),!1}}async indexVault(e){if(this.isIndexing)throw new Error("Indexing already in progress");this.isIndexing=!0;let t=0;try{let s=await this.vault.getAllMarkdownFiles(),n=s.length;for(let a=0;a<s.length;a++){let i=s[a];if(e&&e(a+1,n),i.includes("/templates/")||i.startsWith("templates/"))continue;await this.indexNote(i)&&t++,t%10===0&&(await this.saveIndex(),await this.sleep(100))}return await this.saveIndex(),t}finally{this.isIndexing=!1}}async search(e,t=5,s=.3){if(this.index.size===0)return[];let n=await this.ollama.embed(e),a=[];for(let i of this.index.values()){let l=this.cosineSimilarity(n,i.embedding);l>=s&&a.push({document:i,score:l,snippet:this.extractSnippet(i.content,e)})}return a.sort((i,l)=>l.score-i.score),a.slice(0,t)}async findSimilar(e,t=5,s=.5){let n=this.index.get(e);if(!n)return[];let a=[];for(let i of this.index.values()){if(i.path===e)continue;let l=this.cosineSimilarity(n.embedding,i.embedding);l>=s&&a.push({document:i,score:l,snippet:this.extractSnippet(i.content,n.metadata.title)})}return a.sort((i,l)=>l.score-i.score),a.slice(0,t)}async getContextForQuery(e,t=2e3){let s=await this.search(e,3,.3);if(s.length===0)return"";let n=`**Relevant notes from your vault:**

`,a=0,i=4;for(let l of s){let u=`### [[${l.document.metadata.title}]]
${l.snippet}

`,d=u.length/i;if(a+d>t)break;n+=u,a+=d}return n}removeFromIndex(e){return this.index.delete(e)}clearIndex(){this.index.clear()}getIndexStats(){if(this.index.size===0)return{totalDocuments:0,averageEmbeddingSize:0,oldestTimestamp:0};let e=0,t=Date.now();for(let s of this.index.values())e+=s.embedding.length,s.timestamp<t&&(t=s.timestamp);return{totalDocuments:this.index.size,averageEmbeddingSize:e/this.index.size,oldestTimestamp:t}}extractMetadata(e,t){var k;let s=((k=e.split("/").pop())==null?void 0:k.replace(".md",""))||e,n=/#([a-zA-Z0-9_-]+)/g,a=[],i;for(;(i=n.exec(t))!==null;)a.push(i[1]);let l=/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g,u=[];for(;(i=l.exec(t))!==null;)u.push(i[1]);let d=t.split(/\s+/).length,f,v=t.match(/^---\n([\s\S]*?)\n---/);if(v)try{f=this.parseYamlFrontmatter(v[1])}catch(T){}return{title:s,tags:a,links:u,wordCount:d,frontmatter:f}}parseYamlFrontmatter(e){let t={},s=e.split(`
`);for(let n of s){let a=n.indexOf(":");if(a>0){let i=n.substring(0,a).trim(),l=n.substring(a+1).trim();t[i]=l}}return t}prepareEmbeddingText(e,t,s){let n=t.replace(/^---\n[\s\S]*?\n---\n?/,"").replace(/```[\s\S]*?```/g,"").replace(/!\[\[.*?\]\]/g,"").replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,"$2 $1").trim();n.length>3e3&&(n=n.substring(0,3e3));let a=s.length>0?`Tags: ${s.join(", ")}`:"";return`Title: ${e}
${a}

${n}`}chunkContent(e,t=Fe){let{chunkSize:s,chunkOverlap:n,minChunkSize:a}=t,i=[],l=e.split(/\n\n+/),u="";for(let d of l)if(u.length+d.length<=s)u+=(u?`

`:"")+d;else{u.length>=a&&i.push(u);let f=u.slice(-n);u=f+(f?`

`:"")+d}return u.length>=a&&i.push(u),i}extractSnippet(e,t,s=300){let n=e.toLowerCase(),a=t.toLowerCase().split(/\s+/),i=0;for(let f of a){let v=n.indexOf(f);if(v!==-1){i=v;break}}let l=Math.max(0,i-s/2),u=Math.min(e.length,l+s),d=e.substring(l,u);return l>0&&(d="..."+d),u<e.length&&(d=d+"..."),d.trim()}cosineSimilarity(e,t){if(e.length!==t.length)return 0;let s=0,n=0,a=0;for(let i=0;i<e.length;i++)s+=e[i]*t[i],n+=e[i]*e[i],a+=t[i]*t[i];return n===0||a===0?0:s/(Math.sqrt(n)*Math.sqrt(a))}generateId(e){let t=0;for(let s=0;s<e.length;s++){let n=e.charCodeAt(s);t=(t<<5)-t+n,t=t&t}return Math.abs(t).toString(36)}sleep(e){return new Promise(t=>setTimeout(t,e))}};var le=require("obsidian"),F=class{constructor(e){this.cache=new Map;this.cacheExpiry=1e3*60*30;this.ollama=e}async fetchPage(e){let t=this.cache.get(e);if(t&&Date.now()-t.timestamp<this.cacheExpiry)return t;try{let n=(await(0,le.requestUrl)({url:e,method:"GET",headers:{"User-Agent":"Mozilla/5.0 (compatible; ObsidianJarvis/1.0)",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"}})).text,a=this.parseHtml(n,e);return this.cache.set(e,a),a}catch(s){throw new Error(`Failed to fetch page: ${s.message}`)}}parseHtml(e,t){let s=e.match(/<title[^>]*>([^<]*)<\/title>/i),n=s?this.decodeHtmlEntities(s[1].trim()):"Untitled",a=e.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i),i=a?this.decodeHtmlEntities(a[1]):void 0,l=e.replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi,"").replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi,"").replace(/<header[^>]*>[\s\S]*?<\/header>/gi,"").replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi,"").replace(/<!--[\s\S]*?-->/g,""),u=l,d=l.match(/<article[^>]*>([\s\S]*?)<\/article>/i),f=l.match(/<main[^>]*>([\s\S]*?)<\/main>/i);d?u=d[1]:f&&(u=f[1]);let v=this.htmlToText(u),k=/<a[^>]*href=["']([^"'#][^"']*)["'][^>]*>/gi,T=[],D;for(;(D=k.exec(e))!==null&&T.length<20;){let C=D[1];if(C.startsWith("http"))T.push(C);else if(C.startsWith("/")){let I=new URL(t);T.push(`${I.origin}${C}`)}}return{url:t,title:n,content:v.substring(0,1e4),description:i,links:[...new Set(T)],timestamp:Date.now()}}htmlToText(e){return e.replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi,`

$1

`).replace(/<p[^>]*>([\s\S]*?)<\/p>/gi,`
$1
`).replace(/<li[^>]*>([\s\S]*?)<\/li>/gi,`
\u2022 $1`).replace(/<br\s*\/?>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\n{3,}/g,`

`).replace(/[ \t]+/g," ").trim()}decodeHtmlEntities(e){return e.replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#(\d+);/g,(t,s)=>String.fromCharCode(parseInt(s)))}async askAboutPage(e,t){let s=await this.fetchPage(e),n=`You are a helpful assistant analyzing a web page.
Answer questions based ONLY on the provided page content.
If the information isn't available in the content, say so.
Be concise and accurate.`,a=`Page Title: ${s.title}
${s.description?`Description: ${s.description}`:""}

Page Content:
${s.content}

Question: ${t}`;return this.ollama.chat([{role:"system",content:n},{role:"user",content:a}])}async summarizePage(e,t="bullets"){let s=await this.fetchPage(e),a=`You are a helpful assistant that summarizes web pages.
${{brief:"Provide a 2-3 sentence summary.",detailed:"Provide a comprehensive summary with all key points and context.",bullets:"Summarize in 5-7 bullet points covering the main ideas."}[t]}
Focus on the most important information.`,i=`Page Title: ${s.title}

Content:
${s.content}

Provide a summary:`;return this.ollama.chat([{role:"system",content:a},{role:"user",content:i}])}async analyzePage(e){let t=await this.fetchPage(e),n=await this.ollama.chat([{role:"system",content:`Analyze the following web page and respond in JSON format:
{
  "summary": "2-3 sentence summary",
  "keyPoints": ["point 1", "point 2", ...],
  "topics": ["topic1", "topic2", ...],
  "sentiment": "positive" | "negative" | "neutral"
}`},{role:"user",content:`Title: ${t.title}

Content:
${t.content}`}]);try{let a=n.match(/\{[\s\S]*\}/);if(a)return JSON.parse(a[0])}catch(a){}return{summary:n,keyPoints:[],topics:[]}}async extractKeyInfo(e,t){let s=await this.fetchPage(e),n={dates:"Extract all dates and time references",names:"Extract all people and organization names",numbers:"Extract all important numbers and statistics",links:"List the most relevant linked resources",quotes:"Extract notable quotes or statements"};return(await this.ollama.chat([{role:"system",content:`${n[t]}. Output each item on a new line, nothing else.`},{role:"user",content:s.content}])).split(`
`).map(i=>i.replace(/^[-•*]\s*/,"").trim()).filter(i=>i.length>0)}async createNoteFromPage(e){let t=await this.fetchPage(e),s=await this.analyzePage(e),n=new Date().toISOString().split("T")[0];return`---
url: ${t.url}
title: "${t.title.replace(/"/g,'\\"')}"
created: ${n}
tags: [web-clip, ${s.topics.slice(0,3).join(", ")}]
---

# ${t.title}

**Source:** [${t.url}](${t.url})
**Clipped:** ${n}

## Summary

${s.summary}

## Key Points

${s.keyPoints.map(a=>`- ${a}`).join(`
`)}

## Original Content

${t.content.substring(0,5e3)}${t.content.length>5e3?`

...(truncated)`:""}

---
*Clipped by Jarvis AI*
`}clearCache(){this.cache.clear()}};var De={ollamaEndpoint:"http://localhost:11434",textModel:"granite3.1-dense:2b",visionModel:"granite3.2-vision:2b",embeddingModel:"granite-embedding:278m",enablePlanning:!0,enableVision:!0,enableTaskWarrior:!0,showStatusBar:!0,temperature:.7},V=class extends p.Plugin{async onload(){await this.loadSettings(),this.ollama=new O(this.settings),this.vault=new z(this.app),this.embedding=new M(this.ollama,this.vault,this.app),this.pageAssist=new F(this.ollama),this.embedding.initialize().catch(e=>{console.error("Failed to initialize embedding index:",e)}),this.registerView(j,e=>new L(e,this)),this.addRibbonIcon("bot","Jarvis AI Assistant",()=>{this.activateView()}),this.addCommand({id:"open-jarvis",name:"Open Jarvis",hotkeys:[{modifiers:["Ctrl","Shift"],key:"j"}],callback:()=>this.activateView()}),this.addCommand({id:"jarvis-ask",name:"Quick Ask",hotkeys:[{modifiers:["Ctrl","Shift"],key:"a"}],callback:()=>this.quickAsk()}),this.addCommand({id:"jarvis-summarize",name:"Summarize Current Note",callback:()=>this.summarizeCurrentNote()}),this.addCommand({id:"jarvis-plan",name:"Create Plan",hotkeys:[{modifiers:["Ctrl","Shift"],key:"p"}],callback:()=>this.createPlan()}),this.addCommand({id:"jarvis-task",name:"Create Task",hotkeys:[{modifiers:["Ctrl","Shift"],key:"t"}],callback:()=>this.createTask()}),this.addCommand({id:"jarvis-rag-search",name:"RAG Search",hotkeys:[{modifiers:["Ctrl","Shift"],key:"s"}],callback:()=>this.ragSearch()}),this.addCommand({id:"jarvis-index-vault",name:"Index Vault for RAG",callback:()=>this.indexVault()}),this.addCommand({id:"jarvis-clip-page",name:"Clip Web Page to Note",callback:()=>this.clipPageToNote()}),this.addSettingTab(new se(this.app,this)),this.settings.showStatusBar&&(this.statusBarItem=this.addStatusBarItem(),this.updateStatusBar("Ready")),this.checkOllamaConnection(),console.log("Jarvis AI Assistant loaded")}onunload(){console.log("Jarvis AI Assistant unloaded")}async loadSettings(){this.settings=Object.assign({},De,await this.loadData())}async saveSettings(){await this.saveData(this.settings),this.ollama=new O(this.settings),this.embedding=new M(this.ollama,this.vault,this.app),this.pageAssist=new F(this.ollama)}async activateView(){let{workspace:e}=this.app,t=null,s=e.getLeavesOfType(j);s.length>0?t=s[0]:(t=e.getRightLeaf(!1),await(t==null?void 0:t.setViewState({type:j,active:!0}))),t&&e.revealLeaf(t)}async checkOllamaConnection(){await this.ollama.checkConnection()?(this.updateStatusBar("Connected"),new p.Notice("Jarvis: Connected to Ollama")):(this.updateStatusBar("Disconnected"),new p.Notice("Jarvis: Cannot connect to Ollama. Please ensure Ollama is running."))}updateStatusBar(e){this.statusBarItem&&this.statusBarItem.setText(`Jarvis: ${e}`)}async quickAsk(){let e=this.app.workspace.getActiveViewOfType(p.MarkdownView);if(!e){new p.Notice("No active markdown view");return}let s=e.editor.getSelection()||e.editor.getValue().substring(0,1e3);await this.activateView()}async summarizeCurrentNote(){let e=this.app.workspace.getActiveViewOfType(p.MarkdownView);if(!e){new p.Notice("No active markdown view");return}let t=e.editor.getValue();this.updateStatusBar("Summarizing...");try{let s=await this.ollama.chat([{role:"system",content:"You are a helpful assistant. Summarize the following note in 3-5 bullet points."},{role:"user",content:t}]);new p.Notice("Summary generated! Check Jarvis panel."),await this.activateView()}catch(s){new p.Notice("Failed to generate summary"),console.error(s)}finally{this.updateStatusBar("Ready")}}async createPlan(){await this.activateView(),new p.Notice("Enter your goal in the Jarvis panel to create a plan")}async createTask(){await this.activateView(),new p.Notice("Enter your task in the Jarvis panel")}async ragSearch(){let e=this.app.workspace.getActiveViewOfType(p.MarkdownView);if(e){let t=e.editor.getSelection()}await this.activateView(),new p.Notice("Use RAG Search mode to search your vault semantically")}async indexVault(){this.updateStatusBar("Indexing..."),new p.Notice("Starting vault indexing... This may take a while.");try{let e=await this.embedding.indexVault((t,s)=>{this.updateStatusBar(`Indexing ${t}/${s}`)});new p.Notice(`Indexed ${e} notes successfully!`),this.updateStatusBar("Ready")}catch(e){new p.Notice(`Indexing failed: ${e.message}`),this.updateStatusBar("Index failed"),console.error("Indexing error:",e)}}async clipPageToNote(){let e=await this.promptForUrl();if(e){this.updateStatusBar("Clipping..."),new p.Notice("Clipping page...");try{let t=await this.pageAssist.createNoteFromPage(e),n=`0-Inbox/web-clip-${new Date().toISOString().replace(/[:.]/g,"-")}.md`;await this.vault.writeFile(n,t),new p.Notice(`Page clipped to ${n}`),this.updateStatusBar("Ready");let a=this.app.vault.getAbstractFileByPath(n);a&&a instanceof p.TFile&&await this.app.workspace.getLeaf(!1).openFile(a)}catch(t){new p.Notice(`Failed to clip page: ${t.message}`),this.updateStatusBar("Clip failed"),console.error("Clip error:",t)}}}async promptForUrl(){return new Promise(e=>{new te(this.app,s=>{e(s)}).open()})}},te=class extends p.Modal{constructor(e,t){super(e),this.onSubmit=t}onOpen(){let{contentEl:e}=this;e.createEl("h2",{text:"Enter URL to clip"});let s=e.createDiv({cls:"jarvis-url-input-container"}).createEl("input",{type:"text",placeholder:"https://example.com/article",cls:"jarvis-url-input"});s.style.width="100%",s.style.padding="8px",s.style.marginBottom="16px";let n=e.createDiv({cls:"jarvis-url-buttons"});n.style.display="flex",n.style.gap="8px",n.style.justifyContent="flex-end",n.createEl("button",{text:"Cancel"}).addEventListener("click",()=>{this.close(),this.onSubmit(null)}),n.createEl("button",{text:"Clip",cls:"mod-cta"}).addEventListener("click",()=>{let l=s.value.trim();l&&(this.close(),this.onSubmit(l))}),s.addEventListener("keydown",l=>{if(l.key==="Enter"){let u=s.value.trim();u&&(this.close(),this.onSubmit(u))}}),s.focus()}onClose(){let{contentEl:e}=this;e.empty()}},se=class extends p.PluginSettingTab{constructor(e,t){super(e,t),this.plugin=t}display(){let{containerEl:e}=this;e.empty(),e.createEl("h2",{text:"Jarvis AI Assistant Settings"}),e.createEl("h3",{text:"Ollama Configuration"}),new p.Setting(e).setName("Ollama Endpoint").setDesc("The URL of your Ollama server").addText(t=>t.setPlaceholder("http://localhost:11434").setValue(this.plugin.settings.ollamaEndpoint).onChange(async s=>{this.plugin.settings.ollamaEndpoint=s,await this.plugin.saveSettings()})),new p.Setting(e).setName("Text Model").setDesc("The model to use for text generation").addText(t=>t.setPlaceholder("granite3.1-dense:2b").setValue(this.plugin.settings.textModel).onChange(async s=>{this.plugin.settings.textModel=s,await this.plugin.saveSettings()})),new p.Setting(e).setName("Vision Model").setDesc("The model to use for image analysis").addText(t=>t.setPlaceholder("granite3.2-vision:2b").setValue(this.plugin.settings.visionModel).onChange(async s=>{this.plugin.settings.visionModel=s,await this.plugin.saveSettings()})),new p.Setting(e).setName("Temperature").setDesc("Controls randomness (0.0 = deterministic, 1.0 = creative)").addSlider(t=>t.setLimits(0,1,.1).setValue(this.plugin.settings.temperature).setDynamicTooltip().onChange(async s=>{this.plugin.settings.temperature=s,await this.plugin.saveSettings()})),e.createEl("h3",{text:"Features"}),new p.Setting(e).setName("Enable Planning Agent").setDesc("Allow Jarvis to create and manage task plans").addToggle(t=>t.setValue(this.plugin.settings.enablePlanning).onChange(async s=>{this.plugin.settings.enablePlanning=s,await this.plugin.saveSettings()})),new p.Setting(e).setName("Enable Vision").setDesc("Allow Jarvis to analyze images and screenshots").addToggle(t=>t.setValue(this.plugin.settings.enableVision).onChange(async s=>{this.plugin.settings.enableVision=s,await this.plugin.saveSettings()})),new p.Setting(e).setName("Enable TaskWarrior Integration").setDesc("Allow Jarvis to create and manage TaskWarrior tasks").addToggle(t=>t.setValue(this.plugin.settings.enableTaskWarrior).onChange(async s=>{this.plugin.settings.enableTaskWarrior=s,await this.plugin.saveSettings()})),e.createEl("h3",{text:"UI"}),new p.Setting(e).setName("Show Status Bar").setDesc("Show Jarvis status in the status bar").addToggle(t=>t.setValue(this.plugin.settings.showStatusBar).onChange(async s=>{this.plugin.settings.showStatusBar=s,await this.plugin.saveSettings()})),e.createEl("h3",{text:"Connection"}),new p.Setting(e).setName("Test Connection").setDesc("Test the connection to Ollama").addButton(t=>t.setButtonText("Test").onClick(async()=>{t.setButtonText("Testing..."),await this.plugin.checkOllamaConnection(),t.setButtonText("Test")}))}};
