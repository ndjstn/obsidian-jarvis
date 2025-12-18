/*
Obsidian Jarvis AI Assistant
A comprehensive AI assistant with planning, vision, and task management
*/

var ye=Object.create;var L=Object.defineProperty;var ve=Object.getOwnPropertyDescriptor;var be=Object.getOwnPropertyNames;var we=Object.getPrototypeOf,xe=Object.prototype.hasOwnProperty;var Se=(o,e)=>()=>(e||o((e={exports:{}}).exports,e),e.exports),ke=(o,e)=>{for(var t in e)L(o,t,{get:e[t],enumerable:!0})},ie=(o,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of be(e))!xe.call(o,n)&&n!==t&&L(o,n,{get:()=>e[n],enumerable:!(s=ve(e,n))||s.enumerable});return o};var G=(o,e,t)=>(t=o!=null?ye(we(o)):{},ie(e||!o||!o.__esModule?L(t,"default",{value:o,enumerable:!0}):t,o)),Pe=o=>ie(L({},"__esModule",{value:!0}),o);var q=Se((_,oe)=>{(function(o,e){typeof _=="object"&&typeof oe!="undefined"?e(_):typeof define=="function"&&define.amd?define(["exports"],e):e(o.WHATWGFetch={})})(_,function(o){"use strict";var e=typeof globalThis!="undefined"&&globalThis||typeof self!="undefined"&&self||typeof global!="undefined"&&global||{},t={searchParams:"URLSearchParams"in e,iterable:"Symbol"in e&&"iterator"in Symbol,blob:"FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(i){return!1}}(),formData:"FormData"in e,arrayBuffer:"ArrayBuffer"in e};function s(i){return i&&DataView.prototype.isPrototypeOf(i)}if(t.arrayBuffer)var n=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],r=ArrayBuffer.isView||function(i){return i&&n.indexOf(Object.prototype.toString.call(i))>-1};function a(i){if(typeof i!="string"&&(i=String(i)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(i)||i==="")throw new TypeError('Invalid character in header field name: "'+i+'"');return i.toLowerCase()}function l(i){return typeof i!="string"&&(i=String(i)),i}function d(i){var c={next:function(){var h=i.shift();return{done:h===void 0,value:h}}};return t.iterable&&(c[Symbol.iterator]=function(){return c}),c}function u(i){this.map={},i instanceof u?i.forEach(function(c,h){this.append(h,c)},this):Array.isArray(i)?i.forEach(function(c){if(c.length!=2)throw new TypeError("Headers constructor: expected name/value pair to be length 2, found"+c.length);this.append(c[0],c[1])},this):i&&Object.getOwnPropertyNames(i).forEach(function(c){this.append(c,i[c])},this)}u.prototype.append=function(i,c){i=a(i),c=l(c);var h=this.map[i];this.map[i]=h?h+", "+c:c},u.prototype.delete=function(i){delete this.map[a(i)]},u.prototype.get=function(i){return i=a(i),this.has(i)?this.map[i]:null},u.prototype.has=function(i){return this.map.hasOwnProperty(a(i))},u.prototype.set=function(i,c){this.map[a(i)]=l(c)},u.prototype.forEach=function(i,c){for(var h in this.map)this.map.hasOwnProperty(h)&&i.call(c,this.map[h],h,this)},u.prototype.keys=function(){var i=[];return this.forEach(function(c,h){i.push(h)}),d(i)},u.prototype.values=function(){var i=[];return this.forEach(function(c){i.push(c)}),d(i)},u.prototype.entries=function(){var i=[];return this.forEach(function(c,h){i.push([h,c])}),d(i)},t.iterable&&(u.prototype[Symbol.iterator]=u.prototype.entries);function g(i){if(!i._noBody){if(i.bodyUsed)return Promise.reject(new TypeError("Already read"));i.bodyUsed=!0}}function y(i){return new Promise(function(c,h){i.onload=function(){c(i.result)},i.onerror=function(){h(i.error)}})}function S(i){var c=new FileReader,h=y(c);return c.readAsArrayBuffer(i),h}function T(i){var c=new FileReader,h=y(c),f=/charset=([A-Za-z0-9_-]+)/.exec(i.type),v=f?f[1]:"utf-8";return c.readAsText(i,v),h}function I(i){for(var c=new Uint8Array(i),h=new Array(c.length),f=0;f<c.length;f++)h[f]=String.fromCharCode(c[f]);return h.join("")}function C(i){if(i.slice)return i.slice(0);var c=new Uint8Array(i.byteLength);return c.set(new Uint8Array(i)),c.buffer}function D(){return this.bodyUsed=!1,this._initBody=function(i){this.bodyUsed=this.bodyUsed,this._bodyInit=i,i?typeof i=="string"?this._bodyText=i:t.blob&&Blob.prototype.isPrototypeOf(i)?this._bodyBlob=i:t.formData&&FormData.prototype.isPrototypeOf(i)?this._bodyFormData=i:t.searchParams&&URLSearchParams.prototype.isPrototypeOf(i)?this._bodyText=i.toString():t.arrayBuffer&&t.blob&&s(i)?(this._bodyArrayBuffer=C(i.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):t.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(i)||r(i))?this._bodyArrayBuffer=C(i):this._bodyText=i=Object.prototype.toString.call(i):(this._noBody=!0,this._bodyText=""),this.headers.get("content-type")||(typeof i=="string"?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):t.searchParams&&URLSearchParams.prototype.isPrototypeOf(i)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},t.blob&&(this.blob=function(){var i=g(this);if(i)return i;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))}),this.arrayBuffer=function(){if(this._bodyArrayBuffer){var i=g(this);return i||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer))}else{if(t.blob)return this.blob().then(S);throw new Error("could not read as ArrayBuffer")}},this.text=function(){var i=g(this);if(i)return i;if(this._bodyBlob)return T(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(I(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},t.formData&&(this.formData=function(){return this.text().then(me)}),this.json=function(){return this.text().then(JSON.parse)},this}var he=["CONNECT","DELETE","GET","HEAD","OPTIONS","PATCH","POST","PUT","TRACE"];function pe(i){var c=i.toUpperCase();return he.indexOf(c)>-1?c:i}function P(i,c){if(!(this instanceof P))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');c=c||{};var h=c.body;if(i instanceof P){if(i.bodyUsed)throw new TypeError("Already read");this.url=i.url,this.credentials=i.credentials,c.headers||(this.headers=new u(i.headers)),this.method=i.method,this.mode=i.mode,this.signal=i.signal,!h&&i._bodyInit!=null&&(h=i._bodyInit,i.bodyUsed=!0)}else this.url=String(i);if(this.credentials=c.credentials||this.credentials||"same-origin",(c.headers||!this.headers)&&(this.headers=new u(c.headers)),this.method=pe(c.method||this.method||"GET"),this.mode=c.mode||this.mode||null,this.signal=c.signal||this.signal||function(){if("AbortController"in e){var m=new AbortController;return m.signal}}(),this.referrer=null,(this.method==="GET"||this.method==="HEAD")&&h)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(h),(this.method==="GET"||this.method==="HEAD")&&(c.cache==="no-store"||c.cache==="no-cache")){var f=/([?&])_=[^&]*/;if(f.test(this.url))this.url=this.url.replace(f,"$1_="+new Date().getTime());else{var v=/\?/;this.url+=(v.test(this.url)?"&":"?")+"_="+new Date().getTime()}}}P.prototype.clone=function(){return new P(this,{body:this._bodyInit})};function me(i){var c=new FormData;return i.trim().split("&").forEach(function(h){if(h){var f=h.split("="),v=f.shift().replace(/\+/g," "),m=f.join("=").replace(/\+/g," ");c.append(decodeURIComponent(v),decodeURIComponent(m))}}),c}function ge(i){var c=new u,h=i.replace(/\r?\n[\t ]+/g," ");return h.split("\r").map(function(f){return f.indexOf(`
`)===0?f.substr(1,f.length):f}).forEach(function(f){var v=f.split(":"),m=v.shift().trim();if(m){var N=v.join(":").trim();try{c.append(m,N)}catch(W){console.warn("Response "+W.message)}}}),c}D.call(P.prototype);function k(i,c){if(!(this instanceof k))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');if(c||(c={}),this.type="default",this.status=c.status===void 0?200:c.status,this.status<200||this.status>599)throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");this.ok=this.status>=200&&this.status<300,this.statusText=c.statusText===void 0?"":""+c.statusText,this.headers=new u(c.headers),this.url=c.url||"",this._initBody(i)}D.call(k.prototype),k.prototype.clone=function(){return new k(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new u(this.headers),url:this.url})},k.error=function(){var i=new k(null,{status:200,statusText:""});return i.ok=!1,i.status=0,i.type="error",i};var fe=[301,302,303,307,308];k.redirect=function(i,c){if(fe.indexOf(c)===-1)throw new RangeError("Invalid status code");return new k(null,{status:c,headers:{location:i}})},o.DOMException=e.DOMException;try{new o.DOMException}catch(i){o.DOMException=function(c,h){this.message=c,this.name=h;var f=Error(c);this.stack=f.stack},o.DOMException.prototype=Object.create(Error.prototype),o.DOMException.prototype.constructor=o.DOMException}function J(i,c){return new Promise(function(h,f){var v=new P(i,c);if(v.signal&&v.signal.aborted)return f(new o.DOMException("Aborted","AbortError"));var m=new XMLHttpRequest;function N(){m.abort()}m.onload=function(){var b={statusText:m.statusText,headers:ge(m.getAllResponseHeaders()||"")};v.url.indexOf("file://")===0&&(m.status<200||m.status>599)?b.status=200:b.status=m.status,b.url="responseURL"in m?m.responseURL:b.headers.get("X-Request-URL");var A="response"in m?m.response:m.responseText;setTimeout(function(){h(new k(A,b))},0)},m.onerror=function(){setTimeout(function(){f(new TypeError("Network request failed"))},0)},m.ontimeout=function(){setTimeout(function(){f(new TypeError("Network request timed out"))},0)},m.onabort=function(){setTimeout(function(){f(new o.DOMException("Aborted","AbortError"))},0)};function W(b){try{return b===""&&e.location.href?e.location.href:b}catch(A){return b}}if(m.open(v.method,W(v.url),!0),v.credentials==="include"?m.withCredentials=!0:v.credentials==="omit"&&(m.withCredentials=!1),"responseType"in m&&(t.blob?m.responseType="blob":t.arrayBuffer&&(m.responseType="arraybuffer")),c&&typeof c.headers=="object"&&!(c.headers instanceof u||e.Headers&&c.headers instanceof e.Headers)){var ae=[];Object.getOwnPropertyNames(c.headers).forEach(function(b){ae.push(a(b)),m.setRequestHeader(b,l(c.headers[b]))}),v.headers.forEach(function(b,A){ae.indexOf(A)===-1&&m.setRequestHeader(A,b)})}else v.headers.forEach(function(b,A){m.setRequestHeader(A,b)});v.signal&&(v.signal.addEventListener("abort",N),m.onreadystatechange=function(){m.readyState===4&&v.signal.removeEventListener("abort",N)}),m.send(typeof v._bodyInit=="undefined"?null:v._bodyInit)})}J.polyfill=!0,e.fetch||(e.fetch=J,e.Headers=u,e.Request=P,e.Response=k),o.Headers=u,o.Request=P,o.Response=k,o.fetch=J,Object.defineProperty(o,"__esModule",{value:!0})})});var Ne={};ke(Ne,{default:()=>H});module.exports=Pe(Ne);var p=require("obsidian");var w=require("obsidian"),$="jarvis-view";async function Te(o,e){try{await navigator.clipboard.writeText(o);let t=e.innerHTML;e.innerHTML="",(0,w.setIcon)(e,"check"),e.addClass("jarvis-copy-success"),new w.Notice("Copied to clipboard!"),setTimeout(()=>{e.innerHTML="",(0,w.setIcon)(e,"copy"),e.removeClass("jarvis-copy-success")},1500)}catch(t){new w.Notice("Failed to copy")}}var z=class extends w.ItemView{constructor(t,s){super(t);this.conversation=[];this.isProcessing=!1;this.plugin=s}getViewType(){return $}getDisplayText(){return"Jarvis AI"}getIcon(){return"bot"}async onOpen(){let t=this.containerEl.children[1];t.empty(),t.addClass("jarvis-container");let s=t.createDiv({cls:"jarvis-header"});s.createEl("h4",{text:"Jarvis AI Assistant"});let n=s.createDiv({cls:"jarvis-mode-container"});this.modeSelect=n.createEl("select",{cls:"jarvis-mode-select"}),this.modeSelect.createEl("option",{value:"chat",text:"Chat"}),this.modeSelect.createEl("option",{value:"research",text:"Research"}),this.modeSelect.createEl("option",{value:"plan",text:"Plan"}),this.modeSelect.createEl("option",{value:"summarize",text:"Summarize"}),this.modeSelect.createEl("option",{value:"task",text:"Task"}),this.modeSelect.createEl("option",{value:"vision",text:"Vision"}),this.modeSelect.createEl("option",{value:"pageassist",text:"Page Assist"}),this.modeSelect.createEl("option",{value:"rag",text:"RAG Search"});let r=t.createDiv({cls:"jarvis-action-bar"});r.createEl("button",{cls:"jarvis-action-btn",text:"Clear"}).addEventListener("click",()=>this.clearConversation()),r.createEl("button",{cls:"jarvis-action-btn",text:"Add Context"}).addEventListener("click",()=>this.addCurrentNoteContext()),r.createEl("button",{cls:"jarvis-action-btn",text:"Export"}).addEventListener("click",()=>this.exportConversation()),this.chatContainer=t.createDiv({cls:"jarvis-chat-container"}),this.addSystemMessage(`Hello! I'm Jarvis, your AI assistant. How can I help you today?

**Modes:**
- **Chat**: General conversation
- **Research**: Web search and fact-checking
- **Plan**: Break down goals into tasks
- **Summarize**: Summarize notes or text
- **Task**: Create TaskWarrior tasks
- **Vision**: Analyze images
- **Page Assist**: Analyze web pages (enter URL + question)
- **RAG Search**: Semantic search over your vault`),this.inputContainer=t.createDiv({cls:"jarvis-input-container"}),this.inputField=this.inputContainer.createEl("textarea",{cls:"jarvis-input-field",attr:{placeholder:"Ask Jarvis anything...",rows:"3"}}),this.inputField.addEventListener("keydown",y=>{y.key==="Enter"&&!y.shiftKey&&(y.preventDefault(),this.sendMessage())});let u=this.inputContainer.createDiv({cls:"jarvis-button-container"}),g=u.createEl("button",{cls:"jarvis-image-btn"});(0,w.setIcon)(g,"image"),g.addEventListener("click",()=>this.uploadImage()),this.sendButton=u.createEl("button",{cls:"jarvis-send-btn",text:"Send"}),this.sendButton.addEventListener("click",()=>this.sendMessage()),this.addStyles()}addStyles(){let t=document.createElement("style");t.textContent=`
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
    `,document.head.appendChild(t)}addSystemMessage(t){let s=this.chatContainer.createDiv({cls:"jarvis-message jarvis-message-system"});w.MarkdownRenderer.renderMarkdown(t,s,"",this.plugin)}addMessage(t,s){let n={role:t,content:s,timestamp:new Date};this.conversation.push(n);let r=this.chatContainer.createDiv({cls:`jarvis-message jarvis-message-${t}`}),a=r.createDiv({cls:"jarvis-message-header"});a.createSpan({cls:"jarvis-message-role"}).setText(t==="user"?"You":"Jarvis");let d=a.createEl("button",{cls:"jarvis-copy-btn"});(0,w.setIcon)(d,"copy"),d.setAttribute("aria-label","Copy message"),d.addEventListener("click",()=>Te(s,d));let u=r.createDiv({cls:"jarvis-message-content"});t==="assistant"?w.MarkdownRenderer.renderMarkdown(s,u,"",this.plugin):u.createDiv({text:s}),r.createDiv({cls:"jarvis-message-time"}).setText(n.timestamp.toLocaleTimeString()),this.chatContainer.scrollTop=this.chatContainer.scrollHeight}createLoadingMessage(){let t=this.chatContainer.createDiv({cls:"jarvis-message jarvis-message-assistant jarvis-loading"});return t.setText("Thinking..."),this.chatContainer.scrollTop=this.chatContainer.scrollHeight,t}async sendMessage(){let t=this.inputField.value.trim();if(!t||this.isProcessing)return;this.isProcessing=!0,this.sendButton.disabled=!0,this.inputField.value="",this.addMessage("user",t);let s=this.createLoadingMessage();try{let n=this.modeSelect.value,r;switch(n){case"research":r=await this.handleResearch(t);break;case"plan":r=await this.plugin.ollama.decomposePlan(t);break;case"summarize":r=await this.plugin.ollama.summarize(t,"bullets");break;case"task":r=`**TaskWarrior Command:**
\`\`\`
${await this.plugin.ollama.generateTaskWarriorCommand(t)}
\`\`\`

Copy and run this command to create the task.`;break;case"pageassist":r=await this.handlePageAssist(t);break;case"rag":r=await this.handleRAGSearch(t);break;default:let l=this.buildConversationHistory();l.push({role:"user",content:t}),r=await this.plugin.ollama.chat(l)}s.remove(),this.addMessage("assistant",r)}catch(n){s.remove(),this.addMessage("assistant",`Error: ${n.message}`),console.error("Jarvis error:",n)}finally{this.isProcessing=!1,this.sendButton.disabled=!1,this.inputField.focus()}}buildConversationHistory(){let s=[{role:"system",content:`You are Jarvis, an AI assistant integrated into Obsidian. You help with:
- Answering questions about notes and knowledge
- Planning and task management
- Summarizing content
- Suggesting connections between ideas
- General knowledge assistance

Be concise, helpful, and format responses with Markdown when appropriate.`}],n=this.conversation.slice(-10);for(let r of n)s.push({role:r.role,content:r.content});return s}async addCurrentNoteContext(){let t=await this.plugin.vault.getActiveNoteContent();if(t){let s=t.length>2e3?t.substring(0,2e3)+"...":t;this.inputField.value=`Context from current note:

${s}

Question: `,this.inputField.focus()}else this.addSystemMessage("No active note to add as context.")}async uploadImage(){if(!this.plugin.settings.enableVision){this.addSystemMessage("Vision mode is disabled in settings.");return}let t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async s=>{var a;let n=(a=s.target.files)==null?void 0:a[0];if(!n)return;let r=new FileReader;r.onload=async()=>{let l=r.result.split(",")[1];this.isProcessing=!0,this.sendButton.disabled=!0,this.addMessage("user",`[Uploaded image: ${n.name}]`);let d=this.createLoadingMessage();try{let u=this.inputField.value.trim()||"Describe this image in detail.";this.inputField.value="";let g=await this.plugin.ollama.analyzeImage(l,u);d.remove(),this.addMessage("assistant",g)}catch(u){d.remove(),this.addMessage("assistant",`Vision error: ${u.message}`)}finally{this.isProcessing=!1,this.sendButton.disabled=!1}},r.readAsDataURL(n)},t.click()}async handleResearch(t){if(!this.plugin.webResearch)return"\u274C Web Research service not initialized. Please restart the plugin.";let s=t.toLowerCase();if(s.startsWith("fact check")||s.startsWith("verify")){let n=t.replace(/^(fact check|verify)\s*/i,"").trim();try{return await this.plugin.webResearch.factCheck(n)}catch(r){return`\u274C Fact check failed: ${r.message}`}}try{let n=await this.plugin.webResearch.research(t,"thorough"),r=`## Research: ${t}

`;if(r+=n.summary,n.sources.length>0){r+=`

---

### Sources
`;for(let a of n.sources)r+=`- [${a.title}](${a.url})
`}if(n.relatedQueries.length>0){r+=`
### Related Topics
`;for(let a of n.relatedQueries)r+=`- ${a}
`}return r}catch(n){return`\u274C Research failed: ${n.message}

Try:
- Check if SearXNG is running at localhost:8888
- Or use a simpler query`}}async handlePageAssist(t){let s=t.match(/(https?:\/\/[^\s]+)/);if(!s)return"**Page Assist Usage:**\n\nPlease include a URL in your message. Examples:\n- `https://example.com What is this about?`\n- `summarize https://article.com`\n- `https://docs.com What does it say about X?`";let n=s[1],r=t.replace(n,"").trim();if(!this.plugin.pageAssist)return"\u274C Page Assist service not initialized. Please restart the plugin.";try{if(!r||r.toLowerCase().includes("summarize")){let a=await this.plugin.pageAssist.summarizePage(n,"bullets");return`## Page Summary

**URL:** ${n}

${a}`}else{let a=await this.plugin.pageAssist.askAboutPage(n,r);return`## Answer

**URL:** ${n}
**Question:** ${r}

${a}`}}catch(a){return`\u274C Failed to analyze page: ${a.message}`}}async handleRAGSearch(t){if(!this.plugin.embedding)return"\u274C RAG service not initialized. Please restart the plugin.";let s=t.toLowerCase();if(s.includes("index")||s.includes("reindex")){this.addSystemMessage("\u{1F504} Indexing vault... This may take a while.");try{return`\u2705 Indexed ${await this.plugin.embedding.indexVault((r,a)=>{})} notes successfully!

You can now search your vault semantically.`}catch(n){return`\u274C Indexing failed: ${n.message}`}}if(s==="stats"||s==="status"){let n=this.plugin.embedding.getIndexStats();return n.totalDocuments===0?`\u{1F4CA} **RAG Index Status**

No notes indexed yet.

Type \`index\` to build the index.`:`\u{1F4CA} **RAG Index Statistics**

- **Indexed notes:** ${n.totalDocuments}
- **Embedding dimensions:** ${n.averageEmbeddingSize.toFixed(0)}

Type \`index\` to refresh the index.`}try{let n=await this.plugin.embedding.search(t,5,.3);if(n.length===0)return"\u274C No relevant notes found.\n\nTry different keywords or type `index` to rebuild the index.";let r=`## Search Results for "${t}"

`;for(let l of n){let d=Math.round(l.score*100);r+=`### [[${l.document.metadata.title}]] (${d}%)
`,r+=`> ${l.snippet}

`}let a=await this.plugin.embedding.getContextForQuery(t,2e3);if(a){r+=`---

## AI Answer

`;let l=await this.plugin.ollama.chat([{role:"system",content:"Answer the question based on the provided notes. Be concise and reference notes using [[Note Name]] format."},{role:"user",content:`${a}

Question: ${t}`}]);r+=l}return r}catch(n){return`\u274C Search failed: ${n.message}`}}clearConversation(){this.conversation=[],this.chatContainer.empty(),this.addSystemMessage("Conversation cleared. How can I help you?")}async exportConversation(){if(this.conversation.length===0){this.addSystemMessage("No conversation to export.");return}let t=new Date().toISOString().split("T")[0],s=`# Jarvis Conversation - ${t}

`;for(let r of this.conversation){let a=r.timestamp.toLocaleTimeString();s+=`## ${r.role==="user"?"You":"Jarvis"} (${a})

${r.content}

---

`}let n=`0-Inbox/jarvis-conversation-${t}.md`;await this.plugin.vault.createNote(n,s),this.addSystemMessage(`Conversation exported to: ${n}`)}async onClose(){}};var R=G(require("fs"),1),se=require("path");var Ve=G(q(),1),le="11434",ue=`http://127.0.0.1:${le}`,Ce="0.5.18",Ae=Object.defineProperty,Ee=(o,e,t)=>e in o?Ae(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,Y=(o,e,t)=>(Ee(o,typeof e!="symbol"?e+"":e,t),t),K=class o extends Error{constructor(e,t){super(e),this.error=e,this.status_code=t,this.name="ResponseError",Error.captureStackTrace&&Error.captureStackTrace(this,o)}},X=class{constructor(e,t,s){Y(this,"abortController"),Y(this,"itr"),Y(this,"doneCallback"),this.abortController=e,this.itr=t,this.doneCallback=s}abort(){this.abortController.abort()}async*[Symbol.asyncIterator](){for await(let e of this.itr){if("error"in e)throw new Error(e.error);if(yield e,e.done||e.status==="success"){this.doneCallback();return}}throw new Error("Did not receive done or success response in stream.")}},Z=async o=>{var s;if(o.ok)return;let e=`Error ${o.status}: ${o.statusText}`,t=null;if((s=o.headers.get("content-type"))!=null&&s.includes("application/json"))try{t=await o.json(),e=t.error||e}catch(n){console.log("Failed to parse error response as JSON")}else try{console.log("Getting text from response"),e=await o.text()||e}catch(n){console.log("Failed to get text from error response")}throw new K(e,o.status)};function $e(){var o;if(typeof window!="undefined"&&window.navigator){let e=navigator;return"userAgentData"in e&&((o=e.userAgentData)!=null&&o.platform)?`${e.userAgentData.platform.toLowerCase()} Browser/${navigator.userAgent};`:navigator.platform?`${navigator.platform.toLowerCase()} Browser/${navigator.userAgent};`:`unknown Browser/${navigator.userAgent};`}else if(typeof process!="undefined")return`${process.arch} ${process.platform} Node.js/${process.version}`;return""}function Re(o){if(o instanceof Headers){let e={};return o.forEach((t,s)=>{e[s]=t}),e}else return Array.isArray(o)?Object.fromEntries(o):o||{}}var ee=async(o,e,t={})=>{let s={"Content-Type":"application/json",Accept:"application/json","User-Agent":`ollama-js/${Ce} (${$e()})`};t.headers=Re(t.headers);let n=Object.fromEntries(Object.entries(t.headers).filter(([r])=>!Object.keys(s).some(a=>a.toLowerCase()===r.toLowerCase())));return t.headers={...s,...n},o(e,t)},ce=async(o,e,t)=>{let s=await ee(o,e,{headers:t==null?void 0:t.headers});return await Z(s),s},E=async(o,e,t,s)=>{let r=(l=>l!==null&&typeof l=="object"&&!Array.isArray(l))(t)?JSON.stringify(t):t,a=await ee(o,e,{method:"POST",body:r,signal:s==null?void 0:s.signal,headers:s==null?void 0:s.headers});return await Z(a),a},je=async(o,e,t,s)=>{let n=await ee(o,e,{method:"DELETE",body:JSON.stringify(t),headers:s==null?void 0:s.headers});return await Z(n),n},Oe=async function*(o){var n;let e=new TextDecoder("utf-8"),t="",s=o.getReader();for(;;){let{done:r,value:a}=await s.read();if(r)break;t+=e.decode(a);let l=t.split(`
`);t=(n=l.pop())!=null?n:"";for(let d of l)try{yield JSON.parse(d)}catch(u){console.warn("invalid json: ",d)}}for(let r of t.split(`
`).filter(a=>a!==""))try{yield JSON.parse(r)}catch(a){console.warn("invalid json: ",r)}},Be=o=>{if(!o)return ue;let e=o.includes("://");o.startsWith(":")&&(o=`http://127.0.0.1${o}`,e=!0),e||(o=`http://${o}`);let t=new URL(o),s=t.port;s||(e?s=t.protocol==="https:"?"443":"80":s=le);let n="";t.username&&(n=t.username,t.password&&(n+=`:${t.password}`),n+="@");let r=`${t.protocol}//${n}${t.hostname}:${s}${t.pathname}`;return r.endsWith("/")&&(r=r.slice(0,-1)),r},Fe=Object.defineProperty,Me=(o,e,t)=>e in o?Fe(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,Q=(o,e,t)=>(Me(o,typeof e!="symbol"?e+"":e,t),t),te=class{constructor(e){var t,s;Q(this,"config"),Q(this,"fetch"),Q(this,"ongoingStreamedRequests",[]),this.config={host:"",headers:e==null?void 0:e.headers},e!=null&&e.proxy||(this.config.host=Be((t=e==null?void 0:e.host)!=null?t:ue)),this.fetch=(s=e==null?void 0:e.fetch)!=null?s:fetch}abort(){for(let e of this.ongoingStreamedRequests)e.abort();this.ongoingStreamedRequests.length=0}async processStreamableRequest(e,t){var r;t.stream=(r=t.stream)!=null?r:!1;let s=`${this.config.host}/api/${e}`;if(t.stream){let a=new AbortController,l=await E(this.fetch,s,t,{signal:a.signal,headers:this.config.headers});if(!l.body)throw new Error("Missing body");let d=Oe(l.body),u=new X(a,d,()=>{let g=this.ongoingStreamedRequests.indexOf(u);g>-1&&this.ongoingStreamedRequests.splice(g,1)});return this.ongoingStreamedRequests.push(u),u}return await(await E(this.fetch,s,t,{headers:this.config.headers})).json()}async encodeImage(e){if(typeof e!="string"){let t=new Uint8Array(e),s="",n=t.byteLength;for(let r=0;r<n;r++)s+=String.fromCharCode(t[r]);return btoa(s)}return e}async generate(e){return e.images&&(e.images=await Promise.all(e.images.map(this.encodeImage.bind(this)))),this.processStreamableRequest("generate",e)}async chat(e){if(e.messages)for(let t of e.messages)t.images&&(t.images=await Promise.all(t.images.map(this.encodeImage.bind(this))));return this.processStreamableRequest("chat",e)}async create(e){return this.processStreamableRequest("create",{...e})}async pull(e){return this.processStreamableRequest("pull",{name:e.model,stream:e.stream,insecure:e.insecure})}async push(e){return this.processStreamableRequest("push",{name:e.model,stream:e.stream,insecure:e.insecure})}async delete(e){return await je(this.fetch,`${this.config.host}/api/delete`,{name:e.model},{headers:this.config.headers}),{status:"success"}}async copy(e){return await E(this.fetch,`${this.config.host}/api/copy`,{...e},{headers:this.config.headers}),{status:"success"}}async list(){return await(await ce(this.fetch,`${this.config.host}/api/tags`,{headers:this.config.headers})).json()}async show(e){return await(await E(this.fetch,`${this.config.host}/api/show`,{...e},{headers:this.config.headers})).json()}async embed(e){return await(await E(this.fetch,`${this.config.host}/api/embed`,{...e},{headers:this.config.headers})).json()}async embeddings(e){return await(await E(this.fetch,`${this.config.host}/api/embeddings`,{...e},{headers:this.config.headers})).json()}async ps(){return await(await ce(this.fetch,`${this.config.host}/api/ps`,{headers:this.config.headers})).json()}},He=new te;var Ge=G(q(),1),j=class extends te{async encodeImage(e){if(typeof e!="string")return Buffer.from(e).toString("base64");try{if(R.default.existsSync(e)){let t=await R.promises.readFile((0,se.resolve)(e));return Buffer.from(t).toString("base64")}}catch(t){}return e}async fileExists(e){try{return await R.promises.access(e),!0}catch(t){return!1}}async create(e){if(e.from&&await this.fileExists((0,se.resolve)(e.from)))throw Error("Creating with a local path is not currently supported from ollama-js");return e.stream?super.create(e):super.create(e)}},qe=new j;var O=class{constructor(e){this.settings=e,this.client=new j({host:e.ollamaEndpoint})}async checkConnection(){try{return await this.client.list(),!0}catch(e){return console.error("Ollama connection failed:",e),!1}}async listModels(){try{return(await this.client.list()).models.map(t=>t.name)}catch(e){return console.error("Failed to list models:",e),[]}}async chat(e,t){try{return t?await this.streamChat(e,t):(await this.client.chat({model:this.settings.textModel,messages:e.map(n=>({role:n.role,content:n.content})),options:{temperature:this.settings.temperature}})).message.content}catch(s){throw console.error("Chat failed:",s),s}}async streamChat(e,t){let s="",n=await this.client.chat({model:this.settings.textModel,messages:e.map(r=>({role:r.role,content:r.content})),stream:!0,options:{temperature:this.settings.temperature}});for await(let r of n){let a=r.message.content;s+=a,t(a)}return s}async analyzeImage(e,t,s){if(!this.settings.enableVision)throw new Error("Vision is disabled in settings");try{return s?await this.streamVision(e,t,s):(await this.client.chat({model:this.settings.visionModel,messages:[{role:"user",content:t,images:[e]}],options:{temperature:this.settings.temperature}})).message.content}catch(n){throw console.error("Vision analysis failed:",n),n}}async streamVision(e,t,s){let n="",r=await this.client.chat({model:this.settings.visionModel,messages:[{role:"user",content:t,images:[e]}],stream:!0,options:{temperature:this.settings.temperature}});for await(let a of r){let l=a.message.content;n+=l,s(l)}return n}async embed(e){try{return(await this.client.embed({model:this.settings.embeddingModel,input:e})).embeddings[0]}catch(t){throw console.error("Embedding failed:",t),t}}async embedBatch(e){try{return(await this.client.embed({model:this.settings.embeddingModel,input:e})).embeddings}catch(t){throw console.error("Batch embedding failed:",t),t}}async decomposePlan(e){if(!this.settings.enablePlanning)throw new Error("Planning is disabled in settings");return this.chat([{role:"system",content:`You are a planning assistant. Given a goal, break it down into actionable tasks.
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
`).map(r=>r.trim()).filter(r=>t.includes(r))}async generateTaskWarriorCommand(e){if(!this.settings.enableTaskWarrior)throw new Error("TaskWarrior integration is disabled in settings");return(await this.chat([{role:"system",content:`Convert natural language to TaskWarrior command. Output only the task add command, nothing else.
Examples:
"remind me to call mom tomorrow" -> task add "Call mom" due:tomorrow
"high priority fix the bug in auth by friday" -> task add "Fix the bug in auth" priority:H due:friday
"work on report for project alpha" -> task add "Work on report" project:alpha`},{role:"user",content:e}])).trim()}};var x=require("obsidian"),V=class{constructor(e){this.app=e}getAllNotes(){return this.app.vault.getMarkdownFiles()}getNoteNames(){return this.getAllNotes().map(e=>e.basename)}getNotesInFolder(e){let t=this.app.vault.getAbstractFileByPath(e);if(!t||!(t instanceof x.TFolder))return[];let s=[];return this.collectNotesRecursive(t,s),s}collectNotesRecursive(e,t){for(let s of e.children)s instanceof x.TFile&&s.extension==="md"?t.push(s):s instanceof x.TFolder&&this.collectNotesRecursive(s,t)}async readNote(e){return this.app.vault.read(e)}async readNoteByPath(e){let t=this.app.vault.getAbstractFileByPath(e);return t instanceof x.TFile?this.app.vault.read(t):null}getActiveNote(){return this.app.workspace.getActiveFile()}async getActiveNoteContent(){let e=this.getActiveNote();return e?this.readNote(e):null}async createNote(e,t){let s=e.substring(0,e.lastIndexOf("/"));s&&await this.ensureFolderExists(s);let n=await this.app.vault.create(e,t);return new x.Notice(`Created note: ${n.basename}`),n}async updateNote(e,t){await this.app.vault.modify(e,t)}async appendToNote(e,t){let s=await this.readNote(e);await this.updateNote(e,s+`
`+t)}async ensureFolderExists(e){this.app.vault.getAbstractFileByPath(e)||await this.app.vault.createFolder(e)}async getNoteMetadata(e){var r;let t=this.app.metadataCache.getFileCache(e),s=(t==null?void 0:t.frontmatter)||{},n=((r=t==null?void 0:t.tags)==null?void 0:r.map(a=>a.tag))||[];return s.tags&&(Array.isArray(s.tags)?n.push(...s.tags.map(a=>`#${a}`)):typeof s.tags=="string"&&n.push(`#${s.tags}`)),{path:e.path,name:e.name,basename:e.basename,extension:e.extension,created:e.stat.ctime,modified:e.stat.mtime,size:e.stat.size,tags:[...new Set(n)],frontmatter:s}}async searchNotes(e){let t=[],s=this.getAllNotes(),n=e.toLowerCase();for(let r of s){let a=await this.readNote(r),l=a.toLowerCase();if(l.includes(n)){let u=a.split(`
`).filter(S=>S.toLowerCase().includes(n)).slice(0,3),y=(l.match(new RegExp(n,"g"))||[]).length/a.length*1e3;t.push({file:r,matches:u,score:y})}}return t.sort((r,a)=>a.score-r.score)}getRecentNotes(e=10){return this.getAllNotes().sort((t,s)=>s.stat.mtime-t.stat.mtime).slice(0,e)}getNotesByTag(e){var n;let t=e.startsWith("#")?e:`#${e}`,s=[];for(let r of this.getAllNotes()){let a=this.app.metadataCache.getFileCache(r),l=((n=a==null?void 0:a.tags)==null?void 0:n.map(u=>u.tag))||[],d=a==null?void 0:a.frontmatter;d!=null&&d.tags&&(Array.isArray(d.tags)?l.push(...d.tags.map(u=>`#${u}`)):typeof d.tags=="string"&&l.push(`#${d.tags}`)),l.includes(t)&&s.push(r)}return s}getBacklinks(e){let t=[],s=this.app.metadataCache.resolvedLinks;for(let[n,r]of Object.entries(s))if(r[e.path]){let a=this.app.vault.getAbstractFileByPath(n);a instanceof x.TFile&&t.push(a)}return t}getOutgoingLinks(e){let t=[],s=this.app.metadataCache.resolvedLinks[e.path];if(s)for(let n of Object.keys(s)){let r=this.app.vault.getAbstractFileByPath(n);r instanceof x.TFile&&t.push(r)}return t}async createDailyNote(){let e=new Date,t=e.toISOString().split("T")[0],s=`0-Inbox/${t}.md`,n=this.app.vault.getAbstractFileByPath(s);if(n instanceof x.TFile)return n;let r=`# ${t}

## Tasks
- [ ]

## Notes


## Journal


---
Created by Jarvis at ${e.toLocaleTimeString()}
`;return this.createNote(s,r)}async quickCapture(e,t=[]){let n=`0-Inbox/capture-${new Date().toISOString().replace(/[:.]/g,"-")}.md`,r=t.length>0?`
tags: [${t.join(", ")}]`:"",a=`---
created: ${new Date().toISOString()}${r}
---

${e}
`;return this.createNote(n,a)}getAllTags(){var t;let e=new Set;for(let s of this.getAllNotes()){let n=this.app.metadataCache.getFileCache(s);(t=n==null?void 0:n.tags)==null||t.forEach(a=>e.add(a.tag));let r=n==null?void 0:n.frontmatter;r!=null&&r.tags&&(Array.isArray(r.tags)?r.tags.forEach(a=>e.add(`#${a}`)):typeof r.tags=="string"&&e.add(`#${r.tags}`))}return[...e].sort()}getVaultStats(){let e=this.getAllNotes(),t=this.getAllTags(),s=0,n=this.app.metadataCache.resolvedLinks;for(let r of Object.values(n))s+=Object.keys(r).length;return{totalNotes:e.length,totalTags:t.length,totalLinks:s}}async readFile(e){let t=this.app.vault.getAbstractFileByPath(e);return t instanceof x.TFile?this.app.vault.read(t):null}async writeFile(e,t){let s=this.app.vault.getAbstractFileByPath(e);if(s instanceof x.TFile)await this.app.vault.modify(s,t);else{let n=e.substring(0,e.lastIndexOf("/"));n&&await this.ensureFolderExists(n),await this.app.vault.create(e,t)}}getAllMarkdownFiles(){return this.getAllNotes().map(e=>e.path)}};var Ie={chunkSize:500,chunkOverlap:50,minChunkSize:100},B=class{constructor(e,t,s){this.index=new Map;this.isIndexing=!1;this.ollama=e,this.vault=t,this.app=s,this.indexPath=".jarvis/embeddings.json"}async initialize(){await this.loadIndex()}async loadIndex(){try{let e=await this.vault.readFile(this.indexPath);if(e){let t=JSON.parse(e);this.index=new Map(Object.entries(t)),console.log(`Loaded ${this.index.size} embeddings from index`)}}catch(e){console.log("No existing embedding index found, starting fresh"),this.index=new Map}}async saveIndex(){let e=Object.fromEntries(this.index);await this.vault.writeFile(this.indexPath,JSON.stringify(e,null,2))}async indexNote(e,t=!1){try{let s=await this.vault.readFile(e);if(!s||s.trim().length===0)return!1;let n=this.app.vault.getAbstractFileByPath(e);if(!n||!("stat"in n))return!1;let r=this.index.get(e),a=n.stat.mtime;if(!t&&r&&r.timestamp>=a)return!1;let l=this.extractMetadata(e,s),d=this.chunkContent(s),u=this.prepareEmbeddingText(l.title,s,l.tags),g=await this.ollama.embed(u),y={id:this.generateId(e),path:e,content:s.substring(0,5e3),embedding:g,metadata:l,timestamp:a};return this.index.set(e,y),!0}catch(s){return console.error(`Failed to index ${e}:`,s),!1}}async indexVault(e){if(this.isIndexing)throw new Error("Indexing already in progress");this.isIndexing=!0;let t=0;try{let s=await this.vault.getAllMarkdownFiles(),n=s.length;for(let r=0;r<s.length;r++){let a=s[r];if(e&&e(r+1,n),a.includes("/templates/")||a.startsWith("templates/"))continue;await this.indexNote(a)&&t++,t%10===0&&(await this.saveIndex(),await this.sleep(100))}return await this.saveIndex(),t}finally{this.isIndexing=!1}}async search(e,t=5,s=.3){if(this.index.size===0)return[];let n=await this.ollama.embed(e),r=[];for(let a of this.index.values()){let l=this.cosineSimilarity(n,a.embedding);l>=s&&r.push({document:a,score:l,snippet:this.extractSnippet(a.content,e)})}return r.sort((a,l)=>l.score-a.score),r.slice(0,t)}async findSimilar(e,t=5,s=.5){let n=this.index.get(e);if(!n)return[];let r=[];for(let a of this.index.values()){if(a.path===e)continue;let l=this.cosineSimilarity(n.embedding,a.embedding);l>=s&&r.push({document:a,score:l,snippet:this.extractSnippet(a.content,n.metadata.title)})}return r.sort((a,l)=>l.score-a.score),r.slice(0,t)}async getContextForQuery(e,t=2e3){let s=await this.search(e,3,.3);if(s.length===0)return"";let n=`**Relevant notes from your vault:**

`,r=0,a=4;for(let l of s){let d=`### [[${l.document.metadata.title}]]
${l.snippet}

`,u=d.length/a;if(r+u>t)break;n+=d,r+=u}return n}removeFromIndex(e){return this.index.delete(e)}clearIndex(){this.index.clear()}getIndexStats(){if(this.index.size===0)return{totalDocuments:0,averageEmbeddingSize:0,oldestTimestamp:0};let e=0,t=Date.now();for(let s of this.index.values())e+=s.embedding.length,s.timestamp<t&&(t=s.timestamp);return{totalDocuments:this.index.size,averageEmbeddingSize:e/this.index.size,oldestTimestamp:t}}extractMetadata(e,t){var S;let s=((S=e.split("/").pop())==null?void 0:S.replace(".md",""))||e,n=/#([a-zA-Z0-9_-]+)/g,r=[],a;for(;(a=n.exec(t))!==null;)r.push(a[1]);let l=/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g,d=[];for(;(a=l.exec(t))!==null;)d.push(a[1]);let u=t.split(/\s+/).length,g,y=t.match(/^---\n([\s\S]*?)\n---/);if(y)try{g=this.parseYamlFrontmatter(y[1])}catch(T){}return{title:s,tags:r,links:d,wordCount:u,frontmatter:g}}parseYamlFrontmatter(e){let t={},s=e.split(`
`);for(let n of s){let r=n.indexOf(":");if(r>0){let a=n.substring(0,r).trim(),l=n.substring(r+1).trim();t[a]=l}}return t}prepareEmbeddingText(e,t,s){let n=t.replace(/^---\n[\s\S]*?\n---\n?/,"").replace(/```[\s\S]*?```/g,"").replace(/!\[\[.*?\]\]/g,"").replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,"$2 $1").trim();n.length>3e3&&(n=n.substring(0,3e3));let r=s.length>0?`Tags: ${s.join(", ")}`:"";return`Title: ${e}
${r}

${n}`}chunkContent(e,t=Ie){let{chunkSize:s,chunkOverlap:n,minChunkSize:r}=t,a=[],l=e.split(/\n\n+/),d="";for(let u of l)if(d.length+u.length<=s)d+=(d?`

`:"")+u;else{d.length>=r&&a.push(d);let g=d.slice(-n);d=g+(g?`

`:"")+u}return d.length>=r&&a.push(d),a}extractSnippet(e,t,s=300){let n=e.toLowerCase(),r=t.toLowerCase().split(/\s+/),a=0;for(let g of r){let y=n.indexOf(g);if(y!==-1){a=y;break}}let l=Math.max(0,a-s/2),d=Math.min(e.length,l+s),u=e.substring(l,d);return l>0&&(u="..."+u),d<e.length&&(u=u+"..."),u.trim()}cosineSimilarity(e,t){if(e.length!==t.length)return 0;let s=0,n=0,r=0;for(let a=0;a<e.length;a++)s+=e[a]*t[a],n+=e[a]*e[a],r+=t[a]*t[a];return n===0||r===0?0:s/(Math.sqrt(n)*Math.sqrt(r))}generateId(e){let t=0;for(let s=0;s<e.length;s++){let n=e.charCodeAt(s);t=(t<<5)-t+n,t=t&t}return Math.abs(t).toString(36)}sleep(e){return new Promise(t=>setTimeout(t,e))}};var de=require("obsidian"),F=class{constructor(e){this.cache=new Map;this.cacheExpiry=1e3*60*30;this.ollama=e}async fetchPage(e){let t=this.cache.get(e);if(t&&Date.now()-t.timestamp<this.cacheExpiry)return t;try{let n=(await(0,de.requestUrl)({url:e,method:"GET",headers:{"User-Agent":"Mozilla/5.0 (compatible; ObsidianJarvis/1.0)",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"}})).text,r=this.parseHtml(n,e);return this.cache.set(e,r),r}catch(s){throw new Error(`Failed to fetch page: ${s.message}`)}}parseHtml(e,t){let s=e.match(/<title[^>]*>([^<]*)<\/title>/i),n=s?this.decodeHtmlEntities(s[1].trim()):"Untitled",r=e.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i),a=r?this.decodeHtmlEntities(r[1]):void 0,l=e.replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi,"").replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi,"").replace(/<header[^>]*>[\s\S]*?<\/header>/gi,"").replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi,"").replace(/<!--[\s\S]*?-->/g,""),d=l,u=l.match(/<article[^>]*>([\s\S]*?)<\/article>/i),g=l.match(/<main[^>]*>([\s\S]*?)<\/main>/i);u?d=u[1]:g&&(d=g[1]);let y=this.htmlToText(d),S=/<a[^>]*href=["']([^"'#][^"']*)["'][^>]*>/gi,T=[],I;for(;(I=S.exec(e))!==null&&T.length<20;){let C=I[1];if(C.startsWith("http"))T.push(C);else if(C.startsWith("/")){let D=new URL(t);T.push(`${D.origin}${C}`)}}return{url:t,title:n,content:y.substring(0,1e4),description:a,links:[...new Set(T)],timestamp:Date.now()}}htmlToText(e){return e.replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi,`

$1

`).replace(/<p[^>]*>([\s\S]*?)<\/p>/gi,`
$1
`).replace(/<li[^>]*>([\s\S]*?)<\/li>/gi,`
\u2022 $1`).replace(/<br\s*\/?>/gi,`
`).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\n{3,}/g,`

`).replace(/[ \t]+/g," ").trim()}decodeHtmlEntities(e){return e.replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#(\d+);/g,(t,s)=>String.fromCharCode(parseInt(s)))}async askAboutPage(e,t){let s=await this.fetchPage(e),n=`You are a helpful assistant analyzing a web page.
Answer questions based ONLY on the provided page content.
If the information isn't available in the content, say so.
Be concise and accurate.`,r=`Page Title: ${s.title}
${s.description?`Description: ${s.description}`:""}

Page Content:
${s.content}

Question: ${t}`;return this.ollama.chat([{role:"system",content:n},{role:"user",content:r}])}async summarizePage(e,t="bullets"){let s=await this.fetchPage(e),r=`You are a helpful assistant that summarizes web pages.
${{brief:"Provide a 2-3 sentence summary.",detailed:"Provide a comprehensive summary with all key points and context.",bullets:"Summarize in 5-7 bullet points covering the main ideas."}[t]}
Focus on the most important information.`,a=`Page Title: ${s.title}

Content:
${s.content}

Provide a summary:`;return this.ollama.chat([{role:"system",content:r},{role:"user",content:a}])}async analyzePage(e){let t=await this.fetchPage(e),n=await this.ollama.chat([{role:"system",content:`Analyze the following web page and respond in JSON format:
{
  "summary": "2-3 sentence summary",
  "keyPoints": ["point 1", "point 2", ...],
  "topics": ["topic1", "topic2", ...],
  "sentiment": "positive" | "negative" | "neutral"
}`},{role:"user",content:`Title: ${t.title}

Content:
${t.content}`}]);try{let r=n.match(/\{[\s\S]*\}/);if(r)return JSON.parse(r[0])}catch(r){}return{summary:n,keyPoints:[],topics:[]}}async extractKeyInfo(e,t){let s=await this.fetchPage(e),n={dates:"Extract all dates and time references",names:"Extract all people and organization names",numbers:"Extract all important numbers and statistics",links:"List the most relevant linked resources",quotes:"Extract notable quotes or statements"};return(await this.ollama.chat([{role:"system",content:`${n[t]}. Output each item on a new line, nothing else.`},{role:"user",content:s.content}])).split(`
`).map(a=>a.replace(/^[-•*]\s*/,"").trim()).filter(a=>a.length>0)}async createNoteFromPage(e){let t=await this.fetchPage(e),s=await this.analyzePage(e),n=new Date().toISOString().split("T")[0];return`---
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

${s.keyPoints.map(r=>`- ${r}`).join(`
`)}

## Original Content

${t.content.substring(0,5e3)}${t.content.length>5e3?`

...(truncated)`:""}

---
*Clipped by Jarvis AI*
`}clearCache(){this.cache.clear()}};var U=require("obsidian"),M=class{constructor(e,t="http://localhost:8888"){this.ollama=e,this.searxngUrl=t}async search(e,t=5){try{return await this.searchSearxng(e,t)}catch(s){console.log("SearXNG not available, trying DuckDuckGo...")}try{return await this.searchDuckDuckGo(e,t)}catch(s){console.log("DuckDuckGo failed, trying Google...")}return await this.searchGoogle(e,t)}async searchSearxng(e,t){let s=`${this.searxngUrl}/search?q=${encodeURIComponent(e)}&format=json&categories=general`,n=await(0,U.requestUrl)({url:s,method:"GET",headers:{Accept:"application/json"}});return(JSON.parse(n.text).results||[]).slice(0,t).map(a=>({title:a.title,url:a.url,snippet:a.content}))}async searchDuckDuckGo(e,t){let s=`https://api.duckduckgo.com/?q=${encodeURIComponent(e)}&format=json&no_redirect=1`,n=await(0,U.requestUrl)({url:s,method:"GET",headers:{Accept:"application/json"}}),r=JSON.parse(n.text),a=[];if(r.Abstract&&a.push({title:r.Heading||e,url:r.AbstractURL||"",snippet:r.Abstract}),r.RelatedTopics)for(let l of r.RelatedTopics.slice(0,t-1))l.Text&&l.FirstURL&&a.push({title:l.Text.substring(0,60)+"...",url:l.FirstURL,snippet:l.Text});return a.slice(0,t)}async searchGoogle(e,t){return console.warn("Google search requires API key configuration"),[]}async research(e,t="quick"){let s=t==="thorough"?8:4,n=await this.search(e,s);if(n.length===0)return this.researchWithAI(e);let r=[];for(let y of n.slice(0,3))try{let S=await this.fetchPageContent(y.url);r.push(`Source: ${y.title}
URL: ${y.url}

${S}`)}catch(S){r.push(`Source: ${y.title}
${y.snippet}`)}let a=`You are a research assistant. Synthesize information from the provided sources to answer the query.

Guidelines:
- Provide a comprehensive but concise summary
- Extract key findings as bullet points
- Cite sources when making claims
- Suggest related topics for further research
- Be objective and note any conflicting information

Output format:
## Summary
[2-3 paragraph synthesis]

## Key Findings
- Finding 1
- Finding 2
...

## Related Topics
- Topic 1
- Topic 2`,l=`Query: ${e}

Sources:
${r.join(`

---

`)}

Synthesize this information:`,d=await this.ollama.chat([{role:"system",content:a},{role:"user",content:l}]),u=this.extractBulletPoints(d,"Key Findings"),g=this.extractBulletPoints(d,"Related Topics");return{query:e,summary:d,sources:n,keyFindings:u,relatedQueries:g}}async researchWithAI(e){let s=await this.ollama.chat([{role:"system",content:`You are a knowledgeable research assistant. The user is asking about a topic but web search is unavailable.
Provide the best answer you can based on your training data.
Be honest about the limitations and suggest how they could verify the information.`},{role:"user",content:e}]);return{query:e,summary:s+`

*Note: This answer is based on AI knowledge and was not verified with live web search.*`,sources:[],keyFindings:[],relatedQueries:[]}}async fetchPageContent(e){let t=await(0,U.requestUrl)({url:e,method:"GET",headers:{"User-Agent":"Mozilla/5.0 (compatible; ObsidianResearch/1.0)",Accept:"text/html"}});return this.htmlToText(t.text).substring(0,3e3)}htmlToText(e){return e.replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi,"").replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim()}extractBulletPoints(e,t){let s=new RegExp(`##\\s*${t}[\\s\\S]*?(?=##|$)`,"i"),n=e.match(s);return n?n[0].split(`
`).filter(r=>r.trim().startsWith("-")).map(r=>r.replace(/^-\s*/,"").trim()).filter(r=>r.length>0):[]}async quickAnswer(e){return(await this.research(e,"quick")).summary}async factCheck(e){let t=`You are a fact-checker. Analyze the claim and search results.
Rate the claim as: TRUE, FALSE, PARTIALLY TRUE, or UNVERIFIED.
Explain your reasoning and cite sources.`,s=await this.search(e,5);if(s.length===0)return`**Claim:** ${e}

**Verdict:** UNVERIFIED

Unable to verify this claim with live web search. Please check reliable sources manually.`;let n=s.map(a=>`- ${a.title}: ${a.snippet}`).join(`
`);return await this.ollama.chat([{role:"system",content:t},{role:"user",content:`Claim: ${e}

Search Results:
${n}`}])}};var De={ollamaEndpoint:"http://localhost:11434",textModel:"granite3.1-dense:2b",visionModel:"granite3.2-vision:2b",embeddingModel:"granite-embedding:278m",enablePlanning:!0,enableVision:!0,enableTaskWarrior:!0,showStatusBar:!0,temperature:.7},H=class extends p.Plugin{async onload(){await this.loadSettings(),this.ollama=new O(this.settings),this.vault=new V(this.app),this.embedding=new B(this.ollama,this.vault,this.app),this.pageAssist=new F(this.ollama),this.webResearch=new M(this.ollama),this.embedding.initialize().catch(e=>{console.error("Failed to initialize embedding index:",e)}),this.registerView($,e=>new z(e,this)),this.addRibbonIcon("bot","Jarvis AI Assistant",()=>{this.activateView()}),this.addCommand({id:"open-jarvis",name:"Open Jarvis",hotkeys:[{modifiers:["Ctrl","Shift"],key:"j"}],callback:()=>this.activateView()}),this.addCommand({id:"jarvis-ask",name:"Quick Ask",hotkeys:[{modifiers:["Ctrl","Shift"],key:"a"}],callback:()=>this.quickAsk()}),this.addCommand({id:"jarvis-summarize",name:"Summarize Current Note",callback:()=>this.summarizeCurrentNote()}),this.addCommand({id:"jarvis-plan",name:"Create Plan",hotkeys:[{modifiers:["Ctrl","Shift"],key:"p"}],callback:()=>this.createPlan()}),this.addCommand({id:"jarvis-task",name:"Create Task",hotkeys:[{modifiers:["Ctrl","Shift"],key:"t"}],callback:()=>this.createTask()}),this.addCommand({id:"jarvis-rag-search",name:"RAG Search",hotkeys:[{modifiers:["Ctrl","Shift"],key:"s"}],callback:()=>this.ragSearch()}),this.addCommand({id:"jarvis-index-vault",name:"Index Vault for RAG",callback:()=>this.indexVault()}),this.addCommand({id:"jarvis-clip-page",name:"Clip Web Page to Note",callback:()=>this.clipPageToNote()}),this.addSettingTab(new re(this.app,this)),this.settings.showStatusBar&&(this.statusBarItem=this.addStatusBarItem(),this.updateStatusBar("Ready")),this.checkOllamaConnection(),console.log("Jarvis AI Assistant loaded")}onunload(){console.log("Jarvis AI Assistant unloaded")}async loadSettings(){this.settings=Object.assign({},De,await this.loadData())}async saveSettings(){await this.saveData(this.settings),this.ollama=new O(this.settings),this.embedding=new B(this.ollama,this.vault,this.app),this.pageAssist=new F(this.ollama),this.webResearch=new M(this.ollama)}async activateView(){let{workspace:e}=this.app,t=null,s=e.getLeavesOfType($);s.length>0?t=s[0]:(t=e.getRightLeaf(!1),await(t==null?void 0:t.setViewState({type:$,active:!0}))),t&&e.revealLeaf(t)}async checkOllamaConnection(){await this.ollama.checkConnection()?(this.updateStatusBar("Connected"),new p.Notice("Jarvis: Connected to Ollama")):(this.updateStatusBar("Disconnected"),new p.Notice("Jarvis: Cannot connect to Ollama. Please ensure Ollama is running."))}updateStatusBar(e){this.statusBarItem&&this.statusBarItem.setText(`Jarvis: ${e}`)}async quickAsk(){let e=this.app.workspace.getActiveViewOfType(p.MarkdownView);if(!e){new p.Notice("No active markdown view");return}let s=e.editor.getSelection()||e.editor.getValue().substring(0,1e3);await this.activateView()}async summarizeCurrentNote(){let e=this.app.workspace.getActiveViewOfType(p.MarkdownView);if(!e){new p.Notice("No active markdown view");return}let t=e.editor.getValue();this.updateStatusBar("Summarizing...");try{let s=await this.ollama.chat([{role:"system",content:"You are a helpful assistant. Summarize the following note in 3-5 bullet points."},{role:"user",content:t}]);new p.Notice("Summary generated! Check Jarvis panel."),await this.activateView()}catch(s){new p.Notice("Failed to generate summary"),console.error(s)}finally{this.updateStatusBar("Ready")}}async createPlan(){await this.activateView(),new p.Notice("Enter your goal in the Jarvis panel to create a plan")}async createTask(){await this.activateView(),new p.Notice("Enter your task in the Jarvis panel")}async ragSearch(){let e=this.app.workspace.getActiveViewOfType(p.MarkdownView);if(e){let t=e.editor.getSelection()}await this.activateView(),new p.Notice("Use RAG Search mode to search your vault semantically")}async indexVault(){this.updateStatusBar("Indexing..."),new p.Notice("Starting vault indexing... This may take a while.");try{let e=await this.embedding.indexVault((t,s)=>{this.updateStatusBar(`Indexing ${t}/${s}`)});new p.Notice(`Indexed ${e} notes successfully!`),this.updateStatusBar("Ready")}catch(e){new p.Notice(`Indexing failed: ${e.message}`),this.updateStatusBar("Index failed"),console.error("Indexing error:",e)}}async clipPageToNote(){let e=await this.promptForUrl();if(e){this.updateStatusBar("Clipping..."),new p.Notice("Clipping page...");try{let t=await this.pageAssist.createNoteFromPage(e),n=`0-Inbox/web-clip-${new Date().toISOString().replace(/[:.]/g,"-")}.md`;await this.vault.writeFile(n,t),new p.Notice(`Page clipped to ${n}`),this.updateStatusBar("Ready");let r=this.app.vault.getAbstractFileByPath(n);r&&r instanceof p.TFile&&await this.app.workspace.getLeaf(!1).openFile(r)}catch(t){new p.Notice(`Failed to clip page: ${t.message}`),this.updateStatusBar("Clip failed"),console.error("Clip error:",t)}}}async promptForUrl(){return new Promise(e=>{new ne(this.app,s=>{e(s)}).open()})}},ne=class extends p.Modal{constructor(e,t){super(e),this.onSubmit=t}onOpen(){let{contentEl:e}=this;e.createEl("h2",{text:"Enter URL to clip"});let s=e.createDiv({cls:"jarvis-url-input-container"}).createEl("input",{type:"text",placeholder:"https://example.com/article",cls:"jarvis-url-input"});s.style.width="100%",s.style.padding="8px",s.style.marginBottom="16px";let n=e.createDiv({cls:"jarvis-url-buttons"});n.style.display="flex",n.style.gap="8px",n.style.justifyContent="flex-end",n.createEl("button",{text:"Cancel"}).addEventListener("click",()=>{this.close(),this.onSubmit(null)}),n.createEl("button",{text:"Clip",cls:"mod-cta"}).addEventListener("click",()=>{let l=s.value.trim();l&&(this.close(),this.onSubmit(l))}),s.addEventListener("keydown",l=>{if(l.key==="Enter"){let d=s.value.trim();d&&(this.close(),this.onSubmit(d))}}),s.focus()}onClose(){let{contentEl:e}=this;e.empty()}},re=class extends p.PluginSettingTab{constructor(e,t){super(e,t),this.plugin=t}display(){let{containerEl:e}=this;e.empty(),e.createEl("h2",{text:"Jarvis AI Assistant Settings"}),e.createEl("h3",{text:"Ollama Configuration"}),new p.Setting(e).setName("Ollama Endpoint").setDesc("The URL of your Ollama server").addText(t=>t.setPlaceholder("http://localhost:11434").setValue(this.plugin.settings.ollamaEndpoint).onChange(async s=>{this.plugin.settings.ollamaEndpoint=s,await this.plugin.saveSettings()})),new p.Setting(e).setName("Text Model").setDesc("The model to use for text generation").addText(t=>t.setPlaceholder("granite3.1-dense:2b").setValue(this.plugin.settings.textModel).onChange(async s=>{this.plugin.settings.textModel=s,await this.plugin.saveSettings()})),new p.Setting(e).setName("Vision Model").setDesc("The model to use for image analysis").addText(t=>t.setPlaceholder("granite3.2-vision:2b").setValue(this.plugin.settings.visionModel).onChange(async s=>{this.plugin.settings.visionModel=s,await this.plugin.saveSettings()})),new p.Setting(e).setName("Temperature").setDesc("Controls randomness (0.0 = deterministic, 1.0 = creative)").addSlider(t=>t.setLimits(0,1,.1).setValue(this.plugin.settings.temperature).setDynamicTooltip().onChange(async s=>{this.plugin.settings.temperature=s,await this.plugin.saveSettings()})),e.createEl("h3",{text:"Features"}),new p.Setting(e).setName("Enable Planning Agent").setDesc("Allow Jarvis to create and manage task plans").addToggle(t=>t.setValue(this.plugin.settings.enablePlanning).onChange(async s=>{this.plugin.settings.enablePlanning=s,await this.plugin.saveSettings()})),new p.Setting(e).setName("Enable Vision").setDesc("Allow Jarvis to analyze images and screenshots").addToggle(t=>t.setValue(this.plugin.settings.enableVision).onChange(async s=>{this.plugin.settings.enableVision=s,await this.plugin.saveSettings()})),new p.Setting(e).setName("Enable TaskWarrior Integration").setDesc("Allow Jarvis to create and manage TaskWarrior tasks").addToggle(t=>t.setValue(this.plugin.settings.enableTaskWarrior).onChange(async s=>{this.plugin.settings.enableTaskWarrior=s,await this.plugin.saveSettings()})),e.createEl("h3",{text:"UI"}),new p.Setting(e).setName("Show Status Bar").setDesc("Show Jarvis status in the status bar").addToggle(t=>t.setValue(this.plugin.settings.showStatusBar).onChange(async s=>{this.plugin.settings.showStatusBar=s,await this.plugin.saveSettings()})),e.createEl("h3",{text:"Connection"}),new p.Setting(e).setName("Test Connection").setDesc("Test the connection to Ollama").addButton(t=>t.setButtonText("Test").onClick(async()=>{t.setButtonText("Testing..."),await this.plugin.checkOllamaConnection(),t.setButtonText("Test")}))}};
