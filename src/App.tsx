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
import React, {SVGProps, useEffect, useRef, useState} from 'react'
import {compressAndAddEscape, prettyJson, trim} from "./util.ts";
import {useLocalStorageState} from "ahooks";

const App = () => {
    const [input, setInput] = React.useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const [output, setOutput] = useState("")
    const [theme, setTheme] = useState(getTheme())

    useEffect(() => {
        async function init() {
            const text = await clipboard.get()
            try {
                const res = prettyJson(text)
                setInput(res)
            } catch (e) {
                console.log(e)
            }
        }

        init()
    }, []);

    useEffect(() => {
        try {
            if (input === output) {
                return
            }
            if (input === "") {
                setOutput("")
                return
            }

            const res = prettyJson(input)
            setOutput(res)
        } catch (e) {
            setOutput(e.message)
        }
    }, [input]);

    return (
        <div className={theme}>
            <Container>
                <Background>
                    <div className='flex h-[calc(100%-40px)] w-full'>
                        <div className='p-5 w-50%'>
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Tab') {
                                        e.preventDefault()
                                    }
                                }}
                                spellCheck={false}
                                className='w-full h-full resize-none bg-transparent text-[var(--text)] outline-none text-18px'
                            />
                        </div>
                        <div className='p-5 w-50%'>
                            <textarea
                                disabled
                                value={output}
                                className='w-full h-full resize-none bg-transparent text-[var(--text)] text-18px'
                            />
                        </div>
                    </div>
                    <Footer
                        current={null}
                        icon={
                            <img src="/logo.svg" className='w-5' alt='logo'/>
                        }
                        actions={(current, changeVisible) => [
                            {
                                id: 'Compress + Escape + Copy',
                                name: 'Compress + Escape + Copy',
                                perform: () => {
                                    clipboard.set(compressAndAddEscape(output))
                                    mainView.hide()
                                }
                            },
                            {
                                id: 'copy',
                                name: 'Copy',
                                item: null,
                                perform: () => {
                                    clipboard.set(output)
                                    mainView.hide()
                                }
                            },
                            {
                                id: 'FormatInput',
                                name: 'Format Input',
                                perform: () => {
                                    setInput(output)
                                    changeVisible()
                                    inputRef.current?.focus()
                                }
                            }
                        ] as Action[]
                        }
                        content={
                            () => null
                        }/>
                </Background>
            </Container>
        </div>
    )
}

export default App
