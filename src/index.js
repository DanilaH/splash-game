import { Application } from './scripts/app.js';
import './styles.css';

let app = new Application();
app.runners.init.run();

app.test()

document.body.appendChild(app.view);

if (module.hot) module.hot.accept();