import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import { useContextAuth } from './contexts/AuthContext.js'

function Home() {
    return (
        <>
            <Card>
                <CardContent>
                    React 및 Firebase 기반의 클라우드 어플리케이션
                </CardContent>


            </Card>
        </>
    )
}

export default Home
