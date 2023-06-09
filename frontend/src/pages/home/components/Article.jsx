import { Nav, Card, Col, Row, InputGroup, Form, Button } from "react-bootstrap";
import { useState } from 'react';

const Article = ({
	articles,
	handleSearchTermChange
}) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearchTerm = (event) => {
		event.preventDefault();
		setSearchTerm(event.target.value);
	}

	const handleSearch = () => {
		handleSearchTermChange(searchTerm);
	}

	const handleKeyPress = (event) => {
		if (event.charCode === 13) {
			handleSearchTermChange(searchTerm);
		}
	}

	return (
		<Col md={8} lg={9}>
			<InputGroup className="mb-4">
				<Form.Control
					placeholder="Search ..."
					value={searchTerm}
					onChange={handleSearchTerm}
					onKeyPress={handleKeyPress}
				/>
				<Button variant="primary" onClick={handleSearch}>
					Search
				</Button>
			</InputGroup>
			<Row xs={1} md={3} className="g-4">
				{
					articles.map((article) => {
						return (
							<Col key={article.id} className="d-flex flex-row flex-wrap">
								<Card>
									<Card.Img variant="bottom" height={200} src={article.url_to_image || "https://placehold.co/1280x750"} />
									<Card.Body>
										<Card.Title>{article.title}</Card.Title>
										<Card.Subtitle className="my-2 text-muted">
											<p className="my-0">
												<small>Author: {article.author.split(",")[0]}</small>
											</p>
											<p className="my-1">
												<small>Published: {new Date(article.published_at).toDateString()}</small>
											</p>
											<p className="my-0">
												<small>Category: {article.category}</small>
											</p>
										</Card.Subtitle>
										<Card.Text>{article.description.substr(0, 100) + ` ...more`}</Card.Text>
										<Nav.Link href={article.url} target="_blank">
											Click to read full news from-<strong>{` ${article.source_name}`}</strong>
										</Nav.Link>
									</Card.Body>
								</Card>
							</Col>
						);
					})
				}
			</Row>
			
			{
				articles.length === 0 && (
					<Card>
						<Card.Body>
							No Result
						</Card.Body>
					</Card>
				)
			}
		</Col>
	);
};

export default Article;


