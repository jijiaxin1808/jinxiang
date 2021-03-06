import dva from 'dva';
import './index.less';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/example').default);
// const models = require.context("./models", true, /^\.\/.*\.js$/);
// models.keys().forEach(key => {
// 	app.model(models(key).default);
// });

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
