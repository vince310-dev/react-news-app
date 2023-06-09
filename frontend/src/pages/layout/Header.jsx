import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../utils/Loading";

const Header = () => {
	const { loginStorageData, userLogout, loading } = useAuth();
	return (
		<Navbar bg="primary" variant="dark" expand="lg" className="sticky-top">
			<Container>
				<Navbar.Brand> Innoscripta </Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					{loading && <Loading />}
					{loginStorageData ? (
						<>
							<Nav className="ms-auto my-2 my-lg-0" navbarScroll>
								<NavLink to="/" className="nav-link">
									Home
								</NavLink>
							</Nav>
							<Nav className="my-2 my-lg-0" navbarScroll>
								<NavLink to="/feed" className="nav-link">
									Feed
								</NavLink>
							</Nav>
							<Nav className="my-2 my-lg-0" navbarScroll>
								<NavLink to="/setting" className="nav-link">
									Setting
								</NavLink>
							</Nav>
							<Nav className="my-2 my-lg-0" navbarScroll onClick={userLogout}>
								<NavLink className="nav-link">
									Log out
								</NavLink>
							</Nav>
						</>
					) : (
						<>
							<Nav className="ms-auto my-2 my-lg-0" navbarScroll>
								<NavLink to="/login" className="nav-link">
									Login
								</NavLink>
							</Nav>
							<Nav className="my-2 my-lg-0" navbarScroll>
								<NavLink to="/register" className="nav-link">
									Register
								</NavLink>
							</Nav>
						</>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
