/*
Obsidian Jarvis AI Assistant
A comprehensive AI assistant with planning, vision, and task management
*/

var he=Object.create;var O=Object.defineProperty;var ue=Object.getOwnPropertyDescriptor;var pe=Object.getOwnPropertyNames;var ge=Object.getPrototypeOf,me=Object.prototype.hasOwnProperty;var fe=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),ye=(n,e)=>{for(var t in e)O(n,t,{get:e[t],enumerable:!0})},Z=(n,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of pe(e))!me.call(n,a)&&a!==t&&O(n,a,{get:()=>e[a],enumerable:!(s=ue(e,a))||s.enumerable});return n};var L=(n,e,t)=>(t=n!=null?he(ge(n)):{},Z(e||!n||!n.__esModule?O(t,"default",{value:n,enumerable:!0}):t,n)),be=n=>Z(O({},"__esModule",{value:!0}),n);var I=fe((F,ee)=>{(function(n,e){typeof F=="object"&&typeof ee!="undefined"?e(F):typeof define=="function"&&define.amd?define(["exports"],e):e(n.WHATWGFetch={})})(F,function(n){"use strict";var e=typeof globalThis!="undefined"&&globalThis||typeof self!="undefined"&&self||typeof global!="undefined"&&global||{},t={searchParams:"URLSearchParams"in e,iterable:"Symbol"in e&&"iterator"in Symbol,blob:"FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(r){return!1}}(),formData:"FormData"in e,arrayBuffer:"ArrayBuffer"in e};function s(r){return r&&DataView.prototype.isPrototypeOf(r)}if(t.arrayBuffer)var a=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],i=ArrayBuffer.isView||function(r){return r&&a.indexOf(Object.prototype.toString.call(r))>-1};function l(r){if(typeof r!="string"&&(r=String(r)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(r)||r==="")throw new TypeError('Invalid character in header field name: "'+r+'"');return r.toLowerCase()}function u(r){return typeof r!="string"&&(r=String(r)),r}function f(r){var o={next:function(){var d=r.shift();return{done:d===void 0,value:d}}};return t.iterable&&(o[Symbol.iterator]=function(){return o}),o}function c(r){this.map={},r instanceof c?r.forEach(function(o,d){this.append(d,o)},this):Array.isArray(r)?r.forEach(function(o){if(o.length!=2)throw new TypeError("Headers constructor: expected name/value pair to be length 2, found"+o.length);this.append(o[0],o[1])},this):r&&Object.getOwnPropertyNames(r).forEach(function(o){this.append(o,r[o])},this)}c.prototype.append=function(r,o){r=l(r),o=u(o);var d=this.map[r];this.map[r]=d?d+", "+o:o},c.prototype.delete=function(r){delete this.map[l(r)]},c.prototype.get=function(r){return r=l(r),this.has(r)?this.map[r]:null},c.prototype.has=function(r){return this.map.hasOwnProperty(l(r))},c.prototype.set=function(r,o){this.map[l(r)]=u(o)},c.prototype.forEach=function(r,o){for(var d in this.map)this.map.hasOwnProperty(d)&&r.call(o,this.map[d],d,this)},c.prototype.keys=function(){var r=[];return this.forEach(function(o,d){r.push(d)}),f(r)},c.prototype.values=function(){var r=[];return this.forEach(function(o){r.push(o)}),f(r)},c.prototype.entries=function(){var r=[];return this.forEach(function(o,d){r.push([d,o])}),f(r)},t.iterable&&(c.prototype[Symbol.iterator]=c.prototype.entries);function b(r){if(!r._noBody){if(r.bodyUsed)return Promise.reject(new TypeError("Already read"));r.bodyUsed=!0}}function x(r){return new Promise(function(o,d){r.onload=function(){o(r.result)},r.onerror=function(){d(r.error)}})}function $(r){var o=new FileReader,d=x(o);return o.readAsArrayBuffer(r),d}function ae(r){var o=new FileReader,d=x(o),p=/charset=([A-Za-z0-9_-]+)/.exec(r.type),m=p?p[1]:"utf-8";return o.readAsText(r,m),d}function ne(r){for(var o=new Uint8Array(r),d=new Array(o.length),p=0;p<o.length;p++)d[p]=String.fromCharCode(o[p]);return d.join("")}function X(r){if(r.slice)return r.slice(0);var o=new Uint8Array(r.byteLength);return o.set(new Uint8Array(r)),o.buffer}function Q(){return this.bodyUsed=!1,this._initBody=function(r){this.bodyUsed=this.bodyUsed,this._bodyInit=r,r?typeof r=="string"?this._bodyText=r:t.blob&&Blob.prototype.isPrototypeOf(r)?this._bodyBlob=r:t.formData&&FormData.prototype.isPrototypeOf(r)?this._bodyFormData=r:t.searchParams&&URLSearchParams.prototype.isPrototypeOf(r)?this._bodyText=r.toString():t.arrayBuffer&&t.blob&&s(r)?(this._bodyArrayBuffer=X(r.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):t.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(r)||i(r))?this._bodyArrayBuffer=X(r):this._bodyText=r=Object.prototype.toString.call(r):(this._noBody=!0,this._bodyText=""),this.headers.get("content-type")||(typeof r=="string"?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):t.searchParams&&URLSearchParams.prototype.isPrototypeOf(r)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},t.blob&&(this.blob=function(){var r=b(this);if(r)return r;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))}),this.arrayBuffer=function(){if(this._bodyArrayBuffer){var r=b(this);return r||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer))}else{if(t.blob)return this.blob().then($);throw new Error("could not read as ArrayBuffer")}},this.text=function(){var r=b(this);if(r)return r;if(this._bodyBlob)return ae(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(ne(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},t.formData&&(this.formData=function(){return this.text().then(le)}),this.json=function(){return this.text().then(JSON.parse)},this}var ie=["CONNECT","DELETE","GET","HEAD","OPTIONS","PATCH","POST","PUT","TRACE"];function oe(r){var o=r.toUpperCase();return ie.indexOf(o)>-1?o:r}function k(r,o){if(!(this instanceof k))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');o=o||{};var d=o.body;if(r instanceof k){if(r.bodyUsed)throw new TypeError("Already read");this.url=r.url,this.credentials=r.credentials,o.headers||(this.headers=new c(r.headers)),this.method=r.method,this.mode=r.mode,this.signal=r.signal,!d&&r._bodyInit!=null&&(d=r._bodyInit,r.bodyUsed=!0)}else this.url=String(r);if(this.credentials=o.credentials||this.credentials||"same-origin",(o.headers||!this.headers)&&(this.headers=new c(o.headers)),this.method=oe(o.method||this.method||"GET"),this.mode=o.mode||this.mode||null,this.signal=o.signal||this.signal||function(){if("AbortController"in e){var h=new AbortController;return h.signal}}(),this.referrer=null,(this.method==="GET"||this.method==="HEAD")&&d)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(d),(this.method==="GET"||this.method==="HEAD")&&(o.cache==="no-store"||o.cache==="no-cache")){var p=/([?&])_=[^&]*/;if(p.test(this.url))this.url=this.url.replace(p,"$1_="+new Date().getTime());else{var m=/\?/;this.url+=(m.test(this.url)?"&":"?")+"_="+new Date().getTime()}}}k.prototype.clone=function(){return new k(this,{body:this._bodyInit})};function le(r){var o=new FormData;return r.trim().split("&").forEach(function(d){if(d){var p=d.split("="),m=p.shift().replace(/\+/g," "),h=p.join("=").replace(/\+/g," ");o.append(decodeURIComponent(m),decodeURIComponent(h))}}),o}function ce(r){var o=new c,d=r.replace(/\r?\n[\t ]+/g," ");return d.split("\r").map(function(p){return p.indexOf(`
`)===0?p.substr(1,p.length):p}).forEach(function(p){var m=p.split(":"),h=m.shift().trim();if(h){var j=m.join(":").trim();try{o.append(h,j)}catch(_){console.warn("Response "+_.message)}}}),o}Q.call(k.prototype);function v(r,o){if(!(this instanceof v))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');if(o||(o={}),this.type="default",this.status=o.status===void 0?200:o.status,this.status<200||this.status>599)throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");this.ok=this.status>=200&&this.status<300,this.statusText=o.statusText===void 0?"":""+o.statusText,this.headers=new c(o.headers),this.url=o.url||"",this._initBody(r)}Q.call(v.prototype),v.prototype.clone=function(){return new v(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new c(this.headers),url:this.url})},v.error=function(){var r=new v(null,{status:200,statusText:""});return r.ok=!1,r.status=0,r.type="error",r};var de=[301,302,303,307,308];v.redirect=function(r,o){if(de.indexOf(o)===-1)throw new RangeError("Invalid status code");return new v(null,{status:o,headers:{location:r}})},n.DOMException=e.DOMException;try{new n.DOMException}catch(r){n.DOMException=function(o,d){this.message=o,this.name=d;var p=Error(o);this.stack=p.stack},n.DOMException.prototype=Object.create(Error.prototype),n.DOMException.prototype.constructor=n.DOMException}function R(r,o){return new Promise(function(d,p){var m=new k(r,o);if(m.signal&&m.signal.aborted)return p(new n.DOMException("Aborted","AbortError"));var h=new XMLHttpRequest;function j(){h.abort()}h.onload=function(){var y={statusText:h.statusText,headers:ce(h.getAllResponseHeaders()||"")};m.url.indexOf("file://")===0&&(h.status<200||h.status>599)?y.status=200:y.status=h.status,y.url="responseURL"in h?h.responseURL:y.headers.get("X-Request-URL");var T="response"in h?h.response:h.responseText;setTimeout(function(){d(new v(T,y))},0)},h.onerror=function(){setTimeout(function(){p(new TypeError("Network request failed"))},0)},h.ontimeout=function(){setTimeout(function(){p(new TypeError("Network request timed out"))},0)},h.onabort=function(){setTimeout(function(){p(new n.DOMException("Aborted","AbortError"))},0)};function _(y){try{return y===""&&e.location.href?e.location.href:y}catch(T){return y}}if(h.open(m.method,_(m.url),!0),m.credentials==="include"?h.withCredentials=!0:m.credentials==="omit"&&(h.withCredentials=!1),"responseType"in h&&(t.blob?h.responseType="blob":t.arrayBuffer&&(h.responseType="arraybuffer")),o&&typeof o.headers=="object"&&!(o.headers instanceof c||e.Headers&&o.headers instanceof e.Headers)){var K=[];Object.getOwnPropertyNames(o.headers).forEach(function(y){K.push(l(y)),h.setRequestHeader(y,u(o.headers[y]))}),m.headers.forEach(function(y,T){K.indexOf(T)===-1&&h.setRequestHeader(T,y)})}else m.headers.forEach(function(y,T){h.setRequestHeader(T,y)});m.signal&&(m.signal.addEventListener("abort",j),h.onreadystatechange=function(){h.readyState===4&&m.signal.removeEventListener("abort",j)}),h.send(typeof m._bodyInit=="undefined"?null:m._bodyInit)})}R.polyfill=!0,e.fetch||(e.fetch=R,e.Headers=c,e.Request=k,e.Response=v),n.Headers=c,n.Request=k,n.Response=v,n.fetch=R,Object.defineProperty(n,"__esModule",{value:!0})})});var je={};ye(je,{default:()=>D});module.exports=be(je);var g=require("obsidian");var C=require("obsidian"),E="jarvis-view",M=class extends C.ItemView{constructor(t,s){super(t);this.conversation=[];this.isProcessing=!1;this.plugin=s}getViewType(){return E}getDisplayText(){return"Jarvis AI"}getIcon(){return"bot"}async onOpen(){let t=this.containerEl.children[1];t.empty(),t.addClass("jarvis-container");let s=t.createDiv({cls:"jarvis-header"});s.createEl("h4",{text:"Jarvis AI Assistant"});let a=s.createDiv({cls:"jarvis-mode-container"});this.modeSelect=a.createEl("select",{cls:"jarvis-mode-select"}),this.modeSelect.createEl("option",{value:"chat",text:"Chat"}),this.modeSelect.createEl("option",{value:"plan",text:"Plan"}),this.modeSelect.createEl("option",{value:"summarize",text:"Summarize"}),this.modeSelect.createEl("option",{value:"task",text:"Task"}),this.modeSelect.createEl("option",{value:"vision",text:"Vision"});let i=t.createDiv({cls:"jarvis-action-bar"});i.createEl("button",{cls:"jarvis-action-btn",text:"Clear"}).addEventListener("click",()=>this.clearConversation()),i.createEl("button",{cls:"jarvis-action-btn",text:"Add Context"}).addEventListener("click",()=>this.addCurrentNoteContext()),i.createEl("button",{cls:"jarvis-action-btn",text:"Export"}).addEventListener("click",()=>this.exportConversation()),this.chatContainer=t.createDiv({cls:"jarvis-chat-container"}),this.addSystemMessage(`Hello! I'm Jarvis, your AI assistant. How can I help you today?

**Modes:**
- **Chat**: General conversation
- **Plan**: Break down goals into tasks
- **Summarize**: Summarize notes or text
- **Task**: Create TaskWarrior tasks
- **Vision**: Analyze images`),this.inputContainer=t.createDiv({cls:"jarvis-input-container"}),this.inputField=this.inputContainer.createEl("textarea",{cls:"jarvis-input-field",attr:{placeholder:"Ask Jarvis anything...",rows:"3"}}),this.inputField.addEventListener("keydown",x=>{x.key==="Enter"&&!x.shiftKey&&(x.preventDefault(),this.sendMessage())});let c=this.inputContainer.createDiv({cls:"jarvis-button-container"}),b=c.createEl("button",{cls:"jarvis-image-btn"});(0,C.setIcon)(b,"image"),b.addEventListener("click",()=>this.uploadImage()),this.sendButton=c.createEl("button",{cls:"jarvis-send-btn",text:"Send"}),this.sendButton.addEventListener("click",()=>this.sendMessage()),this.addStyles()}addStyles(){let t=document.createElement("style");t.textContent=`
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
    `,document.head.appendChild(t)}addSystemMessage(t){let s=this.chatContainer.createDiv({cls:"jarvis-message jarvis-message-system"});C.MarkdownRenderer.renderMarkdown(t,s,"",this.plugin)}addMessage(t,s){let a={role:t,content:s,timestamp:new Date};this.conversation.push(a);let i=this.chatContainer.createDiv({cls:`jarvis-message jarvis-message-${t}`});t==="assistant"?C.MarkdownRenderer.renderMarkdown(s,i,"",this.plugin):i.createDiv({text:s}),i.createDiv({cls:"jarvis-message-time"}).setText(a.timestamp.toLocaleTimeString()),this.chatContainer.scrollTop=this.chatContainer.scrollHeight}createLoadingMessage(){let t=this.chatContainer.createDiv({cls:"jarvis-message jarvis-message-assistant jarvis-loading"});return t.setText("Thinking..."),this.chatContainer.scrollTop=this.chatContainer.scrollHeight,t}async sendMessage(){let t=this.inputField.value.trim();if(!t||this.isProcessing)return;this.isProcessing=!0,this.sendButton.disabled=!0,this.inputField.value="",this.addMessage("user",t);let s=this.createLoadingMessage();try{let a=this.modeSelect.value,i;switch(a){case"plan":i=await this.plugin.ollama.decomposePlan(t);break;case"summarize":i=await this.plugin.ollama.summarize(t,"bullets");break;case"task":i=`**TaskWarrior Command:**
\`\`\`
${await this.plugin.ollama.generateTaskWarriorCommand(t)}
\`\`\`

Copy and run this command to create the task.`;break;default:let u=this.buildConversationHistory();u.push({role:"user",content:t}),i=await this.plugin.ollama.chat(u)}s.remove(),this.addMessage("assistant",i)}catch(a){s.remove(),this.addMessage("assistant",`Error: ${a.message}`),console.error("Jarvis error:",a)}finally{this.isProcessing=!1,this.sendButton.disabled=!1,this.inputField.focus()}}buildConversationHistory(){let s=[{role:"system",content:`You are Jarvis, an AI assistant integrated into Obsidian. You help with:
- Answering questions about notes and knowledge
- Planning and task management
- Summarizing content
- Suggesting connections between ideas
- General knowledge assistance

Be concise, helpful, and format responses with Markdown when appropriate.`}],a=this.conversation.slice(-10);for(let i of a)s.push({role:i.role,content:i.content});return s}async addCurrentNoteContext(){let t=await this.plugin.vault.getActiveNoteContent();if(t){let s=t.length>2e3?t.substring(0,2e3)+"...":t;this.inputField.value=`Context from current note:

${s}

Question: `,this.inputField.focus()}else this.addSystemMessage("No active note to add as context.")}async uploadImage(){if(!this.plugin.settings.enableVision){this.addSystemMessage("Vision mode is disabled in settings.");return}let t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async s=>{var l;let a=(l=s.target.files)==null?void 0:l[0];if(!a)return;let i=new FileReader;i.onload=async()=>{let u=i.result.split(",")[1];this.isProcessing=!0,this.sendButton.disabled=!0,this.addMessage("user",`[Uploaded image: ${a.name}]`);let f=this.createLoadingMessage();try{let c=this.inputField.value.trim()||"Describe this image in detail.";this.inputField.value="";let b=await this.plugin.ollama.analyzeImage(u,c);f.remove(),this.addMessage("assistant",b)}catch(c){f.remove(),this.addMessage("assistant",`Vision error: ${c.message}`)}finally{this.isProcessing=!1,this.sendButton.disabled=!1}},i.readAsDataURL(a)},t.click()}clearConversation(){this.conversation=[],this.chatContainer.empty(),this.addSystemMessage("Conversation cleared. How can I help you?")}async exportConversation(){if(this.conversation.length===0){this.addSystemMessage("No conversation to export.");return}let t=new Date().toISOString().split("T")[0],s=`# Jarvis Conversation - ${t}

`;for(let i of this.conversation){let l=i.timestamp.toLocaleTimeString();s+=`## ${i.role==="user"?"You":"Jarvis"} (${l})

${i.content}

---

`}let a=`0-Inbox/jarvis-conversation-${t}.md`;await this.plugin.vault.createNote(a,s),this.addSystemMessage(`Conversation exported to: ${a}`)}async onClose(){}};var A=L(require("fs"),1),G=require("path");var Ne=L(I(),1),se="11434",re=`http://127.0.0.1:${se}`,ve="0.5.18",we=Object.defineProperty,xe=(n,e,t)=>e in n?we(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,V=(n,e,t)=>(xe(n,typeof e!="symbol"?e+"":e,t),t),J=class n extends Error{constructor(e,t){super(e),this.error=e,this.status_code=t,this.name="ResponseError",Error.captureStackTrace&&Error.captureStackTrace(this,n)}},U=class{constructor(e,t,s){V(this,"abortController"),V(this,"itr"),V(this,"doneCallback"),this.abortController=e,this.itr=t,this.doneCallback=s}abort(){this.abortController.abort()}async*[Symbol.asyncIterator](){for await(let e of this.itr){if("error"in e)throw new Error(e.error);if(yield e,e.done||e.status==="success"){this.doneCallback();return}}throw new Error("Did not receive done or success response in stream.")}},z=async n=>{var s;if(n.ok)return;let e=`Error ${n.status}: ${n.statusText}`,t=null;if((s=n.headers.get("content-type"))!=null&&s.includes("application/json"))try{t=await n.json(),e=t.error||e}catch(a){console.log("Failed to parse error response as JSON")}else try{console.log("Getting text from response"),e=await n.text()||e}catch(a){console.log("Failed to get text from error response")}throw new J(e,n.status)};function ke(){var n;if(typeof window!="undefined"&&window.navigator){let e=navigator;return"userAgentData"in e&&((n=e.userAgentData)!=null&&n.platform)?`${e.userAgentData.platform.toLowerCase()} Browser/${navigator.userAgent};`:navigator.platform?`${navigator.platform.toLowerCase()} Browser/${navigator.userAgent};`:`unknown Browser/${navigator.userAgent};`}else if(typeof process!="undefined")return`${process.arch} ${process.platform} Node.js/${process.version}`;return""}function Te(n){if(n instanceof Headers){let e={};return n.forEach((t,s)=>{e[s]=t}),e}else return Array.isArray(n)?Object.fromEntries(n):n||{}}var W=async(n,e,t={})=>{let s={"Content-Type":"application/json",Accept:"application/json","User-Agent":`ollama-js/${ve} (${ke()})`};t.headers=Te(t.headers);let a=Object.fromEntries(Object.entries(t.headers).filter(([i])=>!Object.keys(s).some(l=>l.toLowerCase()===i.toLowerCase())));return t.headers={...s,...a},n(e,t)},te=async(n,e,t)=>{let s=await W(n,e,{headers:t==null?void 0:t.headers});return await z(s),s},S=async(n,e,t,s)=>{let i=(u=>u!==null&&typeof u=="object"&&!Array.isArray(u))(t)?JSON.stringify(t):t,l=await W(n,e,{method:"POST",body:i,signal:s==null?void 0:s.signal,headers:s==null?void 0:s.headers});return await z(l),l},Ce=async(n,e,t,s)=>{let a=await W(n,e,{method:"DELETE",body:JSON.stringify(t),headers:s==null?void 0:s.headers});return await z(a),a},Se=async function*(n){var a;let e=new TextDecoder("utf-8"),t="",s=n.getReader();for(;;){let{done:i,value:l}=await s.read();if(i)break;t+=e.decode(l);let u=t.split(`
`);t=(a=u.pop())!=null?a:"";for(let f of u)try{yield JSON.parse(f)}catch(c){console.warn("invalid json: ",f)}}for(let i of t.split(`
`).filter(l=>l!==""))try{yield JSON.parse(i)}catch(l){console.warn("invalid json: ",i)}},Ee=n=>{if(!n)return re;let e=n.includes("://");n.startsWith(":")&&(n=`http://127.0.0.1${n}`,e=!0),e||(n=`http://${n}`);let t=new URL(n),s=t.port;s||(e?s=t.protocol==="https:"?"443":"80":s=se);let a="";t.username&&(a=t.username,t.password&&(a+=`:${t.password}`),a+="@");let i=`${t.protocol}//${a}${t.hostname}:${s}${t.pathname}`;return i.endsWith("/")&&(i=i.slice(0,-1)),i},Ae=Object.defineProperty,Pe=(n,e,t)=>e in n?Ae(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,H=(n,e,t)=>(Pe(n,typeof e!="symbol"?e+"":e,t),t),q=class{constructor(e){var t,s;H(this,"config"),H(this,"fetch"),H(this,"ongoingStreamedRequests",[]),this.config={host:"",headers:e==null?void 0:e.headers},e!=null&&e.proxy||(this.config.host=Ee((t=e==null?void 0:e.host)!=null?t:re)),this.fetch=(s=e==null?void 0:e.fetch)!=null?s:fetch}abort(){for(let e of this.ongoingStreamedRequests)e.abort();this.ongoingStreamedRequests.length=0}async processStreamableRequest(e,t){var i;t.stream=(i=t.stream)!=null?i:!1;let s=`${this.config.host}/api/${e}`;if(t.stream){let l=new AbortController,u=await S(this.fetch,s,t,{signal:l.signal,headers:this.config.headers});if(!u.body)throw new Error("Missing body");let f=Se(u.body),c=new U(l,f,()=>{let b=this.ongoingStreamedRequests.indexOf(c);b>-1&&this.ongoingStreamedRequests.splice(b,1)});return this.ongoingStreamedRequests.push(c),c}return await(await S(this.fetch,s,t,{headers:this.config.headers})).json()}async encodeImage(e){if(typeof e!="string"){let t=new Uint8Array(e),s="",a=t.byteLength;for(let i=0;i<a;i++)s+=String.fromCharCode(t[i]);return btoa(s)}return e}async generate(e){return e.images&&(e.images=await Promise.all(e.images.map(this.encodeImage.bind(this)))),this.processStreamableRequest("generate",e)}async chat(e){if(e.messages)for(let t of e.messages)t.images&&(t.images=await Promise.all(t.images.map(this.encodeImage.bind(this))));return this.processStreamableRequest("chat",e)}async create(e){return this.processStreamableRequest("create",{...e})}async pull(e){return this.processStreamableRequest("pull",{name:e.model,stream:e.stream,insecure:e.insecure})}async push(e){return this.processStreamableRequest("push",{name:e.model,stream:e.stream,insecure:e.insecure})}async delete(e){return await Ce(this.fetch,`${this.config.host}/api/delete`,{name:e.model},{headers:this.config.headers}),{status:"success"}}async copy(e){return await S(this.fetch,`${this.config.host}/api/copy`,{...e},{headers:this.config.headers}),{status:"success"}}async list(){return await(await te(this.fetch,`${this.config.host}/api/tags`,{headers:this.config.headers})).json()}async show(e){return await(await S(this.fetch,`${this.config.host}/api/show`,{...e},{headers:this.config.headers})).json()}async embed(e){return await(await S(this.fetch,`${this.config.host}/api/embed`,{...e},{headers:this.config.headers})).json()}async embeddings(e){return await(await S(this.fetch,`${this.config.host}/api/embeddings`,{...e},{headers:this.config.headers})).json()}async ps(){return await(await te(this.fetch,`${this.config.host}/api/ps`,{headers:this.config.headers})).json()}},$e=new q;var Le=L(I(),1),P=class extends q{async encodeImage(e){if(typeof e!="string")return Buffer.from(e).toString("base64");try{if(A.default.existsSync(e)){let t=await A.promises.readFile((0,G.resolve)(e));return Buffer.from(t).toString("base64")}}catch(t){}return e}async fileExists(e){try{return await A.promises.access(e),!0}catch(t){return!1}}async create(e){if(e.from&&await this.fileExists((0,G.resolve)(e.from)))throw Error("Creating with a local path is not currently supported from ollama-js");return e.stream?super.create(e):super.create(e)}},Ie=new P;var B=class{constructor(e){this.settings=e,this.client=new P({host:e.ollamaEndpoint})}async checkConnection(){try{return await this.client.list(),!0}catch(e){return console.error("Ollama connection failed:",e),!1}}async listModels(){try{return(await this.client.list()).models.map(t=>t.name)}catch(e){return console.error("Failed to list models:",e),[]}}async chat(e,t){try{return t?await this.streamChat(e,t):(await this.client.chat({model:this.settings.textModel,messages:e.map(a=>({role:a.role,content:a.content})),options:{temperature:this.settings.temperature}})).message.content}catch(s){throw console.error("Chat failed:",s),s}}async streamChat(e,t){let s="",a=await this.client.chat({model:this.settings.textModel,messages:e.map(i=>({role:i.role,content:i.content})),stream:!0,options:{temperature:this.settings.temperature}});for await(let i of a){let l=i.message.content;s+=l,t(l)}return s}async analyzeImage(e,t,s){if(!this.settings.enableVision)throw new Error("Vision is disabled in settings");try{return s?await this.streamVision(e,t,s):(await this.client.chat({model:this.settings.visionModel,messages:[{role:"user",content:t,images:[e]}],options:{temperature:this.settings.temperature}})).message.content}catch(a){throw console.error("Vision analysis failed:",a),a}}async streamVision(e,t,s){let a="",i=await this.client.chat({model:this.settings.visionModel,messages:[{role:"user",content:t,images:[e]}],stream:!0,options:{temperature:this.settings.temperature}});for await(let l of i){let u=l.message.content;a+=u,s(u)}return a}async embed(e){try{return(await this.client.embed({model:this.settings.embeddingModel,input:e})).embeddings[0]}catch(t){throw console.error("Embedding failed:",t),t}}async embedBatch(e){try{return(await this.client.embed({model:this.settings.embeddingModel,input:e})).embeddings}catch(t){throw console.error("Batch embedding failed:",t),t}}async decomposePlan(e){if(!this.settings.enablePlanning)throw new Error("Planning is disabled in settings");return this.chat([{role:"system",content:`You are a planning assistant. Given a goal, break it down into actionable tasks.
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
`).map(i=>i.trim()).filter(i=>t.includes(i))}async generateTaskWarriorCommand(e){if(!this.settings.enableTaskWarrior)throw new Error("TaskWarrior integration is disabled in settings");return(await this.chat([{role:"system",content:`Convert natural language to TaskWarrior command. Output only the task add command, nothing else.
Examples:
"remind me to call mom tomorrow" -> task add "Call mom" due:tomorrow
"high priority fix the bug in auth by friday" -> task add "Fix the bug in auth" priority:H due:friday
"work on report for project alpha" -> task add "Work on report" project:alpha`},{role:"user",content:e}])).trim()}};var w=require("obsidian"),N=class{constructor(e){this.app=e}getAllNotes(){return this.app.vault.getMarkdownFiles()}getNoteNames(){return this.getAllNotes().map(e=>e.basename)}getNotesInFolder(e){let t=this.app.vault.getAbstractFileByPath(e);if(!t||!(t instanceof w.TFolder))return[];let s=[];return this.collectNotesRecursive(t,s),s}collectNotesRecursive(e,t){for(let s of e.children)s instanceof w.TFile&&s.extension==="md"?t.push(s):s instanceof w.TFolder&&this.collectNotesRecursive(s,t)}async readNote(e){return this.app.vault.read(e)}async readNoteByPath(e){let t=this.app.vault.getAbstractFileByPath(e);return t instanceof w.TFile?this.app.vault.read(t):null}getActiveNote(){return this.app.workspace.getActiveFile()}async getActiveNoteContent(){let e=this.getActiveNote();return e?this.readNote(e):null}async createNote(e,t){let s=e.substring(0,e.lastIndexOf("/"));s&&await this.ensureFolderExists(s);let a=await this.app.vault.create(e,t);return new w.Notice(`Created note: ${a.basename}`),a}async updateNote(e,t){await this.app.vault.modify(e,t)}async appendToNote(e,t){let s=await this.readNote(e);await this.updateNote(e,s+`
`+t)}async ensureFolderExists(e){this.app.vault.getAbstractFileByPath(e)||await this.app.vault.createFolder(e)}async getNoteMetadata(e){var i;let t=this.app.metadataCache.getFileCache(e),s=(t==null?void 0:t.frontmatter)||{},a=((i=t==null?void 0:t.tags)==null?void 0:i.map(l=>l.tag))||[];return s.tags&&(Array.isArray(s.tags)?a.push(...s.tags.map(l=>`#${l}`)):typeof s.tags=="string"&&a.push(`#${s.tags}`)),{path:e.path,name:e.name,basename:e.basename,extension:e.extension,created:e.stat.ctime,modified:e.stat.mtime,size:e.stat.size,tags:[...new Set(a)],frontmatter:s}}async searchNotes(e){let t=[],s=this.getAllNotes(),a=e.toLowerCase();for(let i of s){let l=await this.readNote(i),u=l.toLowerCase();if(u.includes(a)){let c=l.split(`
`).filter($=>$.toLowerCase().includes(a)).slice(0,3),x=(u.match(new RegExp(a,"g"))||[]).length/l.length*1e3;t.push({file:i,matches:c,score:x})}}return t.sort((i,l)=>l.score-i.score)}getRecentNotes(e=10){return this.getAllNotes().sort((t,s)=>s.stat.mtime-t.stat.mtime).slice(0,e)}getNotesByTag(e){var a;let t=e.startsWith("#")?e:`#${e}`,s=[];for(let i of this.getAllNotes()){let l=this.app.metadataCache.getFileCache(i),u=((a=l==null?void 0:l.tags)==null?void 0:a.map(c=>c.tag))||[],f=l==null?void 0:l.frontmatter;f!=null&&f.tags&&(Array.isArray(f.tags)?u.push(...f.tags.map(c=>`#${c}`)):typeof f.tags=="string"&&u.push(`#${f.tags}`)),u.includes(t)&&s.push(i)}return s}getBacklinks(e){let t=[],s=this.app.metadataCache.resolvedLinks;for(let[a,i]of Object.entries(s))if(i[e.path]){let l=this.app.vault.getAbstractFileByPath(a);l instanceof w.TFile&&t.push(l)}return t}getOutgoingLinks(e){let t=[],s=this.app.metadataCache.resolvedLinks[e.path];if(s)for(let a of Object.keys(s)){let i=this.app.vault.getAbstractFileByPath(a);i instanceof w.TFile&&t.push(i)}return t}async createDailyNote(){let e=new Date,t=e.toISOString().split("T")[0],s=`0-Inbox/${t}.md`,a=this.app.vault.getAbstractFileByPath(s);if(a instanceof w.TFile)return a;let i=`# ${t}

## Tasks
- [ ]

## Notes


## Journal


---
Created by Jarvis at ${e.toLocaleTimeString()}
`;return this.createNote(s,i)}async quickCapture(e,t=[]){let a=`0-Inbox/capture-${new Date().toISOString().replace(/[:.]/g,"-")}.md`,i=t.length>0?`
tags: [${t.join(", ")}]`:"",l=`---
created: ${new Date().toISOString()}${i}
---

${e}
`;return this.createNote(a,l)}getAllTags(){var t;let e=new Set;for(let s of this.getAllNotes()){let a=this.app.metadataCache.getFileCache(s);(t=a==null?void 0:a.tags)==null||t.forEach(l=>e.add(l.tag));let i=a==null?void 0:a.frontmatter;i!=null&&i.tags&&(Array.isArray(i.tags)?i.tags.forEach(l=>e.add(`#${l}`)):typeof i.tags=="string"&&e.add(`#${i.tags}`))}return[...e].sort()}getVaultStats(){let e=this.getAllNotes(),t=this.getAllTags(),s=0,a=this.app.metadataCache.resolvedLinks;for(let i of Object.values(a))s+=Object.keys(i).length;return{totalNotes:e.length,totalTags:t.length,totalLinks:s}}};var Be={ollamaEndpoint:"http://localhost:11434",textModel:"granite3.1-dense:2b",visionModel:"granite3.2-vision:2b",embeddingModel:"granite-embedding:278m",enablePlanning:!0,enableVision:!0,enableTaskWarrior:!0,showStatusBar:!0,temperature:.7},D=class extends g.Plugin{async onload(){await this.loadSettings(),this.ollama=new B(this.settings),this.vault=new N(this.app),this.registerView(E,e=>new M(e,this)),this.addRibbonIcon("bot","Jarvis AI Assistant",()=>{this.activateView()}),this.addCommand({id:"open-jarvis",name:"Open Jarvis",hotkeys:[{modifiers:["Ctrl","Shift"],key:"j"}],callback:()=>this.activateView()}),this.addCommand({id:"jarvis-ask",name:"Quick Ask",hotkeys:[{modifiers:["Ctrl","Shift"],key:"a"}],callback:()=>this.quickAsk()}),this.addCommand({id:"jarvis-summarize",name:"Summarize Current Note",callback:()=>this.summarizeCurrentNote()}),this.addCommand({id:"jarvis-plan",name:"Create Plan",hotkeys:[{modifiers:["Ctrl","Shift"],key:"p"}],callback:()=>this.createPlan()}),this.addCommand({id:"jarvis-task",name:"Create Task",hotkeys:[{modifiers:["Ctrl","Shift"],key:"t"}],callback:()=>this.createTask()}),this.addSettingTab(new Y(this.app,this)),this.settings.showStatusBar&&(this.statusBarItem=this.addStatusBarItem(),this.updateStatusBar("Ready")),this.checkOllamaConnection(),console.log("Jarvis AI Assistant loaded")}onunload(){console.log("Jarvis AI Assistant unloaded")}async loadSettings(){this.settings=Object.assign({},Be,await this.loadData())}async saveSettings(){await this.saveData(this.settings),this.ollama=new B(this.settings)}async activateView(){let{workspace:e}=this.app,t=null,s=e.getLeavesOfType(E);s.length>0?t=s[0]:(t=e.getRightLeaf(!1),await(t==null?void 0:t.setViewState({type:E,active:!0}))),t&&e.revealLeaf(t)}async checkOllamaConnection(){await this.ollama.checkConnection()?(this.updateStatusBar("Connected"),new g.Notice("Jarvis: Connected to Ollama")):(this.updateStatusBar("Disconnected"),new g.Notice("Jarvis: Cannot connect to Ollama. Please ensure Ollama is running."))}updateStatusBar(e){this.statusBarItem&&this.statusBarItem.setText(`Jarvis: ${e}`)}async quickAsk(){let e=this.app.workspace.getActiveViewOfType(g.MarkdownView);if(!e){new g.Notice("No active markdown view");return}let s=e.editor.getSelection()||e.editor.getValue().substring(0,1e3);await this.activateView()}async summarizeCurrentNote(){let e=this.app.workspace.getActiveViewOfType(g.MarkdownView);if(!e){new g.Notice("No active markdown view");return}let t=e.editor.getValue();this.updateStatusBar("Summarizing...");try{let s=await this.ollama.chat([{role:"system",content:"You are a helpful assistant. Summarize the following note in 3-5 bullet points."},{role:"user",content:t}]);new g.Notice("Summary generated! Check Jarvis panel."),await this.activateView()}catch(s){new g.Notice("Failed to generate summary"),console.error(s)}finally{this.updateStatusBar("Ready")}}async createPlan(){await this.activateView(),new g.Notice("Enter your goal in the Jarvis panel to create a plan")}async createTask(){await this.activateView(),new g.Notice("Enter your task in the Jarvis panel")}},Y=class extends g.PluginSettingTab{constructor(e,t){super(e,t),this.plugin=t}display(){let{containerEl:e}=this;e.empty(),e.createEl("h2",{text:"Jarvis AI Assistant Settings"}),e.createEl("h3",{text:"Ollama Configuration"}),new g.Setting(e).setName("Ollama Endpoint").setDesc("The URL of your Ollama server").addText(t=>t.setPlaceholder("http://localhost:11434").setValue(this.plugin.settings.ollamaEndpoint).onChange(async s=>{this.plugin.settings.ollamaEndpoint=s,await this.plugin.saveSettings()})),new g.Setting(e).setName("Text Model").setDesc("The model to use for text generation").addText(t=>t.setPlaceholder("granite3.1-dense:2b").setValue(this.plugin.settings.textModel).onChange(async s=>{this.plugin.settings.textModel=s,await this.plugin.saveSettings()})),new g.Setting(e).setName("Vision Model").setDesc("The model to use for image analysis").addText(t=>t.setPlaceholder("granite3.2-vision:2b").setValue(this.plugin.settings.visionModel).onChange(async s=>{this.plugin.settings.visionModel=s,await this.plugin.saveSettings()})),new g.Setting(e).setName("Temperature").setDesc("Controls randomness (0.0 = deterministic, 1.0 = creative)").addSlider(t=>t.setLimits(0,1,.1).setValue(this.plugin.settings.temperature).setDynamicTooltip().onChange(async s=>{this.plugin.settings.temperature=s,await this.plugin.saveSettings()})),e.createEl("h3",{text:"Features"}),new g.Setting(e).setName("Enable Planning Agent").setDesc("Allow Jarvis to create and manage task plans").addToggle(t=>t.setValue(this.plugin.settings.enablePlanning).onChange(async s=>{this.plugin.settings.enablePlanning=s,await this.plugin.saveSettings()})),new g.Setting(e).setName("Enable Vision").setDesc("Allow Jarvis to analyze images and screenshots").addToggle(t=>t.setValue(this.plugin.settings.enableVision).onChange(async s=>{this.plugin.settings.enableVision=s,await this.plugin.saveSettings()})),new g.Setting(e).setName("Enable TaskWarrior Integration").setDesc("Allow Jarvis to create and manage TaskWarrior tasks").addToggle(t=>t.setValue(this.plugin.settings.enableTaskWarrior).onChange(async s=>{this.plugin.settings.enableTaskWarrior=s,await this.plugin.saveSettings()})),e.createEl("h3",{text:"UI"}),new g.Setting(e).setName("Show Status Bar").setDesc("Show Jarvis status in the status bar").addToggle(t=>t.setValue(this.plugin.settings.showStatusBar).onChange(async s=>{this.plugin.settings.showStatusBar=s,await this.plugin.saveSettings()})),e.createEl("h3",{text:"Connection"}),new g.Setting(e).setName("Test Connection").setDesc("Test the connection to Ollama").addButton(t=>t.setButtonText("Test").onClick(async()=>{t.setButtonText("Testing..."),await this.plugin.checkOllamaConnection(),t.setButtonText("Test")}))}};
