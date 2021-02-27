
import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

/**
 * Your Component
 */

export default function FileView({ fileName, status, img, url, order }) {


    return (
        <div style={{ width: 200, height: 100, border: "dashed" }}>
            {fileName}
        </div>
    )
}