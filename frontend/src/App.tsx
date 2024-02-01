import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import PlantsPage from './pages/Plants';
import PlantPage from './pages/Plant';
import EditPlant from './pages/EditPlant';
import AuthProvider from './auth/AuthProvider';
import { AuthGuard, LoginGuard } from './auth/Guards';
import Login from './pages/Login';
import HouseholdsPage from './pages/Households';

function App() {
	return (
		<AuthProvider>
			<Navbar />
			<Routes>
				<Route element={<LoginGuard />}>
					<Route
						path='/login'
						element={<Login />}
					></Route>
				</Route>
				<Route element={<AuthGuard />}>
					<Route
						path='/'
						element={<HouseholdsPage />}
					></Route>
					<Route
						path='/:slug/plants'
						element={<PlantsPage />}
					></Route>
					<Route
						path='/:slug/plants/edit-plant'
						element={<EditPlant />}
					></Route>
					<Route
						path='/:slug/plants/:slug'
						element={<PlantPage />}
					></Route>
					<Route
						path='/:slug/plants/edit-plant?plant=:slug'
						element={<EditPlant />}
					></Route>
				</Route>
			</Routes>
		</AuthProvider>
	);
}

export default App;
