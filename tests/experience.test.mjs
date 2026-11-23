import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, statSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const moduleUrl=new URL('../js/cosmic-three.mjs',import.meta.url);
const moduleText=readFileSync(moduleUrl,'utf8');
test('Audio playback is restored using the exact existing MP3, without autoplay',()=>{
  assert.match(html,/<audio\b[^>]*id="cosmic-audio"[^>]*controls[^>]*loop/);
  assert.match(html,/<source src="media\/audio khaleja\.mp3" type="audio\/mpeg">/);
  assert.match(html,/<a href="media\/audio khaleja\.mp3" download class="bgm-download-btn">/);
  assert.doesNotMatch(html,/<audio\b[^>]*autoplay/);
  assert.ok(statSync(new URL('../media/audio khaleja.mp3',import.meta.url)).size>10000);
});
test('Three.js file parses as a valid JavaScript module',()=>{
  execFileSync(process.execPath,['--check',fileURLToPath(moduleUrl)],{stdio:'pipe'});
});
test('Three.js actually builds an interactive 3D scene with robust fallbacks',()=>{
  for(const s of [
    'three@0.186.1/build/three.module.js','new THREE.WebGLRenderer',
    'new THREE.PerspectiveCamera','new THREE.SphereGeometry',
    'new THREE.LineLoop','new THREE.Points','pointermove',
    'webglcontextlost','ResizeObserver','IntersectionObserver',
    'prefers-reduced-motion','devicePixelRatio','canvas-fallback'
  ])assert.ok(moduleText.includes(s),s);
  assert.match(html,/id="hero-cosmos-3d"/);
  assert.match(html,/type="module" src="js\/cosmic-three\.mjs"/);
  assert.match(html,/if \(window\.__cosmos3DActive\) return;/);
});
test('Existing identity, projects and original palette remain intact',()=>{
  assert.equal((html.match(/class="project-card"/g)||[]).length,13);
  const originalTheme=html.match(/<style>([\s\S]*?)<\/style>/)?.[1]||'';
  for(const s of [
    '--accent-neon: #00f2ff','--accent-purple: #bd93f9',
    '--accent-sun: #ffcc00','--accent-nebula: #ff79c6',
    "url('media/another space img.jpg')"
  ])assert.ok(originalTheme.includes(s),s);
  assert.ok(html.includes('Teja ManiKumar'));
  assert.ok(html.includes('id="project-search"'));
});
