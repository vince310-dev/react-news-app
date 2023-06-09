import { useState, useEffect } from "react";
import axios from "axios";

// This hook is for getting user defined filter customization
const useCustomization = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [sources, setSources] = useState([]);
	const [authors, setAuthors] = useState([]);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(`/api/get_fields`);
				if (response.data) {
					setSources(response.data.sources);
					setAuthors(response.data.authors);
					setCategories(response.data.categories);
				}
				setLoading(false);
			} catch (error) {
				setError(true);
				setLoading(false);
				console.error(error);
			}
		})();
	}, []);

	return { loading, error, sources, authors, categories };
};

export default useCustomization;
