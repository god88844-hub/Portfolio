import test from 'node:test';
import assert from 'node:assert/strict';
import {statSync,readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('Restored soundtrack is playable using the original MP3',()=>{
  assert.ok(html.includes('<audio id="cosmic-audio" controls loop preload="none"'));
  assert.ok(html.includes('<source src="media/audio khaleja.mp3" type="audio/mpeg">'));
  assert.ok(html.includes('href="media/audio khaleja.mp3" download'));
  assert.doesNotMatch(html,/<audio\b[^>]*autoplay/);
  assert.ok(statSync(new URL('../media/audio khaleja.mp3',import.meta.url)).size>10000);
});
test('Original solar system is active without Three.js overlays',()=>{
  assert.match(html,/function animateHeroCosmos\(\)/);
  assert.match(html,/requestAnimationFrame\(animateHeroCosmos\)/);
  assert.match(html,/id="hero-cosmos"/);
  assert.doesNotMatch(html,/hero-cosmos-3d|js\/cosmic-three\.mjs|three-ready/);
});
