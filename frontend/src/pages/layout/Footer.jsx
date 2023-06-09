import { Navbar, Container } from "react-bootstrap";

const Footer = () => {
	return (
		<Navbar fixed="bottom" bg="primary" className="mt-2 py-2">
			<Container className="text-center d-block">
				<span className="text-light">© Copyright 2023, Innoscripta AG</span>
			</Container>
		</Navbar>
	);
};
export default Footer;
