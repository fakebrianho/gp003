
const AizawaVert = `

vec3 aizawa(vec3 pos, float a, float b, float c, float d, float e, float f) {
  float x = pos.x;
  float y = pos.y;
  float z = pos.z;
  
  float x1 = sin(z) + (c * sin(x));
  float y1 = z + (a * y) - (x * z);
  float z1 = (b + (x * y)) - (d * z);
  
  float x2 = sin(z1) + (c * sin(x1));
  float y2 = z1 + (a * y1) - (x1 * z1);
  float z2 = (b + (x1 * y1)) - (d * z1);
  
  float x3 = sin(z2) + (c * sin(x2));
  float y3 = z2 + (a * y2) - (x2 * z2);
  float z3 = (b + (x2 * y2)) - (d * z2);
  
  return vec3(x3, y3, z3);
}
uniform float uTime;
// uniform float uSpeed;
// uniform float uScale;
// uniform float a;
// uniform float b;
// uniform float c;
// uniform float d;
// uniform float e;
// uniform float f;

void main() {
  float a = 0.95;
  float b = 0.7;
  float c = 0.6;
  float d = 3.5;
  float e = 0.25 + 0.15 * sin(uTime * 0.5);
  float f = 0.1;

  float x = position.x;
  float y = position.y;
  float z = position.z;

  float dx = (z - b) * x - d * y;
  float dy = d * x + (z - b) * y;
  float dz = c + a * z - pow(z, 3.0) / 3.0 - (x * x + y * y) * (1.0 + e * z) + f * z * pow(x, 3.0);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(dx, dy, dz, 1.0);
}

`
export default AizawaVert