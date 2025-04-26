import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Helmet>
        <title>Online Car Rental</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Rent cars quickly and easily with our user-friendly car rental app. Choose from a wide range of vehicles, enjoy flexible booking options, and get affordable rates—all at your fingertips."
        />
        <meta
          name="keywords"
          content="car rental app, rent a car, vehicle booking, car hire service, affordable car rentals, car reservation app, online car rental, book a car, mobile car rental, car rental deals"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <App />
    </BrowserRouter>
  </Provider>
);
