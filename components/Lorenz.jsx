import vertexShader from '@/shaders/vertex.glsl'
import fragmentShader from '@/shaders/fragment.glsl'

export default function Lorenz() {
	const uniforms = {
		uDt: { value: 0.01 },
		uSigma: { value: 10.0 },
		uBeta: { value: 8.0 / 3.0 },
		uRho: { value: 28.0 },
		uTime: { value: 0.0 },
	}
	return {
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
	}
}
