import vertexShader from '@/shaders/AizawaVert.glsl'
import fragmentShader from '@/shaders/fragment.glsl'

export default function Aizawa() {
	const uniforms = {
		uTime: { value: 0.0 },
		uSpeed: { value: 1.0 },
		uScale: { value: 1.0 },
		a: { value: 0.95 },
		b: { value: 0.7 },
		c: { value: 0.6 },
		d: { value: 3.5 },
		e: { value: 0.25 },
		f: { value: 0.1 },
	}
	return {
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
	}
}
