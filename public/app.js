
AFRAME.registerComponent('billboard',{
  tick:function(){
    const cam=this.el.sceneEl.camera;
    if(cam){ this.el.object3D.lookAt(cam.position); }
  }
});

AFRAME.registerComponent('hotspots-loader-arjs',{
  schema:{ src:{type:'string'} },
  init:function(){
    fetch(this.data.src).then(r=>r.json()).then(data=>{
      const plane=document.createElement('a-plane');
      plane.setAttribute('width','1.2');
      plane.setAttribute('height','0.8');
      plane.setAttribute('position','0 0 0');
      plane.setAttribute('rotation','-90 0 0');
      plane.setAttribute('material','src: #mapTex; opacity: 0.3; transparent: true; side: double');
      this.el.appendChild(plane);

      data.countries.forEach(c=>{
        const g=document.createElement('a-entity');
        g.setAttribute('position',`${c.x} 0.01 ${c.y}`);
        g.setAttribute('rotation','-90 0 0');

        const pin=document.createElement('a-sphere');
        pin.setAttribute('radius','0.01');
        g.appendChild(pin);

        const panel=document.createElement('a-plane');
        panel.setAttribute('width','0.32');
        panel.setAttribute('position','0 0.06 0');
        panel.setAttribute('material','opacity: 0.92; transparent: true; side: double');
        panel.setAttribute('billboard','');

        const lines=[`${c.name}`];
        for(const [k,v] of Object.entries(c.values)) lines.push(`${k}: ${v}`);
        const txt=document.createElement('a-text');
        txt.setAttribute('value',lines.join("\n"));
        txt.setAttribute('align','center');
        txt.setAttribute('width','0.9');
        txt.setAttribute('wrap-count','28');
        txt.setAttribute('baseline','top');
        txt.setAttribute('color','#000');
        panel.appendChild(txt);

        g.appendChild(panel);
        this.el.appendChild(g);
      });
    });
  }
});
