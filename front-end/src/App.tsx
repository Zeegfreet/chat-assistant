import "./locales/i18next"
import { BrowserRouter } from "react-router"
import { MainApp } from "./apps/MainApp"
import { Provider } from "react-redux"
import store from "./store"
import { LocaleProvider } from "./locales/LocaleProvider"
import { SidebarProvider } from "./components/ui/sidebar"
import { AppProvider } from "./contexts/app-provider"

function App() {

  return (
    <Provider store={store} >
        <LocaleProvider />
        <AppProvider />
        <BrowserRouter>
          <SidebarProvider>
            <MainApp />
          </SidebarProvider>
        </BrowserRouter>
    </Provider>
  )
}

export default App
