// Import các thư viện cần thiết
import { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import App from "~/App"
import GlobalStyles from "./components/GlobalStyles"
import Loading from "./components/Loading"
import store from "./store"

// Tạo persist store
const pStore = persistStore(store)

const APP_VERSION = "1.0.0" // Phiên bản hiện tại của ứng dụng

// Hàm renderApp để render toàn bộ ứng dụng lên trang web
function renderApp() {
  const storedVersion = localStorage.getItem("APP_VERSION")
  if (storedVersion !== APP_VERSION) {
    // Xóa dữ liệu trong localStorage
    pStore.purge()
    localStorage.clear()
    window.location.reload()

    // Cập nhật giá trị của biến phiên bản trong localStorage
    localStorage.setItem("APP_VERSION", APP_VERSION)
  }
  // Tìm đến thẻ có id="root" trong DOM để render ứng dụng
  const root = ReactDOM.createRoot(document.getElementById("root"))
  // Render ứng dụng vào thẻ root với các thư viện đã được wrap bởi Provider, PersistGate, Router
  root.render(
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={pStore}>
          <Router>
            <GlobalStyles>
              <App />
            </GlobalStyles>
          </Router>
        </PersistGate>
      </Provider>
    </Suspense>
  )
}

// Gọi hàm renderApp để chạy ứng dụng
renderApp()
