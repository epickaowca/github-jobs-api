import '../styles/globals.css'
import App from 'next/app'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { createWrapper } from 'next-redux-wrapper'
import store from '../redux/store'
import * as theme from '../styles/style'

class MyApp extends App {
  render(){
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    )
  }
}

const makestore = ()=>store
const wrapper = createWrapper(makestore)

export default wrapper.withRedux(MyApp)