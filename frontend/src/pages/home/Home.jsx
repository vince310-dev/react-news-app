import { Row, Container } from "react-bootstrap";
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Article from "./components/Article";
import useArticleList from "../../hooks/useArticleList";
import Loading from "../../utils/Loading";

function Home() {
	const [searchValue, setSearchValue] = useState("");
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedSources, setSelectedSources] = useState([]);
	const [selectedAuthors, setSelectedAuthors] = useState([]);
	const [selectedCategories, setselectedCategories] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const [articlesShow, setArticlesShow] = useState([]);

	const api = `api/articles?s=${searchValue}&date=${selectedDate}&category=${selectedCategories.join(';')}&source=${selectedSources.join(';')}&page=${pageNo}&author=${selectedAuthors.join(';')}`;

	const { articles, lastPage, loading } = useArticleList(api);

	useEffect(() => {
		setArticlesShow([...articles]);
	}, [articles]);

	const handleSources = (value) => {
		setPageNo(1);
		setSelectedSources(value);
	};

	const handleDate = (value) => {
		setPageNo(1);
		setSelectedDate(value);
	};

	const handleCategory = (value) => {
		setPageNo(1);
		setselectedCategories(value);
	};

	const handleSearchTerm = (value) => {
		setSearchValue(value);
	}

	return (
		<div className="bg-light" style={{minHeight: '100vh'}}>
			<Container className="minHeight pt-3">
				{loading && !searchValue && <Loading />}
				<Row>
					<Sidebar
						handleSelectedSources={handleSources} 
						handleSelectedDate={handleDate} 
						handleSelectedCategories={handleCategory}
					/>
					<Article
						articles={articlesShow}
						handleSearchTermChange={handleSearchTerm} />
				</Row>

				{
					articles.length > 0 && (
						<div className="d-flex justify-content-center mt-4 pb-5">
							<PaginationControl 
								page={pageNo}
								between={4}
								total={lastPage * 24}
								limit={24}
								changePage={(page) => setPageNo(page)}
								ellipsis={1}
							/>
						</div>
					)
				}
			</Container>
		</div>
	);
}

export default Home;
