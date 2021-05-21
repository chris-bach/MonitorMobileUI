import React, {useEffect, useState} from 'react'
import { View } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import axios from "axios";

/**
 * @author Chris Bautista
 * @description This component is unused as we removed the view documents function.
 * It originally rendered PDF components to the screen
 */
export default class PDFView extends React.Component {
    render() {
        return (
            <PDFReader
                source={{
                    uri: 'http://192.168.20.13:8080/api/document/test',
                }}
            />
        )
    }
}
