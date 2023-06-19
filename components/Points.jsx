import React, { useRef, useMemo } from 'react'
import Panel from './Panel'
import * as THREE from 'three'

export default function Points(props) {
	const material = Panel(
		props.params.uniforms,
		props.params.fragmentShader,
		props.params.vertexShader
	).material

	const points = useRef()
	const particlesArray = useMemo(() => {
		const positions = new Float32Array(props.count * 3)
		// const angleStep =
		for (let i = 0; i < props.count; i++) {
			const x = Math.random() * props.width - props.width / 2
			const y = Math.random() * props.height - props.height / 2
			const z = Math.random() * props.depth - props.depth / 2

			positions[i * 3] = x
			positions[i * 3 + 1] = y
			positions[i * 3 + 2] = z
		}
		return positions
	}, [props.count, props.width, props.height, props.depth])

	const geometry = useMemo(() => {
		const geom = new THREE.BufferGeometry()
		geom.setAttribute(
			'position',
			new THREE.BufferAttribute(particlesArray, 3)
		)
		return geom
	}, [particlesArray])

	return <points ref={points} geometry={geometry} material={material} />
}
