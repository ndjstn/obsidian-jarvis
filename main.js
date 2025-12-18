/*
Obsidian Jarvis AI Assistant
A comprehensive AI assistant with planning, vision, and task management
*/

var Se=Object.create;var U=Object.defineProperty;var Pe=Object.getOwnPropertyDescriptor;var Te=Object.getOwnPropertyNames;var Ee=Object.getPrototypeOf,Ae=Object.prototype.hasOwnProperty;var $e=(l,e)=>()=>(e||l((e={exports:{}}).exports,e),e.exports),Re=(l,e)=>{for(var t in e)U(l,t,{get:e[t],enumerable:!0})},pe=(l,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Te(e))!Ae.call(l,n)&&n!==t&&U(l,n,{get:()=>e[n],enumerable:!(s=Pe(e,n))||s.enumerable});return l};var X=(l,e,t)=>(t=l!=null?Se(Ee(l)):{},pe(e||!l||!l.__esModule?U(t,"default",{value:l,enumerable:!0}):t,l)),je=l=>pe(U({},"__esModule",{value:!0}),l);var Z=$e((V,ge)=>{(function(l,e){typeof V=="object"&&typeof ge!="undefined"?e(V):typeof define=="function"&&define.amd?define(["exports"],e):e(l.WHATWGFetch={})})(V,function(l){"use strict";var e=typeof globalThis!="undefined"&&globalThis||typeof self!="undefined"&&self||typeof global!="undefined"&&global||{},t={searchParams:"URLSearchParams"in e,iterable:"Symbol"in e&&"iterator"in Symbol,blob:"FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(o){return!1}}(),formData:"FormData"in e,arrayBuffer:"ArrayBuffer"in e};function s(o){return o&&DataView.prototype.isPrototypeOf(o)}if(t.arrayBuffer)var n=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],r=ArrayBuffer.isView||function(o){return o&&n.indexOf(Object.prototype.toString.call(o))>-1};function a(o){if(typeof o!="string"&&(o=String(o)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(o)||o==="")throw new TypeError('Invalid character in header field name: "'+o+'"');return o.toLowerCase()}function i(o){return typeof o!="string"&&(o=String(o)),o}function c(o){var d={next:function(){var p=o.shift();return{done:p===void 0,value:p}}};return t.iterable&&(d[Symbol.iterator]=function(){return d}),d}function h(o){this.map={},o instanceof h?o.forEach(function(d,p){this.append(p,d)},this):Array.isArray(o)?o.forEach(function(d){if(d.length!=2)throw new TypeError("Headers constructor: expected name/value pair to be length 2, found"+d.length);this.append(d[0],d[1])},this):o&&Object.getOwnPropertyNames(o).forEach(function(d){this.append(d,o[d])},this)}h.prototype.append=function(o,d){o=a(o),d=i(d);var p=this.map[o];this.map[o]=p?p+", "+d:d},h.prototype.delete=function(o){delete this.map[a(o)]},h.prototype.get=function(o){return o=a(o),this.has(o)?this.map[o]:null},h.prototype.has=function(o){return this.map.hasOwnProperty(a(o))},h.prototype.set=function(o,d){this.map[a(o)]=i(d)},h.prototype.forEach=function(o,d){for(var p in this.map)this.map.hasOwnProperty(p)&&o.call(d,this.map[p],p,this)},h.prototype.keys=function(){var o=[];return this.forEach(function(d,p){o.push(p)}),c(o)},h.prototype.values=function(){var o=[];return this.forEach(function(d){o.push(d)}),c(o)},h.prototype.entries=function(){var o=[];return this.forEach(function(d,p){o.push([p,d])}),c(o)},t.iterable&&(h.prototype[Symbol.iterator]=h.prototype.entries);function u(o){if(!o._noBody){if(o.bodyUsed)return Promise.reject(new TypeError("Already read"));o.bodyUsed=!0}}function m(o){return new Promise(function(d,p){o.onload=function(){d(o.result)},o.onerror=function(){p(o.error)}})}function b(o){var d=new FileReader,p=m(d);return d.readAsArrayBuffer(o),p}function C(o){var d=new FileReader,p=m(d),y=/charset=([A-Za-z0-9_-]+)/.exec(o.type),v=y?y[1]:"utf-8";return d.readAsText(o,v),p}function P(o){for(var d=new Uint8Array(o),p=new Array(d.length),y=0;y<d.length;y++)p[y]=String.fromCharCode(d[y]);return p.join("")}function A(o){if(o.slice)return o.slice(0);var d=new Uint8Array(o.byteLength);return d.set(new Uint8Array(o)),d.buffer}function G(){return this.bodyUsed=!1,this._initBody=function(o){this.bodyUsed=this.bodyUsed,this._bodyInit=o,o?typeof o=="string"?this._bodyText=o:t.blob&&Blob.prototype.isPrototypeOf(o)?this._bodyBlob=o:t.formData&&FormData.prototype.isPrototypeOf(o)?this._bodyFormData=o:t.searchParams&&URLSearchParams.prototype.isPrototypeOf(o)?this._bodyText=o.toString():t.arrayBuffer&&t.blob&&s(o)?(this._bodyArrayBuffer=A(o.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):t.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(o)||r(o))?this._bodyArrayBuffer=A(o):this._bodyText=o=Object.prototype.toString.call(o):(this._noBody=!0,this._bodyText=""),this.headers.get("content-type")||(typeof o=="string"?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):t.searchParams&&URLSearchParams.prototype.isPrototypeOf(o)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},t.blob&&(this.blob=function(){var o=u(this);if(o)return o;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))}),this.arrayBuffer=function(){if(this._bodyArrayBuffer){var o=u(this);return o||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer))}else{if(t.blob)return this.blob().then(b);throw new Error("could not read as ArrayBuffer")}},this.text=function(){var o=u(this);if(o)return o;if(this._bodyBlob)return C(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(P(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},t.formData&&(this.formData=function(){return this.text().then(xe)}),this.json=function(){return this.text().then(JSON.parse)},this}var be=["CONNECT","DELETE","GET","HEAD","OPTIONS","PATCH","POST","PUT","TRACE"];function we(o){var d=o.toUpperCase();return be.indexOf(d)>-1?d:o}function T(o,d){if(!(this instanceof T))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');d=d||{};var p=d.body;if(o instanceof T){if(o.bodyUsed)throw new TypeError("Already read");this.url=o.url,this.credentials=o.credentials,d.headers||(this.headers=new h(o.headers)),this.method=o.method,this.mode=o.mode,this.signal=o.signal,!p&&o._bodyInit!=null&&(p=o._bodyInit,o.bodyUsed=!0)}else this.url=String(o);if(this.credentials=d.credentials||this.credentials||"same-origin",(d.headers||!this.headers)&&(this.headers=new h(d.headers)),this.method=we(d.method||this.method||"GET"),this.mode=d.mode||this.mode||null,this.signal=d.signal||this.signal||function(){if("AbortController"in e){var f=new AbortController;return f.signal}}(),this.referrer=null,(this.method==="GET"||this.method==="HEAD")&&p)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(p),(this.method==="GET"||this.method==="HEAD")&&(d.cache==="no-store"||d.cache==="no-cache")){var y=/([?&])_=[^&]*/;if(y.test(this.url))this.url=this.url.replace(y,"$1_="+new Date().getTime());else{var v=/\?/;this.url+=(v.test(this.url)?"&":"?")+"_="+new Date().getTime()}}}T.prototype.clone=function(){return new T(this,{body:this._bodyInit})};function xe(o){var d=new FormData;return o.trim().split("&").forEach(function(p){if(p){var y=p.split("="),v=y.shift().replace(/\+/g," "),f=y.join("=").replace(/\+/g," ");d.append(decodeURIComponent(v),decodeURIComponent(f))}}),d}function ke(o){var d=new h,p=o.replace(/\r?\n[\t ]+/g," ");return p.split("\r").map(function(y){return y.indexOf(`
`)===0?y.substr(1,y.length):y}).forEach(function(y){var v=y.split(":"),f=v.shift().trim();if(f){var z=v.join(":").trim();try{d.append(f,z)}catch(Q){console.warn("Response "+Q.message)}}}),d}G.call(T.prototype);function S(o,d){if(!(this instanceof S))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');if(d||(d={}),this.type="default",this.status=d.status===void 0?200:d.status,this.status<200||this.status>599)throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");this.ok=this.status>=200&&this.status<300,this.statusText=d.statusText===void 0?"":""+d.statusText,this.headers=new h(d.headers),this.url=d.url||"",this._initBody(o)}G.call(S.prototype),S.prototype.clone=function(){return new S(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new h(this.headers),url:this.url})},S.error=function(){var o=new S(null,{status:200,statusText:""});return o.ok=!1,o.status=0,o.type="error",o};var Ce=[301,302,303,307,308];S.redirect=function(o,d){if(Ce.indexOf(d)===-1)throw new RangeError("Invalid status code");return new S(null,{status:d,headers:{location:o}})},l.DOMException=e.DOMException;try{new l.DOMException}catch(o){l.DOMException=function(d,p){this.message=d,this.name=p;var y=Error(d);this.stack=y.stack},l.DOMException.prototype=Object.create(Error.prototype),l.DOMException.prototype.constructor=l.DOMException}function K(o,d){return new Promise(function(p,y){var v=new T(o,d);if(v.signal&&v.signal.aborted)return y(new l.DOMException("Aborted","AbortError"));var f=new XMLHttpRequest;function z(){f.abort()}f.onload=function(){var w={statusText:f.statusText,headers:ke(f.getAllResponseHeaders()||"")};v.url.indexOf("file://")===0&&(f.status<200||f.status>599)?w.status=200:w.status=f.status,w.url="responseURL"in f?f.responseURL:w.headers.get("X-Request-URL");var $="response"in f?f.response:f.responseText;setTimeout(function(){p(new S($,w))},0)},f.onerror=function(){setTimeout(function(){y(new TypeError("Network request failed"))},0)},f.ontimeout=function(){setTimeout(function(){y(new TypeError("Network request timed out"))},0)},f.onabort=function(){setTimeout(function(){y(new l.DOMException("Aborted","AbortError"))},0)};function Q(w){try{return w===""&&e.location.href?e.location.href:w}catch($){return w}}if(f.open(v.method,Q(v.url),!0),v.credentials==="include"?f.withCredentials=!0:v.credentials==="omit"&&(f.withCredentials=!1),"responseType"in f&&(t.blob?f.responseType="blob":t.arrayBuffer&&(f.responseType="arraybuffer")),d&&typeof d.headers=="object"&&!(d.headers instanceof h||e.Headers&&d.headers instanceof e.Headers)){var ue=[];Object.getOwnPropertyNames(d.headers).forEach(function(w){ue.push(a(w)),f.setRequestHeader(w,i(d.headers[w]))}),v.headers.forEach(function(w,$){ue.indexOf($)===-1&&f.setRequestHeader($,w)})}else v.headers.forEach(function(w,$){f.setRequestHeader($,w)});v.signal&&(v.signal.addEventListener("abort",z),f.onreadystatechange=function(){f.readyState===4&&v.signal.removeEventListener("abort",z)}),f.send(typeof v._bodyInit=="undefined"?null:v._bodyInit)})}K.polyfill=!0,e.fetch||(e.fetch=K,e.Headers=h,e.Request=T,e.Response=S),l.Headers=h,l.Request=T,l.Response=S,l.fetch=K,Object.defineProperty(l,"__esModule",{value:!0})})});var Je={};Re(Je,{default:()=>Y});module.exports=je(Je);var g=require("obsidian");var x=require("obsidian"),j="jarvis-view";async function Be(l,e){try{await navigator.clipboard.writeText(l);let t=e.innerHTML;e.innerHTML="",(0,x.setIcon)(e,"check"),e.addClass("jarvis-copy-success"),new x.Notice("Copied to clipboard!"),setTimeout(()=>{e.innerHTML="",(0,x.setIcon)(e,"copy"),e.removeClass("jarvis-copy-success")},1500)}catch(t){new x.Notice("Failed to copy")}}var _=class extends x.ItemView{constructor(t,s){super(t);this.conversation=[];this.isProcessing=!1;this.autocompleteContainer=null;this.plugin=s}getViewType(){return j}getDisplayText(){return"Jarvis AI"}getIcon(){return"bot"}async onOpen(){let t=this.containerEl.children[1];t.empty(),t.addClass("jarvis-container");let s=t.createDiv({cls:"jarvis-header"});s.createEl("h4",{text:"Jarvis AI Assistant"});let n=s.createDiv({cls:"jarvis-mode-container"});this.modeSelect=n.createEl("select",{cls:"jarvis-mode-select"}),this.modeSelect.createEl("option",{value:"chat",text:"Chat"}),this.modeSelect.createEl("option",{value:"research",text:"Research"}),this.modeSelect.createEl("option",{value:"plan",text:"Plan"}),this.modeSelect.createEl("option",{value:"summarize",text:"Summarize"}),this.modeSelect.createEl("option",{value:"task",text:"Task"}),this.modeSelect.createEl("option",{value:"vision",text:"Vision"}),this.modeSelect.createEl("option",{value:"pageassist",text:"Page Assist"}),this.modeSelect.createEl("option",{value:"rag",text:"RAG Search"});let r=t.createDiv({cls:"jarvis-action-bar"});r.createEl("button",{cls:"jarvis-action-btn",text:"Clear"}).addEventListener("click",()=>this.clearConversation()),r.createEl("button",{cls:"jarvis-action-btn",text:"Add Context"}).addEventListener("click",()=>this.addCurrentNoteContext()),r.createEl("button",{cls:"jarvis-action-btn",text:"Export"}).addEventListener("click",()=>this.exportConversation()),this.chatContainer=t.createDiv({cls:"jarvis-chat-container"}),this.addSystemMessage("Hello! I'm Jarvis, your PKM AI assistant. How can I help you today?\n\n**Quick Commands (type `/` for autocomplete):**\n- `/summarize` - Summarize current note\n- `/plan` - Break down a goal\n- `/similar` - Find related notes\n- `/link` - Suggest links\n- `/tag` - Suggest tags\n- `/research` - Web search\n- `/help` - Show all commands\n\n**Modes:** Chat \u2022 Research \u2022 Plan \u2022 RAG Search \u2022 Page Assist"),this.inputContainer=t.createDiv({cls:"jarvis-input-container"}),this.inputField=this.inputContainer.createEl("textarea",{cls:"jarvis-input-field",attr:{placeholder:"Ask Jarvis anything...",rows:"3"}}),this.inputField.addEventListener("keydown",m=>{var b;m.key==="Enter"&&!m.shiftKey?(m.preventDefault(),this.hideAutocomplete(),this.sendMessage()):m.key==="Escape"?this.hideAutocomplete():m.key==="Tab"&&((b=this.autocompleteContainer)==null?void 0:b.style.display)!=="none"&&(m.preventDefault(),this.selectFirstSuggestion())}),this.inputField.addEventListener("input",()=>{this.handleAutocomplete()});let h=this.inputContainer.createDiv({cls:"jarvis-button-container"}),u=h.createEl("button",{cls:"jarvis-image-btn"});(0,x.setIcon)(u,"image"),u.addEventListener("click",()=>this.uploadImage()),this.sendButton=h.createEl("button",{cls:"jarvis-send-btn",text:"Send"}),this.sendButton.addEventListener("click",()=>this.sendMessage()),this.addStyles()}addStyles(){let t=document.createElement("style");t.textContent=`
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

      .jarvis-autocomplete {
        position: absolute;
        bottom: 100%;
        left: 0;
        right: 0;
        background: var(--background-secondary);
        border: 1px solid var(--background-modifier-border);
        border-radius: 6px;
        margin-bottom: 4px;
        max-height: 200px;
        overflow-y: auto;
        z-index: 100;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
      }

      .jarvis-autocomplete-item {
        padding: 8px 12px;
        cursor: pointer;
        font-family: var(--font-monospace);
        font-size: 13px;
        border-bottom: 1px solid var(--background-modifier-border);
      }

      .jarvis-autocomplete-item:last-child {
        border-bottom: none;
      }

      .jarvis-autocomplete-item:hover {
        background: var(--background-modifier-hover);
      }

      .jarvis-input-container {
        position: relative;
      }
    `,document.head.appendChild(t)}addSystemMessage(t){let s=this.chatContainer.createDiv({cls:"jarvis-message jarvis-message-system"});x.MarkdownRenderer.renderMarkdown(t,s,"",this.plugin)}addMessage(t,s){let n={role:t,content:s,timestamp:new Date};this.conversation.push(n);let r=this.chatContainer.createDiv({cls:`jarvis-message jarvis-message-${t}`}),a=r.createDiv({cls:"jarvis-message-header"});a.createSpan({cls:"jarvis-message-role"}).setText(t==="user"?"You":"Jarvis");let c=a.createEl("button",{cls:"jarvis-copy-btn"});(0,x.setIcon)(c,"copy"),c.setAttribute("aria-label","Copy message"),c.addEventListener("click",()=>Be(s,c));let h=r.createDiv({cls:"jarvis-message-content"});t==="assistant"?x.MarkdownRenderer.renderMarkdown(s,h,"",this.plugin):h.createDiv({text:s}),r.createDiv({cls:"jarvis-message-time"}).setText(n.timestamp.toLocaleTimeString()),this.chatContainer.scrollTop=this.chatContainer.scrollHeight}createLoadingMessage(){let t=this.chatContainer.createDiv({cls:"jarvis-message jarvis-message-assistant jarvis-loading"});return t.setText("Thinking..."),this.chatContainer.scrollTop=this.chatContainer.scrollHeight,t}async sendMessage(){var n;let t=this.inputField.value.trim();if(!t||this.isProcessing)return;if(this.isProcessing=!0,this.sendButton.disabled=!0,this.inputField.value="",(n=this.plugin.slashCommands)!=null&&n.isSlashCommand(t)){this.addMessage("user",t);let r=this.createLoadingMessage();try{let a=await this.plugin.slashCommands.execute(t);r.remove(),this.addMessage("assistant",a.content)}catch(a){r.remove(),this.addMessage("assistant",`\u274C Command error: ${a.message}`),console.error("Slash command error:",a)}finally{this.isProcessing=!1,this.sendButton.disabled=!1,this.inputField.focus()}return}this.addMessage("user",t);let s=this.createLoadingMessage();try{let r=this.modeSelect.value,a;switch(r){case"research":a=await this.handleResearch(t);break;case"plan":a=await this.plugin.ollama.decomposePlan(t);break;case"summarize":a=await this.plugin.ollama.summarize(t,"bullets");break;case"task":a=`**TaskWarrior Command:**
\`\`\`
${await this.plugin.ollama.generateTaskWarriorCommand(t)}
\`\`\`

Copy and run this command to create the task.`;break;case"pageassist":a=await this.handlePageAssist(t);break;case"rag":a=await this.handleRAGSearch(t);break;default:let c=this.buildConversationHistory();c.push({role:"user",content:t}),a=await this.plugin.ollama.chat(c)}s.remove(),this.addMessage("assistant",a)}catch(r){s.remove(),this.addMessage("assistant",`Error: ${r.message}`),console.error("Jarvis error:",r)}finally{this.isProcessing=!1,this.sendButton.disabled=!1,this.inputField.focus()}}buildConversationHistory(){let s=[{role:"system",content:`You are Jarvis, an AI assistant integrated into Obsidian. You help with:
- Answering questions about notes and knowledge
- Planning and task management
- Summarizing content
- Suggesting connections between ideas
- General knowledge assistance

Be concise, helpful, and format responses with Markdown when appropriate.`}],n=this.conversation.slice(-10);for(let r of n)s.push({role:r.role,content:r.content});return s}async addCurrentNoteContext(){let t=await this.plugin.vault.getActiveNoteContent();if(t){let s=t.length>2e3?t.substring(0,2e3)+"...":t;this.inputField.value=`Context from current note:

${s}

Question: `,this.inputField.focus()}else this.addSystemMessage("No active note to add as context.")}async uploadImage(){if(!this.plugin.settings.enableVision){this.addSystemMessage("Vision mode is disabled in settings.");return}let t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async s=>{var a;let n=(a=s.target.files)==null?void 0:a[0];if(!n)return;let r=new FileReader;r.onload=async()=>{let i=r.result.split(",")[1];this.isProcessing=!0,this.sendButton.disabled=!0,this.addMessage("user",`[Uploaded image: ${n.name}]`);let c=this.createLoadingMessage();try{let h=this.inputField.value.trim()||"Describe this image in detail.";this.inputField.value="";let u=await this.plugin.ollama.analyzeImage(i,h);c.remove(),this.addMessage("assistant",u)}catch(h){c.remove(),this.addMessage("assistant",`Vision error: ${h.message}`)}finally{this.isProcessing=!1,this.sendButton.disabled=!1}},r.readAsDataURL(n)},t.click()}async handleResearch(t){if(!this.plugin.webResearch)return"\u274C Web Research service not initialized. Please restart the plugin.";let s=t.toLowerCase();if(s.startsWith("fact check")||s.startsWith("verify")){let n=t.replace(/^(fact check|verify)\s*/i,"").trim();try{return await this.plugin.webResearch.factCheck(n)}catch(r){return`\u274C Fact check failed: ${r.message}`}}try{let n=await this.plugin.webResearch.research(t,"thorough"),r=`## Research: ${t}

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

`;for(let i of n){let c=Math.round(i.score*100);r+=`### [[${i.document.metadata.title}]] (${c}%)
`,r+=`> ${i.snippet}

`}let a=await this.plugin.embedding.getContextForQuery(t,2e3);if(a){r+=`---

## AI Answer

`;let i=await this.plugin.ollama.chat([{role:"system",content:"Answer the question based on the provided notes. Be concise and reference notes using [[Note Name]] format."},{role:"user",content:`${a}

Question: ${t}`}]);r+=i}return r}catch(n){return`\u274C Search failed: ${n.message}`}}clearConversation(){this.conversation=[],this.chatContainer.empty(),this.addSystemMessage("Conversation cleared. How can I help you?")}async exportConversation(){if(this.conversation.length===0){this.addSystemMessage("No conversation to export.");return}let t=new Date().toISOString().split("T")[0],s=`# Jarvis Conversation - ${t}

`;for(let r of this.conversation){let a=r.timestamp.toLocaleTimeString();s+=`## ${r.role==="user"?"You":"Jarvis"} (${a})

${r.content}

---

`}let n=`0-Inbox/jarvis-conversation-${t}.md`;await this.plugin.vault.createNote(n,s),this.addSystemMessage(`Conversation exported to: ${n}`)}handleAutocomplete(){let t=this.inputField.value;if(!t.startsWith("/")||t.includes(" ")){this.hideAutocomplete();return}let s=t.substring(1);if(!this.plugin.slashCommands){this.hideAutocomplete();return}let n=this.plugin.slashCommands.getSuggestions(s);if(n.length===0){this.hideAutocomplete();return}this.showAutocomplete(n)}showAutocomplete(t){this.autocompleteContainer||(this.autocompleteContainer=this.inputContainer.createDiv({cls:"jarvis-autocomplete"})),this.autocompleteContainer.empty(),this.autocompleteContainer.style.display="block";for(let s of t){let n=this.autocompleteContainer.createDiv({cls:"jarvis-autocomplete-item"});n.setText(`/${s}`),n.addEventListener("click",()=>{this.inputField.value=`/${s} `,this.inputField.focus(),this.hideAutocomplete()})}}hideAutocomplete(){this.autocompleteContainer&&(this.autocompleteContainer.style.display="none")}selectFirstSuggestion(){if(!this.autocompleteContainer)return;let t=this.autocompleteContainer.querySelector(".jarvis-autocomplete-item");t&&t.click()}async onClose(){}};var B=X(require("fs"),1),oe=require("path");var Ye=X(Z(),1),fe="11434",ye=`http://127.0.0.1:${fe}`,Ne="0.5.18",Me=Object.defineProperty,Fe=(l,e,t)=>e in l?Me(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t,ee=(l,e,t)=>(Fe(l,typeof e!="symbol"?e+"":e,t),t),se=class l extends Error{constructor(e,t){super(e),this.error=e,this.status_code=t,this.name="ResponseError",Error.captureStackTrace&&Error.captureStackTrace(this,l)}},ne=class{constructor(e,t,s){ee(this,"abortController"),ee(this,"itr"),ee(this,"doneCallback"),this.abortController=e,this.itr=t,this.doneCallback=s}abort(){this.abortController.abort()}async*[Symbol.asyncIterator](){for await(let e of this.itr){if("error"in e)throw new Error(e.error);if(yield e,e.done||e.status==="success"){this.doneCallback();return}}throw new Error("Did not receive done or success response in stream.")}},re=async l=>{var s;if(l.ok)return;let e=`Error ${l.status}: ${l.statusText}`,t=null;if((s=l.headers.get("content-type"))!=null&&s.includes("application/json"))try{t=await l.json(),e=t.error||e}catch(n){console.log("Failed to parse error response as JSON")}else try{console.log("Getting text from response"),e=await l.text()||e}catch(n){console.log("Failed to get text from error response")}throw new se(e,l.status)};function Oe(){var l;if(typeof window!="undefined"&&window.navigator){let e=navigator;return"userAgentData"in e&&((l=e.userAgentData)!=null&&l.platform)?`${e.userAgentData.platform.toLowerCase()} Browser/${navigator.userAgent};`:navigator.platform?`${navigator.platform.toLowerCase()} Browser/${navigator.userAgent};`:`unknown Browser/${navigator.userAgent};`}else if(typeof process!="undefined")return`${process.arch} ${process.platform} Node.js/${process.version}`;return""}function De(l){if(l instanceof Headers){let e={};return l.forEach((t,s)=>{e[s]=t}),e}else return Array.isArray(l)?Object.fromEntries(l):l||{}}var ae=async(l,e,t={})=>{let s={"Content-Type":"application/json",Accept:"application/json","User-Agent":`ollama-js/${Ne} (${Oe()})`};t.headers=De(t.headers);let n=Object.fromEntries(Object.entries(t.headers).filter(([r])=>!Object.keys(s).some(a=>a.toLowerCase()===r.toLowerCase())));return t.headers={...s,...n},l(e,t)},me=async(l,e,t)=>{let s=await ae(l,e,{headers:t==null?void 0:t.headers});return await re(s),s},R=async(l,e,t,s)=>{let r=(i=>i!==null&&typeof i=="object"&&!Array.isArray(i))(t)?JSON.stringify(t):t,a=await ae(l,e,{method:"POST",body:r,signal:s==null?void 0:s.signal,headers:s==null?void 0:s.headers});return await re(a),a},Ie=async(l,e,t,s)=>{let n=await ae(l,e,{method:"DELETE",body:JSON.stringify(t),headers:s==null?void 0:s.headers});return await re(n),n},Le=async function*(l){var n;let e=new TextDecoder("utf-8"),t="",s=l.getReader();for(;;){let{done:r,value:a}=await s.read();if(r)break;t+=e.decode(a);let i=t.split(`
`);t=(n=i.pop())!=null?n:"";for(let c of i)try{yield JSON.parse(c)}catch(h){console.warn("invalid json: ",c)}}for(let r of t.split(`
`).filter(a=>a!==""))try{yield JSON.parse(r)}catch(a){console.warn("invalid json: ",r)}},Ge=l=>{if(!l)return ye;let e=l.includes("://");l.startsWith(":")&&(l=`http://127.0.0.1${l}`,e=!0),e||(l=`http://${l}`);let t=new URL(l),s=t.port;s||(e?s=t.protocol==="https:"?"443":"80":s=fe);let n="";t.username&&(n=t.username,t.password&&(n+=`:${t.password}`),n+="@");let r=`${t.protocol}//${n}${t.hostname}:${s}${t.pathname}`;return r.endsWith("/")&&(r=r.slice(0,-1)),r},ze=Object.defineProperty,Ue=(l,e,t)=>e in l?ze(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t,te=(l,e,t)=>(Ue(l,typeof e!="symbol"?e+"":e,t),t),ie=class{constructor(e){var t,s;te(this,"config"),te(this,"fetch"),te(this,"ongoingStreamedRequests",[]),this.config={host:"",headers:e==null?void 0:e.headers},e!=null&&e.proxy||(this.config.host=Ge((t=e==null?void 0:e.host)!=null?t:ye)),this.fetch=(s=e==null?void 0:e.fetch)!=null?s:fetch}abort(){for(let e of this.ongoingStreamedRequests)e.abort();this.ongoingStreamedRequests.length=0}async processStreamableRequest(e,t){var r;t.stream=(r=t.stream)!=null?r:!1;let s=`${this.config.host}/api/${e}`;if(t.stream){let a=new AbortController,i=await R(this.fetch,s,t,{signal:a.signal,headers:this.config.headers});if(!i.body)throw new Error("Missing body");let c=Le(i.body),h=new ne(a,c,()=>{let u=this.ongoingStreamedRequests.indexOf(h);u>-1&&this.ongoingStreamedRequests.splice(u,1)});return this.ongoingStreamedRequests.push(h),h}return await(await R(this.fetch,s,t,{headers:this.config.headers})).json()}async encodeImage(e){if(typeof e!="string"){let t=new Uint8Array(e),s="",n=t.byteLength;for(let r=0;r<n;r++)s+=String.fromCharCode(t[r]);return btoa(s)}return e}async generate(e){return e.images&&(e.images=await Promise.all(e.images.map(this.encodeImage.bind(this)))),this.processStreamableRequest("generate",e)}async chat(e){if(e.messages)for(let t of e.messages)t.images&&(t.images=await Promise.all(t.images.map(this.encodeImage.bind(this))));return this.processStreamableRequest("chat",e)}async create(e){return this.processStreamableRequest("create",{...e})}async pull(e){return this.processStreamableRequest("pull",{name:e.model,stream:e.stream,insecure:e.insecure})}async push(e){return this.processStreamableRequest("push",{name:e.model,stream:e.stream,insecure:e.insecure})}async delete(e){return await Ie(this.fetch,`${this.config.host}/api/delete`,{name:e.model},{headers:this.config.headers}),{status:"success"}}async copy(e){return await R(this.fetch,`${this.config.host}/api/copy`,{...e},{headers:this.config.headers}),{status:"success"}}async list(){return await(await me(this.fetch,`${this.config.host}/api/tags`,{headers:this.config.headers})).json()}async show(e){return await(await R(this.fetch,`${this.config.host}/api/show`,{...e},{headers:this.config.headers})).json()}async embed(e){return await(await R(this.fetch,`${this.config.host}/api/embed`,{...e},{headers:this.config.headers})).json()}async embeddings(e){return await(await R(this.fetch,`${this.config.host}/api/embeddings`,{...e},{headers:this.config.headers})).json()}async ps(){return await(await me(this.fetch,`${this.config.host}/api/ps`,{headers:this.config.headers})).json()}},Qe=new ie;var et=X(Z(),1),N=class extends ie{async encodeImage(e){if(typeof e!="string")return Buffer.from(e).toString("base64");try{if(B.default.existsSync(e)){let t=await B.promises.readFile((0,oe.resolve)(e));return Buffer.from(t).toString("base64")}}catch(t){}return e}async fileExists(e){try{return await B.promises.access(e),!0}catch(t){return!1}}async create(e){if(e.from&&await this.fileExists((0,oe.resolve)(e.from)))throw Error("Creating with a local path is not currently supported from ollama-js");return e.stream?super.create(e):super.create(e)}},tt=new N;var M=class{constructor(e){this.settings=e,this.client=new N({host:e.ollamaEndpoint})}async checkConnection(){try{return await this.client.list(),!0}catch(e){return console.error("Ollama connection failed:",e),!1}}async listModels(){try{return(await this.client.list()).models.map(t=>t.name)}catch(e){return console.error("Failed to list models:",e),[]}}async chat(e,t){try{return t?await this.streamChat(e,t):(await this.client.chat({model:this.settings.textModel,messages:e.map(n=>({role:n.role,content:n.content})),options:{temperature:this.settings.temperature}})).message.content}catch(s){throw console.error("Chat failed:",s),s}}async streamChat(e,t){let s="",n=await this.client.chat({model:this.settings.textModel,messages:e.map(r=>({role:r.role,content:r.content})),stream:!0,options:{temperature:this.settings.temperature}});for await(let r of n){let a=r.message.content;s+=a,t(a)}return s}async analyzeImage(e,t,s){if(!this.settings.enableVision)throw new Error("Vision is disabled in settings");try{return s?await this.streamVision(e,t,s):(await this.client.chat({model:this.settings.visionModel,messages:[{role:"user",content:t,images:[e]}],options:{temperature:this.settings.temperature}})).message.content}catch(n){throw console.error("Vision analysis failed:",n),n}}async streamVision(e,t,s){let n="",r=await this.client.chat({model:this.settings.visionModel,messages:[{role:"user",content:t,images:[e]}],stream:!0,options:{temperature:this.settings.temperature}});for await(let a of r){let i=a.message.content;n+=i,s(i)}return n}async embed(e){try{return(await this.client.embed({model:this.settings.embeddingModel,input:e})).embeddings[0]}catch(t){throw console.error("Embedding failed:",t),t}}async embedBatch(e){try{return(await this.client.embed({model:this.settings.embeddingModel,input:e})).embeddings}catch(t){throw console.error("Batch embedding failed:",t),t}}async decomposePlan(e){if(!this.settings.enablePlanning)throw new Error("Planning is disabled in settings");return this.chat([{role:"system",content:`You are a planning assistant. Given a goal, break it down into actionable tasks.
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
"work on report for project alpha" -> task add "Work on report" project:alpha`},{role:"user",content:e}])).trim()}};var k=require("obsidian"),J=class{constructor(e){this.app=e}getAllNotes(){return this.app.vault.getMarkdownFiles()}getNoteNames(){return this.getAllNotes().map(e=>e.basename)}getNotesInFolder(e){let t=this.app.vault.getAbstractFileByPath(e);if(!t||!(t instanceof k.TFolder))return[];let s=[];return this.collectNotesRecursive(t,s),s}collectNotesRecursive(e,t){for(let s of e.children)s instanceof k.TFile&&s.extension==="md"?t.push(s):s instanceof k.TFolder&&this.collectNotesRecursive(s,t)}async readNote(e){return this.app.vault.read(e)}async readNoteByPath(e){let t=this.app.vault.getAbstractFileByPath(e);return t instanceof k.TFile?this.app.vault.read(t):null}getActiveNote(){return this.app.workspace.getActiveFile()}async getActiveNoteContent(){let e=this.getActiveNote();return e?this.readNote(e):null}async createNote(e,t){let s=e.substring(0,e.lastIndexOf("/"));s&&await this.ensureFolderExists(s);let n=await this.app.vault.create(e,t);return new k.Notice(`Created note: ${n.basename}`),n}async updateNote(e,t){await this.app.vault.modify(e,t)}async appendToNote(e,t){let s=await this.readNote(e);await this.updateNote(e,s+`
`+t)}async ensureFolderExists(e){this.app.vault.getAbstractFileByPath(e)||await this.app.vault.createFolder(e)}async getNoteMetadata(e){var r;let t=this.app.metadataCache.getFileCache(e),s=(t==null?void 0:t.frontmatter)||{},n=((r=t==null?void 0:t.tags)==null?void 0:r.map(a=>a.tag))||[];return s.tags&&(Array.isArray(s.tags)?n.push(...s.tags.map(a=>`#${a}`)):typeof s.tags=="string"&&n.push(`#${s.tags}`)),{path:e.path,name:e.name,basename:e.basename,extension:e.extension,created:e.stat.ctime,modified:e.stat.mtime,size:e.stat.size,tags:[...new Set(n)],frontmatter:s}}async searchNotes(e){let t=[],s=this.getAllNotes(),n=e.toLowerCase();for(let r of s){let a=await this.readNote(r),i=a.toLowerCase();if(i.includes(n)){let h=a.split(`
`).filter(b=>b.toLowerCase().includes(n)).slice(0,3),m=(i.match(new RegExp(n,"g"))||[]).length/a.length*1e3;t.push({file:r,matches:h,score:m})}}return t.sort((r,a)=>a.score-r.score)}getRecentNotes(e=10){return this.getAllNotes().sort((t,s)=>s.stat.mtime-t.stat.mtime).slice(0,e)}getNotesByTag(e){var n;let t=e.startsWith("#")?e:`#${e}`,s=[];for(let r of this.getAllNotes()){let a=this.app.metadataCache.getFileCache(r),i=((n=a==null?void 0:a.tags)==null?void 0:n.map(h=>h.tag))||[],c=a==null?void 0:a.frontmatter;c!=null&&c.tags&&(Array.isArray(c.tags)?i.push(...c.tags.map(h=>`#${h}`)):typeof c.tags=="string"&&i.push(`#${c.tags}`)),i.includes(t)&&s.push(r)}return s}getBacklinks(e){let t=[],s=this.app.metadataCache.resolvedLinks;for(let[n,r]of Object.entries(s))if(r[e.path]){let a=this.app.vault.getAbstractFileByPath(n);a instanceof k.TFile&&t.push(a)}return t}getOutgoingLinks(e){let t=[],s=this.app.metadataCache.resolvedLinks[e.path];if(s)for(let n of Object.keys(s)){let r=this.app.vault.getAbstractFileByPath(n);r instanceof k.TFile&&t.push(r)}return t}async createDailyNote(){let e=new Date,t=e.toISOString().split("T")[0],s=`0-Inbox/${t}.md`,n=this.app.vault.getAbstractFileByPath(s);if(n instanceof k.TFile)return n;let r=`# ${t}

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
`;return this.createNote(n,a)}getAllTags(){var t;let e=new Set;for(let s of this.getAllNotes()){let n=this.app.metadataCache.getFileCache(s);(t=n==null?void 0:n.tags)==null||t.forEach(a=>e.add(a.tag));let r=n==null?void 0:n.frontmatter;r!=null&&r.tags&&(Array.isArray(r.tags)?r.tags.forEach(a=>e.add(`#${a}`)):typeof r.tags=="string"&&e.add(`#${r.tags}`))}return[...e].sort()}getVaultStats(){let e=this.getAllNotes(),t=this.getAllTags(),s=0,n=this.app.metadataCache.resolvedLinks;for(let r of Object.values(n))s+=Object.keys(r).length;return{totalNotes:e.length,totalTags:t.length,totalLinks:s}}async readFile(e){let t=this.app.vault.getAbstractFileByPath(e);return t instanceof k.TFile?this.app.vault.read(t):null}async writeFile(e,t){let s=this.app.vault.getAbstractFileByPath(e);if(s instanceof k.TFile)await this.app.vault.modify(s,t);else{let n=e.substring(0,e.lastIndexOf("/"));n&&await this.ensureFolderExists(n),await this.app.vault.create(e,t)}}getAllMarkdownFiles(){return this.getAllNotes().map(e=>e.path)}};var _e={chunkSize:500,chunkOverlap:50,minChunkSize:100},F=class{constructor(e,t,s){this.index=new Map;this.isIndexing=!1;this.ollama=e,this.vault=t,this.app=s,this.indexPath=".jarvis/embeddings.json"}async initialize(){await this.loadIndex()}async loadIndex(){try{let e=await this.vault.readFile(this.indexPath);if(e){let t=JSON.parse(e);this.index=new Map(Object.entries(t)),console.log(`Loaded ${this.index.size} embeddings from index`)}}catch(e){console.log("No existing embedding index found, starting fresh"),this.index=new Map}}async saveIndex(){let e=Object.fromEntries(this.index);await this.vault.writeFile(this.indexPath,JSON.stringify(e,null,2))}async indexNote(e,t=!1){try{let s=await this.vault.readFile(e);if(!s||s.trim().length===0)return!1;let n=this.app.vault.getAbstractFileByPath(e);if(!n||!("stat"in n))return!1;let r=this.index.get(e),a=n.stat.mtime;if(!t&&r&&r.timestamp>=a)return!1;let i=this.extractMetadata(e,s),c=this.chunkContent(s),h=this.prepareEmbeddingText(i.title,s,i.tags),u=await this.ollama.embed(h),m={id:this.generateId(e),path:e,content:s.substring(0,5e3),embedding:u,metadata:i,timestamp:a};return this.index.set(e,m),!0}catch(s){return console.error(`Failed to index ${e}:`,s),!1}}async indexVault(e){if(this.isIndexing)throw new Error("Indexing already in progress");this.isIndexing=!0;let t=0;try{let s=await this.vault.getAllMarkdownFiles(),n=s.length;for(let r=0;r<s.length;r++){let a=s[r];if(e&&e(r+1,n),a.includes("/templates/")||a.startsWith("templates/"))continue;await this.indexNote(a)&&t++,t%10===0&&(await this.saveIndex(),await this.sleep(100))}return await this.saveIndex(),t}finally{this.isIndexing=!1}}async search(e,t=5,s=.3){if(this.index.size===0)return[];let n=await this.ollama.embed(e),r=[];for(let a of this.index.values()){let i=this.cosineSimilarity(n,a.embedding);i>=s&&r.push({document:a,score:i,snippet:this.extractSnippet(a.content,e)})}return r.sort((a,i)=>i.score-a.score),r.slice(0,t)}async findSimilar(e,t=5,s=.5){let n=this.index.get(e);if(!n)return[];let r=[];for(let a of this.index.values()){if(a.path===e)continue;let i=this.cosineSimilarity(n.embedding,a.embedding);i>=s&&r.push({document:a,score:i,snippet:this.extractSnippet(a.content,n.metadata.title)})}return r.sort((a,i)=>i.score-a.score),r.slice(0,t)}async getContextForQuery(e,t=2e3){let s=await this.search(e,3,.3);if(s.length===0)return"";let n=`**Relevant notes from your vault:**

`,r=0,a=4;for(let i of s){let c=`### [[${i.document.metadata.title}]]
${i.snippet}

`,h=c.length/a;if(r+h>t)break;n+=c,r+=h}return n}removeFromIndex(e){return this.index.delete(e)}clearIndex(){this.index.clear()}getIndexStats(){if(this.index.size===0)return{totalDocuments:0,averageEmbeddingSize:0,oldestTimestamp:0};let e=0,t=Date.now();for(let s of this.index.values())e+=s.embedding.length,s.timestamp<t&&(t=s.timestamp);return{totalDocuments:this.index.size,averageEmbeddingSize:e/this.index.size,oldestTimestamp:t}}extractMetadata(e,t){var b;let s=((b=e.split("/").pop())==null?void 0:b.replace(".md",""))||e,n=/#([a-zA-Z0-9_-]+)/g,r=[],a;for(;(a=n.exec(t))!==null;)r.push(a[1]);let i=/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g,c=[];for(;(a=i.exec(t))!==null;)c.push(a[1]);let h=t.split(/\s+/).length,u,m=t.match(/^---\n([\s\S]*?)\n---/);if(m)try{u=this.parseYamlFrontmatter(m[1])}catch(C){}return{title:s,tags:r,links:c,wordCount:h,frontmatter:u}}parseYamlFrontmatter(e){let t={},s=e.split(`
`);for(let n of s){let r=n.indexOf(":");if(r>0){let a=n.substring(0,r).trim(),i=n.substring(r+1).trim();t[a]=i}}return t}prepareEmbeddingText(e,t,s){let n=t.replace(/^---\n[\s\S]*?\n---\n?/,"").replace(/```[\s\S]*?```/g,"").replace(/!\[\[.*?\]\]/g,"").replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,"$2 $1").trim();n.length>3e3&&(n=n.substring(0,3e3));let r=s.length>0?`Tags: ${s.join(", ")}`:"";return`Title: ${e}
${r}

${n}`}chunkContent(e,t=_e){let{chunkSize:s,chunkOverlap:n,minChunkSize:r}=t,a=[],i=e.split(/\n\n+/),c="";for(let h of i)if(c.length+h.length<=s)c+=(c?`

`:"")+h;else{c.length>=r&&a.push(c);let u=c.slice(-n);c=u+(u?`

`:"")+h}return c.length>=r&&a.push(c),a}extractSnippet(e,t,s=300){let n=e.toLowerCase(),r=t.toLowerCase().split(/\s+/),a=0;for(let u of r){let m=n.indexOf(u);if(m!==-1){a=m;break}}let i=Math.max(0,a-s/2),c=Math.min(e.length,i+s),h=e.substring(i,c);return i>0&&(h="..."+h),c<e.length&&(h=h+"..."),h.trim()}cosineSimilarity(e,t){if(e.length!==t.length)return 0;let s=0,n=0,r=0;for(let a=0;a<e.length;a++)s+=e[a]*t[a],n+=e[a]*e[a],r+=t[a]*t[a];return n===0||r===0?0:s/(Math.sqrt(n)*Math.sqrt(r))}generateId(e){let t=0;for(let s=0;s<e.length;s++){let n=e.charCodeAt(s);t=(t<<5)-t+n,t=t&t}return Math.abs(t).toString(36)}sleep(e){return new Promise(t=>setTimeout(t,e))}};var ve=require("obsidian"),O=class{constructor(e){this.cache=new Map;this.cacheExpiry=1e3*60*30;this.ollama=e}async fetchPage(e){let t=this.cache.get(e);if(t&&Date.now()-t.timestamp<this.cacheExpiry)return t;try{let n=(await(0,ve.requestUrl)({url:e,method:"GET",headers:{"User-Agent":"Mozilla/5.0 (compatible; ObsidianJarvis/1.0)",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"}})).text,r=this.parseHtml(n,e);return this.cache.set(e,r),r}catch(s){throw new Error(`Failed to fetch page: ${s.message}`)}}parseHtml(e,t){let s=e.match(/<title[^>]*>([^<]*)<\/title>/i),n=s?this.decodeHtmlEntities(s[1].trim()):"Untitled",r=e.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i),a=r?this.decodeHtmlEntities(r[1]):void 0,i=e.replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi,"").replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi,"").replace(/<header[^>]*>[\s\S]*?<\/header>/gi,"").replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi,"").replace(/<!--[\s\S]*?-->/g,""),c=i,h=i.match(/<article[^>]*>([\s\S]*?)<\/article>/i),u=i.match(/<main[^>]*>([\s\S]*?)<\/main>/i);h?c=h[1]:u&&(c=u[1]);let m=this.htmlToText(c),b=/<a[^>]*href=["']([^"'#][^"']*)["'][^>]*>/gi,C=[],P;for(;(P=b.exec(e))!==null&&C.length<20;){let A=P[1];if(A.startsWith("http"))C.push(A);else if(A.startsWith("/")){let G=new URL(t);C.push(`${G.origin}${A}`)}}return{url:t,title:n,content:m.substring(0,1e4),description:a,links:[...new Set(C)],timestamp:Date.now()}}htmlToText(e){return e.replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi,`

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
`}clearCache(){this.cache.clear()}};var H=require("obsidian"),D=class{constructor(e,t="http://localhost:8888"){this.ollama=e,this.searxngUrl=t}async search(e,t=5){try{return await this.searchSearxng(e,t)}catch(s){console.log("SearXNG not available, trying DuckDuckGo...")}try{return await this.searchDuckDuckGo(e,t)}catch(s){console.log("DuckDuckGo failed, trying Google...")}return await this.searchGoogle(e,t)}async searchSearxng(e,t){let s=`${this.searxngUrl}/search?q=${encodeURIComponent(e)}&format=json&categories=general`,n=await(0,H.requestUrl)({url:s,method:"GET",headers:{Accept:"application/json"}});return(JSON.parse(n.text).results||[]).slice(0,t).map(a=>({title:a.title,url:a.url,snippet:a.content}))}async searchDuckDuckGo(e,t){let s=`https://api.duckduckgo.com/?q=${encodeURIComponent(e)}&format=json&no_redirect=1`,n=await(0,H.requestUrl)({url:s,method:"GET",headers:{Accept:"application/json"}}),r=JSON.parse(n.text),a=[];if(r.Abstract&&a.push({title:r.Heading||e,url:r.AbstractURL||"",snippet:r.Abstract}),r.RelatedTopics)for(let i of r.RelatedTopics.slice(0,t-1))i.Text&&i.FirstURL&&a.push({title:i.Text.substring(0,60)+"...",url:i.FirstURL,snippet:i.Text});return a.slice(0,t)}async searchGoogle(e,t){return console.warn("Google search requires API key configuration"),[]}async research(e,t="quick"){let s=t==="thorough"?8:4,n=await this.search(e,s);if(n.length===0)return this.researchWithAI(e);let r=[];for(let m of n.slice(0,3))try{let b=await this.fetchPageContent(m.url);r.push(`Source: ${m.title}
URL: ${m.url}

${b}`)}catch(b){r.push(`Source: ${m.title}
${m.snippet}`)}let a=`You are a research assistant. Synthesize information from the provided sources to answer the query.

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
- Topic 2`,i=`Query: ${e}

Sources:
${r.join(`

---

`)}

Synthesize this information:`,c=await this.ollama.chat([{role:"system",content:a},{role:"user",content:i}]),h=this.extractBulletPoints(c,"Key Findings"),u=this.extractBulletPoints(c,"Related Topics");return{query:e,summary:c,sources:n,keyFindings:h,relatedQueries:u}}async researchWithAI(e){let s=await this.ollama.chat([{role:"system",content:`You are a knowledgeable research assistant. The user is asking about a topic but web search is unavailable.
Provide the best answer you can based on your training data.
Be honest about the limitations and suggest how they could verify the information.`},{role:"user",content:e}]);return{query:e,summary:s+`

*Note: This answer is based on AI knowledge and was not verified with live web search.*`,sources:[],keyFindings:[],relatedQueries:[]}}async fetchPageContent(e){let t=await(0,H.requestUrl)({url:e,method:"GET",headers:{"User-Agent":"Mozilla/5.0 (compatible; ObsidianResearch/1.0)",Accept:"text/html"}});return this.htmlToText(t.text).substring(0,3e3)}htmlToText(e){return e.replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi,"").replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim()}extractBulletPoints(e,t){let s=new RegExp(`##\\s*${t}[\\s\\S]*?(?=##|$)`,"i"),n=e.match(s);return n?n[0].split(`
`).filter(r=>r.trim().startsWith("-")).map(r=>r.replace(/^-\s*/,"").trim()).filter(r=>r.length>0):[]}async quickAnswer(e){return(await this.research(e,"quick")).summary}async factCheck(e){let t=`You are a fact-checker. Analyze the claim and search results.
Rate the claim as: TRUE, FALSE, PARTIALLY TRUE, or UNVERIFIED.
Explain your reasoning and cite sources.`,s=await this.search(e,5);if(s.length===0)return`**Claim:** ${e}

**Verdict:** UNVERIFIED

Unable to verify this claim with live web search. Please check reliable sources manually.`;let n=s.map(a=>`- ${a.title}: ${a.snippet}`).join(`
`);return await this.ollama.chat([{role:"system",content:t},{role:"user",content:`Claim: ${e}

Search Results:
${n}`}])}};var I=require("obsidian"),L=class{constructor(e){this.commands=new Map;this.plugin=e,this.registerBuiltinCommands()}registerBuiltinCommands(){this.register({name:"summarize",aliases:["sum","s"],description:"Summarize current note or provided text",usage:"/summarize [optional text]",execute:async(e,t)=>{let s=e.trim();if(!s){let r=await t.vault.getActiveNoteContent();if(!r)return{content:"\u274C No active note and no text provided. Open a note or provide text to summarize.",type:"error"};s=r}return{content:`## Summary

${await t.ollama.summarize(s,"bullets")}`,type:"response"}}}),this.register({name:"plan",aliases:["p","breakdown"],description:"Break down a goal into actionable steps",usage:"/plan <goal description>",execute:async(e,t)=>{if(!e.trim())return{content:"\u274C Please provide a goal to plan. Usage: `/plan Write a blog post about productivity`",type:"error"};let s=await t.ollama.decomposePlan(e);return{content:`## Plan: ${e}

${s}`,type:"response"}}}),this.register({name:"task",aliases:["t","todo"],description:"Convert natural language to TaskWarrior command",usage:"/task <task description in natural language>",execute:async(e,t)=>e.trim()?{content:`## TaskWarrior Command

\`\`\`bash
${await t.ollama.generateTaskWarriorCommand(e)}
\`\`\`

Copy and run this command in your terminal.`,type:"response"}:{content:"\u274C Please describe the task. Usage: `/task review PRs by tomorrow with high priority`",type:"error"}}),this.register({name:"link",aliases:["links","suggest-links"],description:"Suggest relevant links for the current note",usage:"/link",execute:async(e,t)=>{let s=await t.vault.getActiveNoteContent();if(!s)return{content:"\u274C No active note. Open a note to get link suggestions.",type:"error"};let n=t.app.workspace.getActiveFile(),r=(n==null?void 0:n.path)||"";if(t.embedding)try{let i=(await t.embedding.search(s.substring(0,500),5,.3)).filter(h=>h.document.path!==r);if(i.length===0)return{content:"\u{1F50D} No related notes found. Try indexing your vault with `/index` first.",type:"response"};let c=`## Suggested Links

These notes might be relevant:

`;for(let h of i.slice(0,5)){let u=Math.round(h.score*100);c+=`- [[${h.document.metadata.title}]] (${u}% match)
`,c+=`  > ${h.snippet.substring(0,100)}...

`}return{content:c,type:"response"}}catch(a){return{content:"\u274C RAG search failed. Try `/index` to rebuild the index.",type:"error"}}return{content:"\u274C Embedding service not available. Please restart the plugin.",type:"error"}}}),this.register({name:"tag",aliases:["tags","suggest-tags"],description:"Suggest tags for the current note",usage:"/tag",execute:async(e,t)=>{let s=await t.vault.getActiveNoteContent();return s?{content:`## Suggested Tags

${(await t.ollama.chat([{role:"system",content:`You are a tagging assistant. Analyze the note content and suggest 3-7 relevant tags.
Format: Return only a comma-separated list of tags (without #).
Focus on: topic, type of content, project, area, and status.
Example: productivity, pkm, review, project/jarvis, status/active`},{role:"user",content:s.substring(0,2e3)}])).split(",").map(a=>`#${a.trim()}`).join(" ")}

*Click to copy and paste into your note.*`,type:"response"}:{content:"\u274C No active note. Open a note to get tag suggestions.",type:"error"}}}),this.register({name:"flashcard",aliases:["fc","card"],description:"Create a flashcard from text",usage:"/flashcard <text to convert to flashcard>",execute:async(e,t)=>{let s=e.trim();if(!s){let r=t.app.workspace.getActiveViewOfType(I.MarkdownView);r&&(s=r.editor.getSelection())}return s?{content:`## Flashcard

${await t.ollama.chat([{role:"system",content:`Create a flashcard from the given content.
Format your response as:
Q: [question]
A: [answer]

Make the question test understanding, not just recall. Be concise.`},{role:"user",content:s}])}

*Copy this to your flashcard deck.*`,type:"response"}:{content:"\u274C No text provided. Select text or provide content to create a flashcard.",type:"error"}}}),this.register({name:"research",aliases:["r","search","web"],description:"Research a topic on the web",usage:"/research <query>",execute:async(e,t)=>{if(!e.trim())return{content:"\u274C Please provide a research query. Usage: `/research best practices for note-taking`",type:"error"};if(!t.webResearch)return{content:"\u274C Web research service not available.",type:"error"};try{let s=await t.webResearch.research(e,"thorough"),n=`## Research: ${e}

${s.summary}`;if(s.sources.length>0){n+=`

### Sources
`;for(let r of s.sources)n+=`- [${r.title}](${r.url})
`}return{content:n,type:"response"}}catch(s){return{content:`\u274C Research failed: ${s.message}`,type:"error"}}}}),this.register({name:"similar",aliases:["related","find"],description:"Find notes similar to current note or query",usage:"/similar [optional query]",execute:async(e,t)=>{let s=e.trim();if(!s){let n=await t.vault.getActiveNoteContent();if(!n)return{content:"\u274C No active note and no query provided.",type:"error"};s=n.substring(0,500)}if(!t.embedding)return{content:"\u274C Embedding service not available.",type:"error"};try{let n=await t.embedding.search(s,5,.3);if(n.length===0)return{content:"\u{1F50D} No similar notes found. Try `/index` to rebuild the index.",type:"response"};let r=`## Similar Notes

`;for(let a of n){let i=Math.round(a.score*100);r+=`### [[${a.document.metadata.title}]] (${i}%)
`,r+=`> ${a.snippet}

`}return{content:r,type:"response"}}catch(n){return{content:`\u274C Search failed: ${n.message}`,type:"error"}}}}),this.register({name:"index",aliases:["reindex","rebuild"],description:"Rebuild the semantic search index",usage:"/index",execute:async(e,t)=>{if(!t.embedding)return{content:"\u274C Embedding service not available.",type:"error"};new I.Notice("Indexing vault... This may take a while.");try{return{content:`\u2705 Successfully indexed ${await t.embedding.indexVault((n,r)=>{})} notes!

You can now use semantic search with \`/similar\` or \`/link\`.`,type:"response"}}catch(s){return{content:`\u274C Indexing failed: ${s.message}`,type:"error"}}}}),this.register({name:"explain",aliases:["x","what","define"],description:"Explain a concept or selected text",usage:"/explain <concept or text>",execute:async(e,t)=>{let s=e.trim();if(!s){let r=t.app.workspace.getActiveViewOfType(I.MarkdownView);r&&(s=r.editor.getSelection())}return s?{content:`## Explanation

${await t.ollama.chat([{role:"system",content:"Explain the following concept or text clearly and concisely. Use bullet points if helpful. If it's a term, provide definition, context, and examples."},{role:"user",content:s}])}`,type:"response"}:{content:"\u274C Please provide text to explain or select text in the editor.",type:"error"}}}),this.register({name:"graph",aliases:["g","stats"],description:"Build knowledge graph and show statistics",usage:"/graph",execute:async(e,t)=>{var a;if(!t.knowledgeGraph)return{content:"\u274C Knowledge Graph service not available.",type:"error"};let s=await t.knowledgeGraph.buildGraph(),n=t.knowledgeGraph.getStats(),r=`## Knowledge Graph Statistics

`;if(r+=`| Metric | Value |
|--------|-------|
`,r+=`| Total Notes | ${n.totalNodes} |
`,r+=`| Total Links | ${n.totalEdges} |
`,r+=`| Orphan Notes | ${n.orphanCount} |
`,r+=`| Clusters | ${n.clusters} |
`,r+=`| Avg Connections | ${n.avgConnections.toFixed(1)} |
`,n.mostConnected.length>0){r+=`
### Most Connected Notes
`;for(let i of n.mostConnected){let c=((a=i.path.split("/").pop())==null?void 0:a.replace(".md",""))||i.path;r+=`- [[${c}]] (${i.connections} connections)
`}}return{content:r,type:"response"}}}),this.register({name:"orphans",aliases:["lonely","unlinked"],description:"Find notes with no links",usage:"/orphans",execute:async(e,t)=>{if(!t.knowledgeGraph)return{content:"\u274C Knowledge Graph service not available.",type:"error"};t.knowledgeGraph.isGraphBuilt()||await t.knowledgeGraph.buildGraph();let s=t.knowledgeGraph.findOrphans();if(s.length===0)return{content:"\u2705 No orphan notes found! All your notes are connected.",type:"response"};let n=`## Orphan Notes (${s.length})

`;n+=`These notes have no incoming or outgoing links:

`;for(let r of s.slice(0,20))n+=`- [[${r.title}]]`,r.tags.length>0&&(n+=` ${r.tags.slice(0,3).join(" ")}`),n+=`
`;return s.length>20&&(n+=`
*...and ${s.length-20} more*`),n+=`

\u{1F4A1} **Tip:** Consider linking these notes or archiving unused ones.`,{content:n,type:"response"}}}),this.register({name:"bridges",aliases:["hubs","connectors"],description:"Find important connector notes",usage:"/bridges",execute:async(e,t)=>{if(!t.knowledgeGraph)return{content:"\u274C Knowledge Graph service not available.",type:"error"};t.knowledgeGraph.isGraphBuilt()||await t.knowledgeGraph.buildGraph();let s=t.knowledgeGraph.findBridgeNotes(10);if(s.length===0)return{content:"\u{1F50D} No bridge notes found. Your graph may need more connections.",type:"response"};let n=`## Bridge Notes

`;n+=`These notes connect different parts of your knowledge:

`;for(let r of s)n+=`### [[${r.title}]]
`,n+=`- Links out: ${r.links.length} | Links in: ${r.backlinks.length}
`,r.tags.length>0&&(n+=`- Tags: ${r.tags.slice(0,5).join(" ")}
`),n+=`
`;return n+="\u{1F4A1} **Tip:** These notes are valuable connectors. Keep them well-maintained!",{content:n,type:"response"}}}),this.register({name:"path",aliases:["connect","route"],description:"Find path between two notes",usage:"/path <note1> to <note2>",execute:async(e,t)=>{var c;if(!t.knowledgeGraph)return{content:"\u274C Knowledge Graph service not available.",type:"error"};if(!e.trim())return{content:"\u274C Usage: `/path Note A to Note B`",type:"error"};let s=e.split(/\s+to\s+/i);if(s.length!==2)return{content:"\u274C Please use format: `/path Note A to Note B`",type:"error"};let[n,r]=s.map(h=>h.trim());t.knowledgeGraph.isGraphBuilt()||await t.knowledgeGraph.buildGraph();let a=t.knowledgeGraph.findPath(n,r);if(!a)return{content:`\u274C No path found between "${n}" and "${r}".

They may be in disconnected parts of your graph.`,type:"response"};let i=`## Path Found!

`;i+=`**Length:** ${a.length} hop(s)

`,i+=`### Route:
`;for(let h=0;h<a.path.length;h++){let u=((c=a.path[h].split("/").pop())==null?void 0:c.replace(".md",""))||a.path[h];i+=`${h+1}. [[${u}]]`,h<a.path.length-1&&(i+=" \u2192"),i+=`
`}return{content:i,type:"response"}}}),this.register({name:"clusters",aliases:["topics","groups"],description:"Show topic clusters in your vault",usage:"/clusters",execute:async(e,t)=>{if(!t.knowledgeGraph)return{content:"\u274C Knowledge Graph service not available.",type:"error"};t.knowledgeGraph.isGraphBuilt()||await t.knowledgeGraph.buildGraph();let s=t.knowledgeGraph.findClusters();if(s.length===0)return{content:"\u{1F50D} No clusters found. Your notes may all be connected or all separate.",type:"response"};let n=`## Knowledge Clusters (${s.length})

`;for(let r of s.slice(0,10)){n+=`### ${r.mainTopic} (${r.size} notes)
`;let a=r.nodes.slice(0,5).map(i=>{var h;return`[[${((h=i.split("/").pop())==null?void 0:h.replace(".md",""))||i}]]`});n+=`${a.join(", ")}`,r.nodes.length>5&&(n+=` *+${r.nodes.length-5} more*`),n+=`

`}return{content:n,type:"response"}}}),this.register({name:"maintenance",aliases:["health","audit"],description:"Get vault health report",usage:"/maintenance",execute:async(e,t)=>{if(!t.knowledgeGraph)return{content:"\u274C Knowledge Graph service not available.",type:"error"};t.knowledgeGraph.isGraphBuilt()||await t.knowledgeGraph.buildGraph();let s=t.knowledgeGraph.getMaintenanceReport(),n=t.knowledgeGraph.getStats(),r=`## Vault Health Report

`,a=s.wellConnected.length/n.totalNodes,i=a>.7?"\u{1F7E2}":a>.4?"\u{1F7E1}":"\u{1F534}";if(r+=`### Overall: ${i} ${Math.round(a*100)}% healthy

`,r+=`| Category | Count | % |
|----------|-------|---|
`,r+=`| \u2705 Well Connected | ${s.wellConnected.length} | ${Math.round(s.wellConnected.length/n.totalNodes*100)}% |
`,r+=`| \u26A0\uFE0F Dead Ends | ${s.deadEnds.length} | ${Math.round(s.deadEnds.length/n.totalNodes*100)}% |
`,r+=`| \u26A0\uFE0F Sources Only | ${s.sources.length} | ${Math.round(s.sources.length/n.totalNodes*100)}% |
`,r+=`| \u274C Orphans | ${s.orphans.length} | ${Math.round(s.orphans.length/n.totalNodes*100)}% |
`,s.deadEnds.length>0){r+=`
### Dead Ends (notes with no outgoing links)
`;for(let c of s.deadEnds.slice(0,5))r+=`- [[${c.title}]]
`;s.deadEnds.length>5&&(r+=`*...and ${s.deadEnds.length-5} more*
`)}if(s.sources.length>0){r+=`
### Sources (notes with no incoming links)
`;for(let c of s.sources.slice(0,5))r+=`- [[${c.title}]]
`;s.sources.length>5&&(r+=`*...and ${s.sources.length-5} more*
`)}return r+=`
\u{1F4A1} **Recommendations:**
`,s.orphans.length>0&&(r+=`- Link or archive ${s.orphans.length} orphan note(s)
`),s.deadEnds.length>0&&(r+=`- Add outgoing links to ${s.deadEnds.length} dead-end note(s)
`),s.sources.length>0&&(r+=`- Reference ${s.sources.length} source note(s) from other notes
`),{content:r,type:"response"}}}),this.register({name:"help",aliases:["?","commands"],description:"Show available slash commands",usage:"/help",execute:async()=>{let e=`## Jarvis Slash Commands

`;e+=`| Command | Description | Usage |
`,e+=`|---------|-------------|-------|
`;let t=Array.from(this.commands.values()),s=new Set;for(let n of t){if(s.has(n.name))continue;s.add(n.name);let r=n.aliases.map(a=>`/${a}`).join(", ");e+=`| \`/${n.name}\` | ${n.description} | \`${n.usage}\` |
`}e+=`
### Aliases
`;for(let n of t)s.has(`alias-${n.name}`)||(s.add(`alias-${n.name}`),n.aliases.length>0&&(e+=`- \`/${n.name}\`: ${n.aliases.map(r=>`\`/${r}\``).join(", ")}
`));return{content:e,type:"response"}}})}register(e){this.commands.set(e.name,e);for(let t of e.aliases)this.commands.set(t,e)}isSlashCommand(e){return e.trim().startsWith("/")}parseCommand(e){let t=e.trim();if(!t.startsWith("/"))return null;let s=t.match(/^\/(\S+)\s*([\s\S]*)?$/);return s?{command:s[1].toLowerCase(),args:s[2]||""}:null}async execute(e){let t=this.parseCommand(e);if(!t)return{content:"\u274C Invalid command format. Use `/help` to see available commands.",type:"error"};let s=this.commands.get(t.command);if(!s)return{content:`\u274C Unknown command: \`/${t.command}\`

Use \`/help\` to see available commands.`,type:"error"};try{return await s.execute(t.args,this.plugin)}catch(n){return{content:`\u274C Command failed: ${n.message}`,type:"error"}}}getCommandNames(){let e=new Set;for(let[t,s]of this.commands)e.add(s.name);return Array.from(e)}getSuggestions(e){let t=e.toLowerCase().replace(/^\//,""),s=[];for(let[n,r]of this.commands)n.startsWith(t)&&!s.includes(r.name)&&s.push(r.name);return s.slice(0,5)}};var E=require("obsidian"),W=class{constructor(e){this.actions=[];this.plugin=e,this.registerBuiltinActions(),this.registerEditorMenu()}registerBuiltinActions(){this.actions.push({id:"summarize",name:"Summarize",icon:"file-text",handler:async(e,t)=>await t.ollama.summarize(e,"bullets")}),this.actions.push({id:"explain",name:"Explain",icon:"help-circle",handler:async(e,t)=>await t.ollama.chat([{role:"system",content:"Explain the following concept or text clearly and concisely. Use bullet points if helpful."},{role:"user",content:e}])}),this.actions.push({id:"expand",name:"Expand",icon:"maximize-2",handler:async(e,t)=>await t.ollama.chat([{role:"system",content:"Expand the following bullet points or brief notes into well-written paragraphs. Maintain the same meaning but add detail and flow."},{role:"user",content:e}])}),this.actions.push({id:"condense",name:"Condense",icon:"minimize-2",handler:async(e,t)=>await t.ollama.chat([{role:"system",content:"Condense the following text to be more concise while keeping all key information. Use bullet points if appropriate."},{role:"user",content:e}])}),this.actions.push({id:"rewrite-formal",name:"Rewrite (Formal)",icon:"graduation-cap",handler:async(e,t)=>await t.ollama.chat([{role:"system",content:"Rewrite the following text in a formal, professional tone. Keep the same meaning."},{role:"user",content:e}])}),this.actions.push({id:"rewrite-casual",name:"Rewrite (Casual)",icon:"smile",handler:async(e,t)=>await t.ollama.chat([{role:"system",content:"Rewrite the following text in a casual, friendly tone. Keep the same meaning."},{role:"user",content:e}])}),this.actions.push({id:"flashcard",name:"Create Flashcard",icon:"layers",handler:async(e,t)=>await t.ollama.chat([{role:"system",content:`Create a flashcard from the given content.
Format your response as:
Q: [question]
A: [answer]

Make the question test understanding, not just recall. Be concise.`},{role:"user",content:e}])}),this.actions.push({id:"extract-tasks",name:"Extract Tasks",icon:"check-square",handler:async(e,t)=>await t.ollama.chat([{role:"system",content:"Extract any action items or tasks from the following text. Format each as a Markdown task: - [ ] Task description"},{role:"user",content:e}])}),this.actions.push({id:"find-similar",name:"Find Similar Notes",icon:"search",handler:async(e,t)=>{if(!t.embedding)return"\u274C Embedding service not available.";try{let s=await t.embedding.search(e,5,.3);if(s.length===0)return"\u{1F50D} No similar notes found. Try indexing your vault first.";let n=`## Similar Notes

`;for(let r of s){let a=Math.round(r.score*100);n+=`- [[${r.document.metadata.title}]] (${a}%)
`}return n}catch(s){return`\u274C Search failed: ${s.message}`}}}),this.actions.push({id:"research",name:"Research This",icon:"globe",handler:async(e,t)=>{if(!t.webResearch)return"\u274C Web research service not available.";try{let s=await t.webResearch.research(e,"quick"),n=`## Research: ${e.substring(0,50)}...

${s.summary}`;if(s.sources.length>0){n+=`

### Sources
`;for(let r of s.sources.slice(0,3))n+=`- [${r.title}](${r.url})
`}return n}catch(s){return`\u274C Research failed: ${s.message}`}}}),this.actions.push({id:"suggest-tags",name:"Suggest Tags",icon:"tag",handler:async(e,t)=>`**Suggested Tags:**

${(await t.ollama.chat([{role:"system",content:`Analyze the text and suggest 3-5 relevant tags.
Format: Return only a comma-separated list of tags (without #).`},{role:"user",content:e}])).split(",").map(r=>`#${r.trim()}`).join(" ")}`})}registerEditorMenu(){this.plugin.registerEvent(this.plugin.app.workspace.on("editor-menu",(e,t,s)=>{let n=t.getSelection();if(!n||n.trim().length===0)return;e.addSeparator(),e.addItem(a=>{a.setTitle("\u{1F916} Jarvis AI").setIcon("bot").setDisabled(!0)});let r=this.actions.slice(0,5);for(let a of r)e.addItem(i=>{i.setTitle(`  ${a.name}`).setIcon(a.icon).onClick(async()=>{await this.executeAction(a,n,t)})});e.addItem(a=>{a.setTitle("  More Jarvis Actions...").setIcon("more-horizontal").onClick(()=>{this.showAllActionsModal(n,t)})}),e.addItem(a=>{a.setTitle("  Ask in Jarvis...").setIcon("message-circle").onClick(async()=>{await this.askInJarvis(n)})})}))}showAllActionsModal(e,t){new le(this.plugin.app,this.actions,async n=>{n&&await this.executeAction(n,e,t)}).open()}async executeAction(e,t,s){new E.Notice(`Jarvis: ${e.name}...`);try{let n=await e.handler(t,this.plugin);new ce(this.plugin.app,e.name,n,a=>{if(a){let i=s.getCursor("to"),c=`

> [!ai] ${e.name}
> ${n.split(`
`).join(`
> `)}
`;s.replaceRange(c,{line:i.line,ch:s.getLine(i.line).length})}}).open(),new E.Notice("Jarvis: Done!")}catch(n){new E.Notice(`Jarvis: ${e.name} failed - ${n.message}`),console.error("Context menu action error:",n)}}async askInJarvis(e){await this.plugin.activateView();let t=this.plugin.app.workspace.getLeavesOfType("jarvis-view");if(t.length>0){let s=t[0].view;s.inputField&&(s.inputField.value=`Regarding this text:

"${e.substring(0,500)}${e.length>500?"...":""}"

My question: `,s.inputField.focus())}}},ce=class extends E.Modal{constructor(e,t,s,n){super(e),this.title=t,this.resultContent=s,this.onResult=n}onOpen(){let{contentEl:e}=this;e.createDiv({cls:"jarvis-modal-header"}).createEl("h2",{text:`Jarvis: ${this.title}`});let s=e.createDiv({cls:"jarvis-modal-content"});s.style.maxHeight="400px",s.style.overflow="auto",s.style.padding="16px",s.style.background="var(--background-secondary)",s.style.borderRadius="8px",s.style.marginBottom="16px",s.style.whiteSpace="pre-wrap",s.setText(this.resultContent);let n=e.createDiv({cls:"jarvis-modal-buttons"});n.style.display="flex",n.style.gap="8px",n.style.justifyContent="flex-end",n.createEl("button",{text:"Copy"}).addEventListener("click",async()=>{await navigator.clipboard.writeText(this.resultContent),new E.Notice("Copied to clipboard!")}),n.createEl("button",{text:"Insert Below",cls:"mod-cta"}).addEventListener("click",()=>{this.onResult(!0),this.close()}),n.createEl("button",{text:"Close"}).addEventListener("click",()=>{this.onResult(!1),this.close()})}onClose(){let{contentEl:e}=this;e.empty()}},le=class extends E.Modal{constructor(e,t,s){super(e),this.actions=t,this.onSelect=s}onOpen(){let{contentEl:e}=this;e.createEl("h2",{text:"Jarvis AI Actions"});let t=e.createDiv({cls:"jarvis-action-list"});t.style.display="flex",t.style.flexDirection="column",t.style.gap="4px";for(let r of this.actions){let a=t.createDiv({cls:"jarvis-action-item"});a.style.padding="8px 12px",a.style.cursor="pointer",a.style.borderRadius="4px",a.style.display="flex",a.style.alignItems="center",a.style.gap="8px",a.addEventListener("mouseenter",()=>{a.style.background="var(--background-modifier-hover)"}),a.addEventListener("mouseleave",()=>{a.style.background="transparent"}),a.createSpan({text:r.name}),a.addEventListener("click",()=>{this.onSelect(r),this.close()})}let s=e.createDiv();s.style.marginTop="16px",s.style.textAlign="right",s.createEl("button",{text:"Cancel"}).addEventListener("click",()=>{this.onSelect(null),this.close()})}onClose(){let{contentEl:e}=this;e.empty()}};var q=class{constructor(e){this.graph=new Map;this.isBuilt=!1;this.plugin=e,this.app=e.app}async buildGraph(){this.graph.clear();let e=this.app.vault.getMarkdownFiles();for(let t of e){let s=this.app.metadataCache.getFileCache(t),n=this.createNode(t,s);this.graph.set(t.path,n)}for(let[t,s]of this.graph)for(let n of s.links){let r=this.graph.get(n);r&&!r.backlinks.includes(t)&&r.backlinks.push(t)}return this.isBuilt=!0,this.graph.size}createNode(e,t){var a;let s=[];if(t!=null&&t.links)for(let i of t.links){let c=this.app.metadataCache.getFirstLinkpathDest(i.link,e.path);c&&s.push(c.path)}if(t!=null&&t.embeds)for(let i of t.embeds){let c=this.app.metadataCache.getFirstLinkpathDest(i.link,e.path);c&&!s.includes(c.path)&&s.push(c.path)}let n=[];if(t!=null&&t.tags)for(let i of t.tags)n.push(i.tag);if((a=t==null?void 0:t.frontmatter)!=null&&a.tags){let i=t.frontmatter.tags;Array.isArray(i)?n.push(...i.map(c=>`#${c}`)):typeof i=="string"&&n.push(`#${i}`)}let r=0;return t!=null&&t.sections&&(r=t.sections.reduce((i,c)=>i+(c.position.end.offset-c.position.start.offset),0)/5),{path:e.path,title:e.basename,links:[...new Set(s)],backlinks:[],tags:[...new Set(n)],wordCount:Math.round(r)}}findPath(e,t){if(!this.isBuilt)return null;let s=this.resolvePath(e),n=this.resolvePath(t);if(!s||!n)return null;if(s===n)return{path:[s],length:0};let r=[{path:s,chain:[s]}],a=new Set([s]);for(;r.length>0;){let i=r.shift(),c=this.graph.get(i.path);if(!c)continue;let h=[...c.links,...c.backlinks];for(let u of h){if(u===n)return{path:[...i.chain,u],length:i.chain.length};a.has(u)||(a.add(u),r.push({path:u,chain:[...i.chain,u]}))}}return null}findOrphans(){if(!this.isBuilt)return[];let e=[];for(let[,t]of this.graph)t.links.length===0&&t.backlinks.length===0&&e.push(t);return e}findBridgeNotes(e=10){if(!this.isBuilt)return[];let t=[];for(let[,s]of this.graph){let n=s.backlinks.length,r=s.links.length;if(n>0&&r>0){let a=2*n*r/(n+r);t.push({node:s,score:a})}}return t.sort((s,n)=>n.score-s.score).slice(0,e).map(s=>s.node)}findClusters(){if(!this.isBuilt)return[];let e=new Set,t=[],s=0;for(let[n]of this.graph){if(e.has(n))continue;let r=[],a=[n];for(;a.length>0;){let i=a.shift();if(e.has(i))continue;e.add(i),r.push(i);let c=this.graph.get(i);if(c)for(let h of[...c.links,...c.backlinks])e.has(h)||a.push(h)}if(r.length>1){let i=new Map;for(let u of r){let m=this.graph.get(u);if(m)for(let b of m.tags)i.set(b,(i.get(b)||0)+1)}let c="Untitled Cluster",h=0;for(let[u,m]of i)m>h&&(h=m,c=u);t.push({id:s++,nodes:r,mainTopic:c,size:r.length})}}return t.sort((n,r)=>r.size-n.size)}async suggestLinks(e,t=5){this.isBuilt||await this.buildGraph();let s=this.graph.get(e);if(!s)return[];let n=[],r=new Set([...s.links,...s.backlinks,e]);for(let[a,i]of this.graph){if(r.has(a))continue;let c=0,h=[],u=s.tags.filter(P=>i.tags.includes(P));u.length>0&&(c+=u.length*2,h.push(`shared tags: ${u.slice(0,3).join(", ")}`));let m=s.path.split("/").slice(0,-1).join("/"),b=i.path.split("/").slice(0,-1).join("/");m===b&&m!==""&&(c+=1,h.push("same folder"));let C=s.backlinks.filter(P=>i.backlinks.includes(P)||i.links.includes(P));C.length>0&&(c+=C.length*1.5,h.push(`${C.length} common connection(s)`)),c>0&&n.push({path:a,reason:h.join("; "),score:c})}return n.sort((a,i)=>i.score-a.score).slice(0,t)}getStats(){if(!this.isBuilt)return{totalNodes:0,totalEdges:0,orphanCount:0,avgConnections:0,mostConnected:[],clusters:0};let e=0,t=0,s=[];for(let[a,i]of this.graph){let c=i.links.length+i.backlinks.length;e+=i.links.length,t+=c,s.push({path:a,connections:c})}let n=this.findOrphans(),r=this.findClusters();return{totalNodes:this.graph.size,totalEdges:e,orphanCount:n.length,avgConnections:this.graph.size>0?t/this.graph.size:0,mostConnected:s.sort((a,i)=>i.connections-a.connections).slice(0,5),clusters:r.length}}getMaintenanceReport(){if(!this.isBuilt)return{orphans:[],deadEnds:[],sources:[],wellConnected:[]};let e=[],t=[],s=[],n=[];for(let[,r]of this.graph){let a=r.links.length>0,i=r.backlinks.length>0;!a&&!i?e.push(r):i&&!a?t.push(r):a&&!i?s.push(r):n.push(r)}return{orphans:e,deadEnds:t,sources:s,wellConnected:n}}resolvePath(e){if(this.graph.has(e))return e;let t=e.toLowerCase().replace(/\.md$/,"");for(let[s,n]of this.graph)if(n.title.toLowerCase()===t)return s;for(let[s]of this.graph)if(s.toLowerCase().includes(t))return s;return null}getNode(e){let t=this.resolvePath(e);return t?this.graph.get(t):void 0}isGraphBuilt(){return this.isBuilt}};var Ve={ollamaEndpoint:"http://localhost:11434",textModel:"granite3.1-dense:2b",visionModel:"granite3.2-vision:2b",embeddingModel:"granite-embedding:278m",enablePlanning:!0,enableVision:!0,enableTaskWarrior:!0,showStatusBar:!0,temperature:.7},Y=class extends g.Plugin{async onload(){await this.loadSettings(),this.ollama=new M(this.settings),this.vault=new J(this.app),this.embedding=new F(this.ollama,this.vault,this.app),this.pageAssist=new O(this.ollama),this.webResearch=new D(this.ollama),this.slashCommands=new L(this),this.contextMenu=new W(this),this.knowledgeGraph=new q(this),this.embedding.initialize().catch(e=>{console.error("Failed to initialize embedding index:",e)}),this.registerView(j,e=>new _(e,this)),this.addRibbonIcon("bot","Jarvis AI Assistant",()=>{this.activateView()}),this.addCommand({id:"open-jarvis",name:"Open Jarvis",hotkeys:[{modifiers:["Ctrl","Shift"],key:"j"}],callback:()=>this.activateView()}),this.addCommand({id:"jarvis-ask",name:"Quick Ask",hotkeys:[{modifiers:["Ctrl","Shift"],key:"a"}],callback:()=>this.quickAsk()}),this.addCommand({id:"jarvis-summarize",name:"Summarize Current Note",callback:()=>this.summarizeCurrentNote()}),this.addCommand({id:"jarvis-plan",name:"Create Plan",hotkeys:[{modifiers:["Ctrl","Shift"],key:"p"}],callback:()=>this.createPlan()}),this.addCommand({id:"jarvis-task",name:"Create Task",hotkeys:[{modifiers:["Ctrl","Shift"],key:"t"}],callback:()=>this.createTask()}),this.addCommand({id:"jarvis-rag-search",name:"RAG Search",hotkeys:[{modifiers:["Ctrl","Shift"],key:"s"}],callback:()=>this.ragSearch()}),this.addCommand({id:"jarvis-index-vault",name:"Index Vault for RAG",callback:()=>this.indexVault()}),this.addCommand({id:"jarvis-clip-page",name:"Clip Web Page to Note",callback:()=>this.clipPageToNote()}),this.addSettingTab(new de(this.app,this)),this.settings.showStatusBar&&(this.statusBarItem=this.addStatusBarItem(),this.updateStatusBar("Ready")),this.checkOllamaConnection(),console.log("Jarvis AI Assistant loaded")}onunload(){console.log("Jarvis AI Assistant unloaded")}async loadSettings(){this.settings=Object.assign({},Ve,await this.loadData())}async saveSettings(){await this.saveData(this.settings),this.ollama=new M(this.settings),this.embedding=new F(this.ollama,this.vault,this.app),this.pageAssist=new O(this.ollama),this.webResearch=new D(this.ollama),this.slashCommands=new L(this)}async activateView(){let{workspace:e}=this.app,t=null,s=e.getLeavesOfType(j);s.length>0?t=s[0]:(t=e.getRightLeaf(!1),await(t==null?void 0:t.setViewState({type:j,active:!0}))),t&&e.revealLeaf(t)}async checkOllamaConnection(){await this.ollama.checkConnection()?(this.updateStatusBar("Connected"),new g.Notice("Jarvis: Connected to Ollama")):(this.updateStatusBar("Disconnected"),new g.Notice("Jarvis: Cannot connect to Ollama. Please ensure Ollama is running."))}updateStatusBar(e){this.statusBarItem&&this.statusBarItem.setText(`Jarvis: ${e}`)}async quickAsk(){let e=this.app.workspace.getActiveViewOfType(g.MarkdownView);if(!e){new g.Notice("No active markdown view");return}let s=e.editor.getSelection()||e.editor.getValue().substring(0,1e3);await this.activateView()}async summarizeCurrentNote(){let e=this.app.workspace.getActiveViewOfType(g.MarkdownView);if(!e){new g.Notice("No active markdown view");return}let t=e.editor.getValue();this.updateStatusBar("Summarizing...");try{let s=await this.ollama.chat([{role:"system",content:"You are a helpful assistant. Summarize the following note in 3-5 bullet points."},{role:"user",content:t}]);new g.Notice("Summary generated! Check Jarvis panel."),await this.activateView()}catch(s){new g.Notice("Failed to generate summary"),console.error(s)}finally{this.updateStatusBar("Ready")}}async createPlan(){await this.activateView(),new g.Notice("Enter your goal in the Jarvis panel to create a plan")}async createTask(){await this.activateView(),new g.Notice("Enter your task in the Jarvis panel")}async ragSearch(){let e=this.app.workspace.getActiveViewOfType(g.MarkdownView);if(e){let t=e.editor.getSelection()}await this.activateView(),new g.Notice("Use RAG Search mode to search your vault semantically")}async indexVault(){this.updateStatusBar("Indexing..."),new g.Notice("Starting vault indexing... This may take a while.");try{let e=await this.embedding.indexVault((t,s)=>{this.updateStatusBar(`Indexing ${t}/${s}`)});new g.Notice(`Indexed ${e} notes successfully!`),this.updateStatusBar("Ready")}catch(e){new g.Notice(`Indexing failed: ${e.message}`),this.updateStatusBar("Index failed"),console.error("Indexing error:",e)}}async clipPageToNote(){let e=await this.promptForUrl();if(e){this.updateStatusBar("Clipping..."),new g.Notice("Clipping page...");try{let t=await this.pageAssist.createNoteFromPage(e),n=`0-Inbox/web-clip-${new Date().toISOString().replace(/[:.]/g,"-")}.md`;await this.vault.writeFile(n,t),new g.Notice(`Page clipped to ${n}`),this.updateStatusBar("Ready");let r=this.app.vault.getAbstractFileByPath(n);r&&r instanceof g.TFile&&await this.app.workspace.getLeaf(!1).openFile(r)}catch(t){new g.Notice(`Failed to clip page: ${t.message}`),this.updateStatusBar("Clip failed"),console.error("Clip error:",t)}}}async promptForUrl(){return new Promise(e=>{new he(this.app,s=>{e(s)}).open()})}},he=class extends g.Modal{constructor(e,t){super(e),this.onSubmit=t}onOpen(){let{contentEl:e}=this;e.createEl("h2",{text:"Enter URL to clip"});let s=e.createDiv({cls:"jarvis-url-input-container"}).createEl("input",{type:"text",placeholder:"https://example.com/article",cls:"jarvis-url-input"});s.style.width="100%",s.style.padding="8px",s.style.marginBottom="16px";let n=e.createDiv({cls:"jarvis-url-buttons"});n.style.display="flex",n.style.gap="8px",n.style.justifyContent="flex-end",n.createEl("button",{text:"Cancel"}).addEventListener("click",()=>{this.close(),this.onSubmit(null)}),n.createEl("button",{text:"Clip",cls:"mod-cta"}).addEventListener("click",()=>{let i=s.value.trim();i&&(this.close(),this.onSubmit(i))}),s.addEventListener("keydown",i=>{if(i.key==="Enter"){let c=s.value.trim();c&&(this.close(),this.onSubmit(c))}}),s.focus()}onClose(){let{contentEl:e}=this;e.empty()}},de=class extends g.PluginSettingTab{constructor(e,t){super(e,t),this.plugin=t}display(){let{containerEl:e}=this;e.empty(),e.createEl("h2",{text:"Jarvis AI Assistant Settings"}),e.createEl("h3",{text:"Ollama Configuration"}),new g.Setting(e).setName("Ollama Endpoint").setDesc("The URL of your Ollama server").addText(t=>t.setPlaceholder("http://localhost:11434").setValue(this.plugin.settings.ollamaEndpoint).onChange(async s=>{this.plugin.settings.ollamaEndpoint=s,await this.plugin.saveSettings()})),new g.Setting(e).setName("Text Model").setDesc("The model to use for text generation").addText(t=>t.setPlaceholder("granite3.1-dense:2b").setValue(this.plugin.settings.textModel).onChange(async s=>{this.plugin.settings.textModel=s,await this.plugin.saveSettings()})),new g.Setting(e).setName("Vision Model").setDesc("The model to use for image analysis").addText(t=>t.setPlaceholder("granite3.2-vision:2b").setValue(this.plugin.settings.visionModel).onChange(async s=>{this.plugin.settings.visionModel=s,await this.plugin.saveSettings()})),new g.Setting(e).setName("Temperature").setDesc("Controls randomness (0.0 = deterministic, 1.0 = creative)").addSlider(t=>t.setLimits(0,1,.1).setValue(this.plugin.settings.temperature).setDynamicTooltip().onChange(async s=>{this.plugin.settings.temperature=s,await this.plugin.saveSettings()})),e.createEl("h3",{text:"Features"}),new g.Setting(e).setName("Enable Planning Agent").setDesc("Allow Jarvis to create and manage task plans").addToggle(t=>t.setValue(this.plugin.settings.enablePlanning).onChange(async s=>{this.plugin.settings.enablePlanning=s,await this.plugin.saveSettings()})),new g.Setting(e).setName("Enable Vision").setDesc("Allow Jarvis to analyze images and screenshots").addToggle(t=>t.setValue(this.plugin.settings.enableVision).onChange(async s=>{this.plugin.settings.enableVision=s,await this.plugin.saveSettings()})),new g.Setting(e).setName("Enable TaskWarrior Integration").setDesc("Allow Jarvis to create and manage TaskWarrior tasks").addToggle(t=>t.setValue(this.plugin.settings.enableTaskWarrior).onChange(async s=>{this.plugin.settings.enableTaskWarrior=s,await this.plugin.saveSettings()})),e.createEl("h3",{text:"UI"}),new g.Setting(e).setName("Show Status Bar").setDesc("Show Jarvis status in the status bar").addToggle(t=>t.setValue(this.plugin.settings.showStatusBar).onChange(async s=>{this.plugin.settings.showStatusBar=s,await this.plugin.saveSettings()})),e.createEl("h3",{text:"Connection"}),new g.Setting(e).setName("Test Connection").setDesc("Test the connection to Ollama").addButton(t=>t.setButtonText("Test").onClick(async()=>{t.setButtonText("Testing..."),await this.plugin.checkOllamaConnection(),t.setButtonText("Test")}))}};
