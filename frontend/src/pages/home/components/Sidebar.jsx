import { Col, Card, Form, InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import useCustomization from "../../../hooks/useCustomization";

const Sidebar = ({handleSelectedSources, handleSelectedDate, handleSelectedCategories }) => {
	const { sources, categories } = useCustomization();
	const [selectDate, setSelectDate] = useState("");
	const [selectedSources, setSelectedSources] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [allCategories, setAllCategories] = useState(true);
	const [allSources, setAllSources] = useState(true);

	const handleSourceChange = (event, index) => {
		let newSources;
		if (event.target.checked) {
			newSources =[
				...selectedSources,
				sources[index].api
			];
		} else {
			newSources = selectedSources.filter(source => source !== sources[index].api);
		}

		handleSelectedSources(newSources);
		setSelectedSources(newSources);
		if (newSources.length > 0) {
			setAllSources(false);
		} else {
			setAllSources(true);
		}		
	};

	const handleDate = (event) => {
		setSelectDate(event.target.value);
		handleSelectedDate(event.target.value);
	};

	const handleCategoryChange = (event, index) => {
		let newCategory;
		if (event.target.checked) {
			newCategory =[
				...selectedCategories,
				categories[index].category
			];
		} else {
			newCategory = selectedCategories.filter(category => category !== categories[index].category);
		}

		handleSelectedCategories(newCategory);
		setSelectedCategories(newCategory);
		if (newCategory.length > 0) {
			setAllCategories(false);
		} else {
			setAllCategories(true);
		}
	};

	const handleAllSourceChange = (event) => {
		setAllSources(event.target.checked);
		setSelectedSources([]);
		handleSelectedSources([]);
	}

	const handleAllCategory = (event) => {
		setAllCategories(event.target.checked);
		setSelectedCategories([]);
		handleSelectedCategories([]);
	}

	return (
		<Col md={4} lg={3} className="mb-4">
			<Card>
				<Card.Body>
					<Form.Group className="me-3" controlId="formDate">
						<Form.Label className="h6 pt-2">Pick a date</Form.Label>
						<Form.Control type="date" max={new Date().toISOString().split("T")[0]} value={selectDate} onChange={handleDate} />
					</Form.Group>

					<h6 className="pt-3">Categories</h6>
					<Form.Group>
						<Form.Check type="checkbox" checked={allCategories} label="All Categories" id="category" onChange={handleAllCategory} />
					</Form.Group>
					{
						categories && categories.map((category, index) => (
							<Form.Group key={index}>
								<Form.Check type="checkbox" checked={selectedCategories.includes(category.category)} label={ category.category } id="category" onChange={(event) => handleCategoryChange(event, index)} />
							</Form.Group>
						))
					}
					<h6 className="pt-3">Main Sources</h6>
					<Form.Group>
						<Form.Check type="checkbox" checked={allSources} label="All Sources" id="category" onChange={handleAllSourceChange} />
					</Form.Group>
					{
						categories && sources.map((source, index) => (
							<Form.Group key={index}>
								<Form.Check type="checkbox" checked={selectedSources.includes(source.api)} label={ source.api } id="category" onChange={(event) => handleSourceChange(event, index)} />
							</Form.Group>
						))
					}
				</Card.Body>
			</Card>
		</Col>
	);
};

export default Sidebar;
