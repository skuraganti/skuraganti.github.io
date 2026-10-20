const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const test = require('node:test');
const code = fs.readFileSync(require('node:path').join(__dirname, '../script.js'), 'utf8');
class Element {
  constructor(attrs = {}) { this.attrs = {...attrs}; this.hidden = true; this.events = {}; this.textContent = ''; }
  getAttribute(k) { return this.attrs[k] ?? null; }
  setAttribute(k,v) { this.attrs[k] = String(v); }
  hasAttribute(k) { return k in this.attrs; }
  addEventListener(k,f) { this.events[k] = f; }
  click() { this.events.click(); }
}
function setup({blocked=false,saved=null,dark=false}={}) {
  const root=new Element(), toggle=new Element(), bar=new Element(), count=new Element(), empty=new Element();
  const buttons=['all','data','ai','missing'].map(c=>new Element({'data-filter':c}));
  const reset=new Element({'data-filter':'all'});
  const projects=['data','ai','ai','data','data','ai','ai'].map(c=>new Element({'data-cat':c}));
  projects.forEach(p=>p.hidden=false);
  const lists=[new Element({'data-group-list':'featured'}),new Element({'data-group-list':'more'})];
  const titles=lists.map(()=>new Element());
  lists.forEach((l,i)=>l.querySelector=()=>projects.slice(i===0?0:3,i===0?3:7).find(p=>!p.hidden)||null);
  bar.querySelector=()=>count;bar.querySelectorAll=()=>buttons;
  let value=saved; const media={matches:dark,addEventListener(_k,f){this.change=f;}};
  const document={documentElement:root,readyState:'complete',querySelector(s){if(s==='.theme-toggle')return toggle;if(s==='.filter')return bar;if(s==='.filter-empty')return empty;return titles[lists.findIndex(l=>s.includes(l.getAttribute('data-group-list')))];},querySelectorAll(s){if(s==='[data-filter]')return [...buttons,reset];if(s==='.project[data-cat]')return projects;if(s==='[data-group-list]')return lists;throw Error('Unexpected selector '+s);}};
  const localStorage={getItem(){if(blocked)throw Error('storage denied fixture');return value;},setItem(_k,v){if(blocked)throw Error('storage denied fixture');value=v;}};
  vm.runInNewContext(code,{document,window:{matchMedia:()=>media},localStorage});
  return {root,toggle,bar,count,empty,buttons,reset,projects,lists,titles,media,saved:()=>value};
}
test('denied storage still reveals working theme and filters',()=>{const f=setup({blocked:true});assert.equal(f.toggle.hidden,false);assert.equal(f.bar.hidden,false);f.toggle.click();assert.equal(f.root.getAttribute('data-theme'),'dark');assert.equal(f.toggle.getAttribute('aria-pressed'),'true');f.buttons[2].click();assert.equal(f.count.textContent,'Showing 4 of 7 projects');f.toggle.click();assert.equal(f.root.getAttribute('data-theme'),'light');});
test('theme persists across a fresh script context and follows system before manual choice',()=>{const f=setup({dark:true});assert.equal(f.toggle.getAttribute('aria-pressed'),'true');f.media.matches=false;f.media.change();assert.equal(f.toggle.getAttribute('aria-pressed'),'false');f.toggle.click();assert.equal(f.saved(),'dark');const next=setup({saved:f.saved()});assert.equal(next.root.getAttribute('data-theme'),'dark');assert.equal(next.toggle.getAttribute('aria-pressed'),'true');});
test('invalid saved theme falls back to system',()=>{const f=setup({saved:'invalid',dark:true});assert.equal(f.root.hasAttribute('data-theme'),false);assert.equal(f.toggle.getAttribute('aria-pressed'),'true');});
test('theme icon has a truthful accessible action and tooltip',()=>{const f=setup();assert.equal(f.toggle.getAttribute('aria-label'),'Switch to dark theme');assert.equal(f.toggle.getAttribute('title'),'Switch to dark theme');f.toggle.click();assert.equal(f.toggle.getAttribute('aria-label'),'Switch to light theme');assert.equal(f.toggle.getAttribute('title'),'Switch to light theme');});
test('filter counts/groups/reset track the complete seven-project cohort',()=>{const f=setup();assert.equal(f.count.textContent,'Showing 7 of 7 projects');f.buttons[1].click();assert.equal(f.count.textContent,'Showing 3 of 7 projects');assert.equal(f.projects.filter(p=>!p.hidden).length,3);assert.equal(f.buttons[1].getAttribute('aria-pressed'),'true');f.buttons[2].click();assert.equal(f.count.textContent,'Showing 4 of 7 projects');f.reset.click();assert.equal(f.count.textContent,'Showing 7 of 7 projects');assert.ok(f.lists.every(l=>!l.hidden));});
test('injected unmatched filter shows a recoverable empty state',()=>{const f=setup();f.buttons[3].click();assert.equal(f.empty.hidden,false);assert.equal(f.count.textContent,'Showing 0 of 7 projects');assert.ok(f.lists.every(l=>l.hidden));assert.ok(f.titles.every(l=>l.hidden));f.reset.click();assert.equal(f.empty.hidden,true);assert.equal(f.count.textContent,'Showing 7 of 7 projects');});
