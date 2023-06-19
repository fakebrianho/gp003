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

		// pane.addInput(uniforms.uSigma, 'value', {
		// 	min: 0,
		// 	max: 20,
		// 	step: 0.1,
		// 	label: 'uSigma',
		// }).on('change', () => {
		// 	setUniforms((prevUniforms) => ({
		// 		...prevUniforms,
		// 		uSigma: { value: uniforms.uSigma.value },
		// 	}))
		// })

		// pane.addInput(uniforms.uRho, 'value', {
		// 	min: 0,
		// 	max: 50,
		// 	step: 1,
		// 	label: 'uRho',
		// }).on('change', () => {
		// 	setUniforms((prevUniforms) => ({
		// 		...prevUniforms,
		// 		uRho: { value: uniforms.uRho.value },
		// 	}))
		// })

		// pane.addInput(uniforms.uBeta, 'value', {
		// 	min: 0,
		// 	max: 10,
		// 	step: 0.1,
		// 	label: 'uBeta',
		// }).on('change', () => {
		// 	setUniforms((prevUniforms) => ({
		// 		...prevUniforms,
		// 		uBeta: { value: uniforms.uBeta.value },
		// 	}))
		// })

		// pane.addInput(uniforms.uDt, 'value', {
		// 	min: 0,
		// 	max: 2,
		// 	step: 0.01,
		// 	label: 'uDt',
		// }).on('change', () => {
		// 	setUniforms((prevUniforms) => ({
		// 		...prevUniforms,
		// 		uDt: { value: uniforms.uDt.value },
		// 	}))
		// })

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

	// const { material } = UseTweakpane(() => {
	// 	const material = new ShaderMaterial({
	// 		uniforms,
	// 		vertexShader,
	// 		fragmentShader,
	// 		transparent: true,
	// 		depthWrite: false,
	// 		blending: AdditiveBlending,
	// 	})

	// 	const pane = new Pane()
	// 	pane.addInput(uniforms.uSigma, 'value', {
	// 		min: 0,
	// 		max: 20,
	// 		step: 0.1,
	// 		label: 'uSigma',
	// 	}).on('change', () => {
	// 		setUniforms((prevUniforms) => ({
	// 			...prevUniforms,
	// 			uSigma: { value: uniforms.uSigma.value },
	// 		}))
	// 	})

	// 	pane.addInput(uniforms.uRho, 'value', {
	// 		min: 0,
	// 		max: 50,
	// 		step: 1,
	// 		label: 'uRho',
	// 	}).on('change', () => {
	// 		setUniforms((prevUniforms) => ({
	// 			...prevUniforms,
	// 			uRho: { value: uniforms.uRho.value },
	// 		}))
	// 	})

	// 	pane.addInput(uniforms.uBeta, 'value', {
	// 		min: 0,
	// 		max: 10,
	// 		step: 0.1,
	// 		label: 'uBeta',
	// 	}).on('change', () => {
	// 		setUniforms((prevUniforms) => ({
	// 			...prevUniforms,
	// 			uBeta: { value: uniforms.uBeta.value },
	// 		}))
	// 	})

	// 	pane.addInput(uniforms.uDt, 'value', {
	// 		min: 0,
	// 		max: 2,
	// 		step: 0.01,
	// 		label: 'uDt',
	// 	}).on('change', () => {
	// 		setUniforms((prevUniforms) => ({
	// 			...prevUniforms,
	// 			uDt: { value: uniforms.uDt.value },
	// 		}))
	// 	})

	// 	return { material, pane }
	// }, [uniforms])

	// useFrame(({ clock }) => {
	// 	const time = clock.getElapsedTime()
	// 	setUniforms((prevUniforms) => ({
	// 		...prevUniforms,
	// 		uTime: { value: time },
	// 	}))
	// })

	// useEffect(() => {
	// 	material.uniforms = uniforms
	// }, [])

	// return material
}
