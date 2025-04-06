import "@/styles/reset.css";
import "@/styles/globals.css";
import store from '@/store'
import { Provider } from 'react-redux'
import { GlobalProvider } from "@/context/GlobalContext";
import { Lato, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/portfolio.css'
import '@/styles/editor.css'

const lato = Lato({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return <Provider store={store}>
            <GlobalProvider>  
              <div className={`main ${plusJakartaSans.className} `} >
                  <Component {...pageProps} />
              </div>
            </GlobalProvider>
       </Provider>
   ;
}
