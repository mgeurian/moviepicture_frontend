import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

function Home() {
	return (
		<section className="col-md-8">
			<Card>
				<CardBody className="text-center">
					<CardTitle>
						<h3 className="font-weight-bold">MoviePicture</h3>
						<h5>How many movies have you seen?</h5>
					</CardTitle>
				</CardBody>
			</Card>
		</section>
	);
}

export default Home;
