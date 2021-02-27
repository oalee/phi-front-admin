
import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

/**
 * Your Component
 */

export default function UploadCard({ text }) {


    return (
        <div style={{ width: 100, height: 100, border: "dashed" }}>
            {text}
        </div>
    )
}