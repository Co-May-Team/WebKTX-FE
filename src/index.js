import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import store from '~/store'
import App from '~/App'
import { GlobalStyles } from '~/components'

const persistor = persistStore(store)

function renderApp() {
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(
        <React.StrictMode>
            <Provider store={persistor}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <GlobalStyles>
                            <App />
                        </GlobalStyles>
                    </Router>
                </PersistGate>
            </Provider>
        </React.StrictMode>
    )
}

renderApp()
