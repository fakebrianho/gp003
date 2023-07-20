import { Pane } from 'tweakpane'
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { ShaderMaterial, AdditiveBlending } from 'three'
import { useFrame } from '@react-three/fiber'
import { UseTweakpane } from './UseTweakpane'

export default function Panel(uni, fragmentShader, vertexShader) {
	const [uniforms, setUniforms] = useState(uni)
	const material = useMemo(() => {
		return new ShaderMaterial({
			uniforms: {
				...uniforms,
				uTime: { value: 0.0 },
			},
			vertexShader,
			fragmentShader,
			transparent: true,
			depthWrite: false,
			blending: AdditiveBlending,
		})
	}, [fragmentShader, vertexShader])

	const pane = useMemo(() => {
		const pane = new Pane()
		for (const [key, value] of Object.entries(uniforms)) {
			pane.addInput(uniforms[`${key}`], 'value', {
				min: 0,
				max: 20,
				step: 0.01,
				label: `${key}`,
			}).on('change', () => {
				setUniforms((prevUniforms) => ({
					...prevUniforms,
					key: { value: uniforms[`${key}`] },
				}))
			})
		}

		return pane
	}, [])
	useFrame(({ clock }) => {
		const time = clock.getElapsedTime()
		material.uniforms.uTime.value = time
	})

	useEffect(() => {
		material.uniforms = uniforms
	}, [uniforms, material])
	return { material, pane }
}
