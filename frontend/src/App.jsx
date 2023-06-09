import { Routes, Route } from "react-router-dom";
import Footer from "./pages/layout/Footer";
import Header from "./pages/layout/Header";
import Home from "./pages/home/Home";
import Feed from "./pages/feed/Feed";
import Setting from "./pages/setting/Setting";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
	return (
		<div className="main">
			<AuthProvider>
				<Header />
				<Routes>
					<Route path="/*" element={<PrivateRoutes />}>
						<Route path="" element={<Home />} />
						<Route path="feed" element={<Feed />} />
						<Route path="setting" element={<Setting />} />
					</Route>
					<Route path="/*" element={<PublicRoutes />}>
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
					</Route>
				</Routes>
				<Footer />
			</AuthProvider>
		</div>
	);
}

export default App;
