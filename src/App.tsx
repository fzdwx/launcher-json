import {
    Action,
    Background,
    Container,
    Footer,
    Input,
    ResultsRender,
    useActionStore,
    useMatches,
    mainView, clipboard, getTheme
} from 'launcher-api'
import React, {SVGProps, useEffect, useState} from 'react'
import {trim} from "./util.ts";
import {useLocalStorageState} from "ahooks";

const App = () => {
    const [input, setInput] = React.useState("");
    const [output, setOutput] = useState("")
    const [theme, setTheme] = useState(getTheme())

    useEffect(() => {
        async function init() {
            const text = await clipboard.get()
            setInput(text)
        }

        init()
    }, []);

    useEffect(() => {
        const value = trim(input)
        setOutput(value)
    }, [input]);

    return (
        <div className={theme}>
            <Container>
                <Background>
                    <div className='flex h-[calc(100%-40px)] w-full'>
                        <div className='p-5 w-50%'>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className='w-full h-full resize-none bg-transparent text-[var(--text)]'
                            />
                        </div>
                        <div className='p-5 w-50%'>
                            <textarea
                                disabled
                                value={output}
                                className='w-full h-full resize-none bg-transparent text-[var(--text)]'
                            />
                        </div>
                    </div>
                    <Footer current={null} icon={
                        <img src="/logo.svg" className='w-5' alt='logo'/>
                    } actions={() => []} content={
                        () => <div>123</div>
                    }/>
                </Background>
            </Container>
        </div>
    )
}

export default App
