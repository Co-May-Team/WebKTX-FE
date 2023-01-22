import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import App from '~/App'
import { GlobalStyles } from '~/components'
import store from './store'

const pStore = persistStore(store)

function renderApp() {
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={pStore}>
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
