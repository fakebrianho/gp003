import { useEffect, useMemo, useRef } from 'react'

export function UseTweakpane(createPane, dependencies = []) {
	const paneRef = useRef(null)
	const pane = useMemo(() => createPane(), dependencies)

	useEffect(() => {
		if (paneRef.current && pane) {
			paneRef.current.appendChild(pane.domElement)
			return () => {
				paneRef.current.removeChild(pane.domElement)
			}
		}
	}, [pane])

	return pane
}
