import "bootstrap/dist/css/bootstrap.min.css"
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppRegistry } from 'react-native';
import 'react-virtualized/styles.css'

AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root')
});
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
