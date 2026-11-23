import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const css=html.match(/<style>([\s\S]*?)<\/style>/)?.[1];
const sha=s=>createHash('sha256').update(s).digest('hex');
test('Original CSS is preserved byte-for-byte',()=>{
 assert.equal(sha(css),'479ad17cafd0a8ba6952e22b24472b4e8e3365415d719e9e53577c8e2060c005');
 for(const v of ['--accent-neon: #00f2ff','--accent-purple: #bd93f9','--accent-sun: #ffcc00','--accent-nebula: #ff79c6',"url('media/another space img.jpg')"])assert.ok(css.includes(v),v);
});
test('Original cosmic structure and animations',()=>{
 for(const id of ['id="particles-canvas"','id="hero-cosmos"','class="hero-graphic-card"','class="stats-bar"','class="highlight-grid"','class="education-section"','class="project-card"'])assert.ok(html.includes(id),id);
 assert.match(html,/class HeroPlanet/);assert.match(html,/function animateHeroCosmos/);
});
test('Identity corrected, no unrelated source links',()=>{
 assert.match(html,/<title>Teja ManiKumar/);
 assert.doesNotMatch(html,/github\.com\/TejaAlla|your-email@example\.com|linkedin\.com\/in\/teja-alla-dev|Teja Alla/);
});
test('Five direct Google Play releases',()=>{
 for(const id of ['com.ffsensiai.app','com.aimforge.aimforge_ai','com.god88.snapnotes','com.god88.tap_slice','com.god88.numbernest'])assert.ok(html.includes('https://play.google.com/store/apps/details?id='+id),id);
});
test('Eight authentic repositories',()=>{
 for(const r of ['god88844-hub/MEG','god88844-hub/aerodynamics-lab','god88844-hub/electrophysics-lab','god88844-hub/where-is-my-bus','god88844-hub/universal-decoder','saikumar1982/CrowdSync','saikumar1982/store','saikumar1982/Level-Up'])assert.ok(html.includes('https://github.com/'+r),r);
});
test('Thirteen discoverable projects and playable paths',()=>{
 assert.equal((html.match(/class="project-card"/g)||[]).length,13);
 for(const s of ['id="project-search"','data-filter="games"','id="project-dialog"','id="tap-start"','id="tap-target"','href="demos/solar-system.html"'])assert.ok(html.includes(s),s);
 assert.ok(html.includes('id="cosmic-audio"'));
 assert.ok(html.includes('media/audio khaleja.mp3'));
 assert.ok(html.includes('id="hero-cosmos-3d"'));
});
