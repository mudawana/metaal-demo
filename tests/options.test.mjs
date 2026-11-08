import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeDesign} from '../src/options.mjs';
test('clamps the dimensions of the simple demo door',()=>{
 assert.equal(normalizeDesign({type:'enkel',width:-1,height:90000}).width,650);
 assert.equal(normalizeDesign({type:'enkel',height:90000}).height,3000);
});
test('double door has a minimum practical preview width',()=>{
 assert.equal(normalizeDesign({type:'dubbel',width:700}).width,1200);
});
test('rejects unsupported features in the intentionally limited demo',()=>{
 const d=normalizeDesign({type:'boog',finish:'anodic-goud',glass:'figuur'});
 assert.equal(d.type,'enkel');assert.equal(d.finish,'zwart');assert.equal(d.glass,'helder');
});
