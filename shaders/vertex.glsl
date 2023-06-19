const vertex = `
uniform float uTime;
uniform float uDt;
uniform float uSigma;
uniform float uBeta;
uniform float uRho;

vec3 lorenzAttractor(vec3 pos) {
  float dx = uSigma * (pos.y - pos.x);
  float dy = pos.x * (uRho - pos.z) - pos.y;
  float dz = pos.x * pos.y - uBeta * pos.z;

  return vec3(pos.x + dx * uDt, pos.y + dy * uDt, pos.z + dz * uDt);
}

void main() {
   vec3 newPos = position;
   vec3 prevPos = position;
  //  float timeMod = mod(uTime * 10.0, 100.0);

  
 
  // int numIterations = int(mod(uTime * 10.0, 100.0));
  // for (int i = 0; i < 100; i++) {
  //   prevPos = newPos;
  //   newPos = lorenzAttractor(newPos);
  //   if(float(i) >= timeMod){
  //     break;
  //   }
  // }
  // vec3 finalPos = mix(prevPos, newPos, fract(uTime*10.0));
   float timeScaled = uTime * 0.05;

  for (int i = 0; i < 5000; i++) {
    if (float(i) * uDt > timeScaled) {
      break;
    }
    prevPos = newPos;
    newPos = lorenzAttractor(newPos);
  }

  vec3 finalPos = mix(prevPos, newPos, fract(timeScaled / uDt));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
  gl_PointSize = 2.0;
}
`
export default vertex