import { Link } from 'react-router';
import { Group, Button } from '@chakra-ui/react';

export default function Home() {
	return (
		<Group attached>
			<Button variant="outline">
				<Link to={'login'}>login</Link>
			</Button>
			<Button variant="outline">
				<Link to={'signin'}>signin</Link>
			</Button>
			<Button variant="outline">
				{' '}
				<Link to={'applications'}>applications</Link>
			</Button>
			<Button variant="outline">
				<Link to={`applications/${'3cb62f30-d1ea-4694-80a8-6aebe4b73d54'}`}>
					application
				</Link>
			</Button>
			<Button variant="outline">
				<Link to={'dashboard'}>dashboard</Link>
			</Button>
			<Button variant="outline">
				<Link to={'board'}>board</Link>
			</Button>
		</Group>
	);
}
