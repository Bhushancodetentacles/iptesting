import { Outlet, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../common/Layout";

const Public = () => {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						<Layout>
							<Outlet />
						</Layout>
					}
				>
					<Route index path="/" element={<Login />} />
				</Route>
			</Routes>
		</>
	);
};

export default Public;
