import React, {useEffect, useState} from 'react'
import { View } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import axios from "axios";

export default class PDFView extends React.Component {

    render() {
        return (
            <PDFReader
                source={{
                    uri: 'http://192.168.56.1:8080/api/document/test',
                }}
            />
        )
    }
}
