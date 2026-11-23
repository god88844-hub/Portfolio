/* A real 3D orbital scene, without changing the original site's CSS/theme.
   The original 2D canvas remains the offline and unsupported-GPU fallback. */
const host=document.querySelector('.hero-graphic-card');
const canvas=document.getElementById('hero-cosmos-3d');
const pauseButton=document.getElementById('three-pause');
const resetButton=document.getElementById('three-reset');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
if(host&&canvas&&pauseButton&&resetButton){
  try{
    // No added framework, tracking, fonts or artwork. Pinned Three.js ESM.
    const THREE=await import('https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.js');
    const renderer=new THREE.WebGLRenderer({
      canvas,alpha:true,antialias:true,powerPreference:'low-power'
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
    renderer.setClearColor(0x000000,0);
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(44,1,0.1,250);
    const system=new THREE.Group();
    scene.add(system);
    scene.add(new THREE.AmbientLight(0x8197c6,0.9));
    const light=new THREE.PointLight(0xffcc78,1500,125,1.65);
    scene.add(light);
    const sun=new THREE.Mesh(new THREE.SphereGeometry(2.55,32,24),
      new THREE.MeshBasicMaterial({color:0xffcc00}));
    system.add(sun);
    const glowCanvas=document.createElement('canvas');
    glowCanvas.width=glowCanvas.height=128;
    const glowCtx=glowCanvas.getContext('2d');
    const gradient=glowCtx.createRadialGradient(64,64,3,64,64,64);
    gradient.addColorStop(0,'rgba(255,236,145,0.7)');
    gradient.addColorStop(.28,'rgba(255,204,0,0.3)');
    gradient.addColorStop(1,'rgba(255,204,0,0)');
    glowCtx.fillStyle=gradient;
    glowCtx.fillRect(0,0,128,128);
    const glowTexture=new THREE.CanvasTexture(glowCanvas);
    const glow=new THREE.Sprite(new THREE.SpriteMaterial({
      map:glowTexture,color:0xffcc00,transparent:true,
      depthWrite:false,blending:THREE.AdditiveBlending
    }));
    glow.scale.set(13,13,1);
    system.add(glow);
    const sphere=new THREE.SphereGeometry(1,24,16);
    const bodies=[
      {name:'Mercury',radius:6.5,size:.55,color:0x9295a4,speed:.54},
      {name:'Venus',radius:9.5,size:.9,color:0xddae75,speed:.38},
      {name:'Earth',radius:13,size:1.02,color:0x408fe0,speed:.29},
      {name:'Mars',radius:16.5,size:.72,color:0xe17b57,speed:.24},
      {name:'Jupiter',radius:21.6,size:2.12,color:0xcfa583,speed:.12},
      {name:'Saturn',radius:27.1,size:1.79,color:0xc8b67e,speed:.087}
    ];
    const orbits=[];
    bodies.forEach((body,index)=>{
      const points=[];
      for(let j=0;j<192;j++){
        const angle=j/192*Math.PI*2;
        points.push(new THREE.Vector3(
          Math.cos(angle)*body.radius,0,Math.sin(angle)*body.radius
        ));
      }
      system.add(new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({
          color:index%2?0xbd93f9:0x00f2ff,
          transparent:true,opacity:.14,depthWrite:false
        })
      ));
      const pivot=new THREE.Group();
      system.add(pivot);
      const mesh=new THREE.Mesh(sphere,new THREE.MeshStandardMaterial({
        color:body.color,metalness:.05,roughness:.86
      }));
      mesh.scale.setScalar(body.size);
      mesh.position.x=body.radius;
      pivot.add(mesh);
      if(body.name==='Earth'){
        const moon=new THREE.Mesh(
          new THREE.SphereGeometry(.2,12,8),
          new THREE.MeshStandardMaterial({color:0xdadce2,roughness:1})
        );
        moon.position.set(body.radius+1.65,0,0);
        pivot.add(moon);
      }
      if(body.name==='Saturn'){
        const ring=new THREE.Mesh(
          new THREE.RingGeometry(1.3,2.1,80),
          new THREE.MeshBasicMaterial({
            color:0xf4c976,side:THREE.DoubleSide,transparent:true,
            opacity:.62,depthWrite:false
          })
        );
        ring.rotation.x=-Math.PI/2+.3;
        mesh.add(ring);
      }
      orbits.push({body,pivot,mesh,angle:index*.93+1.2});
    });
    // Procedural asteroid belt: decorative, not a calibrated N-body simulation.
    const asteroids=[];
    for(let i=0;i<440;i++){
      const angle=i*2.39996;
      const radius=18.65+(Math.sin(i*18.44)+1)*.58;
      asteroids.push(
        Math.cos(angle)*radius,Math.sin(i*7.1)*.16,Math.sin(angle)*radius
      );
    }
    const beltGeometry=new THREE.BufferGeometry();
    beltGeometry.setAttribute('position',
      new THREE.Float32BufferAttribute(asteroids,3));
    const belt=new THREE.Points(beltGeometry,new THREE.PointsMaterial({
      color:0xd9cddc,size:.14,transparent:true,opacity:.62
    }));
    system.add(belt);
    // Star points give the existing two-dimensional background some depth.
    const stars=[];
    for(let i=0;i<350;i++){
      const angle=i*2.39996;
      const r=36+(i*37%60);
      stars.push(Math.cos(angle)*r,Math.sin(i*12.67)*22,Math.sin(angle)*r);
    }
    const starsGeometry=new THREE.BufferGeometry();
    starsGeometry.setAttribute('position',new THREE.Float32BufferAttribute(stars,3));
    scene.add(new THREE.Points(starsGeometry,new THREE.PointsMaterial({
      color:0xb8e9ff,size:.3,transparent:true,opacity:.65,depthWrite:false
    })));
    const initial={yaw:.18,pitch:.73,distance:78};
    let yaw=initial.yaw,pitch=initial.pitch,distance=initial.distance;
    let dragging=false,lastX=0,lastY=0,paused=reducedMotion.matches;
    let visible=true,raf=0,lastFrame=0,ready=false,failed=false;
    const clamp=(x,min,max)=>Math.min(max,Math.max(min,x));
    function positionCamera(){
      camera.position.set(
        Math.sin(yaw)*Math.cos(pitch)*distance,
        Math.sin(pitch)*distance,
        Math.cos(yaw)*Math.cos(pitch)*distance
      );
      camera.lookAt(0,0,0);
    }
    function resize(){
      const w=Math.max(host.clientWidth,1);
      const h=Math.max(host.clientHeight,1);
      camera.aspect=w/h;
      camera.updateProjectionMatrix();
      renderer.setSize(w,h,false);
      positionCamera();
    }
    function render(){
      positionCamera();
      renderer.render(scene,camera);
      if(!ready){
        ready=true;
        window.__cosmos3DActive=true;
        host.classList.add('three-ready');
        host.dataset.renderer='threejs';
      }
    }
    function animate(now){
      raf=0;
      if(failed||!visible||document.hidden)return;
      const dt=Math.min((now-lastFrame)/1000||.016,.05);
      lastFrame=now;
      if(!paused){
        for(const orbit of orbits){
          orbit.angle+=orbit.body.speed*dt;
          orbit.pivot.rotation.y=orbit.angle;
          orbit.mesh.rotation.y+=dt*.2;
        }
        belt.rotation.y+=.015*dt;
        sun.rotation.y+=.07*dt;
      }
      render();
      if(!paused)raf=requestAnimationFrame(animate);
    }
    function stop(){if(raf)cancelAnimationFrame(raf);raf=0;}
    function start(){
      if(raf||failed||!visible||document.hidden||paused)return;
      lastFrame=performance.now();
      raf=requestAnimationFrame(animate);
    }
    function refresh(){render();start();}
    function setPause(value){
      paused=value;
      pauseButton.textContent=paused?'Resume':'Pause';
      pauseButton.setAttribute('aria-pressed',String(paused));
      if(paused)stop();else start();
    }
    canvas.addEventListener('pointerdown',event=>{
      if(event.pointerType==='mouse'&&event.button!==0)return;
      dragging=true;
      lastX=event.clientX;
      lastY=event.clientY;
      canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener('pointermove',event=>{
      if(!dragging)return;
      yaw-=(event.clientX-lastX)*.006;
      pitch=clamp(pitch+(event.clientY-lastY)*.006,.23,1.37);
      lastX=event.clientX;
      lastY=event.clientY;
      refresh();
    });
    const stopDrag=()=>{dragging=false;};
    canvas.addEventListener('pointerup',stopDrag);
    canvas.addEventListener('pointercancel',stopDrag);
    canvas.addEventListener('lostpointercapture',stopDrag);
    canvas.addEventListener('wheel',event=>{
      event.preventDefault();
      distance=clamp(distance+event.deltaY*.055,48,114);
      refresh();
    },{passive:false});
    canvas.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(event.key))return;
      event.preventDefault();
      if(event.key==='Home'){
        yaw=initial.yaw;pitch=initial.pitch;distance=initial.distance;
      }else if(event.key==='ArrowLeft')yaw-=.16;
      else if(event.key==='ArrowRight')yaw+=.16;
      else if(event.key==='ArrowUp')distance=clamp(distance-5,48,114);
      else if(event.key==='ArrowDown')distance=clamp(distance+5,48,114);
      refresh();
    });
    resetButton.addEventListener('click',()=>{
      yaw=initial.yaw;pitch=initial.pitch;distance=initial.distance;
      refresh();
    });
    pauseButton.addEventListener('click',()=>setPause(!paused));
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden)stop();else start();
    });
    reducedMotion.addEventListener?.('change',event=>setPause(event.matches));
    const resizeObserver=new ResizeObserver(()=>{
      resize();
      if(ready)refresh();
    });
    resizeObserver.observe(host);
    const intersectionObserver=new IntersectionObserver(entries=>{
      visible=entries[0]?.isIntersecting??true;
      if(visible)start();else stop();
    },{rootMargin:'100px'});
    intersectionObserver.observe(host);
    canvas.addEventListener('webglcontextlost',event=>{
      event.preventDefault();
      failed=true;
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.__cosmos3DActive=false;
      host.classList.remove('three-ready');
      host.dataset.renderer='canvas-fallback';
      if(typeof window.animateHeroCosmos==='function'){
        window.animateHeroCosmos();
      }
    });
    resize();
    for(const orbit of orbits)orbit.pivot.rotation.y=orbit.angle;
    render();
    setPause(paused);
    start();
  }catch(error){
    // Graceful fallback if CDN is blocked/offline or hardware lacks WebGL.
    window.__cosmos3DActive=false;
    host.dataset.renderer='canvas-fallback';
    console.info('Original 2D solar system preserved; Three.js unavailable:',error?.message||'');
  }
}
