
// Simple billboard so panels face the camera
AFRAME.registerComponent('billboard', {
  tick: function () {
    const cam = this.el.sceneEl.camera;
    if (cam) this.el.object3D.lookAt(cam.position);
  }
});

// Load hotspots from JSON and place on NFT anchor
AFRAME.registerComponent('hotspots-loader-arjs', {
  schema: {
    src: {type: 'string'}
  },
  init: function() {
    fetch(this.data.src)
      .then(r => r.json())
      .then(data => {
        // reference plane for debugging / alignment
        const plane = document.createElement('a-plane');
        plane.setAttribute('width','1.2');
        plane.setAttribute('height','0.8');
        plane.setAttribute('position','0 0 0');
        plane.setAttribute('rotation','-90 0 0'); // lay flat on the NFT
        plane.setAttribute('material','src: #mapTex; opacity: 0.3; transparent: true; side: double');
        this.el.appendChild(plane);

        data.countries.forEach(c => {
          const g = document.createElement('a-entity');
          // NFT units ~ meters, place slightly above surface (z -> y after rotation)
          g.setAttribute('position', `${c.x} 0.01 ${c.y}`);
          g.setAttribute('rotation', '-90 0 0'); // align to plane

          const pin = document.createElement('a-sphere');
          pin.setAttribute('radius','0.01');
          pin.setAttribute('position','0 0 0');
          g.appendChild(pin);

          const panel = document.createElement('a-plane');
          panel.setAttribute('width','0.32');
          panel.setAttribute('height','auto');
          panel.setAttribute('position','0 0.06 0');
          panel.setAttribute('material','opacity: 0.9; transparent: true; side: double');
          panel.setAttribute('billboard',''); // face camera
          
          const lines = [`${c.name}`];
          for (const [k,v] of Object.entries(c.values)) lines.push(`${k}: ${v}`);
          const txt = document.createElement('a-text');
          txt.setAttribute('value', lines.join("\n"));
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
