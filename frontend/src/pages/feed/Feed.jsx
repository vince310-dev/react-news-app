import { Row, Container, Button, ButtonGroup } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import Article from "./components/Article";
import useArticleList from "../../hooks/useArticleList";
import Loading from "../../utils/Loading";
import axios from "axios";

function Home() {
	const { loginStorageData } = useAuth();
	const [selectedSources, setSelectedSources] = useState([]);
	const [selectedAuthors, setSelectedAuthors] = useState([]);
	const [selectedCategories, setselectedCategories] = useState([]);
	const [articlesShow, setArticlesShow] = useState([]);
	const userId = loginStorageData.user.id;

	const api = `api/articles?&category=${selectedCategories.join(';')}&source=${selectedSources.join(';')}&author=${selectedAuthors.join(';')}`;

	const { articles, loading } = useArticleList(api);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(`api/get_setting?user=${userId}`);
				setSelectedSources(response.data.sources.map((item) => item.name));
				setSelectedAuthors(response.data.authors.map((item) => item.name));
				setselectedCategories(response.data.categories.map((item) => item.name));
			} catch (error) {
				console.log(error);
			}
		})();
	}, [userId]);

	useEffect(() => {
		setArticlesShow([...articles]);
	}, [articles]);

	return (
		<div className="bg-light" style={{minHeight: '100vh'}}>
			<Container className="pt-3">
				{loading && <Loading />}
				<Row>
					<Article
						selectedSources={selectedSources}
						selectedAuthors={selectedAuthors}
						selectedCategories={selectedCategories}
						articles={articlesShow} />
				</Row>
			</Container>
		</div>
	);
}

export default Home;
