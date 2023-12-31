import "../styles/custom.css"
import { Provider } from "react-redux"
import { ToastContainer, Slide } from "react-toastify"
import { CookiesProvider } from "react-cookie"
import "react-toastify/dist/ReactToastify.min.css"
import axios from "axios"

import Layout from "../components/Layout/Layout"
import store from "../redux/store"
import { getCookie } from "../helpers/Cookies"

function MyApp({ Component, pageProps }) {
    axios.defaults.headers.common["Authorization"] = "Bearer" + getCookie("cookies-token")

    return (
        <Provider store={store}>
            <CookiesProvider>
                <Layout>
                    <Component {...pageProps} />
                    <ToastContainer
                        className="impct-toast"
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable={false}
                        pauseOnHover
                        transition={Slide}
                    />
                </Layout>
            </CookiesProvider>
        </Provider>
    )
}

export default MyApp
