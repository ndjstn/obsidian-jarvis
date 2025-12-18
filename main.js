/*
Obsidian Jarvis AI Assistant
A comprehensive AI assistant with planning, vision, and task management
*/

var Se=Object.create;var U=Object.defineProperty;var Ce=Object.getOwnPropertyDescriptor;var Pe=Object.getOwnPropertyNames;var Te=Object.getPrototypeOf,Ae=Object.prototype.hasOwnProperty;var Ee=(o,e)=>()=>(e||o((e={exports:{}}).exports,e),e.exports),$e=(o,e)=>{for(var t in e)U(o,t,{get:e[t],enumerable:!0})},he=(o,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Pe(e))!Ae.call(o,n)&&n!==t&&U(o,n,{get:()=>e[n],enumerable:!(s=Ce(e,n))||s.enumerable});return o};var K=(o,e,t)=>(t=o!=null?Se(Te(o)):{},he(e||!o||!o.__esModule?U(t,"default",{value:o,enumerable:!0}):t,o)),Re=o=>he(U({},"__esModule",{value:!0}),o);var X=Ee((J,pe)=>{(function(o,e){typeof J=="object"&&typeof pe!="undefined"?e(J):typeof define=="function"&&define.amd?define(["exports"],e):e(o.WHATWGFetch={})})(J,function(o){"use strict";var e=typeof globalThis!="undefined"&&globalThis||typeof self!="undefined"&&self||typeof global!="undefined"&&global||{},t={searchParams:"URLSearchParams"in e,iterable:"Symbol"in e&&"iterator"in Symbol,blob:"FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(i){return!1}}(),formData:"FormData"in e,arrayBuffer:"ArrayBuffer"in e};function s(i){return i&&DataView.prototype.isPrototypeOf(i)}if(t.arrayBuffer)var n=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],r=ArrayBuffer.isView||function(i){return i&&n.indexOf(Object.prototype.toString.call(i))>-1};function a(i){if(typeof i!="string"&&(i=String(i)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(i)||i==="")throw new TypeError('Invalid character in header field name: "'+i+'"');return i.toLowerCase()}function c(i){return typeof i!="string"&&(i=String(i)),i}function d(i){var l={next:function(){var h=i.shift();return{done:h===void 0,value:h}}};return t.iterable&&(l[Symbol.iterator]=function(){return l}),l}function u(i){this.map={},i instanceof u?i.forEach(function(l,h){this.append(h,l)},this):Array.isArray(i)?i.forEach(function(l){if(l.length!=2)throw new TypeError("Headers constructor: expected name/value pair to be length 2, found"+l.length);this.append(l[0],l[1])},this):i&&Object.getOwnPropertyNames(i).forEach(function(l){this.append(l,i[l])},this)}u.prototype.append=function(i,l){i=a(i),l=c(l);var h=this.map[i];this.map[i]=h?h+", "+l:l},u.prototype.delete=function(i){delete this.map[a(i)]},u.prototype.get=function(i){return i=a(i),this.has(i)?this.map[i]:null},u.prototype.has=function(i){return this.map.hasOwnProperty(a(i))},u.prototype.set=function(i,l){this.map[a(i)]=c(l)},u.prototype.forEach=function(i,l){for(var h in this.map)this.map.hasOwnProperty(h)&&i.call(l,this.map[h],h,this)},u.prototype.keys=function(){var i=[];return this.forEach(function(l,h){i.push(h)}),d(i)},u.prototype.values=function(){var i=[];return this.forEach(function(l){i.push(l)}),d(i)},u.prototype.entries=function(){var i=[];return this.forEach(function(l,h){i.push([h,l])}),d(i)},t.iterable&&(u.prototype[Symbol.iterator]=u.prototype.entries);function g(i){if(!i._noBody){if(i.bodyUsed)return Promise.reject(new TypeError("Already read"));i.bodyUsed=!0}}function f(i){return new Promise(function(l,h){i.onload=function(){l(i.result)},i.onerror=function(){h(i.error)}})}function w(i){var l=new FileReader,h=f(l);return l.readAsArrayBuffer(i),h}function T(i){var l=new FileReader,h=f(l),y=/charset=([A-Za-z0-9_-]+)/.exec(i.type),v=y?y[1]:"utf-8";return l.readAsText(i,v),h}function L(i){for(var l=new Uint8Array(i),h=new Array(l.length),y=0;y<l.length;y++)h[y]=String.fromCharCode(l[y]);return h.join("")}function A(i){if(i.slice)return i.slice(0);var l=new Uint8Array(i.byteLength);return l.set(new Uint8Array(i)),l.buffer}function z(){return this.bodyUsed=!1,this._initBody=function(i){this.bodyUsed=this.bodyUsed,this._bodyInit=i,i?typeof i=="string"?this._bodyText=i:t.blob&&Blob.prototype.isPrototypeOf(i)?this._bodyBlob=i:t.formData&&FormData.prototype.isPrototypeOf(i)?this._bodyFormData=i:t.searchParams&&URLSearchParams.prototype.isPrototypeOf(i)?this._bodyText=i.toString():t.arrayBuffer&&t.blob&&s(i)?(this._bodyArrayBuffer=A(i.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):t.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(i)||r(i))?this._bodyArrayBuffer=A(i):this._bodyText=i=Object.prototype.toString.call(i):(this._noBody=!0,this._bodyText=""),this.headers.get("content-type")||(typeof i=="string"?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):t.searchParams&&URLSearchParams.prototype.isPrototypeOf(i)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},t.blob&&(this.blob=function(){var i=g(this);if(i)return i;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))}),this.arrayBuffer=function(){if(this._bodyArrayBuffer){var i=g(this);return i||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer))}else{if(t.blob)return this.blob().then(w);throw new Error("could not read as ArrayBuffer")}},this.text=function(){var i=g(this);if(i)return i;if(this._bodyBlob)return T(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(L(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},t.formData&&(this.formData=function(){return this.text().then(we)}),this.json=function(){return this.text().then(JSON.parse)},this}var ve=["CONNECT","DELETE","GET","HEAD","OPTIONS","PATCH","POST","PUT","TRACE"];function be(i){var l=i.toUpperCase();return ve.indexOf(l)>-1?l:i}function C(i,l){if(!(this instanceof C))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');l=l||{};var h=l.body;if(i instanceof C){if(i.bodyUsed)throw new TypeError("Already read");this.url=i.url,this.credentials=i.credentials,l.headers||(this.headers=new u(i.headers)),this.method=i.method,this.mode=i.mode,this.signal=i.signal,!h&&i._bodyInit!=null&&(h=i._bodyInit,i.bodyUsed=!0)}else this.url=String(i);if(this.credentials=l.credentials||this.credentials||"same-origin",(l.headers||!this.headers)&&(this.headers=new u(l.headers)),this.method=be(l.method||this.method||"GET"),this.mode=l.mode||this.mode||null,this.signal=l.signal||this.signal||function(){if("AbortController"in e){var m=new AbortController;return m.signal}}(),this.referrer=null,(this.method==="GET"||this.method==="HEAD")&&h)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(h),(this.method==="GET"||this.method==="HEAD")&&(l.cache==="no-store"||l.cache==="no-cache")){var y=/([?&])_=[^&]*/;if(y.test(this.url))this.url=this.url.replace(y,"$1_="+new Date().getTime());else{var v=/\?/;this.url+=(v.test(this.url)?"&":"?")+"_="+new Date().getTime()}}}C.prototype.clone=function(){return new C(this,{body:this._bodyInit})};function we(i){var l=new FormData;return i.trim().split("&").forEach(function(h){if(h){var y=h.split("="),v=y.shift().replace(/\+/g," "),m=y.join("=").replace(/\+/g," ");l.append(decodeURIComponent(v),decodeURIComponent(m))}}),l}function xe(i){var l=new u,h=i.replace(/\r?\n[\t ]+/g," ");return h.split("\r").map(function(y){return y.indexOf(`
`)===0?y.substr(1,y.length):y}).forEach(function(y){var v=y.split(":"),m=v.shift().trim();if(m){var _=v.join(":").trim();try{l.append(m,_)}catch(Q){console.warn("Response "+Q.message)}}}),l}z.call(C.prototype);function S(i,l){if(!(this instanceof S))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');if(l||(l={}),this.type="default",this.status=l.status===void 0?200:l.status,this.status<200||this.status>599)throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");this.ok=this.status>=200&&this.status<300,this.statusText=l.statusText===void 0?"":""+l.statusText,this.headers=new u(l.headers),this.url=l.url||"",this._initBody(i)}z.call(S.prototype),S.prototype.clone=function(){return new S(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new u(this.headers),url:this.url})},S.error=function(){var i=new S(null,{status:200,statusText:""});return i.ok=!1,i.status=0,i.type="error",i};var ke=[301,302,303,307,308];S.redirect=function(i,l){if(ke.indexOf(l)===-1)throw new RangeError("Invalid status code");return new S(null,{status:l,headers:{location:i}})},o.DOMException=e.DOMException;try{new o.DOMException}catch(i){o.DOMException=function(l,h){this.message=l,this.name=h;var y=Error(l);this.stack=y.stack},o.DOMException.prototype=Object.create(Error.prototype),o.DOMException.prototype.constructor=o.DOMException}function Y(i,l){return new Promise(function(h,y){var v=new C(i,l);if(v.signal&&v.signal.aborted)return y(new o.DOMException("Aborted","AbortError"));var m=new XMLHttpRequest;function _(){m.abort()}m.onload=function(){var b={statusText:m.statusText,headers:xe(m.getAllResponseHeaders()||"")};v.url.indexOf("file://")===0&&(m.status<200||m.status>599)?b.status=200:b.status=m.status,b.url="responseURL"in m?m.responseURL:b.headers.get("X-Request-URL");var E="response"in m?m.response:m.responseText;setTimeout(function(){h(new S(E,b))},0)},m.onerror=function(){setTimeout(function(){y(new TypeError("Network request failed"))},0)},m.ontimeout=function(){setTimeout(function(){y(new TypeError("Network request timed out"))},0)},m.onabort=function(){setTimeout(function(){y(new o.DOMException("Aborted","AbortError"))},0)};function Q(b){try{return b===""&&e.location.href?e.location.href:b}catch(E){return b}}if(m.open(v.method,Q(v.url),!0),v.credentials==="include"?m.withCredentials=!0:v.credentials==="omit"&&(m.withCredentials=!1),"responseType"in m&&(t.blob?m.responseType="blob":t.arrayBuffer&&(m.responseType="arraybuffer")),l&&typeof l.headers=="object"&&!(l.headers instanceof u||e.Headers&&l.headers instanceof e.Headers)){var de=[];Object.getOwnPropertyNames(l.headers).forEach(function(b){de.push(a(b)),m.setRequestHeader(b,c(l.headers[b]))}),v.headers.forEach(function(b,E){de.indexOf(E)===-1&&m.setRequestHeader(E,b)})}else v.headers.forEach(function(b,E){m.setRequestHeader(E,b)});v.signal&&(v.signal.addEventListener("abort",_),m.onreadystatechange=function(){m.readyState===4&&v.signal.removeEventListener("abort",_)}),m.send(typeof v._bodyInit=="undefined"?null:v._bodyInit)})}Y.polyfill=!0,e.fetch||(e.fetch=Y,e.Headers=u,e.Request=C,e.Response=S),o.Headers=u,o.Request=C,o.Response=S,o.fetch=Y,Object.defineProperty(o,"__esModule",{value:!0})})});var Je={};$e(Je,{default:()=>G});module.exports=Re(Je);var p=require("obsidian");var x=require("obsidian"),R="jarvis-view";async function je(o,e){try{await navigator.clipboard.writeText(o);let t=e.innerHTML;e.innerHTML="",(0,x.setIcon)(e,"check"),e.addClass("jarvis-copy-success"),new x.Notice("Copied to clipboard!"),setTimeout(()=>{e.innerHTML="",(0,x.setIcon)(e,"copy"),e.removeClass("jarvis-copy-success")},1500)}catch(t){new x.Notice("Failed to copy")}}var V=class extends x.ItemView{constructor(t,s){super(t);this.conversation=[];this.isProcessing=!1;this.autocompleteContainer=null;this.plugin=s}getViewType(){return R}getDisplayText(){return"Jarvis AI"}getIcon(){return"bot"}async onOpen(){let t=this.containerEl.children[1];t.empty(),t.addClass("jarvis-container");let s=t.createDiv({cls:"jarvis-header"});s.createEl("h4",{text:"Jarvis AI Assistant"});let n=s.createDiv({cls:"jarvis-mode-container"});this.modeSelect=n.createEl("select",{cls:"jarvis-mode-select"}),this.modeSelect.createEl("option",{value:"chat",text:"Chat"}),this.modeSelect.createEl("option",{value:"research",text:"Research"}),this.modeSelect.createEl("option",{value:"plan",text:"Plan"}),this.modeSelect.createEl("option",{value:"summarize",text:"Summarize"}),this.modeSelect.createEl("option",{value:"task",text:"Task"}),this.modeSelect.createEl("option",{value:"vision",text:"Vision"}),this.modeSelect.createEl("option",{value:"pageassist",text:"Page Assist"}),this.modeSelect.createEl("option",{value:"rag",text:"RAG Search"});let r=t.createDiv({cls:"jarvis-action-bar"});r.createEl("button",{cls:"jarvis-action-btn",text:"Clear"}).addEventListener("click",()=>this.clearConversation()),r.createEl("button",{cls:"jarvis-action-btn",text:"Add Context"}).addEventListener("click",()=>this.addCurrentNoteContext()),r.createEl("button",{cls:"jarvis-action-btn",text:"Export"}).addEventListener("click",()=>this.exportConversation()),this.chatContainer=t.createDiv({cls:"jarvis-chat-container"}),this.addSystemMessage("Hello! I'm Jarvis, your PKM AI assistant. How can I help you today?\n\n**Quick Commands (type `/` for autocomplete):**\n- `/summarize` - Summarize current note\n- `/plan` - Break down a goal\n- `/similar` - Find related notes\n- `/link` - Suggest links\n- `/tag` - Suggest tags\n- `/research` - Web search\n- `/help` - Show all commands\n\n**Modes:** Chat \u2022 Research \u2022 Plan \u2022 RAG Search \u2022 Page Assist"),this.inputContainer=t.createDiv({cls:"jarvis-input-container"}),this.inputField=this.inputContainer.createEl("textarea",{cls:"jarvis-input-field",attr:{placeholder:"Ask Jarvis anything...",rows:"3"}}),this.inputField.addEventListener("keydown",f=>{var w;f.key==="Enter"&&!f.shiftKey?(f.preventDefault(),this.hideAutocomplete(),this.sendMessage()):f.key==="Escape"?this.hideAutocomplete():f.key==="Tab"&&((w=this.autocompleteContainer)==null?void 0:w.style.display)!=="none"&&(f.preventDefault(),this.selectFirstSuggestion())}),this.inputField.addEventListener("input",()=>{this.handleAutocomplete()});let u=this.inputContainer.createDiv({cls:"jarvis-button-container"}),g=u.createEl("button",{cls:"jarvis-image-btn"});(0,x.setIcon)(g,"image"),g.addEventListener("click",()=>this.uploadImage()),this.sendButton=u.createEl("button",{cls:"jarvis-send-btn",text:"Send"}),this.sendButton.addEventListener("click",()=>this.sendMessage()),this.addStyles()}addStyles(){let t=document.createElement("style");t.textContent=`
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
    `,document.head.appendChild(t)}addSystemMessage(t){let s=this.chatContainer.createDiv({cls:"jarvis-message jarvis-message-system"});x.MarkdownRenderer.renderMarkdown(t,s,"",this.plugin)}addMessage(t,s){let n={role:t,content:s,timestamp:new Date};this.conversation.push(n);let r=this.chatContainer.createDiv({cls:`jarvis-message jarvis-message-${t}`}),a=r.createDiv({cls:"jarvis-message-header"});a.createSpan({cls:"jarvis-message-role"}).setText(t==="user"?"You":"Jarvis");let d=a.createEl("button",{cls:"jarvis-copy-btn"});(0,x.setIcon)(d,"copy"),d.setAttribute("aria-label","Copy message"),d.addEventListener("click",()=>je(s,d));let u=r.createDiv({cls:"jarvis-message-content"});t==="assistant"?x.MarkdownRenderer.renderMarkdown(s,u,"",this.plugin):u.createDiv({text:s}),r.createDiv({cls:"jarvis-message-time"}).setText(n.timestamp.toLocaleTimeString()),this.chatContainer.scrollTop=this.chatContainer.scrollHeight}createLoadingMessage(){let t=this.chatContainer.createDiv({cls:"jarvis-message jarvis-message-assistant jarvis-loading"});return t.setText("Thinking..."),this.chatContainer.scrollTop=this.chatContainer.scrollHeight,t}async sendMessage(){var n;let t=this.inputField.value.trim();if(!t||this.isProcessing)return;if(this.isProcessing=!0,this.sendButton.disabled=!0,this.inputField.value="",(n=this.plugin.slashCommands)!=null&&n.isSlashCommand(t)){this.addMessage("user",t);let r=this.createLoadingMessage();try{let a=await this.plugin.slashCommands.execute(t);r.remove(),this.addMessage("assistant",a.content)}catch(a){r.remove(),this.addMessage("assistant",`\u274C Command error: ${a.message}`),console.error("Slash command error:",a)}finally{this.isProcessing=!1,this.sendButton.disabled=!1,this.inputField.focus()}return}this.addMessage("user",t);let s=this.createLoadingMessage();try{let r=this.modeSelect.value,a;switch(r){case"research":a=await this.handleResearch(t);break;case"plan":a=await this.plugin.ollama.decomposePlan(t);break;case"summarize":a=await this.plugin.ollama.summarize(t,"bullets");break;case"task":a=`**TaskWarrior Command:**
\`\`\`
${await this.plugin.ollama.generateTaskWarriorCommand(t)}
\`\`\`

Copy and run this command to create the task.`;break;case"pageassist":a=await this.handlePageAssist(t);break;case"rag":a=await this.handleRAGSearch(t);break;default:let d=this.buildConversationHistory();d.push({role:"user",content:t}),a=await this.plugin.ollama.chat(d)}s.remove(),this.addMessage("assistant",a)}catch(r){s.remove(),this.addMessage("assistant",`Error: ${r.message}`),console.error("Jarvis error:",r)}finally{this.isProcessing=!1,this.sendButton.disabled=!1,this.inputField.focus()}}buildConversationHistory(){let s=[{role:"system",content:`You are Jarvis, an AI assistant integrated into Obsidian. You help with:
- Answering questions about notes and knowledge
- Planning and task management
- Summarizing content
- Suggesting connections between ideas
- General knowledge assistance

Be concise, helpful, and format responses with Markdown when appropriate.`}],n=this.conversation.slice(-10);for(let r of n)s.push({role:r.role,content:r.content});return s}async addCurrentNoteContext(){let t=await this.plugin.vault.getActiveNoteContent();if(t){let s=t.length>2e3?t.substring(0,2e3)+"...":t;this.inputField.value=`Context from current note:

${s}

Question: `,this.inputField.focus()}else this.addSystemMessage("No active note to add as context.")}async uploadImage(){if(!this.plugin.settings.enableVision){this.addSystemMessage("Vision mode is disabled in settings.");return}let t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async s=>{var a;let n=(a=s.target.files)==null?void 0:a[0];if(!n)return;let r=new FileReader;r.onload=async()=>{let c=r.result.split(",")[1];this.isProcessing=!0,this.sendButton.disabled=!0,this.addMessage("user",`[Uploaded image: ${n.name}]`);let d=this.createLoadingMessage();try{let u=this.inputField.value.trim()||"Describe this image in detail.";this.inputField.value="";let g=await this.plugin.ollama.analyzeImage(c,u);d.remove(),this.addMessage("assistant",g)}catch(u){d.remove(),this.addMessage("assistant",`Vision error: ${u.message}`)}finally{this.isProcessing=!1,this.sendButton.disabled=!1}},r.readAsDataURL(n)},t.click()}async handleResearch(t){if(!this.plugin.webResearch)return"\u274C Web Research service not initialized. Please restart the plugin.";let s=t.toLowerCase();if(s.startsWith("fact check")||s.startsWith("verify")){let n=t.replace(/^(fact check|verify)\s*/i,"").trim();try{return await this.plugin.webResearch.factCheck(n)}catch(r){return`\u274C Fact check failed: ${r.message}`}}try{let n=await this.plugin.webResearch.research(t,"thorough"),r=`## Research: ${t}

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

`;for(let c of n){let d=Math.round(c.score*100);r+=`### [[${c.document.metadata.title}]] (${d}%)
`,r+=`> ${c.snippet}

`}let a=await this.plugin.embedding.getContextForQuery(t,2e3);if(a){r+=`---

## AI Answer

`;let c=await this.plugin.ollama.chat([{role:"system",content:"Answer the question based on the provided notes. Be concise and reference notes using [[Note Name]] format."},{role:"user",content:`${a}

Question: ${t}`}]);r+=c}return r}catch(n){return`\u274C Search failed: ${n.message}`}}clearConversation(){this.conversation=[],this.chatContainer.empty(),this.addSystemMessage("Conversation cleared. How can I help you?")}async exportConversation(){if(this.conversation.length===0){this.addSystemMessage("No conversation to export.");return}let t=new Date().toISOString().split("T")[0],s=`# Jarvis Conversation - ${t}

`;for(let r of this.conversation){let a=r.timestamp.toLocaleTimeString();s+=`## ${r.role==="user"?"You":"Jarvis"} (${a})

${r.content}

---

`}let n=`0-Inbox/jarvis-conversation-${t}.md`;await this.plugin.vault.createNote(n,s),this.addSystemMessage(`Conversation exported to: ${n}`)}handleAutocomplete(){let t=this.inputField.value;if(!t.startsWith("/")||t.includes(" ")){this.hideAutocomplete();return}let s=t.substring(1);if(!this.plugin.slashCommands){this.hideAutocomplete();return}let n=this.plugin.slashCommands.getSuggestions(s);if(n.length===0){this.hideAutocomplete();return}this.showAutocomplete(n)}showAutocomplete(t){this.autocompleteContainer||(this.autocompleteContainer=this.inputContainer.createDiv({cls:"jarvis-autocomplete"})),this.autocompleteContainer.empty(),this.autocompleteContainer.style.display="block";for(let s of t){let n=this.autocompleteContainer.createDiv({cls:"jarvis-autocomplete-item"});n.setText(`/${s}`),n.addEventListener("click",()=>{this.inputField.value=`/${s} `,this.inputField.focus(),this.hideAutocomplete()})}}hideAutocomplete(){this.autocompleteContainer&&(this.autocompleteContainer.style.display="none")}selectFirstSuggestion(){if(!this.autocompleteContainer)return;let t=this.autocompleteContainer.querySelector(".jarvis-autocomplete-item");t&&t.click()}async onClose(){}};var j=K(require("fs"),1),ie=require("path");var Ge=K(X(),1),ge="11434",fe=`http://127.0.0.1:${ge}`,Be="0.5.18",Fe=Object.defineProperty,Me=(o,e,t)=>e in o?Fe(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,Z=(o,e,t)=>(Me(o,typeof e!="symbol"?e+"":e,t),t),te=class o extends Error{constructor(e,t){super(e),this.error=e,this.status_code=t,this.name="ResponseError",Error.captureStackTrace&&Error.captureStackTrace(this,o)}},se=class{constructor(e,t,s){Z(this,"abortController"),Z(this,"itr"),Z(this,"doneCallback"),this.abortController=e,this.itr=t,this.doneCallback=s}abort(){this.abortController.abort()}async*[Symbol.asyncIterator](){for await(let e of this.itr){if("error"in e)throw new Error(e.error);if(yield e,e.done||e.status==="success"){this.doneCallback();return}}throw new Error("Did not receive done or success response in stream.")}},ne=async o=>{var s;if(o.ok)return;let e=`Error ${o.status}: ${o.statusText}`,t=null;if((s=o.headers.get("content-type"))!=null&&s.includes("application/json"))try{t=await o.json(),e=t.error||e}catch(n){console.log("Failed to parse error response as JSON")}else try{console.log("Getting text from response"),e=await o.text()||e}catch(n){console.log("Failed to get text from error response")}throw new te(e,o.status)};function Oe(){var o;if(typeof window!="undefined"&&window.navigator){let e=navigator;return"userAgentData"in e&&((o=e.userAgentData)!=null&&o.platform)?`${e.userAgentData.platform.toLowerCase()} Browser/${navigator.userAgent};`:navigator.platform?`${navigator.platform.toLowerCase()} Browser/${navigator.userAgent};`:`unknown Browser/${navigator.userAgent};`}else if(typeof process!="undefined")return`${process.arch} ${process.platform} Node.js/${process.version}`;return""}function Ie(o){if(o instanceof Headers){let e={};return o.forEach((t,s)=>{e[s]=t}),e}else return Array.isArray(o)?Object.fromEntries(o):o||{}}var re=async(o,e,t={})=>{let s={"Content-Type":"application/json",Accept:"application/json","User-Agent":`ollama-js/${Be} (${Oe()})`};t.headers=Ie(t.headers);let n=Object.fromEntries(Object.entries(t.headers).filter(([r])=>!Object.keys(s).some(a=>a.toLowerCase()===r.toLowerCase())));return t.headers={...s,...n},o(e,t)},me=async(o,e,t)=>{let s=await re(o,e,{headers:t==null?void 0:t.headers});return await ne(s),s},$=async(o,e,t,s)=>{let r=(c=>c!==null&&typeof c=="object"&&!Array.isArray(c))(t)?JSON.stringify(t):t,a=await re(o,e,{method:"POST",body:r,signal:s==null?void 0:s.signal,headers:s==null?void 0:s.headers});return await ne(a),a},De=async(o,e,t,s)=>{let n=await re(o,e,{method:"DELETE",body:JSON.stringify(t),headers:s==null?void 0:s.headers});return await ne(n),n},Ne=async function*(o){var n;let e=new TextDecoder("utf-8"),t="",s=o.getReader();for(;;){let{done:r,value:a}=await s.read();if(r)break;t+=e.decode(a);let c=t.split(`
`);t=(n=c.pop())!=null?n:"";for(let d of c)try{yield JSON.parse(d)}catch(u){console.warn("invalid json: ",d)}}for(let r of t.split(`
`).filter(a=>a!==""))try{yield JSON.parse(r)}catch(a){console.warn("invalid json: ",r)}},Le=o=>{if(!o)return fe;let e=o.includes("://");o.startsWith(":")&&(o=`http://127.0.0.1${o}`,e=!0),e||(o=`http://${o}`);let t=new URL(o),s=t.port;s||(e?s=t.protocol==="https:"?"443":"80":s=ge);let n="";t.username&&(n=t.username,t.password&&(n+=`:${t.password}`),n+="@");let r=`${t.protocol}//${n}${t.hostname}:${s}${t.pathname}`;return r.endsWith("/")&&(r=r.slice(0,-1)),r},ze=Object.defineProperty,_e=(o,e,t)=>e in o?ze(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,ee=(o,e,t)=>(_e(o,typeof e!="symbol"?e+"":e,t),t),ae=class{constructor(e){var t,s;ee(this,"config"),ee(this,"fetch"),ee(this,"ongoingStreamedRequests",[]),this.config={host:"",headers:e==null?void 0:e.headers},e!=null&&e.proxy||(this.config.host=Le((t=e==null?void 0:e.host)!=null?t:fe)),this.fetch=(s=e==null?void 0:e.fetch)!=null?s:fetch}abort(){for(let e of this.ongoingStreamedRequests)e.abort();this.ongoingStreamedRequests.length=0}async processStreamableRequest(e,t){var r;t.stream=(r=t.stream)!=null?r:!1;let s=`${this.config.host}/api/${e}`;if(t.stream){let a=new AbortController,c=await $(this.fetch,s,t,{signal:a.signal,headers:this.config.headers});if(!c.body)throw new Error("Missing body");let d=Ne(c.body),u=new se(a,d,()=>{let g=this.ongoingStreamedRequests.indexOf(u);g>-1&&this.ongoingStreamedRequests.splice(g,1)});return this.ongoingStreamedRequests.push(u),u}return await(await $(this.fetch,s,t,{headers:this.config.headers})).json()}async encodeImage(e){if(typeof e!="string"){let t=new Uint8Array(e),s="",n=t.byteLength;for(let r=0;r<n;r++)s+=String.fromCharCode(t[r]);return btoa(s)}return e}async generate(e){return e.images&&(e.images=await Promise.all(e.images.map(this.encodeImage.bind(this)))),this.processStreamableRequest("generate",e)}async chat(e){if(e.messages)for(let t of e.messages)t.images&&(t.images=await Promise.all(t.images.map(this.encodeImage.bind(this))));return this.processStreamableRequest("chat",e)}async create(e){return this.processStreamableRequest("create",{...e})}async pull(e){return this.processStreamableRequest("pull",{name:e.model,stream:e.stream,insecure:e.insecure})}async push(e){return this.processStreamableRequest("push",{name:e.model,stream:e.stream,insecure:e.insecure})}async delete(e){return await De(this.fetch,`${this.config.host}/api/delete`,{name:e.model},{headers:this.config.headers}),{status:"success"}}async copy(e){return await $(this.fetch,`${this.config.host}/api/copy`,{...e},{headers:this.config.headers}),{status:"success"}}async list(){return await(await me(this.fetch,`${this.config.host}/api/tags`,{headers:this.config.headers})).json()}async show(e){return await(await $(this.fetch,`${this.config.host}/api/show`,{...e},{headers:this.config.headers})).json()}async embed(e){return await(await $(this.fetch,`${this.config.host}/api/embed`,{...e},{headers:this.config.headers})).json()}async embeddings(e){return await(await $(this.fetch,`${this.config.host}/api/embeddings`,{...e},{headers:this.config.headers})).json()}async ps(){return await(await me(this.fetch,`${this.config.host}/api/ps`,{headers:this.config.headers})).json()}},Qe=new ae;var Ze=K(X(),1),B=class extends ae{async encodeImage(e){if(typeof e!="string")return Buffer.from(e).toString("base64");try{if(j.default.existsSync(e)){let t=await j.promises.readFile((0,ie.resolve)(e));return Buffer.from(t).toString("base64")}}catch(t){}return e}async fileExists(e){try{return await j.promises.access(e),!0}catch(t){return!1}}async create(e){if(e.from&&await this.fileExists((0,ie.resolve)(e.from)))throw Error("Creating with a local path is not currently supported from ollama-js");return e.stream?super.create(e):super.create(e)}},et=new B;var F=class{constructor(e){this.settings=e,this.client=new B({host:e.ollamaEndpoint})}async checkConnection(){try{return await this.client.list(),!0}catch(e){return console.error("Ollama connection failed:",e),!1}}async listModels(){try{return(await this.client.list()).models.map(t=>t.name)}catch(e){return console.error("Failed to list models:",e),[]}}async chat(e,t){try{return t?await this.streamChat(e,t):(await this.client.chat({model:this.settings.textModel,messages:e.map(n=>({role:n.role,content:n.content})),options:{temperature:this.settings.temperature}})).message.content}catch(s){throw console.error("Chat failed:",s),s}}async streamChat(e,t){let s="",n=await this.client.chat({model:this.settings.textModel,messages:e.map(r=>({role:r.role,content:r.content})),stream:!0,options:{temperature:this.settings.temperature}});for await(let r of n){let a=r.message.content;s+=a,t(a)}return s}async analyzeImage(e,t,s){if(!this.settings.enableVision)throw new Error("Vision is disabled in settings");try{return s?await this.streamVision(e,t,s):(await this.client.chat({model:this.settings.visionModel,messages:[{role:"user",content:t,images:[e]}],options:{temperature:this.settings.temperature}})).message.content}catch(n){throw console.error("Vision analysis failed:",n),n}}async streamVision(e,t,s){let n="",r=await this.client.chat({model:this.settings.visionModel,messages:[{role:"user",content:t,images:[e]}],stream:!0,options:{temperature:this.settings.temperature}});for await(let a of r){let c=a.message.content;n+=c,s(c)}return n}async embed(e){try{return(await this.client.embed({model:this.settings.embeddingModel,input:e})).embeddings[0]}catch(t){throw console.error("Embedding failed:",t),t}}async embedBatch(e){try{return(await this.client.embed({model:this.settings.embeddingModel,input:e})).embeddings}catch(t){throw console.error("Batch embedding failed:",t),t}}async decomposePlan(e){if(!this.settings.enablePlanning)throw new Error("Planning is disabled in settings");return this.chat([{role:"system",content:`You are a planning assistant. Given a goal, break it down into actionable tasks.
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
"work on report for project alpha" -> task add "Work on report" project:alpha`},{role:"user",content:e}])).trim()}};var k=require("obsidian"),H=class{constructor(e){this.app=e}getAllNotes(){return this.app.vault.getMarkdownFiles()}getNoteNames(){return this.getAllNotes().map(e=>e.basename)}getNotesInFolder(e){let t=this.app.vault.getAbstractFileByPath(e);if(!t||!(t instanceof k.TFolder))return[];let s=[];return this.collectNotesRecursive(t,s),s}collectNotesRecursive(e,t){for(let s of e.children)s instanceof k.TFile&&s.extension==="md"?t.push(s):s instanceof k.TFolder&&this.collectNotesRecursive(s,t)}async readNote(e){return this.app.vault.read(e)}async readNoteByPath(e){let t=this.app.vault.getAbstractFileByPath(e);return t instanceof k.TFile?this.app.vault.read(t):null}getActiveNote(){return this.app.workspace.getActiveFile()}async getActiveNoteContent(){let e=this.getActiveNote();return e?this.readNote(e):null}async createNote(e,t){let s=e.substring(0,e.lastIndexOf("/"));s&&await this.ensureFolderExists(s);let n=await this.app.vault.create(e,t);return new k.Notice(`Created note: ${n.basename}`),n}async updateNote(e,t){await this.app.vault.modify(e,t)}async appendToNote(e,t){let s=await this.readNote(e);await this.updateNote(e,s+`
`+t)}async ensureFolderExists(e){this.app.vault.getAbstractFileByPath(e)||await this.app.vault.createFolder(e)}async getNoteMetadata(e){var r;let t=this.app.metadataCache.getFileCache(e),s=(t==null?void 0:t.frontmatter)||{},n=((r=t==null?void 0:t.tags)==null?void 0:r.map(a=>a.tag))||[];return s.tags&&(Array.isArray(s.tags)?n.push(...s.tags.map(a=>`#${a}`)):typeof s.tags=="string"&&n.push(`#${s.tags}`)),{path:e.path,name:e.name,basename:e.basename,extension:e.extension,created:e.stat.ctime,modified:e.stat.mtime,size:e.stat.size,tags:[...new Set(n)],frontmatter:s}}async searchNotes(e){let t=[],s=this.getAllNotes(),n=e.toLowerCase();for(let r of s){let a=await this.readNote(r),c=a.toLowerCase();if(c.includes(n)){let u=a.split(`
`).filter(w=>w.toLowerCase().includes(n)).slice(0,3),f=(c.match(new RegExp(n,"g"))||[]).length/a.length*1e3;t.push({file:r,matches:u,score:f})}}return t.sort((r,a)=>a.score-r.score)}getRecentNotes(e=10){return this.getAllNotes().sort((t,s)=>s.stat.mtime-t.stat.mtime).slice(0,e)}getNotesByTag(e){var n;let t=e.startsWith("#")?e:`#${e}`,s=[];for(let r of this.getAllNotes()){let a=this.app.metadataCache.getFileCache(r),c=((n=a==null?void 0:a.tags)==null?void 0:n.map(u=>u.tag))||[],d=a==null?void 0:a.frontmatter;d!=null&&d.tags&&(Array.isArray(d.tags)?c.push(...d.tags.map(u=>`#${u}`)):typeof d.tags=="string"&&c.push(`#${d.tags}`)),c.includes(t)&&s.push(r)}return s}getBacklinks(e){let t=[],s=this.app.metadataCache.resolvedLinks;for(let[n,r]of Object.entries(s))if(r[e.path]){let a=this.app.vault.getAbstractFileByPath(n);a instanceof k.TFile&&t.push(a)}return t}getOutgoingLinks(e){let t=[],s=this.app.metadataCache.resolvedLinks[e.path];if(s)for(let n of Object.keys(s)){let r=this.app.vault.getAbstractFileByPath(n);r instanceof k.TFile&&t.push(r)}return t}async createDailyNote(){let e=new Date,t=e.toISOString().split("T")[0],s=`0-Inbox/${t}.md`,n=this.app.vault.getAbstractFileByPath(s);if(n instanceof k.TFile)return n;let r=`# ${t}

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
`;return this.createNote(n,a)}getAllTags(){var t;let e=new Set;for(let s of this.getAllNotes()){let n=this.app.metadataCache.getFileCache(s);(t=n==null?void 0:n.tags)==null||t.forEach(a=>e.add(a.tag));let r=n==null?void 0:n.frontmatter;r!=null&&r.tags&&(Array.isArray(r.tags)?r.tags.forEach(a=>e.add(`#${a}`)):typeof r.tags=="string"&&e.add(`#${r.tags}`))}return[...e].sort()}getVaultStats(){let e=this.getAllNotes(),t=this.getAllTags(),s=0,n=this.app.metadataCache.resolvedLinks;for(let r of Object.values(n))s+=Object.keys(r).length;return{totalNotes:e.length,totalTags:t.length,totalLinks:s}}async readFile(e){let t=this.app.vault.getAbstractFileByPath(e);return t instanceof k.TFile?this.app.vault.read(t):null}async writeFile(e,t){let s=this.app.vault.getAbstractFileByPath(e);if(s instanceof k.TFile)await this.app.vault.modify(s,t);else{let n=e.substring(0,e.lastIndexOf("/"));n&&await this.ensureFolderExists(n),await this.app.vault.create(e,t)}}getAllMarkdownFiles(){return this.getAllNotes().map(e=>e.path)}};var Ue={chunkSize:500,chunkOverlap:50,minChunkSize:100},M=class{constructor(e,t,s){this.index=new Map;this.isIndexing=!1;this.ollama=e,this.vault=t,this.app=s,this.indexPath=".jarvis/embeddings.json"}async initialize(){await this.loadIndex()}async loadIndex(){try{let e=await this.vault.readFile(this.indexPath);if(e){let t=JSON.parse(e);this.index=new Map(Object.entries(t)),console.log(`Loaded ${this.index.size} embeddings from index`)}}catch(e){console.log("No existing embedding index found, starting fresh"),this.index=new Map}}async saveIndex(){let e=Object.fromEntries(this.index);await this.vault.writeFile(this.indexPath,JSON.stringify(e,null,2))}async indexNote(e,t=!1){try{let s=await this.vault.readFile(e);if(!s||s.trim().length===0)return!1;let n=this.app.vault.getAbstractFileByPath(e);if(!n||!("stat"in n))return!1;let r=this.index.get(e),a=n.stat.mtime;if(!t&&r&&r.timestamp>=a)return!1;let c=this.extractMetadata(e,s),d=this.chunkContent(s),u=this.prepareEmbeddingText(c.title,s,c.tags),g=await this.ollama.embed(u),f={id:this.generateId(e),path:e,content:s.substring(0,5e3),embedding:g,metadata:c,timestamp:a};return this.index.set(e,f),!0}catch(s){return console.error(`Failed to index ${e}:`,s),!1}}async indexVault(e){if(this.isIndexing)throw new Error("Indexing already in progress");this.isIndexing=!0;let t=0;try{let s=await this.vault.getAllMarkdownFiles(),n=s.length;for(let r=0;r<s.length;r++){let a=s[r];if(e&&e(r+1,n),a.includes("/templates/")||a.startsWith("templates/"))continue;await this.indexNote(a)&&t++,t%10===0&&(await this.saveIndex(),await this.sleep(100))}return await this.saveIndex(),t}finally{this.isIndexing=!1}}async search(e,t=5,s=.3){if(this.index.size===0)return[];let n=await this.ollama.embed(e),r=[];for(let a of this.index.values()){let c=this.cosineSimilarity(n,a.embedding);c>=s&&r.push({document:a,score:c,snippet:this.extractSnippet(a.content,e)})}return r.sort((a,c)=>c.score-a.score),r.slice(0,t)}async findSimilar(e,t=5,s=.5){let n=this.index.get(e);if(!n)return[];let r=[];for(let a of this.index.values()){if(a.path===e)continue;let c=this.cosineSimilarity(n.embedding,a.embedding);c>=s&&r.push({document:a,score:c,snippet:this.extractSnippet(a.content,n.metadata.title)})}return r.sort((a,c)=>c.score-a.score),r.slice(0,t)}async getContextForQuery(e,t=2e3){let s=await this.search(e,3,.3);if(s.length===0)return"";let n=`**Relevant notes from your vault:**

`,r=0,a=4;for(let c of s){let d=`### [[${c.document.metadata.title}]]
${c.snippet}

`,u=d.length/a;if(r+u>t)break;n+=d,r+=u}return n}removeFromIndex(e){return this.index.delete(e)}clearIndex(){this.index.clear()}getIndexStats(){if(this.index.size===0)return{totalDocuments:0,averageEmbeddingSize:0,oldestTimestamp:0};let e=0,t=Date.now();for(let s of this.index.values())e+=s.embedding.length,s.timestamp<t&&(t=s.timestamp);return{totalDocuments:this.index.size,averageEmbeddingSize:e/this.index.size,oldestTimestamp:t}}extractMetadata(e,t){var w;let s=((w=e.split("/").pop())==null?void 0:w.replace(".md",""))||e,n=/#([a-zA-Z0-9_-]+)/g,r=[],a;for(;(a=n.exec(t))!==null;)r.push(a[1]);let c=/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g,d=[];for(;(a=c.exec(t))!==null;)d.push(a[1]);let u=t.split(/\s+/).length,g,f=t.match(/^---\n([\s\S]*?)\n---/);if(f)try{g=this.parseYamlFrontmatter(f[1])}catch(T){}return{title:s,tags:r,links:d,wordCount:u,frontmatter:g}}parseYamlFrontmatter(e){let t={},s=e.split(`
`);for(let n of s){let r=n.indexOf(":");if(r>0){let a=n.substring(0,r).trim(),c=n.substring(r+1).trim();t[a]=c}}return t}prepareEmbeddingText(e,t,s){let n=t.replace(/^---\n[\s\S]*?\n---\n?/,"").replace(/```[\s\S]*?```/g,"").replace(/!\[\[.*?\]\]/g,"").replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,"$2 $1").trim();n.length>3e3&&(n=n.substring(0,3e3));let r=s.length>0?`Tags: ${s.join(", ")}`:"";return`Title: ${e}
${r}

${n}`}chunkContent(e,t=Ue){let{chunkSize:s,chunkOverlap:n,minChunkSize:r}=t,a=[],c=e.split(/\n\n+/),d="";for(let u of c)if(d.length+u.length<=s)d+=(d?`

`:"")+u;else{d.length>=r&&a.push(d);let g=d.slice(-n);d=g+(g?`

`:"")+u}return d.length>=r&&a.push(d),a}extractSnippet(e,t,s=300){let n=e.toLowerCase(),r=t.toLowerCase().split(/\s+/),a=0;for(let g of r){let f=n.indexOf(g);if(f!==-1){a=f;break}}let c=Math.max(0,a-s/2),d=Math.min(e.length,c+s),u=e.substring(c,d);return c>0&&(u="..."+u),d<e.length&&(u=u+"..."),u.trim()}cosineSimilarity(e,t){if(e.length!==t.length)return 0;let s=0,n=0,r=0;for(let a=0;a<e.length;a++)s+=e[a]*t[a],n+=e[a]*e[a],r+=t[a]*t[a];return n===0||r===0?0:s/(Math.sqrt(n)*Math.sqrt(r))}generateId(e){let t=0;for(let s=0;s<e.length;s++){let n=e.charCodeAt(s);t=(t<<5)-t+n,t=t&t}return Math.abs(t).toString(36)}sleep(e){return new Promise(t=>setTimeout(t,e))}};var ye=require("obsidian"),O=class{constructor(e){this.cache=new Map;this.cacheExpiry=1e3*60*30;this.ollama=e}async fetchPage(e){let t=this.cache.get(e);if(t&&Date.now()-t.timestamp<this.cacheExpiry)return t;try{let n=(await(0,ye.requestUrl)({url:e,method:"GET",headers:{"User-Agent":"Mozilla/5.0 (compatible; ObsidianJarvis/1.0)",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"}})).text,r=this.parseHtml(n,e);return this.cache.set(e,r),r}catch(s){throw new Error(`Failed to fetch page: ${s.message}`)}}parseHtml(e,t){let s=e.match(/<title[^>]*>([^<]*)<\/title>/i),n=s?this.decodeHtmlEntities(s[1].trim()):"Untitled",r=e.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i),a=r?this.decodeHtmlEntities(r[1]):void 0,c=e.replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi,"").replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi,"").replace(/<header[^>]*>[\s\S]*?<\/header>/gi,"").replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi,"").replace(/<!--[\s\S]*?-->/g,""),d=c,u=c.match(/<article[^>]*>([\s\S]*?)<\/article>/i),g=c.match(/<main[^>]*>([\s\S]*?)<\/main>/i);u?d=u[1]:g&&(d=g[1]);let f=this.htmlToText(d),w=/<a[^>]*href=["']([^"'#][^"']*)["'][^>]*>/gi,T=[],L;for(;(L=w.exec(e))!==null&&T.length<20;){let A=L[1];if(A.startsWith("http"))T.push(A);else if(A.startsWith("/")){let z=new URL(t);T.push(`${z.origin}${A}`)}}return{url:t,title:n,content:f.substring(0,1e4),description:a,links:[...new Set(T)],timestamp:Date.now()}}htmlToText(e){return e.replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi,`

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
`}clearCache(){this.cache.clear()}};var W=require("obsidian"),I=class{constructor(e,t="http://localhost:8888"){this.ollama=e,this.searxngUrl=t}async search(e,t=5){try{return await this.searchSearxng(e,t)}catch(s){console.log("SearXNG not available, trying DuckDuckGo...")}try{return await this.searchDuckDuckGo(e,t)}catch(s){console.log("DuckDuckGo failed, trying Google...")}return await this.searchGoogle(e,t)}async searchSearxng(e,t){let s=`${this.searxngUrl}/search?q=${encodeURIComponent(e)}&format=json&categories=general`,n=await(0,W.requestUrl)({url:s,method:"GET",headers:{Accept:"application/json"}});return(JSON.parse(n.text).results||[]).slice(0,t).map(a=>({title:a.title,url:a.url,snippet:a.content}))}async searchDuckDuckGo(e,t){let s=`https://api.duckduckgo.com/?q=${encodeURIComponent(e)}&format=json&no_redirect=1`,n=await(0,W.requestUrl)({url:s,method:"GET",headers:{Accept:"application/json"}}),r=JSON.parse(n.text),a=[];if(r.Abstract&&a.push({title:r.Heading||e,url:r.AbstractURL||"",snippet:r.Abstract}),r.RelatedTopics)for(let c of r.RelatedTopics.slice(0,t-1))c.Text&&c.FirstURL&&a.push({title:c.Text.substring(0,60)+"...",url:c.FirstURL,snippet:c.Text});return a.slice(0,t)}async searchGoogle(e,t){return console.warn("Google search requires API key configuration"),[]}async research(e,t="quick"){let s=t==="thorough"?8:4,n=await this.search(e,s);if(n.length===0)return this.researchWithAI(e);let r=[];for(let f of n.slice(0,3))try{let w=await this.fetchPageContent(f.url);r.push(`Source: ${f.title}
URL: ${f.url}

${w}`)}catch(w){r.push(`Source: ${f.title}
${f.snippet}`)}let a=`You are a research assistant. Synthesize information from the provided sources to answer the query.

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
- Topic 2`,c=`Query: ${e}

Sources:
${r.join(`

---

`)}

Synthesize this information:`,d=await this.ollama.chat([{role:"system",content:a},{role:"user",content:c}]),u=this.extractBulletPoints(d,"Key Findings"),g=this.extractBulletPoints(d,"Related Topics");return{query:e,summary:d,sources:n,keyFindings:u,relatedQueries:g}}async researchWithAI(e){let s=await this.ollama.chat([{role:"system",content:`You are a knowledgeable research assistant. The user is asking about a topic but web search is unavailable.
Provide the best answer you can based on your training data.
Be honest about the limitations and suggest how they could verify the information.`},{role:"user",content:e}]);return{query:e,summary:s+`

*Note: This answer is based on AI knowledge and was not verified with live web search.*`,sources:[],keyFindings:[],relatedQueries:[]}}async fetchPageContent(e){let t=await(0,W.requestUrl)({url:e,method:"GET",headers:{"User-Agent":"Mozilla/5.0 (compatible; ObsidianResearch/1.0)",Accept:"text/html"}});return this.htmlToText(t.text).substring(0,3e3)}htmlToText(e){return e.replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi,"").replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim()}extractBulletPoints(e,t){let s=new RegExp(`##\\s*${t}[\\s\\S]*?(?=##|$)`,"i"),n=e.match(s);return n?n[0].split(`
`).filter(r=>r.trim().startsWith("-")).map(r=>r.replace(/^-\s*/,"").trim()).filter(r=>r.length>0):[]}async quickAnswer(e){return(await this.research(e,"quick")).summary}async factCheck(e){let t=`You are a fact-checker. Analyze the claim and search results.
Rate the claim as: TRUE, FALSE, PARTIALLY TRUE, or UNVERIFIED.
Explain your reasoning and cite sources.`,s=await this.search(e,5);if(s.length===0)return`**Claim:** ${e}

**Verdict:** UNVERIFIED

Unable to verify this claim with live web search. Please check reliable sources manually.`;let n=s.map(a=>`- ${a.title}: ${a.snippet}`).join(`
`);return await this.ollama.chat([{role:"system",content:t},{role:"user",content:`Claim: ${e}

Search Results:
${n}`}])}};var D=require("obsidian"),N=class{constructor(e){this.commands=new Map;this.plugin=e,this.registerBuiltinCommands()}registerBuiltinCommands(){this.register({name:"summarize",aliases:["sum","s"],description:"Summarize current note or provided text",usage:"/summarize [optional text]",execute:async(e,t)=>{let s=e.trim();if(!s){let r=await t.vault.getActiveNoteContent();if(!r)return{content:"\u274C No active note and no text provided. Open a note or provide text to summarize.",type:"error"};s=r}return{content:`## Summary

${await t.ollama.summarize(s,"bullets")}`,type:"response"}}}),this.register({name:"plan",aliases:["p","breakdown"],description:"Break down a goal into actionable steps",usage:"/plan <goal description>",execute:async(e,t)=>{if(!e.trim())return{content:"\u274C Please provide a goal to plan. Usage: `/plan Write a blog post about productivity`",type:"error"};let s=await t.ollama.decomposePlan(e);return{content:`## Plan: ${e}

${s}`,type:"response"}}}),this.register({name:"task",aliases:["t","todo"],description:"Convert natural language to TaskWarrior command",usage:"/task <task description in natural language>",execute:async(e,t)=>e.trim()?{content:`## TaskWarrior Command

\`\`\`bash
${await t.ollama.generateTaskWarriorCommand(e)}
\`\`\`

Copy and run this command in your terminal.`,type:"response"}:{content:"\u274C Please describe the task. Usage: `/task review PRs by tomorrow with high priority`",type:"error"}}),this.register({name:"link",aliases:["links","suggest-links"],description:"Suggest relevant links for the current note",usage:"/link",execute:async(e,t)=>{let s=await t.vault.getActiveNoteContent();if(!s)return{content:"\u274C No active note. Open a note to get link suggestions.",type:"error"};let n=t.app.workspace.getActiveFile(),r=(n==null?void 0:n.path)||"";if(t.embedding)try{let c=(await t.embedding.search(s.substring(0,500),5,.3)).filter(u=>u.document.path!==r);if(c.length===0)return{content:"\u{1F50D} No related notes found. Try indexing your vault with `/index` first.",type:"response"};let d=`## Suggested Links

These notes might be relevant:

`;for(let u of c.slice(0,5)){let g=Math.round(u.score*100);d+=`- [[${u.document.metadata.title}]] (${g}% match)
`,d+=`  > ${u.snippet.substring(0,100)}...

`}return{content:d,type:"response"}}catch(a){return{content:"\u274C RAG search failed. Try `/index` to rebuild the index.",type:"error"}}return{content:"\u274C Embedding service not available. Please restart the plugin.",type:"error"}}}),this.register({name:"tag",aliases:["tags","suggest-tags"],description:"Suggest tags for the current note",usage:"/tag",execute:async(e,t)=>{let s=await t.vault.getActiveNoteContent();return s?{content:`## Suggested Tags

${(await t.ollama.chat([{role:"system",content:`You are a tagging assistant. Analyze the note content and suggest 3-7 relevant tags.
Format: Return only a comma-separated list of tags (without #).
Focus on: topic, type of content, project, area, and status.
Example: productivity, pkm, review, project/jarvis, status/active`},{role:"user",content:s.substring(0,2e3)}])).split(",").map(a=>`#${a.trim()}`).join(" ")}

*Click to copy and paste into your note.*`,type:"response"}:{content:"\u274C No active note. Open a note to get tag suggestions.",type:"error"}}}),this.register({name:"flashcard",aliases:["fc","card"],description:"Create a flashcard from text",usage:"/flashcard <text to convert to flashcard>",execute:async(e,t)=>{let s=e.trim();if(!s){let r=t.app.workspace.getActiveViewOfType(D.MarkdownView);r&&(s=r.editor.getSelection())}return s?{content:`## Flashcard

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

`;for(let a of n){let c=Math.round(a.score*100);r+=`### [[${a.document.metadata.title}]] (${c}%)
`,r+=`> ${a.snippet}

`}return{content:r,type:"response"}}catch(n){return{content:`\u274C Search failed: ${n.message}`,type:"error"}}}}),this.register({name:"index",aliases:["reindex","rebuild"],description:"Rebuild the semantic search index",usage:"/index",execute:async(e,t)=>{if(!t.embedding)return{content:"\u274C Embedding service not available.",type:"error"};new D.Notice("Indexing vault... This may take a while.");try{return{content:`\u2705 Successfully indexed ${await t.embedding.indexVault((n,r)=>{})} notes!

You can now use semantic search with \`/similar\` or \`/link\`.`,type:"response"}}catch(s){return{content:`\u274C Indexing failed: ${s.message}`,type:"error"}}}}),this.register({name:"explain",aliases:["x","what","define"],description:"Explain a concept or selected text",usage:"/explain <concept or text>",execute:async(e,t)=>{let s=e.trim();if(!s){let r=t.app.workspace.getActiveViewOfType(D.MarkdownView);r&&(s=r.editor.getSelection())}return s?{content:`## Explanation

${await t.ollama.chat([{role:"system",content:"Explain the following concept or text clearly and concisely. Use bullet points if helpful. If it's a term, provide definition, context, and examples."},{role:"user",content:s}])}`,type:"response"}:{content:"\u274C Please provide text to explain or select text in the editor.",type:"error"}}}),this.register({name:"help",aliases:["?","commands"],description:"Show available slash commands",usage:"/help",execute:async()=>{let e=`## Jarvis Slash Commands

`;e+=`| Command | Description | Usage |
`,e+=`|---------|-------------|-------|
`;let t=Array.from(this.commands.values()),s=new Set;for(let n of t){if(s.has(n.name))continue;s.add(n.name);let r=n.aliases.map(a=>`/${a}`).join(", ");e+=`| \`/${n.name}\` | ${n.description} | \`${n.usage}\` |
`}e+=`
### Aliases
`;for(let n of t)s.has(`alias-${n.name}`)||(s.add(`alias-${n.name}`),n.aliases.length>0&&(e+=`- \`/${n.name}\`: ${n.aliases.map(r=>`\`/${r}\``).join(", ")}
`));return{content:e,type:"response"}}})}register(e){this.commands.set(e.name,e);for(let t of e.aliases)this.commands.set(t,e)}isSlashCommand(e){return e.trim().startsWith("/")}parseCommand(e){let t=e.trim();if(!t.startsWith("/"))return null;let s=t.match(/^\/(\S+)\s*([\s\S]*)?$/);return s?{command:s[1].toLowerCase(),args:s[2]||""}:null}async execute(e){let t=this.parseCommand(e);if(!t)return{content:"\u274C Invalid command format. Use `/help` to see available commands.",type:"error"};let s=this.commands.get(t.command);if(!s)return{content:`\u274C Unknown command: \`/${t.command}\`

Use \`/help\` to see available commands.`,type:"error"};try{return await s.execute(t.args,this.plugin)}catch(n){return{content:`\u274C Command failed: ${n.message}`,type:"error"}}}getCommandNames(){let e=new Set;for(let[t,s]of this.commands)e.add(s.name);return Array.from(e)}getSuggestions(e){let t=e.toLowerCase().replace(/^\//,""),s=[];for(let[n,r]of this.commands)n.startsWith(t)&&!s.includes(r.name)&&s.push(r.name);return s.slice(0,5)}};var P=require("obsidian"),q=class{constructor(e){this.actions=[];this.plugin=e,this.registerBuiltinActions(),this.registerEditorMenu()}registerBuiltinActions(){this.actions.push({id:"summarize",name:"Summarize",icon:"file-text",handler:async(e,t)=>await t.ollama.summarize(e,"bullets")}),this.actions.push({id:"explain",name:"Explain",icon:"help-circle",handler:async(e,t)=>await t.ollama.chat([{role:"system",content:"Explain the following concept or text clearly and concisely. Use bullet points if helpful."},{role:"user",content:e}])}),this.actions.push({id:"expand",name:"Expand",icon:"maximize-2",handler:async(e,t)=>await t.ollama.chat([{role:"system",content:"Expand the following bullet points or brief notes into well-written paragraphs. Maintain the same meaning but add detail and flow."},{role:"user",content:e}])}),this.actions.push({id:"condense",name:"Condense",icon:"minimize-2",handler:async(e,t)=>await t.ollama.chat([{role:"system",content:"Condense the following text to be more concise while keeping all key information. Use bullet points if appropriate."},{role:"user",content:e}])}),this.actions.push({id:"rewrite-formal",name:"Rewrite (Formal)",icon:"graduation-cap",handler:async(e,t)=>await t.ollama.chat([{role:"system",content:"Rewrite the following text in a formal, professional tone. Keep the same meaning."},{role:"user",content:e}])}),this.actions.push({id:"rewrite-casual",name:"Rewrite (Casual)",icon:"smile",handler:async(e,t)=>await t.ollama.chat([{role:"system",content:"Rewrite the following text in a casual, friendly tone. Keep the same meaning."},{role:"user",content:e}])}),this.actions.push({id:"flashcard",name:"Create Flashcard",icon:"layers",handler:async(e,t)=>await t.ollama.chat([{role:"system",content:`Create a flashcard from the given content.
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
Format: Return only a comma-separated list of tags (without #).`},{role:"user",content:e}])).split(",").map(r=>`#${r.trim()}`).join(" ")}`})}registerEditorMenu(){this.plugin.registerEvent(this.plugin.app.workspace.on("editor-menu",(e,t,s)=>{let n=t.getSelection();if(!n||n.trim().length===0)return;e.addSeparator(),e.addItem(a=>{a.setTitle("\u{1F916} Jarvis AI").setIcon("bot").setDisabled(!0)});let r=this.actions.slice(0,5);for(let a of r)e.addItem(c=>{c.setTitle(`  ${a.name}`).setIcon(a.icon).onClick(async()=>{await this.executeAction(a,n,t)})});e.addItem(a=>{a.setTitle("  More Jarvis Actions...").setIcon("more-horizontal").onClick(()=>{this.showAllActionsModal(n,t)})}),e.addItem(a=>{a.setTitle("  Ask in Jarvis...").setIcon("message-circle").onClick(async()=>{await this.askInJarvis(n)})})}))}showAllActionsModal(e,t){new ce(this.plugin.app,this.actions,async n=>{n&&await this.executeAction(n,e,t)}).open()}async executeAction(e,t,s){new P.Notice(`Jarvis: ${e.name}...`);try{let n=await e.handler(t,this.plugin);new oe(this.plugin.app,e.name,n,a=>{if(a){let c=s.getCursor("to"),d=`

> [!ai] ${e.name}
> ${n.split(`
`).join(`
> `)}
`;s.replaceRange(d,{line:c.line,ch:s.getLine(c.line).length})}}).open(),new P.Notice("Jarvis: Done!")}catch(n){new P.Notice(`Jarvis: ${e.name} failed - ${n.message}`),console.error("Context menu action error:",n)}}async askInJarvis(e){await this.plugin.activateView();let t=this.plugin.app.workspace.getLeavesOfType("jarvis-view");if(t.length>0){let s=t[0].view;s.inputField&&(s.inputField.value=`Regarding this text:

"${e.substring(0,500)}${e.length>500?"...":""}"

My question: `,s.inputField.focus())}}},oe=class extends P.Modal{constructor(e,t,s,n){super(e),this.title=t,this.resultContent=s,this.onResult=n}onOpen(){let{contentEl:e}=this;e.createDiv({cls:"jarvis-modal-header"}).createEl("h2",{text:`Jarvis: ${this.title}`});let s=e.createDiv({cls:"jarvis-modal-content"});s.style.maxHeight="400px",s.style.overflow="auto",s.style.padding="16px",s.style.background="var(--background-secondary)",s.style.borderRadius="8px",s.style.marginBottom="16px",s.style.whiteSpace="pre-wrap",s.setText(this.resultContent);let n=e.createDiv({cls:"jarvis-modal-buttons"});n.style.display="flex",n.style.gap="8px",n.style.justifyContent="flex-end",n.createEl("button",{text:"Copy"}).addEventListener("click",async()=>{await navigator.clipboard.writeText(this.resultContent),new P.Notice("Copied to clipboard!")}),n.createEl("button",{text:"Insert Below",cls:"mod-cta"}).addEventListener("click",()=>{this.onResult(!0),this.close()}),n.createEl("button",{text:"Close"}).addEventListener("click",()=>{this.onResult(!1),this.close()})}onClose(){let{contentEl:e}=this;e.empty()}},ce=class extends P.Modal{constructor(e,t,s){super(e),this.actions=t,this.onSelect=s}onOpen(){let{contentEl:e}=this;e.createEl("h2",{text:"Jarvis AI Actions"});let t=e.createDiv({cls:"jarvis-action-list"});t.style.display="flex",t.style.flexDirection="column",t.style.gap="4px";for(let r of this.actions){let a=t.createDiv({cls:"jarvis-action-item"});a.style.padding="8px 12px",a.style.cursor="pointer",a.style.borderRadius="4px",a.style.display="flex",a.style.alignItems="center",a.style.gap="8px",a.addEventListener("mouseenter",()=>{a.style.background="var(--background-modifier-hover)"}),a.addEventListener("mouseleave",()=>{a.style.background="transparent"}),a.createSpan({text:r.name}),a.addEventListener("click",()=>{this.onSelect(r),this.close()})}let s=e.createDiv();s.style.marginTop="16px",s.style.textAlign="right",s.createEl("button",{text:"Cancel"}).addEventListener("click",()=>{this.onSelect(null),this.close()})}onClose(){let{contentEl:e}=this;e.empty()}};var Ve={ollamaEndpoint:"http://localhost:11434",textModel:"granite3.1-dense:2b",visionModel:"granite3.2-vision:2b",embeddingModel:"granite-embedding:278m",enablePlanning:!0,enableVision:!0,enableTaskWarrior:!0,showStatusBar:!0,temperature:.7},G=class extends p.Plugin{async onload(){await this.loadSettings(),this.ollama=new F(this.settings),this.vault=new H(this.app),this.embedding=new M(this.ollama,this.vault,this.app),this.pageAssist=new O(this.ollama),this.webResearch=new I(this.ollama),this.slashCommands=new N(this),this.contextMenu=new q(this),this.embedding.initialize().catch(e=>{console.error("Failed to initialize embedding index:",e)}),this.registerView(R,e=>new V(e,this)),this.addRibbonIcon("bot","Jarvis AI Assistant",()=>{this.activateView()}),this.addCommand({id:"open-jarvis",name:"Open Jarvis",hotkeys:[{modifiers:["Ctrl","Shift"],key:"j"}],callback:()=>this.activateView()}),this.addCommand({id:"jarvis-ask",name:"Quick Ask",hotkeys:[{modifiers:["Ctrl","Shift"],key:"a"}],callback:()=>this.quickAsk()}),this.addCommand({id:"jarvis-summarize",name:"Summarize Current Note",callback:()=>this.summarizeCurrentNote()}),this.addCommand({id:"jarvis-plan",name:"Create Plan",hotkeys:[{modifiers:["Ctrl","Shift"],key:"p"}],callback:()=>this.createPlan()}),this.addCommand({id:"jarvis-task",name:"Create Task",hotkeys:[{modifiers:["Ctrl","Shift"],key:"t"}],callback:()=>this.createTask()}),this.addCommand({id:"jarvis-rag-search",name:"RAG Search",hotkeys:[{modifiers:["Ctrl","Shift"],key:"s"}],callback:()=>this.ragSearch()}),this.addCommand({id:"jarvis-index-vault",name:"Index Vault for RAG",callback:()=>this.indexVault()}),this.addCommand({id:"jarvis-clip-page",name:"Clip Web Page to Note",callback:()=>this.clipPageToNote()}),this.addSettingTab(new ue(this.app,this)),this.settings.showStatusBar&&(this.statusBarItem=this.addStatusBarItem(),this.updateStatusBar("Ready")),this.checkOllamaConnection(),console.log("Jarvis AI Assistant loaded")}onunload(){console.log("Jarvis AI Assistant unloaded")}async loadSettings(){this.settings=Object.assign({},Ve,await this.loadData())}async saveSettings(){await this.saveData(this.settings),this.ollama=new F(this.settings),this.embedding=new M(this.ollama,this.vault,this.app),this.pageAssist=new O(this.ollama),this.webResearch=new I(this.ollama),this.slashCommands=new N(this)}async activateView(){let{workspace:e}=this.app,t=null,s=e.getLeavesOfType(R);s.length>0?t=s[0]:(t=e.getRightLeaf(!1),await(t==null?void 0:t.setViewState({type:R,active:!0}))),t&&e.revealLeaf(t)}async checkOllamaConnection(){await this.ollama.checkConnection()?(this.updateStatusBar("Connected"),new p.Notice("Jarvis: Connected to Ollama")):(this.updateStatusBar("Disconnected"),new p.Notice("Jarvis: Cannot connect to Ollama. Please ensure Ollama is running."))}updateStatusBar(e){this.statusBarItem&&this.statusBarItem.setText(`Jarvis: ${e}`)}async quickAsk(){let e=this.app.workspace.getActiveViewOfType(p.MarkdownView);if(!e){new p.Notice("No active markdown view");return}let s=e.editor.getSelection()||e.editor.getValue().substring(0,1e3);await this.activateView()}async summarizeCurrentNote(){let e=this.app.workspace.getActiveViewOfType(p.MarkdownView);if(!e){new p.Notice("No active markdown view");return}let t=e.editor.getValue();this.updateStatusBar("Summarizing...");try{let s=await this.ollama.chat([{role:"system",content:"You are a helpful assistant. Summarize the following note in 3-5 bullet points."},{role:"user",content:t}]);new p.Notice("Summary generated! Check Jarvis panel."),await this.activateView()}catch(s){new p.Notice("Failed to generate summary"),console.error(s)}finally{this.updateStatusBar("Ready")}}async createPlan(){await this.activateView(),new p.Notice("Enter your goal in the Jarvis panel to create a plan")}async createTask(){await this.activateView(),new p.Notice("Enter your task in the Jarvis panel")}async ragSearch(){let e=this.app.workspace.getActiveViewOfType(p.MarkdownView);if(e){let t=e.editor.getSelection()}await this.activateView(),new p.Notice("Use RAG Search mode to search your vault semantically")}async indexVault(){this.updateStatusBar("Indexing..."),new p.Notice("Starting vault indexing... This may take a while.");try{let e=await this.embedding.indexVault((t,s)=>{this.updateStatusBar(`Indexing ${t}/${s}`)});new p.Notice(`Indexed ${e} notes successfully!`),this.updateStatusBar("Ready")}catch(e){new p.Notice(`Indexing failed: ${e.message}`),this.updateStatusBar("Index failed"),console.error("Indexing error:",e)}}async clipPageToNote(){let e=await this.promptForUrl();if(e){this.updateStatusBar("Clipping..."),new p.Notice("Clipping page...");try{let t=await this.pageAssist.createNoteFromPage(e),n=`0-Inbox/web-clip-${new Date().toISOString().replace(/[:.]/g,"-")}.md`;await this.vault.writeFile(n,t),new p.Notice(`Page clipped to ${n}`),this.updateStatusBar("Ready");let r=this.app.vault.getAbstractFileByPath(n);r&&r instanceof p.TFile&&await this.app.workspace.getLeaf(!1).openFile(r)}catch(t){new p.Notice(`Failed to clip page: ${t.message}`),this.updateStatusBar("Clip failed"),console.error("Clip error:",t)}}}async promptForUrl(){return new Promise(e=>{new le(this.app,s=>{e(s)}).open()})}},le=class extends p.Modal{constructor(e,t){super(e),this.onSubmit=t}onOpen(){let{contentEl:e}=this;e.createEl("h2",{text:"Enter URL to clip"});let s=e.createDiv({cls:"jarvis-url-input-container"}).createEl("input",{type:"text",placeholder:"https://example.com/article",cls:"jarvis-url-input"});s.style.width="100%",s.style.padding="8px",s.style.marginBottom="16px";let n=e.createDiv({cls:"jarvis-url-buttons"});n.style.display="flex",n.style.gap="8px",n.style.justifyContent="flex-end",n.createEl("button",{text:"Cancel"}).addEventListener("click",()=>{this.close(),this.onSubmit(null)}),n.createEl("button",{text:"Clip",cls:"mod-cta"}).addEventListener("click",()=>{let c=s.value.trim();c&&(this.close(),this.onSubmit(c))}),s.addEventListener("keydown",c=>{if(c.key==="Enter"){let d=s.value.trim();d&&(this.close(),this.onSubmit(d))}}),s.focus()}onClose(){let{contentEl:e}=this;e.empty()}},ue=class extends p.PluginSettingTab{constructor(e,t){super(e,t),this.plugin=t}display(){let{containerEl:e}=this;e.empty(),e.createEl("h2",{text:"Jarvis AI Assistant Settings"}),e.createEl("h3",{text:"Ollama Configuration"}),new p.Setting(e).setName("Ollama Endpoint").setDesc("The URL of your Ollama server").addText(t=>t.setPlaceholder("http://localhost:11434").setValue(this.plugin.settings.ollamaEndpoint).onChange(async s=>{this.plugin.settings.ollamaEndpoint=s,await this.plugin.saveSettings()})),new p.Setting(e).setName("Text Model").setDesc("The model to use for text generation").addText(t=>t.setPlaceholder("granite3.1-dense:2b").setValue(this.plugin.settings.textModel).onChange(async s=>{this.plugin.settings.textModel=s,await this.plugin.saveSettings()})),new p.Setting(e).setName("Vision Model").setDesc("The model to use for image analysis").addText(t=>t.setPlaceholder("granite3.2-vision:2b").setValue(this.plugin.settings.visionModel).onChange(async s=>{this.plugin.settings.visionModel=s,await this.plugin.saveSettings()})),new p.Setting(e).setName("Temperature").setDesc("Controls randomness (0.0 = deterministic, 1.0 = creative)").addSlider(t=>t.setLimits(0,1,.1).setValue(this.plugin.settings.temperature).setDynamicTooltip().onChange(async s=>{this.plugin.settings.temperature=s,await this.plugin.saveSettings()})),e.createEl("h3",{text:"Features"}),new p.Setting(e).setName("Enable Planning Agent").setDesc("Allow Jarvis to create and manage task plans").addToggle(t=>t.setValue(this.plugin.settings.enablePlanning).onChange(async s=>{this.plugin.settings.enablePlanning=s,await this.plugin.saveSettings()})),new p.Setting(e).setName("Enable Vision").setDesc("Allow Jarvis to analyze images and screenshots").addToggle(t=>t.setValue(this.plugin.settings.enableVision).onChange(async s=>{this.plugin.settings.enableVision=s,await this.plugin.saveSettings()})),new p.Setting(e).setName("Enable TaskWarrior Integration").setDesc("Allow Jarvis to create and manage TaskWarrior tasks").addToggle(t=>t.setValue(this.plugin.settings.enableTaskWarrior).onChange(async s=>{this.plugin.settings.enableTaskWarrior=s,await this.plugin.saveSettings()})),e.createEl("h3",{text:"UI"}),new p.Setting(e).setName("Show Status Bar").setDesc("Show Jarvis status in the status bar").addToggle(t=>t.setValue(this.plugin.settings.showStatusBar).onChange(async s=>{this.plugin.settings.showStatusBar=s,await this.plugin.saveSettings()})),e.createEl("h3",{text:"Connection"}),new p.Setting(e).setName("Test Connection").setDesc("Test the connection to Ollama").addButton(t=>t.setButtonText("Test").onClick(async()=>{t.setButtonText("Testing..."),await this.plugin.checkOllamaConnection(),t.setButtonText("Test")}))}};
