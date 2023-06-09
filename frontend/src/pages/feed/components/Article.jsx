import { Nav, Card, Col, Badge } from "react-bootstrap";
import { useState } from 'react';

const Article = ({ 
	selectedSources,
	selectedAuthors,
	selectedCategories,
	articles
}) => {
	return (
		<Col>
			<Card className="my-4">
				<Card.Body>
					<h3>Feed</h3>
					<p>Here you can see the News Feed according to your preference for Source, Author, and Categories.</p>
					<h6>Your preferences</h6>
					<label>Main Source: </label> 
					{ 
						selectedSources.map(source => 
							<Badge className="mx-2" bg="success" pill key={source}>{source}</Badge>
						) 
					} 
					<br/>
					<label>Authors: </label>
					{
						selectedAuthors.map(author => 
							<Badge className="mx-2" bg="warning" pill key={author}>{author}</Badge>
						)
					}
					<br/>
					<label>Categories: </label>
					{
						selectedCategories.map(category => 
							<Badge className="mx-2" bg="primary" pill key={category}>{category}</Badge>
						)
					}
					<br/>
				</Card.Body>
			</Card>

			{
				articles.map((article) => {
					return (
						<div key={article.id} className="mb-3">
							<Card className="d-flex flex-row flex-wrap p-2">
								<img className="rounded-3 mx-auto" variant="bottom" width={300} src={article.url_to_image} alt="Article Image" />
								<Card.Body style={{flex: 1, minWidth: '300px'}}>
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
									<Card.Text>{article.description.slice(0, 100) + '...'}</Card.Text>
									<Nav.Link href={article.url} target="_blank">
										Read more from <strong>{` ${article.source_name}`}</strong>
									</Nav.Link>
								</Card.Body>
							</Card>
						</div>
					);
				})
			}

			{
				articles.length === 0 && (
					<Card>
						<Card.Body>
							No Feed Data
						</Card.Body>
					</Card>
				)
			}
		</Col>
	);
};

export default Article;
