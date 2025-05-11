import { Suspense } from "react"
import { RouterProvider } from 'react-router-dom'
import ThemeProvider from "./ThemeProvider"
import StoreProvider from "./StoreProvider"
import FallbackLoader from "@Atom/Loader/FallbackLoader"
import router from "./router"

const App = () => {
  return (
    <ThemeProvider>
      <StoreProvider>
        <Suspense fallback={<FallbackLoader />}>
          <RouterProvider router={router} />
        </Suspense>
      </StoreProvider>
    </ThemeProvider>
  )
}

export default App